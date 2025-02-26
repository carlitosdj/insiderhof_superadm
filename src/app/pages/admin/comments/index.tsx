import React, { FC, useEffect } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
// import {useIntl} from 'react-intl'
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import Loading from "../../../loading";

// import {loadAllsupportsRequest} from '../../../../store/ducks/support/actions'
// import {SupportState} from '../../../../store/ducks/support/types'
import { CommentWidget } from "./CommentWidget";
import { CommentsState } from "../../../../store/ducks/comments/types";
import { loadCommentsRequest } from "../../../../store/ducks/comments/actions";
import { Content } from "../../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";
// import { CommentsState } from '../../../../store/ducks/Comments/types'
// import { loadCommentsSingle } from '../../../../store/ducks/Comment/sagas'
// import { loadMyCommentsRequest } from '../../../../store/ducks/comments/actions'
// import { ManageItemExtraWidget } from './ManageItemExtraWidget'

// interface ParamTypes {
//   id: string
// }

// const MOMENT = require('moment')

type Props = {
  comments: CommentsState;
};

const CommentsPage: React.FC<React.PropsWithChildren<Props>> = ({
  comments,
}) => (
  <>
    <ToolbarWrapper />
    <Content>
      {/* begin::Row */}
      <div className="row g-5 gx-xxl-12">
        <div className="col-xxl-12">
          <CommentWidget
            comments={comments}
            className="card-xxl-stretch mb-5 mb-xxl-8"
          />
        </div>
      </div>
      {/* end::Row */}
    </Content>
  </>
);

const Comments: FC<React.PropsWithChildren<unknown>> = () => {
  // const intl = useIntl()

  const dispatch = useDispatch();
  const emailList = useSelector((state: ApplicationState) => state.emailToList);
  const comments = useSelector((state: ApplicationState) => state.comments);

  useEffect(() => {
    // console.log("DISPATCHINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")
    dispatch(loadCommentsRequest());
  }, [dispatch]);

  if (emailList.loading) return <Loading />;

  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.MODULES'})} </PageTitle> */}
      <PageTitle breadcrumbs={[]}>Comentários</PageTitle>
      <CommentsPage comments={comments} />
    </>
  );
};
export default Comments;
