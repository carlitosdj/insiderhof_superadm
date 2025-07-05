import React, { FC, useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Alert } from "react-bootstrap";
import { Content } from "../../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";

// =================================================================================
// VERSÃO REFATORADA: ROAS PLANNER COM CORREÇÕES DE BUG E MELHORIAS
// =================================================================================

type MetricKey =
  | "totalInvestment"
  | "acquisitionPercentage"
  | "acquisitionInvestment"
  | "remarketingInvestment"
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
  onValueChange?: (key: MetricKey, value: number) => void;
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
      if (suffix === "%") return `${val.toFixed(1).replace(".", ",")}%`;
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
    if (!onValueChange) return;
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
    ? "Travado por consequência"
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
            disabled={!onValueChange || isFullyLocked}
          />
        </div>
      </div>
    </div>
  );
};

const RoasplannerPage: React.FC = () => {
  const setupInitialScenario = (): Metrics => {
    const initialValues = {
      totalInvestment: 1000,
      acquisitionPercentage: 80,
      cpl: 3,
      conversionRate: 1,
      avgTicket: 997,
      profitMargin: 80,
    };
    const acqInv =
      initialValues.totalInvestment *
      (initialValues.acquisitionPercentage / 100);
    const remarketingInv = initialValues.totalInvestment - acqInv;
    const leads = acqInv / initialValues.cpl;
    const sales = leads * (initialValues.conversionRate / 100);
    const cpa = sales > 0 ? acqInv / sales : 0;
    const grossRevenue = sales * initialValues.avgTicket;
    const roas =
      initialValues.totalInvestment > 0
        ? grossRevenue / initialValues.totalInvestment
        : 0;
    const netRevenue = grossRevenue * (initialValues.profitMargin / 100);
    return {
      totalInvestment: {
        value: initialValues.totalInvestment,
        isLocked: false,
        isImplicitlyLocked: false,
      },
      acquisitionPercentage: {
        value: initialValues.acquisitionPercentage,
        isLocked: true,
        isImplicitlyLocked: false,
      },
      acquisitionInvestment: {
        value: acqInv,
        isLocked: false,
        isImplicitlyLocked: false,
      },
      remarketingInvestment: {
        value: remarketingInv,
        isLocked: false,
        isImplicitlyLocked: false,
      },
      cpl: {
        value: initialValues.cpl,
        isLocked: false,
        isImplicitlyLocked: false,
      },
      leads: { value: leads, isLocked: false, isImplicitlyLocked: false },
      conversionRate: {
        value: initialValues.conversionRate,
        isLocked: true,
        isImplicitlyLocked: false,
      },
      sales: { value: sales, isLocked: false, isImplicitlyLocked: false },
      cpa: { value: cpa, isLocked: false, isImplicitlyLocked: false },
      avgTicket: {
        value: initialValues.avgTicket,
        isLocked: true,
        isImplicitlyLocked: false,
      },
      grossRevenue: {
        value: grossRevenue,
        isLocked: false,
        isImplicitlyLocked: false,
      },
      roas: { value: roas, isLocked: false, isImplicitlyLocked: false },
      profitMargin: {
        value: initialValues.profitMargin,
        isLocked: false,
        isImplicitlyLocked: false,
      },
      netRevenue: {
        value: netRevenue,
        isLocked: false,
        isImplicitlyLocked: false,
      },
    };
  };

  const [metrics, setMetrics] = useState<Metrics>(setupInitialScenario());
  const [conflictError, setConflictError] = useState<string | null>(null);
  const [recalculatedKeys, setRecalculatedKeys] = useState<Set<MetricKey>>(
    new Set()
  );

  const relations: MetricKey[][] = useMemo(
    () => [
      ["totalInvestment", "acquisitionInvestment", "remarketingInvestment"],
      ["totalInvestment", "acquisitionPercentage", "acquisitionInvestment"],
      ["acquisitionInvestment", "cpl", "leads"],
      ["leads", "conversionRate", "sales"],
      ["acquisitionInvestment", "sales", "cpa"],
      ["cpl", "conversionRate", "cpa"],
      ["sales", "avgTicket", "grossRevenue"],
      ["grossRevenue", "totalInvestment", "roas"],
      ["grossRevenue", "profitMargin", "netRevenue"],
    ],
    []
  );

  // HIERARQUIA CORRIGIDA - Ordem lógica de dependências
  const hierarchy: MetricKey[] = useMemo(
    () => [
      // Nível 1: Métricas base (frequentemente inputs do usuário)
      "cpl",
      "conversionRate",
      "avgTicket",
      "profitMargin",

      // Nível 2: Volumes derivados das métricas base
      "leads",
      "sales",

      // Nível 3: Investimento em captação (derivado de volumes e CPL)
      "acquisitionInvestment",

      // Nível 4: Orçamento total e distribuição
      "totalInvestment",
      "remarketingInvestment",
      "acquisitionPercentage",

      // Nível 5: Resultados financeiros finais
      "cpa",
      "grossRevenue",
      "roas",
      "netRevenue",
    ],
    []
  );

  // SOLVERS MELHORADOS com validação de divisão por zero
  const solvers = useMemo<Record<string, Array<(m: Metrics) => number>>>(
    () => ({
      totalInvestment: [
        (m) => m.acquisitionInvestment.value + m.remarketingInvestment.value,
        (m) =>
          m.acquisitionPercentage.value > 0
            ? m.acquisitionInvestment.value /
              (m.acquisitionPercentage.value / 100)
            : 0,
        (m) => (m.roas.value > 0 ? m.grossRevenue.value / m.roas.value : 0),
      ],
      acquisitionInvestment: [
        (m) => m.cpl.value * m.leads.value,
        (m) => m.cpa.value * m.sales.value,
        (m) => m.totalInvestment.value * (m.acquisitionPercentage.value / 100),
        (m) => m.totalInvestment.value - m.remarketingInvestment.value,
      ],
      remarketingInvestment: [
        (m) => m.totalInvestment.value - m.acquisitionInvestment.value,
        (m) =>
          m.totalInvestment.value *
          ((100 - m.acquisitionPercentage.value) / 100),
      ],
      acquisitionPercentage: [
        (m) =>
          m.totalInvestment.value > 0
            ? (m.acquisitionInvestment.value / m.totalInvestment.value) * 100
            : 0,
      ],
      cpl: [
        (m) =>
          m.leads.value > 0 ? m.acquisitionInvestment.value / m.leads.value : 0,
        (m) =>
          m.conversionRate.value > 0
            ? m.cpa.value * (m.conversionRate.value / 100)
            : 0,
      ],
      leads: [
        (m) =>
          m.cpl.value > 0 ? m.acquisitionInvestment.value / m.cpl.value : 0,
        (m) =>
          m.conversionRate.value > 0
            ? m.sales.value / (m.conversionRate.value / 100)
            : 0,
      ],
      conversionRate: [
        (m) => (m.leads.value > 0 ? (m.sales.value / m.leads.value) * 100 : 0),
        (m) =>
          m.cpa.value > 0 && m.cpl.value > 0
            ? (m.cpl.value / m.cpa.value) * 100
            : 0,
      ],
      sales: [
        (m) => m.leads.value * (m.conversionRate.value / 100),
        (m) =>
          m.cpa.value > 0 ? m.acquisitionInvestment.value / m.cpa.value : 0,
        (m) =>
          m.avgTicket.value > 0 ? m.grossRevenue.value / m.avgTicket.value : 0,
      ],
      cpa: [
        (m) =>
          m.sales.value > 0 ? m.acquisitionInvestment.value / m.sales.value : 0,
        (m) =>
          m.conversionRate.value > 0
            ? m.cpl.value / (m.conversionRate.value / 100)
            : 0,
      ],
      avgTicket: [
        (m) => (m.sales.value > 0 ? m.grossRevenue.value / m.sales.value : 0),
      ],
      grossRevenue: [
        (m) => m.sales.value * m.avgTicket.value,
        (m) => m.totalInvestment.value * m.roas.value,
        (m) =>
          m.profitMargin.value > 0
            ? m.netRevenue.value / (m.profitMargin.value / 100)
            : 0,
      ],
      roas: [
        (m) =>
          m.totalInvestment.value > 0
            ? m.grossRevenue.value / m.totalInvestment.value
            : 0,
      ],
      profitMargin: [
        (m) =>
          m.grossRevenue.value > 0
            ? (m.netRevenue.value / m.grossRevenue.value) * 100
            : 0,
      ],
      netRevenue: [(m) => m.grossRevenue.value * (m.profitMargin.value / 100)],
    }),
    []
  );

  // ALGORITMO MELHORADO para calcular travamentos implícitos
  const calculateImplicitLocks = useCallback(
    (currentMetrics: Metrics): Metrics => {
      const newMetrics = JSON.parse(JSON.stringify(currentMetrics));

      // Reset implicit locks
      Object.keys(newMetrics).forEach((k) => {
        newMetrics[k as MetricKey].isImplicitlyLocked = false;
      });

      // Múltiplas passadas para garantir que todos os travamentos sejam detectados
      let changed = true;
      let iterations = 0;
      const maxIterations = relations.length * 2; // Limite de segurança

      while (changed && iterations < maxIterations) {
        changed = false;
        iterations++;

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

          // Se temos n-1 conhecidos em uma relação de n elementos, o último deve ser travado implicitamente
          if (knowns.length >= rel.length - 1 && unknowns.length === 1) {
            const keyToLock = unknowns[0] as MetricKey;
            if (!newMetrics[keyToLock].isImplicitlyLocked) {
              newMetrics[keyToLock].isImplicitlyLocked = true;
              changed = true;
            }
          }
        }
      }

      return newMetrics;
    },
    [relations]
  );

  // ALGORITMO MELHORADO de recálculo iterativo
  const recalculateValues = useCallback(
    (
      currentMetrics: Metrics,
      changedKey: MetricKey | null
    ): { finalMetrics: Metrics; updatedKeys: Set<MetricKey> } => {
      let newMetrics = JSON.parse(JSON.stringify(currentMetrics));
      const updatedKeys = new Set<MetricKey>();

      // Múltiplas passadas até convergência
      let converged = false;
      let iterations = 0;
      const maxIterations = 10; // Limite de segurança
      const tolerance = 0.001; // Tolerância para considerar convergência

      while (!converged && iterations < maxIterations) {
        converged = true;
        iterations++;

        const previousValues = JSON.parse(JSON.stringify(newMetrics));

        // Processar na ordem da hierarquia
        for (const keyToSolve of hierarchy) {
          // Pular se estiver travado ou foi o campo alterado
          if (
            newMetrics[keyToSolve].isLocked ||
            newMetrics[keyToSolve].isImplicitlyLocked ||
            keyToSolve === changedKey
          ) {
            continue;
          }

          // Tentar cada solver até encontrar um que funcione
          for (const solve of solvers[keyToSolve]) {
            try {
              const result = solve(newMetrics);

              // Verificar se o resultado é válido e diferente
              if (isFinite(result) && !isNaN(result) && result >= 0) {
                const difference = Math.abs(
                  newMetrics[keyToSolve].value - result
                );

                if (difference > tolerance) {
                  newMetrics[keyToSolve].value = result;
                  updatedKeys.add(keyToSolve);
                  converged = false;
                  break; // Usar o primeiro solver que funcionar
                }
              }
            } catch (e) {
              // Ignorar erros de solver (divisão por zero, etc.)
              continue;
            }
          }
        }

        // Verificar se houve mudanças significativas
        if (converged) {
          for (const key of Object.keys(newMetrics)) {
            const diff = Math.abs(
              newMetrics[key as MetricKey].value -
                previousValues[key as MetricKey].value
            );
            if (diff > tolerance) {
              converged = false;
              break;
            }
          }
        }
      }

      return { finalMetrics: newMetrics, updatedKeys };
    },
    [hierarchy, solvers]
  );

  // PROCESSO MELHORADO de atualização de estado
  const processStateUpdate = useCallback(
    (changedKey: MetricKey | null, baseMetrics: Metrics) => {
      // Primeiro, calcular travamentos implícitos
      const metricsWithAllLocks = calculateImplicitLocks(baseMetrics);

      // Depois, recalcular valores
      const { finalMetrics, updatedKeys } = recalculateValues(
        metricsWithAllLocks,
        changedKey
      );

      // Atualizar estado
      setMetrics(finalMetrics);
      setRecalculatedKeys(updatedKeys);

      // Clear recalculated highlighting after 700ms
      setTimeout(() => setRecalculatedKeys(new Set()), 700);
    },
    [calculateImplicitLocks, recalculateValues]
  );

  const handleValueChange = useCallback(
    (key: MetricKey, value: number) => {
      const newMetrics = { ...metrics, [key]: { ...metrics[key], value } };
      processStateUpdate(key, newMetrics);
    },
    [metrics, processStateUpdate]
  );

  const handleLockToggle = useCallback(
    (key: MetricKey) => {
      const isCurrentlyLocked = metrics[key].isLocked;
      if (isCurrentlyLocked) {
        const newMetrics = {
          ...metrics,
          [key]: { ...metrics[key], isLocked: false },
        };
        processStateUpdate(key, newMetrics);
        return;
      }
      setConflictError(null);
      const conflictRelation = relations.find((rel) => {
        if (!rel.includes(key)) return false;
        const otherItems = rel.filter((k) => k !== key);
        const otherItemsLockedCount = otherItems.filter(
          (k) =>
            metrics[k as MetricKey].isLocked ||
            metrics[k as MetricKey].isImplicitlyLocked
        ).length;
        return otherItemsLockedCount >= rel.length - 1;
      });
      if (conflictRelation) {
        const others = conflictRelation
          .filter(
            (k) =>
              k !== key &&
              (metrics[k as MetricKey].isLocked ||
                metrics[k as MetricKey].isImplicitlyLocked)
          )
          .map((k) => `"${titleMap[k]}"`)
          .join(" e ");
        setConflictError(
          `Não é possível travar "${titleMap[key]}", pois seu valor já é determinado por ${others}.`
        );
        setTimeout(() => setConflictError(null), 6000);
        return;
      }
      const newMetrics = {
        ...metrics,
        [key]: { ...metrics[key], isLocked: true },
      };
      processStateUpdate(key, newMetrics);
    },
    [metrics, processStateUpdate, relations]
  );

  const titleMap: Record<MetricKey, string> = {
    totalInvestment: "Investimento Total",
    acquisitionPercentage: "% na Captação",
    acquisitionInvestment: "Inv. em Captação",
    remarketingInvestment: "Inv. em Remarketing",
    cpl: "Custo por Lead",
    leads: "Leads Gerados",
    conversionRate: "Taxa de Conversão",
    sales: "Número de Vendas",
    cpa: "Custo por Venda",
    avgTicket: "Ticket Médio",
    grossRevenue: "Faturamento Bruto",
    roas: "ROAS (Total)",
    profitMargin: "Margem de Lucro",
    netRevenue: "Lucro Líquido",
  };

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
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <div className="card-label fw-bolder fs-3 mb-1">
              Orçamento de Marketing
            </div>
            <div className="text-muted mt-1 fw-bold fs-7">
              Defina seu orçamento total e como ele será dividido
            </div>
          </h3>
        </div>
        <div className="row g-5 gx-xxl-8 mb-10">
          <div className="col-md-6 col-lg-3">
            <MetricCard
              metric={metrics.totalInvestment}
              metricKey="totalInvestment"
              title={titleMap.totalInvestment}
              onValueChange={handleValueChange}
              onLockToggle={handleLockToggle}
              prefix="R$"
              isRecalculated={recalculatedKeys.has("totalInvestment")}
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <MetricCard
              metric={metrics.acquisitionPercentage}
              metricKey="acquisitionPercentage"
              title={titleMap.acquisitionPercentage}
              onValueChange={handleValueChange}
              onLockToggle={handleLockToggle}
              suffix="%"
              isRecalculated={recalculatedKeys.has("acquisitionPercentage")}
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <MetricCard
              metric={metrics.acquisitionInvestment}
              metricKey="acquisitionInvestment"
              title={titleMap.acquisitionInvestment}
              onValueChange={handleValueChange}
              onLockToggle={handleLockToggle}
              prefix="R$"
              isRecalculated={recalculatedKeys.has("acquisitionInvestment")}
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <MetricCard
              metric={metrics.remarketingInvestment}
              metricKey="remarketingInvestment"
              title={titleMap.remarketingInvestment}
              onValueChange={handleValueChange}
              onLockToggle={handleLockToggle}
              prefix="R$"
              isRecalculated={recalculatedKeys.has("remarketingInvestment")}
            />
          </div>
        </div>
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <div className="card-label fw-bolder fs-3 mb-1">
              Funil de Aquisição
            </div>
            <div className="text-muted mt-1 fw-bold fs-7">
              Métricas baseadas no seu investimento de Captação
            </div>
          </h3>
        </div>
        <div className="row g-5 gx-xxl-8 mb-10">
          <div className="col-md-6 col-lg-3">
            <MetricCard
              metric={metrics.cpl}
              metricKey="cpl"
              title={titleMap.cpl}
              onValueChange={handleValueChange}
              onLockToggle={handleLockToggle}
              prefix="R$"
              isRecalculated={recalculatedKeys.has("cpl")}
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <MetricCard
              metric={metrics.leads}
              metricKey="leads"
              title={titleMap.leads}
              onValueChange={handleValueChange}
              onLockToggle={handleLockToggle}
              isRecalculated={recalculatedKeys.has("leads")}
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <MetricCard
              metric={metrics.conversionRate}
              metricKey="conversionRate"
              title={titleMap.conversionRate}
              onValueChange={handleValueChange}
              onLockToggle={handleLockToggle}
              suffix="%"
              isRecalculated={recalculatedKeys.has("conversionRate")}
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <MetricCard
              metric={metrics.sales}
              metricKey="sales"
              title={titleMap.sales}
              onValueChange={handleValueChange}
              onLockToggle={handleLockToggle}
              isRecalculated={recalculatedKeys.has("sales")}
            />
          </div>
        </div>
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <div className="card-label fw-bolder fs-3 mb-1">
              Custos e ticket médio
            </div>
            <div className="text-muted mt-1 fw-bold fs-7">
              Custo benefício da sua estratégia
            </div>
          </h3>
        </div>
        <div className="row g-5 gx-xxl-8 mb-10">
          <div className="col-md-6 col-lg-6">
            <MetricCard
              metric={metrics.cpa}
              metricKey="cpa"
              title={titleMap.cpa}
              onValueChange={handleValueChange}
              onLockToggle={handleLockToggle}
              prefix="R$"
              isRecalculated={recalculatedKeys.has("cpa")}
            />
          </div>
          <div className="col-md-6 col-lg-6">
            <MetricCard
              metric={metrics.avgTicket}
              metricKey="avgTicket"
              title={titleMap.avgTicket}
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
              Resultados Financeiros
            </div>
            <div className="text-muted mt-1 fw-bold fs-7">
              O impacto final da sua estratégia completa
            </div>
          </h3>
        </div>
        <div className="row g-5 gx-xxl-8 mb-10">
          
          <div className="col-md-6 col-lg-3">
            <MetricCard
              metric={metrics.grossRevenue}
              metricKey="grossRevenue"
              title={titleMap.grossRevenue}
              onValueChange={handleValueChange}
              onLockToggle={handleLockToggle}
              prefix="R$"
              isRecalculated={recalculatedKeys.has("grossRevenue")}
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <MetricCard
              metric={metrics.roas}
              metricKey="roas"
              title={titleMap.roas}
              onValueChange={handleValueChange}
              onLockToggle={handleLockToggle}
              suffix="x"
              isRecalculated={recalculatedKeys.has("roas")}
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <MetricCard
              metric={metrics.profitMargin}
              metricKey="profitMargin"
              title={titleMap.profitMargin}
              onValueChange={handleValueChange}
              onLockToggle={handleLockToggle}
              suffix="%"
              isRecalculated={recalculatedKeys.has("profitMargin")}
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <MetricCard
              metric={metrics.netRevenue}
              metricKey="netRevenue"
              title={titleMap.netRevenue}
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

  useEffect(() => {}, [dispatch, me.me?.id]);

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
          <h5>Erro:</h5> <pre>{JSON.stringify(ideaction.error, null, 2)}</pre>
        </Alert>
      )}
      <RoasplannerPage />
    </>
  );
};

export default Roasplanner;
