import React from "react";
import { useParams } from "react-router-dom";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Content } from "../../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";
import EventDashboard from "../../../components/events/EventDashboard";

const Dashboard: React.FC<{ eventId: number }> = ({ eventId }) => (
  <>
    <ToolbarWrapper />
    <Content>
      {/* begin::Row */}
      <div className="row g-5 gx-xxl-12">
        <div className="col-xxl-12">
          <EventDashboard eventId={eventId} />
        </div>
      </div>
      {/* end::Row */}
    </Content>
  </>
);

const EventDashboardPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();

  if (!eventId) {
    return (
      <>
        <PageTitle breadcrumbs={[]}>Erro</PageTitle>
        <ToolbarWrapper />
        <Content>
          <div className="alert alert-danger">
            ID do evento não encontrado na URL
          </div>
        </Content>
      </>
    );
  }

  const eventIdNumber = parseInt(eventId, 10);

  if (isNaN(eventIdNumber)) {
    return (
      <>
        <PageTitle breadcrumbs={[]}>Erro</PageTitle>
        <ToolbarWrapper />
        <Content>
          <div className="alert alert-danger">
            ID do evento inválido: {eventId}
          </div>
        </Content>
      </>
    );
  }

  return (
    <>
      <PageTitle
        breadcrumbs={[
          {
            title: "Eventos Presenciais",
            path: "/events",
            isSeparator: false,
            isActive: false,
          },
        ]}
      >
        Dashboard do Evento
      </PageTitle>
      <Dashboard eventId={eventIdNumber} />
    </>
  );
};

export default EventDashboardPage;
