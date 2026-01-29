import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store";
import { loadTicketsByEventRequest, setSelectedTicket } from "../../../store/ducks/eventtickets/actions";
import { EventTicket } from "../../../store/ducks/eventtickets/types";
import { KTIcon } from "../../../_metronic/helpers";
import UpdateTicketModal from "./UpdateTicketModal";
import CheckinModal from "./CheckinModal";
import TicketDetailsModal from "./TicketDetailsModal";

import moment from "moment";

interface TicketsListProps {
  eventId: number;
}

const TicketsList: React.FC<TicketsListProps> = ({ eventId }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTicketForEdit, setSelectedTicketForEdit] = useState<EventTicket | null>(null);
  const [showCheckinModal, setShowCheckinModal] = useState(false);
  const [selectedTicketForCheckin, setSelectedTicketForCheckin] = useState<EventTicket | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTicketForDetails, setSelectedTicketForDetails] = useState<EventTicket | null>(null);

  const tickets = useSelector((state: ApplicationState) => state.eventtickets.data);
  const loading = useSelector((state: ApplicationState) => state.eventtickets.loading);

  useEffect(() => {
    if (eventId) {
      const filters: any = {};
      if (filterType) filters.type = filterType;
      if (filterStatus) filters.status = filterStatus;
      dispatch(loadTicketsByEventRequest(eventId, filters));
    }
  }, [dispatch, eventId, filterType, filterStatus]);

  const filteredTickets = tickets.filter((ticket) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      ticket.ticketCode?.toLowerCase().includes(searchLower) ||
      ticket.user?.name?.toLowerCase().includes(searchLower) ||
      ticket.user?.email?.toLowerCase().includes(searchLower)
    );
  });

  const getTicketTypeBadge = (type?: string) => {
    switch (type) {
      case "vip":
        return "badge-light-warning";
      case "normal":
        return "badge-light-primary";
      case "student":
        return "badge-light-info";
      case "press":
        return "badge-light-success";
      case "staff":
        return "badge-light-dark";
      case "sponsor":
        return "badge-light-danger";
      default:
        return "badge-light-secondary";
    }
  };

  const getTicketTypeText = (type?: string) => {
    switch (type) {
      case "vip":
        return "VIP";
      case "normal":
        return "Normal";
      case "student":
        return "Estudante";
      case "press":
        return "Imprensa";
      case "staff":
        return "Staff";
      case "sponsor":
        return "Patrocinador";
      default:
        return type || "-";
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "active":
        return "badge-light-success";
      case "pending":
        return "badge-light-warning";
      case "cancelled":
        return "badge-light-danger";
      case "transferred":
        return "badge-light-info";
      case "used":
        return "badge-light-secondary";
      default:
        return "badge-light-secondary";
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "pending":
        return "Pendente";
      case "cancelled":
        return "Cancelado";
      case "transferred":
        return "Transferido";
      case "used":
        return "Usado";
      default:
        return status || "-";
    }
  };

  const handleViewDetails = (ticket: EventTicket) => {
    setSelectedTicketForDetails(ticket);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedTicketForDetails(null);
  };

  const handleEditTicket = (ticket: EventTicket) => {
    setSelectedTicketForEdit(ticket);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedTicketForEdit(null);
  };

  const handleCheckinTicket = (ticket: EventTicket) => {
    setSelectedTicketForCheckin(ticket);
    setShowCheckinModal(true);
  };

  const handleCloseCheckinModal = () => {
    setShowCheckinModal(false);
    setSelectedTicketForCheckin(null);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Filtros */}
      <div className="card mb-5">
        <div className="card-body">
          <div className="row g-3">
            {/* Busca */}
            <div className="col-md-4">
              <div className="d-flex align-items-center position-relative">
                <KTIcon iconName="magnifier" className="fs-1 position-absolute ms-6" />
                <input
                  type="text"
                  className="form-control form-control-solid ps-14"
                  placeholder="Buscar por código, nome ou email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Filtro por Tipo */}
            <div className="col-md-3">
              <select
                className="form-select form-select-solid"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="">Todos os tipos</option>
                <option value="vip">VIP</option>
                <option value="normal">Normal</option>
                <option value="student">Estudante</option>
                <option value="press">Imprensa</option>
                <option value="staff">Staff</option>
                <option value="sponsor">Patrocinador</option>
              </select>
            </div>

            {/* Filtro por Status */}
            <div className="col-md-3">
              <select
                className="form-select form-select-solid"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">Todos os status</option>
                <option value="active">Ativo</option>
                <option value="pending">Pendente</option>
                <option value="cancelled">Cancelado</option>
                <option value="transferred">Transferido</option>
                <option value="used">Usado</option>
              </select>
            </div>

            {/* Botão Limpar Filtros */}
            <div className="col-md-2">
              <button
                className="btn btn-light-primary w-100"
                onClick={() => {
                  setSearch("");
                  setFilterType("");
                  setFilterStatus("");
                }}
              >
                <KTIcon iconName="filter-search" className="fs-3 me-2" />
                Limpar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela */}
      <div className="card">
        <div className="card-header border-0 pt-6">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bold text-gray-800">
              Tickets do Evento
            </span>
            <span className="text-muted mt-1 fw-semibold fs-7">
              {filteredTickets.length} ticket(s) encontrado(s)
            </span>
          </h3>
        </div>

        <div className="card-body py-3">
          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="min-w-100px">CÓDIGO</th>
                  <th className="min-w-150px">USUÁRIO</th>
                  <th className="min-w-100px">TIPO</th>
                  <th className="min-w-100px">STATUS</th>
                  <th className="min-w-100px">RSVP</th>
                  <th className="min-w-100px">CHECK-IN</th>
                  <th className="min-w-100px">CRIADO EM</th>
                  <th className="min-w-100px text-end">AÇÕES</th>
                </tr>
              </thead>

              <tbody>
                {filteredTickets.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center text-muted py-10">
                      Nenhum ticket encontrado
                    </td>
                  </tr>
                )}

                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id}>
                    {/* Código */}
                    <td>
                      <span className="text-gray-800 fw-bold d-block fs-6">
                        {ticket.ticketCode || "-"}
                      </span>
                      <span className="text-muted fw-semibold d-block fs-7">
                        #{ticket.ticketNumber || "-"}
                      </span>
                    </td>

                    {/* Usuário */}
                    <td>
                      <div className="d-flex flex-column">
                        <span className="text-gray-800 fw-bold mb-1 fs-6">
                          {ticket.user?.name || "-"}
                        </span>
                        <span className="text-muted fs-7">
                          {ticket.user?.email || "-"}
                        </span>
                      </div>
                    </td>

                    {/* Tipo */}
                    <td>
                      <span className={`badge ${getTicketTypeBadge(ticket.type)}`}>
                        {getTicketTypeText(ticket.type)}
                      </span>
                    </td>

                    {/* Status */}
                    <td>
                      <span className={`badge ${getStatusBadge(ticket.status)}`}>
                        {getStatusText(ticket.status)}
                      </span>
                    </td>

                    {/* RSVP */}
                    <td>
                      {ticket.rsvp ? (
                        <div className="d-flex flex-column">
                          {(ticket.rsvp as any).status === 'confirmed' ? (
                            <>
                              <span className="badge badge-light-success mb-1">
                                <KTIcon iconName="check-circle" className="fs-4 me-1" />
                                Confirmado
                              </span>
                              <span className="text-muted fs-7">
                                {moment((ticket.rsvp as any).confirmedAt).format("DD/MM/YYYY HH:mm")}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="badge badge-light-danger mb-1">
                                <KTIcon iconName="cross-circle" className="fs-4 me-1" />
                                Recusado
                              </span>
                              <span className="text-muted fs-7">
                                {moment((ticket.rsvp as any).confirmedAt).format("DD/MM/YYYY HH:mm")}
                              </span>
                            </>
                          )}
                        </div>
                      ) : (
                        <span className="badge badge-light-secondary">
                          <KTIcon iconName="information" className="fs-4 me-1" />
                          Sem resposta
                        </span>
                      )}
                    </td>

                    {/* Check-in */}
                    <td>
                      {ticket.checkin ? (
                        <div className="d-flex flex-column">
                          <span className="badge badge-light-success mb-1">
                            <KTIcon iconName="check" className="fs-4 me-1" />
                            Realizado
                          </span>
                          <span className="text-muted fs-7">
                            {moment(ticket.checkin.checkinAt).format("DD/MM/YYYY HH:mm")}
                          </span>
                        </div>
                      ) : (
                        <span className="badge badge-light-warning">
                          <KTIcon iconName="cross" className="fs-4 me-1" />
                          Pendente
                        </span>
                      )}
                    </td>

                    {/* Criado em */}
                    <td>
                      <span className="text-muted fw-semibold d-block fs-7">
                        {ticket.createdAt
                          ? moment(ticket.createdAt).format("DD/MM/YYYY HH:mm")
                          : "-"}
                      </span>
                    </td>

                    {/* Ações */}
                    <td>
                      <div className="d-flex justify-content-end flex-shrink-0">
                        <button
                          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                          onClick={() => handleViewDetails(ticket)}
                          title="Ver Detalhes"
                        >
                          <KTIcon iconName="eye" className="fs-3" />
                        </button>

                        <button
                          className="btn btn-icon btn-bg-light btn-active-color-warning btn-sm me-1"
                          onClick={() => handleEditTicket(ticket)}
                          title="Editar Ticket"
                        >
                          <KTIcon iconName="pencil" className="fs-3" />
                        </button>

                        <button
                          className="btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1"
                          title="Check-in / Validar Ticket"
                          onClick={() => handleCheckinTicket(ticket)}
                        >
                          <KTIcon iconName="verify" className="fs-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Update Ticket Modal */}
      <UpdateTicketModal
        show={showEditModal}
        onHide={handleCloseEditModal}
        ticket={selectedTicketForEdit}
      />

      {/* Checkin Modal */}
      <CheckinModal
        show={showCheckinModal}
        onHide={handleCloseCheckinModal}
        ticket={selectedTicketForCheckin}
      />

      {/* Ticket Details Modal */}
      <TicketDetailsModal
        show={showDetailsModal}
        onHide={handleCloseDetailsModal}
        ticket={selectedTicketForDetails}
      />
    </div>
  );
};

export default TicketsList;
