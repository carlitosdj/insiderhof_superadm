import React, { FC, useEffect } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import Loading from "../../../loading";
import { ManageEventsWidget } from "./ManageEventsWidget";
import { EventsState } from "../../../../store/ducks/events/types";
import { loadEventsRequest } from "../../../../store/ducks/events/actions";
import { Content } from "../../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";

type Props = {
  events: EventsState;
};

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({ events }) => (
  <>
    <ToolbarWrapper />
    <Content>
      {/* begin::Row */}
      <div className="row g-5 gx-xxl-12">
        <div className="col-xxl-12">
          <ManageEventsWidget
            events={events}
            className="card-xxl-stretch mb-5 mb-xxl-8"
          />
        </div>
      </div>
      {/* end::Row */}
    </Content>
  </>
);

const ManageEvents: FC<React.PropsWithChildren<unknown>> = () => {
  const dispatch = useDispatch();
  const events = useSelector((state: ApplicationState) => state.events);
  const currentProject = useSelector((state: ApplicationState) => state.projects.currentProject);

  useEffect(() => {
    // Carregar eventos do projeto atual
    if (currentProject && currentProject.id) {
      dispatch(loadEventsRequest(currentProject.id, {}));
    }
  }, [dispatch, currentProject?.id]);

  if (events.loading) return <Loading />;

  return (
    <>
      <PageTitle breadcrumbs={[]}>Eventos Presenciais</PageTitle>
      <ManagePage events={events} />
    </>
  );
};

export default ManageEvents;
