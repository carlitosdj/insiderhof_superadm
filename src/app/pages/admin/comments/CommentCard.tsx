import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { KTSVG } from '../../../../_metronic/helpers'
import { Comment } from '../../../../store/ducks/comments/types'
import { useIntl } from 'react-intl'

import moment from 'moment'

type Props = {
  comment: Comment
  onReply: (comment: Comment) => void
  onEdit: (comment: Comment) => void
  onDelete: (comment: Comment) => void
}

const CommentCard: React.FC<Props> = ({ comment, onReply, onEdit, onDelete }) => {
  const intl = useIntl()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const getStatusBadge = () => {
    if (comment.isAnswered) {
      return <span className="badge badge-success ms-2">Respondido</span>
    }
    return <span className="badge badge-danger ms-2">Não Respondido</span>
  }

  const getClassLink = () => {
    if (comment.class && comment.launchId) {
      const link = `https://app.insiderhof.com.br/class/${comment.launchId}/${comment.class.module?.productId}/${comment.class.module?.id}/${comment.class.id}`
      return (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-sm btn-light-primary"
        >
          🔗 Ver Aula
        </a>
      )
    }
    return null
  }

  const handleDeleteConfirm = () => {
    onDelete(comment)
    setShowDeleteModal(false)
  }

  return (
    <>
      <div className="timeline-item">
        {/* Timeline line */}
        <div className="timeline-line w-40px"></div>
        
        {/* Timeline icon */}
        <div className="timeline-icon symbol symbol-circle symbol-40px">
          <div className="symbol-label bg-light">
            <span className="fs-2">💬</span>
          </div>
        </div>
        
        {/* Timeline content */}
        <div className="timeline-content mb-10 mt-n1">
          {/* Timeline heading */}
          <div className="pe-3 mb-5">
            <div className="fs-5 fw-semibold mb-2 d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted me-2">
                  {moment(comment.createdAt).utc().format('DD/MM/YYYY HH:mm')}
                </span>
                {getStatusBadge()}
                {comment.status === 'edited' && (
                  <span className="badge badge-secondary ms-2">Editado</span>
                )}
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => onReply(comment)}
                  title="Responder"
                >
                  💬 Responder
                </button>
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => onEdit(comment)}
                  title="Editar"
                >
                  ✏️ Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => setShowDeleteModal(true)}
                  title="Excluir"
                >
                  🗑️ Excluir
                </button>
              </div>
            </div>
          </div>
          
          {/* Timeline details */}
          <div className="overflow-hidden mt-2">
            <div className="border border-dashed border-gray-300 rounded p-4">
              {/* Comment content */}
              <div className="mb-4">
                <div className="fs-6 fw-semibold text-gray-800 mb-2">
                  {comment.comment}
                </div>
                <div className="text-muted fs-7">
                  <strong>Por:</strong> {comment.parentUser?.name}
                </div>
              </div>
              
              {/* Class info and link */}
              {comment.class && (
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <div className="text-muted fs-7">
                    <strong>Aula:</strong> {comment.class.module?.product?.name} → {comment.class.module?.name} → {comment.class.name}
                  </div>
                  {getClassLink()}
                </div>
              )}
            </div>
          </div>
          
          {/* Replies section */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="ms-8 mt-4">
              {comment.replies.map((reply, index) => (
                <div key={reply.id || index} className="border-start border-3 border-primary ps-4 mb-3">
                  <div className="bg-light-primary p-3 rounded">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="fs-7 text-muted">
                        <strong>{reply.parentUser?.name}</strong> • {moment(reply.createdAt).utc().format('DD/MM/YYYY HH:mm')}
                      </div>
                      <div className="d-flex gap-1">
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => onEdit(reply)}
                          title="Editar resposta"
                        >
                          ✏️
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => onDelete(reply)}
                          title="Excluir resposta"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <div className="fs-6 text-gray-800">{reply.comment}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tem certeza que deseja excluir este comentário?</p>
          <div className="bg-light p-3 rounded mb-3">
            <strong>Comentário:</strong> {comment.comment}
          </div>
          {comment.hasReplies && (
            <div className="alert alert-warning">
              <KTSVG path="/media/icons/duotune/general/gen044.svg" className="svg-icon-2 me-2" />
              Este comentário possui respostas que também serão excluídas.
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button 
            className="btn btn-secondary" 
            onClick={() => setShowDeleteModal(false)}
          >
            Cancelar
          </button>
          <button 
            className="btn btn-danger" 
            onClick={handleDeleteConfirm}
          >
            Excluir
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export { CommentCard }