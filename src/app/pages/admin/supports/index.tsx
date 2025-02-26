import React, {FC, useEffect} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
// import {useIntl} from 'react-intl'
import {useSelector, useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../store'
import Loading from '../../../loading'

import {ManageSupportsWidget} from './ManageSupportsWidget'
import {loadAllsupportsRequest} from '../../../../store/ducks/support/actions'
import {SupportState} from '../../../../store/ducks/support/types'
import { Content } from '../../../../_metronic/layout/components/content'
import { ToolbarWrapper } from '../../../../_metronic/layout/components/toolbar'
// import { ManageItemExtraWidget } from './ManageItemExtraWidget'

// interface ParamTypes {
//   id: string
// }

// const MOMENT = require('moment')

type Props = {
  supportsList: SupportState
}

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({supportsList}) => (
  <>
  <ToolbarWrapper />
  <Content>
    {/* begin::Row */}
    <div className='row g-5 gx-xxl-12'>
      <div className='col-xxl-12'>
        <ManageSupportsWidget
          supportsList={supportsList}
          className='card-xxl-stretch mb-5 mb-xxl-8'
        />
      </div>
    </div>
    {/* end::Row */}
  </Content>
  </>
)

const ManageSentEmails: FC<React.PropsWithChildren<unknown>> = () => {
  // const intl = useIntl()

  const dispatch = useDispatch()
  //const emailList = useSelector((state: ApplicationState) => state.emailToList)
  const supportsList = useSelector((state: ApplicationState) => state.supports)

  console.log("supportsList", supportsList)

  useEffect(() => {
    // console.log("DISPATCHINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")
    dispatch(loadAllsupportsRequest())
  }, [dispatch])

  if (supportsList.loading) return <Loading />

  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.MODULES'})} </PageTitle> */}
      <PageTitle breadcrumbs={[]}>Suporte</PageTitle>
      <ManagePage supportsList={supportsList} />
    </>
  )
}
export default ManageSentEmails
