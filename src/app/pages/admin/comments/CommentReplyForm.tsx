import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Comment } from '../../../../store/ducks/comments/types'
import { replyCommentRequest } from '../../../../store/ducks/comments/actions'
import { ApplicationState } from '../../../../store'
import { KTSVG } from '../../../../_metronic/helpers'

type Props = {
  parentComment: Comment
  onCancel: () => void
  onSuccess?: () => void
}

const CommentReplyForm: React.FC<Props> = ({ parentComment, onCancel, onSuccess }) => {
  const dispatch = useDispatch()
  const { replyLoading } = useSelector((state: ApplicationState) => state.comments)
  const [replyText, setReplyText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!replyText.trim()) {
      return
    }

    dispatch(replyCommentRequest(parentComment.id!, replyText))
    setReplyText('')
    onSuccess?.()
  }

  return (
    <div className="mt-4 ms-8">
      <div className="border border-dashed border-primary rounded p-4 bg-light-primary">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <KTSVG path="/media/icons/duotune/general/gen055.svg" className="svg-icon-3 me-2" />
              Responder comentário
            </label>
            
            {/* Parent comment context */}
            <div className="bg-secondary bg-opacity-10 p-3 rounded mb-3">
              <div className="fs-7 text-muted mb-1">Respondendo a:</div>
              <div className="fs-6 text-gray-800 fw-semibold">{parentComment.parentUser?.name}</div>
              <div className="fs-6 text-gray-700 mt-1">{parentComment.comment}</div>
            </div>
            
            <textarea
              className="form-control"
              rows={4}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Digite sua resposta..."
              disabled={replyLoading}
              required
            />
            <div className="form-text">
              Sua resposta será enviada como administrador da plataforma.
            </div>
          </div>
          
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-light btn-sm"
              onClick={onCancel}
              disabled={replyLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={replyLoading || !replyText.trim()}
            >
              {replyLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Enviando...
                </>
              ) : (
                <>
                  <KTSVG path="/media/icons/duotune/general/gen016.svg" className="svg-icon-3 me-2" />
                  Enviar Resposta
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export { CommentReplyForm }