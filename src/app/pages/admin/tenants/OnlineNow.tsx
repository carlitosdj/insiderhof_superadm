/**
 * "Online agora" por cliente na lista de Tenants: contagem discreta por linha e, ao clicar,
 * as miniaturas de quem está no app. Dados: GET /online/summary e /online/tenant/:id/users
 * (conexões no Redis; só super admin). Atualiza a cada 30s com a aba visível.
 */
import { FC, useCallback, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import api from "../../../../services/api";
import { Tenant } from "../../../../store/ducks/tenants/types";
import { getTenantFileUrl } from "../../../../utils/getApiUrl";

type OnlineUser = { id: number; name: string; image?: string | null; devices: string[]; since: string };

export function useOnlineSummary(): Record<number, number> {
  const [counts, setCounts] = useState<Record<number, number>>({});
  const load = useCallback(() => {
    if (document.visibilityState !== "visible") return;
    api
      .get<{ tenantId: number; count: number }[]>("online/summary")
      .then((r) => setCounts(Object.fromEntries(r.data.map((t) => [t.tenantId, t.count]))))
      .catch(() => undefined);
  }, []);
  useEffect(() => {
    load();
    const t = window.setInterval(load, 30_000);
    document.addEventListener("visibilitychange", load);
    return () => {
      window.clearInterval(t);
      document.removeEventListener("visibilitychange", load);
    };
  }, [load]);
  return counts;
}

const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");

const Face: FC<{ user: OnlineUser; tenant: Tenant }> = ({ user, tenant }) => {
  const [failed, setFailed] = useState(false);
  const src = user.image && !failed ? (user.image.startsWith("http") ? user.image : getTenantFileUrl(user.image, tenant)) : "";
  return (
    <div title={user.name} style={{ display: "grid", justifyItems: "center", gap: 6, width: 72 }}>
      <div style={{ width: 48, height: 48, borderRadius: "50%", overflow: "hidden", background: "var(--bs-gray-200)", display: "grid", placeItems: "center", fontWeight: 600, fontSize: 15, color: "var(--bs-gray-700)" }}>
        {src ? <img src={src} alt="" onError={() => setFailed(true)} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : initials(user.name)}
      </div>
      <span style={{ fontSize: 11, lineHeight: 1.2, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", maxWidth: 72 }}>
        {user.name}
      </span>
    </div>
  );
};

/** Célula da tabela: "● N" (ou "—") e o modal com as miniaturas */
export const OnlineCell: FC<{ tenant: Tenant; count?: number }> = ({ tenant, count }) => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<OnlineUser[] | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!open || !tenant.id) return;
    setUsers(null);
    api
      .get<{ count: number; users: OnlineUser[] }>(`online/tenant/${tenant.id}/users`)
      .then((r) => { setUsers(r.data.users); setTotal(r.data.count); })
      .catch(() => setUsers([]));
  }, [open, tenant.id]);

  if (!count) return <span className="text-muted fs-7">—</span>;
  return (
    <>
      <button type="button" className="btn btn-sm btn-light-success py-1 px-3 fs-7 fw-semibold" onClick={() => setOpen(true)} title="Ver quem está online">
        <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "var(--bs-success)", marginRight: 6, verticalAlign: "middle" }} />
        {count}
      </button>
      <Modal show={open} onHide={() => setOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fs-4">Online agora · {tenant.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {users === null ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }} aria-busy="true" aria-label="Carregando">
              {Array.from({ length: Math.min(count, 8) }).map((_, i) => (
                <div key={i} style={{ width: 72, display: "grid", justifyItems: "center", gap: 6 }}>
                  <div className="placeholder-glow"><span className="placeholder rounded-circle" style={{ width: 48, height: 48, display: "block" }} /></div>
                  <span className="placeholder col-10" style={{ height: 8 }} />
                </div>
              ))}
            </div>
          ) : users.length === 0 ? (
            <div className="text-muted">Ninguém online agora.</div>
          ) : (
            <>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {users.map((u) => <Face key={u.id} user={u} tenant={tenant} />)}
              </div>
              {total > users.length && <div className="text-muted fs-7 mt-4">Mostrando {users.length} de {total}.</div>}
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
