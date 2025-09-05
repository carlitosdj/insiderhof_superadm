import React, {FC, useEffect, useState} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
// import {useIntl} from 'react-intl'
import {useSelector, useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../store'
import Loading from '../../../loading'

import {ManageLeadsWidget} from './ManageLeadsWidget'

import {LeadsState} from '../../../../store/ducks/leads/types'
import {loadLeadsRequest} from '../../../../store/ducks/leads/actions'
import {useParams} from 'react-router-dom'
import { Content } from '../../../../_metronic/layout/components/content'
import { ToolbarWrapper } from '../../../../_metronic/layout/components/toolbar'
// import { ManageItemExtraWidget } from './ManageItemExtraWidget'

// interface ParamTypes {
//   id: string
// }

// const MOMENT = require('moment')

type Props = {
  leads: LeadsState
  page?: string
  take?: string
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  currentPage: number
} 

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({leads, page, take, setCurrentPage, currentPage}) => (
  <>
  <ToolbarWrapper />
  <Content>
    {/* begin::Row */}
    <div className='row g-5 gx-xxl-12'>
      <div className='col-xxl-12'>
        <ManageLeadsWidget leads={leads} className='card-xxl-stretch mb-5 mb-xxl-8' page={page} take={take} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </div>
    </div>
    {/* end::Row */}
  </Content>
  </>
)

type ParamTypes = {
  take: string
  page: string
}

const ManageLeads: FC<React.PropsWithChildren<unknown>> = () => {
  // const intl = useIntl()

  const dispatch = useDispatch()
  const leads = useSelector((state: ApplicationState) => state.leads)
  const currentProject = useSelector((state: ApplicationState) => state.projects.currentProject);
  const {page, take} = useParams<ParamTypes>();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (page && take) {
      dispatch(loadLeadsRequest(+page, +take))
    }
  }, [dispatch, page, take, currentProject?.id]) // Agora também escuta mudanças no projeto atual

  if (leads.loading) return <Loading />

  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.MODULES'})} </PageTitle> */}
      <PageTitle breadcrumbs={[]}>Leads</PageTitle>
      <ManagePage leads={leads} page={page} take={take} setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </>
  )
}
export default ManageLeads
