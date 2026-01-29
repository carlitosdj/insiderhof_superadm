import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Comment } from '../../../../store/ducks/comments/types'
import { updateCommentRequest } from '../../../../store/ducks/comments/actions'
import { ApplicationState } from '../../../../store'
import { KTSVG } from '../../../../_metronic/helpers'

import moment from 'moment'

type Props = {
  show: boolean
  comment?: Comment
  onHide: () => void
  onSuccess?: () => void
}

const CommentEditModal: React.FC<Props> = ({ show, comment, onHide, onSuccess }) => {
  const dispatch = useDispatch()
  const { updateLoading } = useSelector((state: ApplicationState) => state.comments)
  const [editText, setEditText] = useState('')

  useEffect(() => {
    if (comment) {
      setEditText(comment.comment || '')
    }
  }, [comment])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!editText.trim() || !comment) {
      return
    }

    dispatch(updateCommentRequest(comment.id!, editText))
    onSuccess?.()
    onHide()
  }

  const handleClose = () => {
    if (!updateLoading) {
      setEditText('')
      onHide()
    }
  }

  if (!comment) return null

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <KTSVG path="/media/icons/duotune/art/art005.svg" className="svg-icon-2 me-2" />
          Editar Comentário
        </Modal.Title>
      </Modal.Header>
      
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* Comment metadata */}
          <div className="mb-4">
            <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
              <div className="symbol symbol-35px">
                <div className="symbol-label bg-primary">
                  <span className="text-white fs-6 fw-bold">
                    {comment.parentUser?.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex-grow-1">
                <div className="fs-6 fw-semibold text-gray-800">{comment.parentUser?.name}</div>
                <div className="fs-7 text-muted">
                  {moment(comment.createdAt).utc().format('DD/MM/YYYY HH:mm')}
                  {comment.status === 'edited' && (
                    <span className="badge badge-secondary ms-2">Editado</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Class context */}
          {comment.class && (
            <div className="mb-4">
              <label className="form-label fs-7 text-muted">Aula:</label>
              <div className="fs-6 text-gray-700">
                {comment.class.module?.product?.name} → {comment.class.module?.name} → {comment.class.name}
              </div>
            </div>
          )}

          {/* Edit form */}
          <div className="mb-3">
            <label className="form-label required">Comentário</label>
            <textarea
              className="form-control"
              rows={5}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="Digite o comentário..."
              disabled={updateLoading}
              required
            />
            <div className="form-text">
              <KTSVG path="/media/icons/duotune/general/gen044.svg" className="svg-icon-4 me-1" />
              O comentário será marcado como editado após a alteração.
            </div>
          </div>

          {/* Warning for replies */}
          {comment.hasReplies && (
            <div className="alert alert-warning d-flex align-items-center">
              <KTSVG path="/media/icons/duotune/general/gen044.svg" className="svg-icon-2 me-3" />
              <div>
                <strong>Atenção:</strong> Este comentário possui respostas. 
                A edição pode afetar o contexto das respostas existentes.
              </div>
            </div>
          )}
        </Modal.Body>
        
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-light"
            onClick={handleClose}
            disabled={updateLoading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-warning"
            disabled={updateLoading || !editText.trim() || editText === comment.comment}
          >
            {updateLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Salvando...
              </>
            ) : (
              <>
                <KTSVG path="/media/icons/duotune/general/gen016.svg" className="svg-icon-3 me-2" />
                Salvar Alterações
              </>
            )}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export { CommentEditModal }