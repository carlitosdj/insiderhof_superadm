/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { KTIcon } from "../../../../_metronic/helpers";
import { useDispatch } from "react-redux";
import { EventsState, Event } from "../../../../store/ducks/events/types";
import { deleteEventRequest } from "../../../../store/ducks/events/actions";
import Create from "./create";
import Update from "./update";

const MOMENT = require("moment");
import "moment-timezone";

type Props = {
  className: string;
  events: EventsState;
};

const ManageEventsWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  events,
}) => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [child, setChild] = useState<Event | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
  };

  const viewDashboard = (event: Event) => {
    navigate(`/events/${event.id}`);
  };

  const createEvent = () => {
    setAction("createEvent");
    setShow(true);
  };

  const updateEvent = (event: Event) => {
    setAction("editEvent");
    setShow(true);
    setChild(event);
  };

  const deleteEvent = (event: Event) => {
    console.log("deletar", event.id);
    dispatch(deleteEventRequest(event.id!));
  };

  const searchEvent = () => {
    // TODO: Implementar busca
    console.log("search", search);
  };

  const filteredEvents = events.data.filter((event) => {
    if (!search) return true;
    return (
      event.name?.toLowerCase().includes(search.toLowerCase()) ||
      event.description?.toLowerCase().includes(search.toLowerCase()) ||
      event.location?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div>
      <Modal size="xl" show={show} onHide={handleClose}>
        <div className="modal-header">
          <h2>
            {action === "editEvent" ? "Editar Evento" : ""}
            {action === "createEvent" ? "Criar Novo Evento" : ""}
          </h2>
          <div
            className="btn btn-sm btn-icon btn-active-color-primary"
            onClick={handleClose}
          >
            <KTIcon className="fs-1" iconName="cross" />
          </div>
        </div>
        <div className="modal-body py-lg-10 px-lg-10">
          {action === "editEvent" && child && (
            <Update handleClose={handleClose} child={child} />
          )}
          {action === "createEvent" && <Create handleClose={handleClose} />}
        </div>
      </Modal>

      {events.error && (
        <div className="alert alert-danger">
          {JSON.stringify(events.error.message)}
        </div>
      )}

      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className="card-header border-0 pt-5">
          <div className="card-title">
            {/* begin::Search */}
            <div className="d-flex align-items-center position-relative my-1">
              <KTIcon
                iconName="magnifier"
                className="fs-1 position-absolute ms-6"
              />
              <input
                type="text"
                data-kt-table-filter="search"
                className="form-control form-control-solid w-250px ps-14"
                placeholder="Pesquisar eventos..."
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
                onKeyDownCapture={(e: any) => {
                  if (e.key === "Enter") searchEvent();
                }}
              />
            </div>
            {/* end::Search */}
          </div>
          <div className="card-toolbar">
            <div
              className="d-flex justify-content-end align-items-center"
              data-kt-table-toolbar="base"
            >
              {/* begin::Add event */}
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => createEvent()}
              >
                <KTIcon iconName="plus" className="fs-2" />
                Novo Evento
              </button>
              {/* end::Add event */}
            </div>
          </div>
        </div>
        {/* end::Header */}

        {/* begin::Body */}
        <div className="card-body py-3">
          {/* begin::Table container */}
          <div className="table-responsive">
            {/* begin::Table */}
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              {/* begin::Table head */}
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="min-w-150px">EVENTO</th>
                  <th className="min-w-100px">DATA/HORA</th>
                  <th className="min-w-100px">LOCAL</th>
                  <th className="min-w-80px">STATUS</th>
                  <th className="min-w-80px">INGRESSOS</th>
                  <th className="min-w-80px">CHECK-INS</th>
                  <th className="min-w-100px text-end">AÇÕES</th>
                </tr>
              </thead>
              {/* end::Table head */}

              {/* begin::Table body */}
              <tbody>
                {filteredEvents.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center text-muted py-10">
                      Nenhum evento encontrado
                    </td>
                  </tr>
                )}

                {filteredEvents.map((event, index) => {
                  const eventDate = event.startDate
                    ? MOMENT(event.startDate).format("DD/MM/YYYY HH:mm") +
                      (event.endDate && MOMENT(event.startDate).format("DD/MM/YYYY") !== MOMENT(event.endDate).format("DD/MM/YYYY")
                        ? " - " + MOMENT(event.endDate).format("DD/MM/YYYY HH:mm")
                        : "")
                    : "-";

                  const getStatusBadge = (status: string) => {
                    switch (status) {
                      case "draft":
                        return "badge-light-secondary";
                      case "open":
                        return "badge-light-primary";
                      case "full":
                        return "badge-light-warning";
                      case "closed":
                        return "badge-light-secondary";
                      case "in_progress":
                        return "badge-light-info";
                      case "finished":
                        return "badge-light-success";
                      case "cancelled":
                        return "badge-light-danger";
                      default:
                        return "badge-light-secondary";
                    }
                  };

                  const getStatusText = (status: string) => {
                    switch (status) {
                      case "draft":
                        return "Rascunho";
                      case "open":
                        return "Aberto";
                      case "full":
                        return "Lotado";
                      case "closed":
                        return "Fechado";
                      case "in_progress":
                        return "Em Andamento";
                      case "finished":
                        return "Finalizado";
                      case "cancelled":
                        return "Cancelado";
                      default:
                        return status;
                    }
                  };

                  return (
                    <tr key={index}>
                      <td>
                        <div className="d-flex flex-column">
                          <a
                            href="#"
                            onClick={() => updateEvent(event)}
                            className="text-gray-800 text-hover-primary fw-bold mb-1 fs-6"
                          >
                            {event.name}
                          </a>
                          <span className="text-muted text-sm">
                            {event.description?.substring(0, 60)}
                            {event.description && event.description.length > 60
                              ? "..."
                              : ""}
                          </span>
                        </div>
                      </td>

                      <td>
                        <span className="text-gray-800 fw-bold d-block fs-7">
                          {eventDate}
                        </span>
                      </td>

                      <td>
                        <span className="text-muted fw-bold d-block fs-7">
                          {event.location || "-"}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`badge ${getStatusBadge(
                            event.status || "draft"
                          )}`}
                        >
                          {getStatusText(event.status || "draft")}
                        </span>
                      </td>

                      <td>
                        <span className="badge badge-light-info">
                          {event.tickets?.length || 0} / {event.capacity || 0}
                        </span>
                      </td>

                      <td>
                        <span className="badge badge-light-success">
                          -
                        </span>
                      </td>

                      <td>
                        <div className="d-flex justify-content-end flex-shrink-0">
                          <button
                            className="btn btn-icon btn-bg-light btn-active-color-info btn-sm me-1"
                            onClick={() => viewDashboard(event)}
                            title="Ver Dashboard"
                          >
                            <KTIcon iconName="chart-simple" className="fs-3" />
                          </button>

                          <button
                            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                            onClick={() => updateEvent(event)}
                            title="Editar"
                          >
                            <KTIcon iconName="pencil" className="fs-3" />
                          </button>

                          <button
                            className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm"
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Deseja realmente excluir o evento "${event.name}"?`
                                )
                              )
                                deleteEvent(event);
                            }}
                            title="Remover"
                          >
                            <KTIcon iconName="trash" className="fs-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>
          {/* end::Table container */}
        </div>
        {/* end::Body */}
      </div>
    </div>
  );
};

export { ManageEventsWidget };
