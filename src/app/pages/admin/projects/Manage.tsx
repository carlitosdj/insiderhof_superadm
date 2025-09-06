import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Alert } from "react-bootstrap";
import { Content } from "../../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";

import Loading from "../../../loading";
import { Project } from "../../../../store/ducks/projects/types";
import * as projectActions from "../../../../store/ducks/projects/actions";
import { ManageProjectsWidget } from "./ManageProjectsWidget";

type Props = {
  projects: Project[];
};

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({ projects }) => (
  <>
    <ToolbarWrapper />
    <Content>
      <div className="row g-5 gx-xxl-12">
        <div className="col-xxl-12">
          {projects && <ManageProjectsWidget
            projects={projects}
            className="card-xxl-stretch mb-5 mb-xxl-8"
          />}
        </div>
      </div>
    </Content>
  </>
);

const Manage: FC<React.PropsWithChildren<unknown>> = () => {
  const dispatch = useDispatch();
  const me = useSelector((state: ApplicationState) => state.me);
  const projects = useSelector((state: ApplicationState) => state.projects);

  useEffect(() => {
    console.log('=== Manage useEffect ===');
    console.log('me.me:', me.me);
    console.log('me.me.id:', me.me?.id);
    if (me.me && me.me.id) {
      console.log('Disparando loadProjectsRequest');
      dispatch(projectActions.loadProjectsRequest());
    }
  }, [dispatch, me.me?.id]);

  console.log("projects", projects);
  console.log('=== Fim Manage useEffect ===');
  //if (projects.managementLoading) return <Loading />;
  if (projects.loading) return <Loading />;

  return (
    <>
      <PageTitle
        breadcrumbs={[
          {
            title: 'GERENCIAR PROJETOS',
            path: "/projects/manage",
            isSeparator: false,
            isActive: false,
          },
        ]}
      />
      
      {projects.error && (
        <Alert variant="danger">{JSON.stringify(projects.error)}</Alert>
      )}
      <ManagePage projects={projects.projects || []} />
    </>
  );
};

export default Manage;