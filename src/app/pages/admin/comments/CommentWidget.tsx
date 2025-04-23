/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {Modal} from 'react-bootstrap'
import {KTSVG} from '../../../../_metronic/helpers'
import {User} from '../../../../store/ducks/me/types'
// import CreateEmail from './create'
// import {Support, SupportState} from '../../../../store/ducks/support/types'

import Info from './info'
// import Create from './create'
import Update from './update'
import {useIntl} from 'react-intl'

import Loading from '../../../loading'
import { Comment, CommentsState } from '../../../../store/ducks/comments/types'

type Props = {
  className: string
  comments: CommentsState
}

const CommentWidget: React.FC<React.PropsWithChildren<Props>> = ({className, comments}) => {
  const MOMENT = require('moment')
  const intl = useIntl()

  const [show, setShow] = useState<boolean>(false)
  const [action, setAction] = useState<string>('')
  const [child, setChild] = useState<User>({})

  // const infoSupport = (support: Support) => {
  //   setAction('infoSupport')
  //   setShow(true)
  //   setChild(support)
  // }
  // const updateSupport = (support: Support) => {
  //   setAction('editSupport')
  //   setShow(true)
  //   setChild(support)
  // }

  const handleClose = () => {
    setShow(false)
  }
  console.log('Comments', comments)
  if (comments.loading) return <Loading />
  return (
    <>
      <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {action === 'infoSupport' ? 'Informações do chamado' : ''}
            {action === 'editSupport' ? 'Responder chamado' : ''}
            {/* { (action === 'createUser')?'Adicionar usuário':'' } */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {action === 'infoSupport' ? <Info handleClose={handleClose} child={child} /> : ''}
          {action === 'editSupport' ? <Update handleClose={handleClose} child={child} /> : ''}
          {/* { (action === 'createUser')?<Create handleClose={handleClose}/>:'' } */}
        </Modal.Body>
      </Modal>
      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>
              {/* {intl.formatMessage({id: 'MENU.SUPPORT'})} */}
              Comentários
            </span>
            <span className='text-muted mt-1 fw-bold fs-7'>Comentários na plataforma</span>
          </h3>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          {/* begin::Table container */}
          <div className='table-responsive'>
            {/* begin::Table */}
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              {/* begin::Table head */}
              <thead>
                <tr className='fw-bolder text-muted'>
                  <th className='min-w-50px'>ID</th>
                  <th className='min-w-100px'>REGISTRO</th>
                  <th className='min-w-100px'>COMENTÁRIO</th>
                  <th className='min-w-100px'>AULA</th>
                  
                  <th className='min-w-120px'>USUÁRIO</th>
                  {/* <th className='min-w-120px'>Status</th>
                  <th className='min-w-100px text-end'>Actions</th> */}
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {comments.data.map((comment: Comment, index: number) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='d-flex justify-content-start flex-column'>
                            {comment.id}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className='text-muted fw-bold d-block fs-7'>
                          {MOMENT(comment.createdAt).utc().format('DD/MM/YYYY HH:mm')}
                        </span>
                      </td>
                      <td>
                        <span className='text-gray-900 fw-bold d-block fs-7'>{comment.comment}</span>
                      </td>
                      <td>
                        <span className='text-muted fw-bold d-block fs-7'>
                        {comment.class?.module?.product?.name}{" > "}
                            {comment.class?.module?.name}{" > "}
                            {comment.class?.name}
                        </span>
                      </td>
                      

                      <td>
                        <span className='text-muted fw-bold d-block fs-7'>
                          {comment.parentUser?.name}
                        </span>
                      </td>
                      {/* <td>
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          {support.status}
                        </span>
                      </td> */}
                    </tr>
                  )
                })}
              </tbody>
              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>
          {/* end::Table container */}
        </div>
        {/* begin::Body */}
      </div>
    </>
  )
}

export {CommentWidget}
