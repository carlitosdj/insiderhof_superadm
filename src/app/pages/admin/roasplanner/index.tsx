import React, { FC, useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Alert } from "react-bootstrap";
import { Content } from "../../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";

// =================================================================================
// VERSÃO FINAL: ROAS PLANNER COM LÓGICA DE TRAVAS IMPLÍCITAS EM CASCATA - CORREÇÃO DE UNLOCK
// =================================================================================

type MetricKey =
  | "investment"
  | "cpl"
  | "leads"
  | "conversionRate"
  | "sales"
  | "cpa"
  | "avgTicket"
  | "grossRevenue"
  | "roas"
  | "profitMargin"
  | "netRevenue";

interface Metric {
  value: number;
  isLocked: boolean;
  isImplicitlyLocked: boolean;
}

type Metrics = Record<MetricKey, Metric>;

const MetricCard: FC<{
  metric: Metric;
  metricKey: MetricKey;
  title: string;
  onValueChange: (key: MetricKey, value: number) => void;
  onLockToggle: (key: MetricKey) => void;
  prefix?: string;
  suffix?: string;
  isRecalculated?: boolean;
}> = ({
  metric,
  metricKey,
  title,
  onValueChange,
  onLockToggle,
  prefix = "",
  suffix = "",
  isRecalculated,
}) => {
  const formatDisplayValue = useCallback(
    (val: number) => {
      if (isNaN(val) || !isFinite(val))
        return prefix === "R$" ? "R$ 0,00" : "0";
      if (prefix === "R$")
        return val.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      if (suffix === "%") return `${val.toFixed(2).replace(".", ",")}%`;
      if (suffix === "x") return `${val.toFixed(2).replace(".", ",")}x`;
      return val.toLocaleString("pt-BR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    },
    [prefix, suffix]
  );

  const [inputValue, setInputValue] = useState(
    formatDisplayValue(metric.value)
  );

  useEffect(() => {
    setInputValue(formatDisplayValue(metric.value));
  }, [metric.value, formatDisplayValue]);

  const handleBlur = () => {
    const cleanedValue = inputValue
      .replace("R$", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .replace("%", "")
      .replace("x", "")
      .trim();
    const numericValue = parseFloat(cleanedValue);
    if (!isNaN(numericValue) && numericValue !== metric.value) {
      onValueChange(metricKey, numericValue);
    } else {
      setInputValue(formatDisplayValue(metric.value));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") (e.target as HTMLInputElement).blur();
  };

  const isFullyLocked = metric.isLocked || metric.isImplicitlyLocked;
  const lockTitle = metric.isLocked
    ? "Destravar"
    : metric.isImplicitlyLocked
    ? "Travado por consequência de outras travas"
    : "Travar";

  return (
    <div className={`card h-100 ${isRecalculated ? "card-flashing" : ""}`}>
      <div className="card-body d-flex flex-column p-6">
        <div className="d-flex flex-stack mb-4">
          <h6 className="fw-bolder text-gray-800 mb-0">{title}</h6>
          <div
            onClick={
              metric.isImplicitlyLocked
                ? undefined
                : () => onLockToggle(metricKey)
            }
            style={{
              cursor: metric.isImplicitlyLocked ? "not-allowed" : "pointer",
            }}
            title={lockTitle}
          >
            <i
              className={`bi fs-2x ${
                metric.isLocked
                  ? "bi-lock-fill text-primary"
                  : metric.isImplicitlyLocked
                  ? "bi-lock-fill text-muted"
                  : "bi-unlock-fill text-gray-500"
              }`}
            ></i>
          </div>
        </div>
        <div className={`mt-auto ${isFullyLocked ? "bg-light rounded" : ""}`}>
          <input
            type="text"
            className="form-control form-control-flush border-0 fs-2hx fw-bolder text-dark p-2"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            disabled={isFullyLocked}
          />
        </div>
      </div>
    </div>
  );
};

const RoasplannerPage: React.FC = () => {
  const initialMetrics: Metrics = useMemo(
    () => ({
      investment: { value: 1000, isLocked: false, isImplicitlyLocked: false },
      cpl: { value: 2.5, isLocked: false, isImplicitlyLocked: false },
      leads: { value: 400, isLocked: false, isImplicitlyLocked: false },
      conversionRate: { value: 1, isLocked: false, isImplicitlyLocked: false },
      sales: { value: 4, isLocked: false, isImplicitlyLocked: false },
      cpa: { value: 250, isLocked: false, isImplicitlyLocked: false },
      avgTicket: { value: 997, isLocked: false, isImplicitlyLocked: false },
      grossRevenue: { value: 3988, isLocked: false, isImplicitlyLocked: false },
      roas: { value: 3.99, isLocked: false, isImplicitlyLocked: false },
      profitMargin: { value: 80, isLocked: false, isImplicitlyLocked: false },
      netRevenue: { value: 3190.4, isLocked: false, isImplicitlyLocked: false },
    }),
    []
  );

  const [metrics, setMetrics] = useState<Metrics>(initialMetrics);
  const [conflictError, setConflictError] = useState<string | null>(null);
  const [recalculatedKeys, setRecalculatedKeys] = useState<Set<MetricKey>>(
    new Set()
  );

  const relations: MetricKey[][] = useMemo(
    () => [
      ["investment", "cpl", "leads"],
      ["leads", "conversionRate", "sales"],
      ["investment", "sales", "cpa"],
      ["sales", "avgTicket", "grossRevenue"],
      ["grossRevenue", "investment", "roas"],
      ["grossRevenue", "profitMargin", "netRevenue"],
    ],
    []
  );

  const solvers = useMemo<Record<MetricKey, Array<(m: Metrics) => number>>>(
    () => ({
      investment: [
        (m) => m.leads.value * m.cpl.value,
        (m) => m.sales.value * m.cpa.value,
        (m) => m.grossRevenue.value / m.roas.value,
      ],
      cpl: [(m) => m.investment.value / m.leads.value],
      leads: [
        (m) => m.investment.value / m.cpl.value,
        (m) => m.sales.value / (m.conversionRate.value / 100),
      ],
      conversionRate: [(m) => (m.sales.value / m.leads.value) * 100],
      sales: [
        (m) => m.leads.value * (m.conversionRate.value / 100),
        (m) => m.investment.value / m.cpa.value,
        (m) => m.grossRevenue.value / m.avgTicket.value,
      ],
      cpa: [(m) => m.investment.value / m.sales.value],
      avgTicket: [(m) => m.grossRevenue.value / m.sales.value],
      grossRevenue: [
        (m) => m.sales.value * m.avgTicket.value,
        (m) => m.investment.value * m.roas.value,
        (m) => m.netRevenue.value / (m.profitMargin.value / 100),
      ],
      roas: [(m) => m.grossRevenue.value / m.investment.value],
      profitMargin: [(m) => (m.netRevenue.value / m.grossRevenue.value) * 100],
      netRevenue: [(m) => m.grossRevenue.value * (m.profitMargin.value / 100)],
    }),
    []
  );

  const hierarchy: MetricKey[] = useMemo(
    () => [
      "leads",
      "sales",
      "investment",
      "grossRevenue",
      "netRevenue",
      "avgTicket",
      "cpa",
      "cpl",
      "roas",
      "conversionRate",
      "profitMargin",
    ],
    []
  );

  const calculateImplicitLocks = useCallback(
    (currentMetrics: Metrics): Metrics => {
      const newMetrics = JSON.parse(JSON.stringify(currentMetrics));
      // Limpa travas implícitas antigas para reavaliar do zero
      Object.keys(newMetrics).forEach((k) => {
        newMetrics[k as MetricKey].isImplicitlyLocked = false;
      });

      let safetyNet = 0;
      while (safetyNet < relations.length) {
        let foundNewLockThisIteration = false;
        for (const rel of relations) {
          const knowns = rel.filter(
            (k) =>
              newMetrics[k as MetricKey].isLocked ||
              newMetrics[k as MetricKey].isImplicitlyLocked
          );
          const unknowns = rel.filter(
            (k) =>
              !newMetrics[k as MetricKey].isLocked &&
              !newMetrics[k as MetricKey].isImplicitlyLocked
          );
          if (knowns.length === 2 && unknowns.length === 1) {
            const keyToLock = unknowns[0] as MetricKey;
            if (!newMetrics[keyToLock].isImplicitlyLocked) {
              newMetrics[keyToLock].isImplicitlyLocked = true;
              foundNewLockThisIteration = true;
            }
          }
        }
        if (!foundNewLockThisIteration) break;
        safetyNet++;
      }
      return newMetrics;
    },
    [relations]
  );

  const recalculateValues = (
    currentMetrics: Metrics,
    changedKey: MetricKey | null
  ): { finalMetrics: Metrics; updatedKeys: Set<MetricKey> } => {
    let newMetrics = JSON.parse(JSON.stringify(currentMetrics));
    const updatedKeys = new Set<MetricKey>();
    const unsolved = new Set<MetricKey>(
      hierarchy.filter(
        (k) =>
          !newMetrics[k].isLocked &&
          !newMetrics[k].isImplicitlyLocked &&
          k !== changedKey
      )
    );
    for (let i = 0; i < hierarchy.length && unsolved.size > 0; i++) {
      let changedInIteration = false;
      for (const keyToSolve of hierarchy) {
        if (unsolved.has(keyToSolve)) {
          for (const solve of solvers[keyToSolve]) {
            try {
              const result = solve(newMetrics);
              if (
                isFinite(result) &&
                !isNaN(result) &&
                Math.abs(newMetrics[keyToSolve].value - result) > 0.001
              ) {
                newMetrics[keyToSolve].value = result;
                unsolved.delete(keyToSolve);
                updatedKeys.add(keyToSolve);
                changedInIteration = true;
                break;
              }
            } catch (e) {}
          }
        }
      }
      if (!changedInIteration) break;
    }
    return { finalMetrics: newMetrics, updatedKeys };
  };

  const processStateUpdate = useCallback(
    (changedKey: MetricKey | null, baseMetrics: Metrics) => {
      const metricsWithAllLocks = calculateImplicitLocks(baseMetrics);
      const { finalMetrics, updatedKeys } = recalculateValues(
        metricsWithAllLocks,
        changedKey
      );
      setMetrics(finalMetrics);
      setRecalculatedKeys(updatedKeys);
      setTimeout(() => setRecalculatedKeys(new Set()), 700);
    },
    [calculateImplicitLocks, recalculateValues, hierarchy, solvers]
  );

  const handleValueChange = useCallback(
    (key: MetricKey, value: number) => {
      const newMetrics = { ...metrics, [key]: { ...metrics[key], value } };
      processStateUpdate(key, newMetrics);
    },
    [metrics, processStateUpdate]
  );

  // LÓGICA DE TRAVA CORRIGIDA
  const handleLockToggle = useCallback(
    (key: MetricKey) => {
      const isCurrentlyLocked = metrics[key].isLocked;

      // --- Caminho de DESTRAVAR ---
      // Ação de destravar é sempre permitida e não precisa de verificação de conflito.
      if (isCurrentlyLocked) {
        const newMetrics = {
          ...metrics,
          [key]: { ...metrics[key], isLocked: false },
        };
        processStateUpdate(key, newMetrics);
        return;
      }

      // --- Caminho de TRAVAR ---
      // Apenas ao tentar travar, verificamos por conflitos.
      setConflictError(null);
      const conflictRelation = relations.find((rel) => {
        if (!rel.includes(key)) return false;
        // Verifica se os OUTROS 2 itens no triângulo já estão travados
        const otherItems = rel.filter((k) => k !== key);
        const otherItemsLockedCount = otherItems.filter(
          (k) =>
            metrics[k as MetricKey].isLocked ||
            metrics[k as MetricKey].isImplicitlyLocked
        ).length;
        return otherItemsLockedCount === 2;
      });

      if (conflictRelation) {
        const others = conflictRelation
          .filter((k) => k !== key)
          .map((k) => `"${k}"`)
          .join(" e ");
        setConflictError(
          `Não é possível travar "${key}", pois seu valor já é determinado por ${others}.`
        );
        setTimeout(() => setConflictError(null), 5000);
        return;
      }

      // Se não houver conflito, trava o item e processa o novo estado.
      const newMetrics = {
        ...metrics,
        [key]: { ...metrics[key], isLocked: true },
      };
      processStateUpdate(key, newMetrics);
    },
    [metrics, processStateUpdate, relations]
  );

  return (
    <div className="">
      <ToolbarWrapper />
      <Content>
        {conflictError && (
          <Alert
            variant="danger"
            onClose={() => setConflictError(null)}
            dismissible
          >
            {conflictError}
          </Alert>
        )}
        {/* <div className="mb-10 text-center">
            <h1 className="text-dark">Planejador de ROAS Interativo</h1>
            <p className="text-muted fs-5 fw-normal">Ajuste qualquer valor e veja a mágica acontecer. A trava cinza significa que o valor é uma consequência de outras travas.</p>
        </div> */}
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <div className="card-label fw-bolder fs-3 mb-1">
              Alavancas e Eficiência
            </div>
            <div className="text-muted mt-1 fw-bold fs-7">
              Métricas que você controla diretamente
            </div>
          </h3>
        </div>
        <div className="row g-5 gx-xxl-8 mb-10">
          <div className="col-md-6 col-lg-3">
            <MetricCard
              metric={metrics.investment}
              metricKey="investment"
              title="Investimento"
              onValueChange={handleValueChange}
              onLockToggle={handleLockToggle}
              prefix="R$"
              isRecalculated={recalculatedKeys.has("investment")}
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <MetricCard
              metric={metrics.cpl}
              metricKey="cpl"
              title="Custo por Lead (CPL)"
              onValueChange={handleValueChange}
              onLockToggle={handleLockToggle}
              prefix="R$"
              isRecalculated={recalculatedKeys.has("cpl")}
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <MetricCard
              metric={metrics.conversionRate}
              metricKey="conversionRate"
              title="Taxa de Conversão"
              onValueChange={handleValueChange}
              onLockToggle={handleLockToggle}
              suffix="%"
              isRecalculated={recalculatedKeys.has("conversionRate")}
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <MetricCard
              metric={metrics.avgTicket}
              metricKey="avgTicket"
              title="Ticket Médio"
              onValueChange={handleValueChange}
              onLockToggle={handleLockToggle}
              prefix="R$"
              isRecalculated={recalculatedKeys.has("avgTicket")}
            />
          </div>
        </div>
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <div className="card-label fw-bolder fs-3 mb-1">
              Resultados de Performance
            </div>
            <div className="text-muted mt-1 fw-bold fs-7">
              Consequências diretas das suas alavancas
            </div>
          </h3>
        </div>
        <div className="row g-5 gx-xxl-8 mb-10">
          <div className="col-md-6 col-lg-3">
            <MetricCard
              metric={metrics.leads}
              metricKey="leads"
              title="Leads Gerados"
              onValueChange={handleValueChange}
              onLockToggle={handleLockToggle}
              isRecalculated={recalculatedKeys.has("leads")}
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <MetricCard
              metric={metrics.sales}
              metricKey="sales"
              title="Número de Vendas"
              onValueChange={handleValueChange}
              onLockToggle={handleLockToggle}
              isRecalculated={recalculatedKeys.has("sales")}
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <MetricCard
              metric={metrics.cpa}
              metricKey="cpa"
              title="Custo por Venda (CPA)"
              onValueChange={handleValueChange}
              onLockToggle={handleLockToggle}
              prefix="R$"
              isRecalculated={recalculatedKeys.has("cpa")}
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <MetricCard
              metric={metrics.roas}
              metricKey="roas"
              title="ROAS"
              onValueChange={handleValueChange}
              onLockToggle={handleLockToggle}
              suffix="x"
              isRecalculated={recalculatedKeys.has("roas")}
            />
          </div>
        </div>
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <div className="card-label fw-bolder fs-3 mb-1">
              Resultados Financeiros
            </div>
            <div className="text-muted mt-1 fw-bold fs-7">
              O impacto final no negócio
            </div>
          </h3>
        </div>
        <div className="row g-5 gx-xxl-8">
          <div className="col-md-6 col-lg-4">
            <MetricCard
              metric={metrics.grossRevenue}
              metricKey="grossRevenue"
              title="Faturamento Bruto"
              onValueChange={handleValueChange}
              onLockToggle={handleLockToggle}
              prefix="R$"
              isRecalculated={recalculatedKeys.has("grossRevenue")}
            />
          </div>
          <div className="col-md-6 col-lg-4">
            <MetricCard
              metric={metrics.profitMargin}
              metricKey="profitMargin"
              title="Margem de Lucro"
              onValueChange={handleValueChange}
              onLockToggle={handleLockToggle}
              suffix="%"
              isRecalculated={recalculatedKeys.has("profitMargin")}
            />
          </div>
          <div className="col-md-6 col-lg-4">
            <MetricCard
              metric={metrics.netRevenue}
              metricKey="netRevenue"
              title="Lucro Líquido"
              onValueChange={handleValueChange}
              onLockToggle={handleLockToggle}
              prefix="R$"
              isRecalculated={recalculatedKeys.has("netRevenue")}
            />
          </div>
        </div>
      </Content>
    </div>
  );
};

const Roasplanner: FC<React.PropsWithChildren<unknown>> = () => {
  const dispatch = useDispatch();
  const me = useSelector((state: ApplicationState) => state.me);
  const ideaction = useSelector((state: ApplicationState) => state.ideaction);

  useEffect(() => {
    // Sua lógica de useEffect permanece aqui
  }, [dispatch, me.me?.id]);

  return (
    <>
      <PageTitle
        breadcrumbs={[
          {
            title: "ROAS Planner",
            path: "/roasplanner",
            isSeparator: false,
            isActive: false,
          },
        ]}
      />
      {ideaction.error && (
        <Alert variant="danger">
          <h5>Erro ao carregar ideações:</h5>
          <pre>{JSON.stringify(ideaction.error, null, 2)}</pre>
        </Alert>
      )}
      <RoasplannerPage />
    </>
  );
};

export default Roasplanner;
