import React, { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
// import {useIntl} from 'react-intl'
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import Loading from "../../../loading";
import { ManagePreUsersWidget } from "./ManagePreUsersWidget";

import { UsersState } from "../../../../store/ducks/users/types";
import { loadUsersRequest } from "../../../../store/ducks/users/actions";
import { useParams } from "react-router-dom";
import { Content } from "../../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";
import { UsersListHeader } from "../../../modules/apps/user-management/users-list/components/header/UsersListHeader";
import { KTIcon } from "../../../../_metronic/helpers";
import { loadPreUsersRequest } from "../../../../store/ducks/preusers/actions";
import { PreUsersState } from "../../../../store/ducks/preusers/types";
// import { ManageItemExtraWidget } from './ManageItemExtraWidget'

// interface ParamTypes {
//   id: string
// }

type Props = {
  preusers: PreUsersState;
  page?: string;
  take?: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
};

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({
  preusers,
  page,
  take,
  setCurrentPage,
  currentPage,
}) => (
  <>
    <ToolbarWrapper />
    <Content>
      
      {/* begin::Row */}
      <div className="row g-5 gx-xxl-12">
        <div className="col-xxl-12">
          <ManagePreUsersWidget
            preusers={preusers}
            className="card-xxl-stretch mb-5 mb-xxl-8"
            page={page}
            take={take}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
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
};

const ManageLeads: FC<React.PropsWithChildren<unknown>> = () => {
  // const intl = useIntl()

  const dispatch = useDispatch();
  const preusers = useSelector((state: ApplicationState) => state.preusers);
  const { page, take } = useParams<ParamTypes>();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(loadPreUsersRequest(+page!, +take!));
  }, [dispatch, page, take]);

  if (preusers.loading) return <Loading />;

  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.MODULES'})} </PageTitle> */}
      <PageTitle breadcrumbs={[]}>Pré usuários (prospects)</PageTitle>
      <ManagePage
        preusers={preusers}
        page={page}
        take={take}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
};
export default ManageLeads;
