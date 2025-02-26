/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { AnnotationsState } from "../../../../store/ducks/annotations/types";
import Loading from "../../../loading";
import { Annotation } from "../../../../store/ducks/annotation/types";

type Props = {
  className: string;
  annotations: AnnotationsState;
};

const AnnotationWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  annotations,
}) => {
  const MOMENT = require("moment");
  const intl = useIntl();

  if (annotations.loading) return <Loading />;
  return (
    <>
      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bolder fs-3 mb-1">
              {/* {intl.formatMessage({id: 'MENU.SUPPORT'})} */}
              Anotações
            </span>
            <span className="text-muted mt-1 fw-bold fs-7">
              Anotações na plataforma
            </span>
          </h3>
        </div>
        <div className="card-body py-3">
          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="min-w-50px">ID</th>
                  <th className="min-w-150px">REGISTRO</th>
                  <th className="min-w-300px">ANOTAÇÃO</th>
                  <th className="min-w-300px">AULA</th>
                  <th className="min-w-200px">USUÁRIO</th>
                </tr>
              </thead>
              <tbody>
                {annotations.data.map(
                  (annotation: Annotation, index: number) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="d-flex justify-content-start flex-column">
                              {annotation.id}
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="text-muted fw-bold d-block fs-7">
                            {MOMENT(annotation.createdAt)
                              .utc()
                              .format("DD/MM/YYYY HH:mm")}
                          </span>
                        </td>
                        <td>
                          <span className="text-gray-900 fw-bold d-block fs-7">
                            {annotation.message}
                          </span>
                        </td>
                        <td>
                          <span className="text-muted fw-bold d-block fs-7">
                            {annotation.parentComponent.parent.parent.name}{" "}
                            {">"} {annotation.parentComponent.parent.name} {">"}{" "}
                            {annotation.parentComponent.name}
                          </span>
                        </td>
                        <td>
                          <span className="text-muted fw-bold d-block fs-7">
                            {annotation.parentUser.name}
                          </span>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export { AnnotationWidget };
