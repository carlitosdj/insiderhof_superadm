import React, {FC, useEffect} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
// import {useIntl} from 'react-intl'
// import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../store'

import Loading from '../../../loading'

import {ManageWppCampWidget} from './ManageWppCampWidget'
import {loadAllcampRequest} from '../../../../store/ducks/wppcamp/actions'
import {WppcampState} from '../../../../store/ducks/wppcamp/types'
import { Content } from '../../../../_metronic/layout/components/content'
import { ToolbarWrapper } from '../../../../_metronic/layout/components/toolbar'
// import { ManageItemExtraWidget } from './ManageItemExtraWidget'

// interface ParamTypes {
//   id: string
// }

// const MOMENT = require('moment')

type Props = {
  wppcamp: WppcampState
}

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({wppcamp}) => (
  <>
  <ToolbarWrapper />
  <Content>
    {/* begin::Row */}
    <div className='row g-5 gx-xxl-12'>
      <div className='col-xxl-12'>
        <ManageWppCampWidget wppcamp={wppcamp} className='card-xxl-stretch mb-5 mb-xxl-8' />
      </div>
    </div>
    {/* end::Row */}
  </Content>
  </>
)

const Manage: FC<React.PropsWithChildren<unknown>> = () => {
  // const intl = useIntl()

  const dispatch = useDispatch()
  const component = useSelector((state: ApplicationState) => state.component)
  // let { id } = useParams<ParamTypes>();
  const wppcamp = useSelector((state: ApplicationState) => state.wppcamp)

  console.log('wppcamp', wppcamp)
  useEffect(() => {
    dispatch(loadAllcampRequest()) //Puxa componentes com seus filhos primários
  }, [dispatch])

  //if (component.loading) return <Loading />

  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.MODULES'})} </PageTitle> */}
      <PageTitle breadcrumbs={[]}>Campanhas de grupos de whatsapp</PageTitle>
      <ManagePage wppcamp={wppcamp} />
    </>
  )
}
export default Manage
