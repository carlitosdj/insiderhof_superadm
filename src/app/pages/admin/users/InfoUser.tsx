import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
//import { loadLastClassRequest } from "../../../../store/ducks/component/actions";
import { User } from "../../../../store/ducks/me/types";

import { loadUserRequest } from "../../../../store/ducks/users/actions";
import momentDurationFormatSetup from "moment-duration-format";
import { KTIcon } from "../../../../_metronic/helpers";

import { Overview } from "./profile/components/Overview";
import { CartPage } from "./profile/components/Cart";
import { Progress } from "./profile/components/Progress";
import { Comments } from "./profile/components/Comments";
import Loading from "../../../loading";
import {
  loadconnectedTimeGroupedByHourByIdRequest,
  loadconnectedTimeGroupedByHourRequest,
  loadconnectedTimeGroupedByWeekDayByIdRequest,
  loadconnectedTimeGroupedByWeekDayRequest,
  //loadconnectedUsersRequest,
} from "../../../../store/ducks/onlineusers/actions";
import { useParams } from "react-router-dom";
import { Content } from "../../../../_metronic/layout/components/content";
import { PageTitle } from "../../../../_metronic/layout/core";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";

import moment from "moment";
momentDurationFormatSetup(moment);

// interface handleCloseProps {
//   handleClose: () => void;
//   child: User;
// }

type Props = {
  child: User
 
};


