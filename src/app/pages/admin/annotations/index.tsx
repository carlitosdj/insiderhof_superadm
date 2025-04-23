import React, {FC, useEffect} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
// import {useIntl} from 'react-intl'
import {useSelector, useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../store'
import Loading from '../../../loading'


// import {loadAllsupportsRequest} from '../../../../store/ducks/support/actions'
// import {SupportState} from '../../../../store/ducks/support/types'
import { AnnotationWidget } from './AnnotationWidget'
import { AnnotationsState } from '../../../../store/ducks/annotations/types'
// import { loadAnnotationsSingle } from '../../../../store/ducks/annotation/sagas'
import { loadMyAnnotations } from '../../../../store/ducks/annotations/sagas'
import { loadMyAnnotationsRequest } from '../../../../store/ducks/annotations/actions'
import { Content } from '../../../../_metronic/layout/components/content'
import { ToolbarWrapper } from '../../../../_metronic/layout/components/toolbar'
// import { ManageItemExtraWidget } from './ManageItemExtraWidget'

// interface ParamTypes {
//   id: string
// }

// const MOMENT = require('moment')

type Props = {
  annotations: AnnotationsState
}

const AnnotationsPage: React.FC<React.PropsWithChildren<Props>> = ({annotations}) => (
  <>
  <ToolbarWrapper />
  
  <Content>
    {/* begin::Row */}
    <div className='row g-5 gx-xxl-12'>
      <div className='col-xxl-12'>
        <AnnotationWidget
          annotations={annotations}
          className='card-xxl-stretch mb-5 mb-xxl-8'
        />
      </div>
    </div>
    {/* end::Row */}
  </Content>
  </>
)

const Annotations: FC<React.PropsWithChildren<unknown>> = () => {
  // const intl = useIntl()

  const dispatch = useDispatch()
  const emailList = useSelector((state: ApplicationState) => state.emailToList)
  const annotations = useSelector((state: ApplicationState) => state.annotations)

  useEffect(() => {
    // console.log("DISPATCHINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")
    dispatch(loadMyAnnotationsRequest())
  }, [dispatch])

  if (emailList.loading) return <Loading />
  console.log("ANNOTATIONS", annotations)
  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.MODULES'})} </PageTitle> */}
      <PageTitle breadcrumbs={[]}>Anotações</PageTitle>
      <AnnotationsPage annotations={annotations} />
    </>
  )
}
export default Annotations
