import momentDurationFormatSetup from "moment-duration-format";
import { User } from "../../../../../../store/ducks/me/types";
import moment from "moment";
momentDurationFormatSetup(moment);

type commentsProps = {
  user: User;
};

export function Comments({ user }: commentsProps) {
  const { comments } = user;

  return (
    <div className="row g-5 g-xxl-8">
      <div className="col-xl-12">
        <div className={`card mb-5 mb-xxl-8`}>
          <div className="card-header align-items-center border-0 mt-4">
            <h3 className="card-title align-items-start flex-column">
              <span className="fw-bold mb-2 text-gray-900">
                Dados de compras
              </span>
              <span className="text-muted fw-semibold fs-7">Pagamentos</span>
            </h3>
          </div>
          {/* end::Header */}
          {/* begin::Body */}
          <div className="card-body pt-5">
            <>
              <div className="col-xxl-12">
                <div className="table-responsive">
                  <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                    <thead>
                      <tr className="fw-bolder text-muted">
                        <th className="min-w-50px">REGISTRO</th>
                        <th className="min-w-50px">STATUS</th>
                        <th className="min-w-140px">COMENTÁRIO</th>
                        <th className="min-w-140px">AULA</th>
                      </tr>
                    </thead>

                    <tbody>
                      {user.comments && user.comments.length === 0 && (
                        <tr className="border-0">
                          <td colSpan={6} className="text-center pt-10 ">
                            Nenhum comentário foi encontrado.
                          </td>
                        </tr>
                      )}

                      {user.comments &&
                        user.comments.map((comment: any, index: number) => (
                          <tr key={index}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="d-flex justify-content-start flex-column">
                                  {moment(comment.createdAt).format(
                                    "DD/MM/YYYY"
                                  )}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="d-flex justify-content-start flex-column">
                                  {comment.status}
                                </div>
                              </div>
                            </td>
                            <td>{comment.comment}</td>
                            <td>{comment.componentId}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
