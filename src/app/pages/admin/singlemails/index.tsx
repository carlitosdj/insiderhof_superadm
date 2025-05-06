import React, {FC, useEffect} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
// import {useIntl} from 'react-intl'
import {useSelector, useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../store'
import Loading from '../../../loading'


import { Content } from '../../../../_metronic/layout/components/content'
import { ToolbarWrapper } from '../../../../_metronic/layout/components/toolbar'
import { loadSingleMailRequest } from '../../../../store/ducks/singlemail/actions'
import { ManageSingleMailWidget } from './ManageSingleMailWidget'
import { SingleMailState } from '../../../../store/ducks/singlemail/types'

type Props = {
  singlemail: SingleMailState
}

const ManageSingleEmailPage: React.FC<React.PropsWithChildren<Props>> = ({singlemail}) => (
  <>
  <ToolbarWrapper />
  <Content>
    {/* begin::Row */}
    <div className='row g-5 gx-xxl-12'>
      <div className='col-xxl-12'>
        <ManageSingleMailWidget singlemail={singlemail} className='card-xxl-stretch mb-5 mb-xxl-8' />
      </div>
    </div>
    {/* end::Row */}
  </Content>
  </>
)

const ManageSingleMail: FC<React.PropsWithChildren<unknown>> = () => {
  // const intl = useIntl()
  const dispatch = useDispatch()
  const singlemail = useSelector((state: ApplicationState) => state.singlemail)

  useEffect(() => {
    dispatch(loadSingleMailRequest())
  }, [dispatch])

  if (singlemail.loading) return <Loading />
  console.log(singlemail)
  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.MODULES'})} </PageTitle> */}
      <PageTitle breadcrumbs={[]}>Single Mails</PageTitle>
      <ManageSingleEmailPage singlemail={singlemail} />
    </>
  )
}
export default ManageSingleMail
