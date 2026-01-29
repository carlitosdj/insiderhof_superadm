/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {Modal} from 'react-bootstrap'
import {KTSVG} from '../../../../_metronic/helpers'
import {User} from '../../../../store/ducks/me/types'
// import CreateEmail from './create'
import {Support, SupportState} from '../../../../store/ducks/support/types'

import Info from './info'
// import Create from './create'
import Update from './update'
import {useIntl} from 'react-intl'
import { Contact, ContactState } from '../../../../store/ducks/contact/types'
import { deletecontactRequest } from '../../../../store/ducks/contact/actions'
import { useDispatch } from 'react-redux'
import moment from 'moment'

type Props = {
  className: string
  contactList: ContactState
}

const ManageSupportsWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  contactList,
}) => {
  const intl = useIntl()

  const [show, setShow] = useState<boolean>(false)
  const [action, setAction] = useState<string>('')
  const [child, setChild] = useState<User>({})
  const dispatch = useDispatch()

  const infoSupport = (support: Contact) => {
    setAction('infoSupport')
    setShow(true)
    setChild(support)
  }
  const updateSupport = (support: Contact) => {
    setAction('editSupport')
    setShow(true)
    setChild(support)
  }

  const handleClose = () => {
    setShow(false)
  }
  // Deleta componente: CHILD
  const deleteContact = (component: Contact) => {
    dispatch(deletecontactRequest(component.id!))
  }

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
              {intl.formatMessage({id: 'MENU.CONTACT'})}
            </span>
            <span className='text-muted mt-1 fw-bold fs-7'>Contatos na plataforma</span>
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
                  <th className='min-w-140px'>REGISTRO</th>
                  <th className='min-w-140px'>NOME</th>
                  <th className='min-w-120px'>EMAIL</th>
                  <th className='min-w-120px'>ASSUNTO</th>
                  <th className='min-w-120px'>MENSAGEM</th>
                  <th className='min-w-100px text-end'>AÇÕES</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {contactList.all.length === 0 && (
                  <tr>
                    <td colSpan={7} className='text-center pt-10'>
                      Nenhum registro encontrado
                    </td>
                  </tr>
                )}
                {contactList.all.map((support: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='d-flex justify-content-start flex-column'>
                            {support.id}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className='text-muted fw-bold d-block fs-7'>
                          {moment(support.createdAt).utc().format('DD/MM/YYYY HH:mm')}
                        </span>
                      </td>
                      <td>
                        <span className='text-muted fw-bold d-block fs-7'>
                          {support.name}
                        </span>
                      </td>
                      <td>
                        <span className='text-muted fw-bold d-block fs-7'>
                          {support.email}
                        </span>
                      </td>
                      <td>
                        <span className='text-muted fw-bold d-block fs-7'>
                          {support.subject}
                        </span>
                      </td>
                      <td>
                        <span className='text-muted fw-bold d-block fs-7'>
                          {support.message}
                        </span>
                      </td>

                      <td>
                        <div className='d-flex justify-content-end flex-shrink-0'>
                          <a
                            // href='#!'
                            onClick={() => infoSupport(support)}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <KTSVG
                              path='/media/icons/duotune/general/gen019.svg'
                              className='svg-icon-3'
                            />
                          </a>
                          {/* <a
                            // href='#!'
                            onClick={() => updateSupport(support)}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <KTSVG
                              path='/media/icons/duotune/art/art005.svg'
                              className='svg-icon-3'
                            />
                          </a> */}
                          <a
                            href='#!'
                            onClick={() => { if (window.confirm('Deseja realmente excluir: ' + support.subject + '?')) deleteContact(support)  } }
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                          >
                            <KTSVG
                              path='/media/icons/duotune/general/gen027.svg'
                              className='svg-icon-3'
                            />
                          </a>
                        </div>
                      </td>
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

export {ManageSupportsWidget}
