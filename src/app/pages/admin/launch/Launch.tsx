import React, {FC, useEffect} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
// import {useIntl} from 'react-intl'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../store'
import {loadComponentRequest} from '../../../../store/ducks/component/actions'
import {ComponentState} from '../../../../store/ducks/component/types'
import Loading from '../../../loading'

import {ManageItemWidget} from './ManageItemWidget'
import { Content } from '../../../../_metronic/layout/components/content'
import { ToolbarWrapper } from '../../../../_metronic/layout/components/toolbar'


type ParamTypes = {
  id: string
}

type Props = {
  comp: ComponentState
}

const LaunchPage: React.FC<React.PropsWithChildren<Props>> = ({comp}) => (
  <>
  <ToolbarWrapper />
  <Content>
    {/* begin::Row */}
    <div className='row g-5 gx-xxl-12'>
      <div className='col-xxl-12'>
        {comp.loadingNewLaunch && <div><Loading/><br/></div>}
        <ManageItemWidget comp={comp} className='card-xxl-stretch mb-5 mb-xxl-7' />
      </div>
      {/* <div className='col-xxl-5'>
        <ManageItemExtraWidget comp={comp} className='card-xxl-stretch mb-5 mb-xxl-5' />
      </div> */}
    </div>
    {/* end::Row */}
  </Content>
  </>
)

const Launch: FC<React.PropsWithChildren<unknown>> = () => {
  // const intl = useIntl()

  const dispatch = useDispatch()
  const component = useSelector((state: ApplicationState) => state.component)
  let id = '3'

  useEffect(() => {
    dispatch(loadComponentRequest(id!,'asc')) //Puxa componentes com seus filhos primários
  }, [id, dispatch])

  if (component.loading && component.data) return <Loading />

  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.MODULES'})} </PageTitle> */}
      <PageTitle breadcrumbs={[]}>{component.data.name}</PageTitle>
      <LaunchPage comp={component} />
    </>
  )
}
export default Launch
