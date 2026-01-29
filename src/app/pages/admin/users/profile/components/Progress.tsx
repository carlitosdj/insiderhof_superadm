import { useEffect, useState } from "react";
import { User } from "../../../../../../store/ducks/me/types";
import _ from "lodash";

import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
momentDurationFormatSetup(moment);

type progressProps = {
  user: User;
};

export function Progress({ user }: progressProps) {
  //const { image, name, email, completed } = user;
  const [array, setArray] = useState<any>([]);

  //const { id } = useParams();
  useEffect(() => {
    //console.log("USERS****************", users);
    //if (user.id === +id!) {
    //console.log("asdasdasd: ", users.user.id);

    //console.log("VER AQUI ****************", user.completed);
    const sort = _.orderBy(
      user.completed,
      ["class.module.product.order", "class.order", "class.id"],
      ["desc", "asc", "asc"]
    );


    const group: any = _.groupBy(sort, "class.module.product.id");
    let groupArray: any = Object.keys(group).map((key) => group[key]);
    console.log("groupArray", groupArray);
    setArray(groupArray);
    //}
  }, [user.id]);



  return (
    <div className="row g-5 g-xxl-8">
      <div className="col-xl-12">
        <div className={`card mb-5 mb-xxl-8`}>
          <div className="card-header align-items-center border-0 mt-4">
            <h3 className="card-title align-items-start flex-column">
              <span className="fw-bold mb-2 text-gray-900">
                Relação de aulas assistidas
              </span>
              <span className="text-muted fw-semibold fs-7">
                Dados coletados pela plataforma
              </span>
            </h3>
          </div>
          {/* end::Header */}
          {/* begin::Body */}
          <div className="card-body pt-5">
            {array.map((course: any, i: number) => (
              <div key={i}>
                <h2 className="pt-5 pb-5">
                  {course[0].class.module.product.name}
                </h2>

                <div className="col-xxl-12">
                  <div className="table-responsive">
                    <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                      <thead>
                        <tr className="fw-bolder text-muted">
                          <th className="min-w-150px">Módulo</th>
                          <th className="min-w-200px">Aula</th>
                          <th className="min-w-100px">CreatedAt</th>
                          <th className="min-w-100px">UpdatedAt</th>
                          <th className="min-w-50px">Duração</th>
                          <th className="min-w-140px">Visto</th>
                          <th className="min-w-140px">%</th>
                          <th className="min-w-140px">✩</th>
                        </tr>
                      </thead>

                      <tbody>
                        {course.map((aula: any, index: number) => (
                          <tr key={index}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="d-flex justify-content-start flex-column">
                                  {aula.class.module.name}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="d-flex justify-content-start flex-column">
                                  {aula.class.name}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="d-flex justify-content-start flex-column">
                                  {moment(aula.createdAt).utc().format("DD/MM/YY HH:mm")}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="d-flex justify-content-start flex-column">
                                  {moment(aula.updatedAt).utc().format("DD/MM/YY HH:mm")}
                                </div>
                              </div>
                            </td>
                            <td>
                              {moment.duration(
                                aula.class?.duration,
                                "seconds"
                              ).format("hh:mm:ss", {
                                trim: false,
                              })}
                            </td>
                            <td>
                              {moment.duration(
                                aula.timeWatched,
                                "seconds"
                              ).format("hh:mm:ss", {
                                trim: false,
                              })}
                            </td>
                            <td>
                              {Math.round(
                                (aula?.timeWatched! /
                                  aula.component?.duration) *
                                  100
                              ) <= 50 ? (
                                <span className="text-danger">
                                  {Math.round(
                                    (aula?.timeWatched! /
                                      aula.class?.duration) *
                                      100
                                  )}
                                  %
                                </span>
                              ) : (
                                <span className="text-success">
                                  {Math.round(
                                    (aula?.timeWatched! /
                                      aula.class?.duration) *
                                      100
                                  )}
                                  %
                                </span>
                              )}
                            </td>
                            <td>
                              {aula.rate === 0 || aula.rate === null ? (
                                "-"
                              ) : aula.rate! <= 3 ? (
                                <span className="text-danger">{aula.rate}</span>
                              ) : (
                                <span className="text-success">
                                  {aula.rate}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
