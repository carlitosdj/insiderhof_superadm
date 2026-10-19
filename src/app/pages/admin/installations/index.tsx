import { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Content } from "../../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";
import SuperAdminGuard from "../../../guards/SuperAdminGuard";
import Loading from "../../../loading";
import { getTenantFileUrl } from "../../../../utils/getApiUrl";
import {
  getInstallationsSummary,
  getTenantInstallations,
  PaginatedInstallations,
  PwaInstallation,
  TenantInstallationsSummary,
} from "../../../../services/pwaInstallationsService";

const PAGE_SIZE = 20;

const PLATFORM_LABELS: Record<PwaInstallation["platform"], string> = {
  android: "Android",
  ios: "iPhone",
  ipados: "iPad",
  windows: "Windows",
  macos: "Mac",
  linux: "Linux",
  outro: "Outro",
};

const formatDate = (value: string) =>
  new Date(value).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });

/** Quem instalou o app do aluno (PWA), por tenant. Dados: api/src/pwa (pwa_installation). */
const InstallationsPage: FC = () => {
  const [summary, setSummary] = useState<TenantInstallationsSummary[] | null>(null);
  const [activeWindowDays, setActiveWindowDays] = useState(30);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<TenantInstallationsSummary | null>(null);

  useEffect(() => {
    getInstallationsSummary()
      .then((result) => {
        setSummary(result.tenants);
        setActiveWindowDays(result.activeWindowDays);
      })
      .catch((err) => setError(err.response?.data?.message || "Erro ao carregar as instalações"));
  }, []);

  if (!summary && !error) return <Loading />;

  return (
    <>
      <ToolbarWrapper />
      <Content>
        <div className="alert alert-light-primary d-flex flex-column gap-1 mb-6 fs-7">
          <strong>Como ler estes números</strong>
          <span>
            Cada aparelho conta como uma instalação (celular e computador do mesmo aluno aparecem duas vezes).
            "Ativo" = usou o app instalado nos últimos {activeWindowDays} dias.
          </span>
          <span>
            Desinstalar não é detectável por nenhum navegador. No iPhone/iPad o aluno só aparece quando abre o app
            pelo ícone (o iOS não avisa a instalação).
          </span>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {summary && (
          <div className="card mb-6">
            <div className="card-header border-0 pt-5">
              <h3 className="card-title fw-bold fs-3">Apps instalados por tenant</h3>
            </div>
            <div className="card-body py-3">
              <div className="table-responsive">
                <table className="table table-row-dashed align-middle gs-0 gy-3">
                  <thead>
                    <tr className="fw-bold text-muted fs-7">
                      <th>Tenant</th>
                      <th className="text-end">Instalações</th>
                      <th className="text-end">Alunos</th>
                      <th className="text-end">Ativos ({activeWindowDays}d)</th>
                      <th className="text-end">Celular/tablet</th>
                      <th className="text-end">Computador</th>
                      <th className="text-end">Android</th>
                      <th className="text-end">iPhone/iPad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.map((row) => (
                      <tr
                        key={row.tenantId}
                        role="button"
                        className={selected?.tenantId === row.tenantId ? "bg-light-primary" : undefined}
                        onClick={() => setSelected(row)}
                      >
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            {row.logoMini && (
                              <img
                                src={getTenantFileUrl(row.logoMini, row)}
                                alt=""
                                className="h-25px w-25px object-fit-contain"
                              />
                            )}
                            <span className="fw-semibold">{row.tenantName}</span>
                          </div>
                        </td>
                        <td className="text-end fw-bold">{row.total}</td>
                        <td className="text-end">{row.students}</td>
                        <td className="text-end">{row.active}</td>
                        <td className="text-end">{row.mobile}</td>
                        <td className="text-end">{row.desktop}</td>
                        <td className="text-end">{row.android}</td>
                        <td className="text-end">{row.ios}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {selected && <TenantInstallationsList tenant={selected} />}
      </Content>
    </>
  );
};

/** Quem instalou num tenant: busca por nome/e-mail e paginação */
const TenantInstallationsList: FC<{ tenant: TenantInstallationsSummary }> = ({ tenant }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<PaginatedInstallations | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPage(1);
    setSearch("");
    setQuery("");
  }, [tenant.tenantId]);

  useEffect(() => {
    setLoading(true);
    getTenantInstallations(tenant.tenantId, { page, take: PAGE_SIZE, search: query || undefined })
      .then(setResult)
      .catch(() => setResult(null))
      .finally(() => setLoading(false));
  }, [tenant.tenantId, page, query]);

  const totalPages = result ? Math.max(1, Math.ceil(result.total / result.take)) : 1;

  return (
    <div className="card">
      <div className="card-header border-0 pt-5 flex-wrap gap-3">
        <h3 className="card-title fw-bold fs-3">Quem instalou — {tenant.tenantName}</h3>
        <form
          className="d-flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            setPage(1);
            setQuery(search.trim());
          }}
        >
          <input
            type="search"
            className="form-control form-control-sm form-control-solid w-250px"
            placeholder="Buscar por nome ou e-mail"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button type="submit" className="btn btn-sm btn-light-primary">
            Buscar
          </button>
        </form>
      </div>
      <div className="card-body py-3">
        {loading && <div className="text-muted py-5">Carregando…</div>}
        {!loading && (!result || result.data.length === 0) && (
          <div className="text-muted py-5">Nenhuma instalação registrada{query ? " para esta busca" : ""}.</div>
        )}
        {!loading && result && result.data.length > 0 && (
          <>
            <div className="table-responsive">
              <table className="table table-row-dashed align-middle gs-0 gy-3">
                <thead>
                  <tr className="fw-bold text-muted fs-7">
                    <th>Aluno</th>
                    <th>Aparelho</th>
                    <th>Instalado em</th>
                    <th>Último uso</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {result.data.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="fw-semibold">{item.userName || `Aluno #${item.userId}`}</div>
                        <div className="text-muted fs-7">{item.userEmail}</div>
                      </td>
                      <td>
                        <div>{PLATFORM_LABELS[item.platform] ?? item.platform}</div>
                        <div className="text-muted fs-7">
                          {item.deviceClass === "mobile" ? "Celular/tablet" : "Computador"}
                          {item.browser ? ` · ${item.browser}` : ""}
                        </div>
                      </td>
                      <td className="fs-7">{formatDate(item.firstSeenAt)}</td>
                      <td className="fs-7">{formatDate(item.lastSeenAt)}</td>
                      <td>
                        <span className={`badge ${item.active ? "badge-light-success" : "badge-light"}`}>
                          {item.active ? "Ativo" : "Inativo"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-between align-items-center py-3 fs-7 text-muted">
              <span>
                {result.total} instalação(ões) · página {result.page} de {totalPages}
              </span>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-light"
                  disabled={page <= 1}
                  onClick={() => setPage((current) => current - 1)}
                >
                  Anterior
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-light"
                  disabled={page >= totalPages}
                  onClick={() => setPage((current) => current + 1)}
                >
                  Próxima
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Installations: FC = () => (
  <SuperAdminGuard>
    <PageTitle breadcrumbs={[]}>Apps instalados</PageTitle>
    <InstallationsPage />
  </SuperAdminGuard>
);

export default Installations;
