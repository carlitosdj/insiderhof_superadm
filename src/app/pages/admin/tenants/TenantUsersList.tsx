import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";
import { TenantUser } from "../../../../store/ducks/tenants/types";
import {
  updateTenantUserRequest,
  removeTenantUserRequest,
} from "../../../../store/ducks/tenants/actions";

interface TenantUsersListProps {
  tenantId: number;
  users: TenantUser[];
  onAddUser: () => void;
}

const TenantUsersList: React.FC<TenantUsersListProps> = ({
  tenantId,
  users,
  onAddUser,
}) => {
  const dispatch = useDispatch();

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'owner':
        return <span className="badge badge-primary">Owner</span>;
      case 'admin':
        return <span className="badge badge-success">Admin</span>;
      case 'member':
        return <span className="badge badge-info">Membro</span>;
      case 'viewer':
        return <span className="badge badge-secondary">Visualizador</span>;
      default:
        return <span className="badge badge-light">{role}</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="badge badge-light-success">Ativo</span>;
      case 'inactive':
        return <span className="badge badge-light-secondary">Inativo</span>;
      case 'pending':
        return <span className="badge badge-light-warning">Pendente</span>;
      default:
        return <span className="badge badge-light">{status}</span>;
    }
  };

  const handleChangeRole = (userId: number, newRole: string) => {
    if (window.confirm(`Tem certeza que deseja alterar a role deste usuário para ${newRole}?`)) {
      dispatch(
        updateTenantUserRequest(tenantId, userId, {
          role: newRole as 'owner' | 'admin' | 'member' | 'viewer',
        })
      );
    }
  };

  const handleRemoveUser = (userId: number) => {
    if (window.confirm('Tem certeza que deseja remover este usuário do tenant?')) {
      dispatch(removeTenantUserRequest(tenantId, userId));
    }
  };

  return (
    <div className="card">
      <div className="card-header border-0 pt-6">
        <div className="card-title">
          <h3 className="fw-bold m-0">Usuários do Tenant</h3>
        </div>
        <div className="card-toolbar">
          <button
            type="button"
            className="btn btn-sm btn-light-primary"
            onClick={onAddUser}
          >
            <KTIcon iconName="plus" className="fs-2" />
            Adicionar Usuário
          </button>
        </div>
      </div>

      <div className="card-body py-4">
        <div className="table-responsive">
          <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            <thead>
              <tr className="fw-bold text-muted">
                <th className="min-w-200px">Usuário</th>
                <th className="min-w-100px">Role</th>
                <th className="min-w-100px">Status</th>
                <th className="min-w-150px">Adicionado em</th>
                <th className="min-w-100px text-end">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10">
                    <div className="text-muted">Nenhum usuário encontrado</div>
                  </td>
                </tr>
              ) : (
                users.map((tenantUser) => (
                  <tr key={tenantUser.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-45px me-5">
                          <div className="symbol-label fs-3 bg-light-primary text-primary">
                            {tenantUser.user?.name?.charAt(0).toUpperCase() || 'U'}
                          </div>
                        </div>
                        <div className="d-flex justify-content-start flex-column">
                          <span className="text-gray-900 fw-bold fs-6">
                            {tenantUser.user?.name || 'Usuário sem nome'}
                          </span>
                          <span className="text-muted fw-semibold d-block fs-7">
                            {tenantUser.user?.email || '-'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{getRoleBadge(tenantUser.role)}</td>
                    <td>{getStatusBadge(tenantUser.status)}</td>
                    <td>
                      <span className="text-muted fw-semibold">
                        {tenantUser.createdAt
                          ? new Date(tenantUser.createdAt).toLocaleDateString('pt-BR')
                          : '-'}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex justify-content-end flex-shrink-0">
                        <div className="dropdown">
                          <button
                            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <KTIcon iconName="dots-horizontal" className="fs-3" />
                          </button>
                          <ul className="dropdown-menu">
                            {tenantUser.role !== 'owner' && (
                              <>
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleChangeRole(tenantUser.userId, 'admin')}
                                  >
                                    Tornar Admin
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleChangeRole(tenantUser.userId, 'member')}
                                  >
                                    Tornar Membro
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleChangeRole(tenantUser.userId, 'viewer')}
                                  >
                                    Tornar Visualizador
                                  </button>
                                </li>
                                <li>
                                  <hr className="dropdown-divider" />
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item text-danger"
                                    onClick={() => handleRemoveUser(tenantUser.userId)}
                                  >
                                    Remover do Tenant
                                  </button>
                                </li>
                              </>
                            )}
                            {tenantUser.role === 'owner' && (
                              <li>
                                <span className="dropdown-item text-muted">
                                  Owner não pode ser removido
                                </span>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TenantUsersList;