const InfoUserPage = ({ child }: Props) => {
  

  const [selectedTab, setSelectedTab] = useState(0);

  //const component = useSelector((state: ApplicationState) => state.component);
  const users = useSelector((state: ApplicationState) => state.users);
  const { id, image, name, email, completed, whatsapp } = users.user;
  //const child = users.user;

  //let urlLastClass: string | undefined = "";
  //let checkLastClass = component.lastclass?.extras?.filter(
  //   (extra: any) => extra.keyExtra === "url"
  // )[0]; //Checa se tem o 'extra' de url.
  // if (checkLastClass) urlLastClass = checkLastClass.valueExtra;
  // console.log("component", component);
  console.log("************LOADED USER************", users.user);

  // var data = new Date(apiResponse.createdAt*1000);
  let createdAt = moment(child.createdAt).utc(); //.format('DD/MM/YYYY HH:mm')
  var now = moment(Date()).utc(); //.format('DD/MM/YYYY HH:mm')
  var src = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
  var dst = "$1.$2.$3-$4";
  var cpfformat = child.cpf?.replace(src, dst);

  console.log("child", child);

  if (users.loading) return <Loading />;
  return (
    <>
    <ToolbarWrapper />
    <Content>
      <div className="card mb-5 mb-xl-10">
        <div className="card-body pt-9 pb-0">
          <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
            <div className="me-7 mb-4">
              <div className="symbol symbol-100px symbol-lg-200px symbol-fixed position-relative">
                <img
                  alt="User"
                  src={
                    image?.includes("https://")
                      ? image
                      : "https://app.insiderhof.com.br/files/" + image
                  }
                  className=""
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src =
                      "https://app.insiderhof.com.br/files/notfound.jpg";
                  }}
                />
                <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"></div>
              </div>
            </div>

            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <a
                      href="#"
                      className="text-gray-800 text-hover-primary fs-2 fw-bolder me-1"
                    >
                      {name}
                    </a>
                    <a href="#">
                      <KTIcon iconName="verify" className="fs-1 text-primary" />
                    </a>
                  </div>

                  <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                    <a
                      href="#"
                      className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                    >
                      <KTIcon iconName="whatsapp" className="fs-4 me-1" />
                      {whatsapp}
                    </a>
                    <a
                      href="#"
                      className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                    >
                      <KTIcon iconName="geolocation" className="fs-4 me-1" />
                      {users.user.city?.name}, {users.user.state?.name}
                    </a>
                    <a
                      href="#"
                      className="d-flex align-items-center text-gray-500 text-hover-primary mb-2"
                    >
                      <KTIcon iconName="sms" className="fs-4 me-1" />
                      {email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-wrap flex-stack">
                <div className="d-flex flex-column flex-grow-1 pe-8">
                  <div className="d-flex flex-wrap">
                    <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <KTIcon
                          iconName="eye"
                          className="fs-3 text-primary me-2"
                        />
                        <div className="fs-2 fw-bolder">
                          {completed?.length}
                        </div>
                      </div>

                      <div className="fw-bold fs-6 text-gray-500">
                        Aulas assistidas
                      </div>
                    </div>

                    <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <KTIcon
                          iconName="time"
                          className="fs-3 text-primary me-2"
                        />
                        <div className="fs-2 fw-bolder">
                          {moment(child.lastLoginAt).format("DD/MM/YY HH:mm")}
                        </div>
                      </div>

                      <div className="fw-bold fs-6 text-gray-500">
                        Último login
                      </div>
                    </div>

                    <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <KTIcon
                          iconName="abstract-23"
                          className="fs-3 text-primary me-2"
                        />
                        <div className="fs-2 fw-bolder">
                          {(now.diff(createdAt, "years", true) * 100).toFixed(
                            2
                          )}
                          %
                        </div>
                      </div>

                      <div className="fw-bold fs-6 text-gray-500">
                        {now.diff(createdAt, "years", true) > 1
                          ? "Expirado"
                          : "Ativo"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center w-200px w-sm-300px flex-column mt-3">
                  <div className="d-flex justify-content-between w-100 mt-auto mb-2">
                    <span className="fw-bold fs-6 text-gray-500">
                      Conclusão do perfil
                    </span>
                    <span className="fw-bolder fs-6">100%</span>
                  </div>
                  <div className="h-5px mx-3 w-100 bg-light mb-3">
                    <div
                      className="bg-success rounded h-5px"
                      role="progressbar"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex overflow-auto h-55px">
            <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap ">
              <li className="nav-item cursor-pointer">
                <a
                  className={"nav-link me-6 " + (selectedTab === 0 && "active")}
                  onClick={() => setSelectedTab(0)}
                >
                  Geral
                </a>
              </li>
              <li className="nav-item cursor-pointer">
                <a
                  className={"nav-link me-6 " + (selectedTab === 1 && "active")}
                  onClick={() => setSelectedTab(1)}
                >
                  Progresso
                </a>
              </li>
              <li className="nav-item cursor-pointer">
                <a
                  className={"nav-link me-6 " + (selectedTab === 2 && "active")}
                  onClick={() => setSelectedTab(2)}
                >
                  Compras
                </a>
              </li>
              <li className="nav-item cursor-pointer">
                <a
                  className={"nav-link me-6 " + (selectedTab === 3 && "active")}
                  onClick={() => setSelectedTab(3)}
                >
                  Comentários
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* {(onlineusers.loadingData || onlineusers.loadingDataById) && <Loading />} */}

      {/* {selectedTab === 0 &&
        !onlineusers.loadingData &&
        !onlineusers.loadingDataById && 
        !onlineusers.loadingWeekData &&
        !onlineusers.loadingWeekDataById &&
        
         <Overview user={users.user} />} */}
      {selectedTab === 0 && <Overview user={users.user} />}
      {selectedTab === 1 && <Progress user={users.user} />}
      {selectedTab === 2 && <CartPage user={users.user} />}
      {selectedTab === 3 && <Comments user={users.user} />}
    </Content>
    </>
  );
};




const InfoUser: FC<React.PropsWithChildren<unknown>> = () => {
  // const intl = useIntl()

  const dispatch = useDispatch();
  const users = useSelector((state: ApplicationState) => state.users);
  const { userId } = useParams();


  useEffect(() => {
    //dispatch(loadLastClassRequest(child.id!));
    dispatch(loadUserRequest(Number(userId)));
    dispatch(loadconnectedTimeGroupedByHourByIdRequest(Number(userId)));
    dispatch(loadconnectedTimeGroupedByHourRequest());

    dispatch(loadconnectedTimeGroupedByWeekDayRequest());
    dispatch(loadconnectedTimeGroupedByWeekDayByIdRequest(Number(userId)));
  }, [userId]);

  if (users.loading) return <Loading />;
  //console.log("USERS", users);
  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.MODULES'})} </PageTitle> */}
      <PageTitle breadcrumbs={[]}>{users.user.name}</PageTitle>
      <InfoUserPage
        child={users.user}
      />
    </>
  );
};
export default InfoUser;
