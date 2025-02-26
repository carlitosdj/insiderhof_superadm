import React, {FC, useEffect} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
// import {useIntl} from 'react-intl'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../store'
import Loading from '../../../loading'

import {ManageWppGroupWidget} from './ManageWppGroupWidget'
import {loadWppgroupsRequest} from '../../../../store/ducks/wppgroup/actions'
import {WppgroupState} from '../../../../store/ducks/wppgroup/types'
import { Content } from '../../../../_metronic/layout/components/content'
import { ToolbarWrapper } from '../../../../_metronic/layout/components/toolbar'
// import { ManageItemExtraWidget } from './ManageItemExtraWidget'

type ParamTypes = {
  id: string
}

// const MOMENT = require('moment')

type Props = {
  wppgroup: WppgroupState
}

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({wppgroup}) => (
  <>
  <ToolbarWrapper />
  <Content>
    {/* begin::Row */}
    <div className='row g-5 gx-xxl-12'>
      <div className='col-xxl-12'>
        <ManageWppGroupWidget wppgroup={wppgroup} className='card-xxl-stretch mb-5 mb-xxl-8' />
      </div>
    </div>
    {/* end::Row */}
  </Content>
  </>
)

const Manage: FC<React.PropsWithChildren<unknown>> = () => {
  // const intl = useIntl()

  const dispatch = useDispatch()
  // const component = useSelector((state: ApplicationState) => state.component);
  let {id} = useParams<ParamTypes>()
  const wppgroup = useSelector((state: ApplicationState) => state.wppgroup)
  // const wppcamp = useSelector((state: ApplicationState) => state.wppcamp)

  useEffect(() => {
    // console.log("############ Loading component...")
    dispatch(loadWppgroupsRequest(id!)) //Puxa componentes com seus filhos primários
  }, [dispatch,id])

  if (wppgroup.loading && wppgroup.data) return <Loading />

  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.MODULES'})} </PageTitle> */}
      <PageTitle breadcrumbs={[]}>Grupos</PageTitle>
      <ManagePage wppgroup={wppgroup} />
    </>
  )
}
export default Manage
