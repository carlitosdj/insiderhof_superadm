import React, {FC, useEffect} from 'react'
import {PageTitle} from '../../../../../_metronic/layout/core'
// import {useIntl} from 'react-intl'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../../store'
import {loadComponentRequest} from '../../../../../store/ducks/component/actions'
import {ComponentState} from '../../../../../store/ducks/component/types'
import Loading from '../../../../loading'

import {ManageItemExtraWidget} from './ManageItemExtraWidget'
import { ToolbarWrapper } from '../../../../../_metronic/layout/components/toolbar'
import { Content } from '../../../../../_metronic/layout/components/content'

type ParamTypes = {
  id: string
}

type Props = {
  comp: ComponentState
}

const LaunchExtraPage: React.FC<React.PropsWithChildren<Props>> = ({comp}) => (
  <>
  <ToolbarWrapper />
  <Content>
    {/* begin::Row */}
    <div className='row g-5 gx-xxl-12'>
      {/* <div className='col-xxl-12'>
        <ManageItemWidget comp={comp} className='card-xxl-stretch mb-5 mb-xxl-7' />
      </div> */}
      <div className='col-xxl-12'>
        <ManageItemExtraWidget comp={comp} className='card-xxl-stretch mb-5 mb-xxl-5' />
      </div>
    </div>
    {/* end::Row */}
    </Content>
  </>
)

const LaunchExtra: FC<React.PropsWithChildren<unknown>> = () => {
  // const intl = useIntl()

  const dispatch = useDispatch()
  const component = useSelector((state: ApplicationState) => state.component)
  let {id} = useParams<ParamTypes>()

  useEffect(() => {
    dispatch(loadComponentRequest(id!,'asc')) //Puxa componentes com seus filhos primários
  }, [id, dispatch])

  if (component.loading && component.data) return <Loading />

  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.MODULES'})} </PageTitle> */}
      <PageTitle breadcrumbs={[]}>{component.data.name}</PageTitle>
      <LaunchExtraPage comp={component} />
    </>
  )
}
export default LaunchExtra
