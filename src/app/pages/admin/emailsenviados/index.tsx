import React, {FC, useEffect} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
// import {useIntl} from 'react-intl'
import {useSelector, useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../store'
import Loading from '../../../loading'

import {ManageSentEmailsWidget} from './ManageSentEmailsWidget'
import {loadEmailToListRequest} from '../../../../store/ducks/email/actions'
import {EmailToListState} from '../../../../store/ducks/email/types'
import { Content } from '../../../../_metronic/layout/components/content'
import { ToolbarWrapper } from '../../../../_metronic/layout/components/toolbar'

type Props = {
  emailList: EmailToListState
}

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({emailList}) => (
  <>
  <ToolbarWrapper />
  <Content>
    {/* begin::Row */}
    <div className='row g-5 gx-xxl-12'>
      <div className='col-xxl-12'>
        <ManageSentEmailsWidget emailList={emailList} className='card-xxl-stretch mb-5 mb-xxl-8' />
      </div>
    </div>
    {/* end::Row */}
  </Content>
  </>
)

const ManageSentEmails: FC<React.PropsWithChildren<unknown>> = () => {
  // const intl = useIntl()
  const dispatch = useDispatch()
  const emailList = useSelector((state: ApplicationState) => state.emailToList)

  useEffect(() => {
    dispatch(loadEmailToListRequest())
  }, [dispatch])

  if (emailList.loading) return <Loading />

  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.MODULES'})} </PageTitle> */}
      <PageTitle breadcrumbs={[]}>E-mails enviados</PageTitle>
      <ManagePage emailList={emailList} />
    </>
  )
}
export default ManageSentEmails
