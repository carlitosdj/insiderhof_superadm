import React, { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
// import {useIntl} from 'react-intl'
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import Loading from "../../../loading";
import { ManageUsersWidget } from "./ManageUsersWidget";

import { UsersState } from "../../../../store/ducks/users/types";
import { loadUsersRequest } from "../../../../store/ducks/users/actions";
import { useParams } from "react-router-dom";
import { Content } from "../../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";
// import { UsersListHeader } from "../../../modules/apps/user-management/users-list/components/header/UsersListHeader";
// import { KTIcon } from "../../../../_metronic/helpers";
// import { ManageItemExtraWidget } from './ManageItemExtraWidget'

// interface ParamTypes {
//   id: string
// }

type Props = {
  users: UsersState;
  page?: string;
  take?: string;
  hasCart?: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  startDate?: string;
  endDate?: string;
};

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({
  users,
  page,
  take,
  hasCart,
  setCurrentPage,
  currentPage,
  startDate,
  endDate,
}) => (
  <>
    <ToolbarWrapper />
    <Content>
      {/* begin::Row */}
      <div className="row g-5 gx-xxl-12">
        <div className="col-xxl-12">
          <ManageUsersWidget
            users={users}
            className="card-xxl-stretch mb-5 mb-xxl-8"
            page={page}
            take={take}
            hasCart={hasCart}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      </div>
      {/* end::Row */}
    </Content>
  </>
);

type ParamTypes = {
  take: string;
  page: string;
  hasCart: string;
  startDate?: string;
  endDate?: string;
};

const ManageLeads: FC<React.PropsWithChildren<unknown>> = () => {
  // const intl = useIntl()

  const dispatch = useDispatch();
  const users = useSelector((state: ApplicationState) => state.users);
  const { page, take, hasCart, startDate, endDate } = useParams<ParamTypes>();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    //console.log("Chamei!");
    const cameFromBack = sessionStorage.getItem("cameFromBack");

    if (cameFromBack) {
      //console.log("Usuário voltou à página anterior");
      sessionStorage.removeItem("cameFromBack");
    } else {
      dispatch(loadUsersRequest(+page!, +take!, hasCart!, Number(startDate), Number(endDate)));
    }

    window.onpopstate = () => {
      sessionStorage.setItem("cameFromBack", "true");
    };

  }, [page, take, hasCart, startDate, endDate]);

 

  if (users.loading) return <Loading />;
  console.log("USERS", users);
  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.MODULES'})} </PageTitle> */}
      <PageTitle breadcrumbs={[]}>Usuários</PageTitle>
      <ManagePage
        users={users}
        page={page}
        take={take}
        hasCart={hasCart}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        startDate={startDate}
        endDate={endDate}
      />
    </>
  );
};
export default ManageLeads;
