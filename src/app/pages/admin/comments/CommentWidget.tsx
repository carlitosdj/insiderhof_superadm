/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { KTSVG } from '../../../../_metronic/helpers'
import { useIntl } from 'react-intl'

import Loading from '../../../loading'
import { Comment, CommentsState } from '../../../../store/ducks/comments/types'
import { deleteCommentRequest } from '../../../../store/ducks/comments/actions'
import { CommentCard } from './CommentCard'
import { CommentReplyForm } from './CommentReplyForm'
import { CommentEditModal } from './CommentEditModal'

type Props = {
  className: string
  comments: CommentsState
}

const CommentWidget: React.FC<React.PropsWithChildren<Props>> = ({className, comments}) => {
  const intl = useIntl()
  const dispatch = useDispatch()

  const [selectedComment, setSelectedComment] = useState<Comment | undefined>()
  const [replyingTo, setReplyingTo] = useState<Comment | undefined>()
  const [showEditModal, setShowEditModal] = useState(false)
  
  const handleReply = (comment: Comment) => {
    setReplyingTo(comment)
  }

  const handleEdit = (comment: Comment) => {
    setSelectedComment(comment)
    setShowEditModal(true)
  }

  const handleDelete = (comment: Comment) => {
    if (window.confirm(`Tem certeza que deseja excluir este comentário?\n\n"${comment.comment}"`)) {
      dispatch(deleteCommentRequest(comment.id!))
    }
  }

  const handleCancelReply = () => {
    setReplyingTo(undefined)
  }

  const handleReplySuccess = () => {
    setReplyingTo(undefined)
    // TODO: Refresh comments or update state
  }

  const handleEditSuccess = () => {
    setSelectedComment(undefined)
    // TODO: Refresh comments or update state
  }

  const organizeComments = (comments: Comment[]): Comment[] => {
    // Find replies for each comment by checking different possible fields
    const commentsWithReplies = comments.map(comment => {
      // Find replies for this comment using different possible parent field names
      const replies = comments.filter(c => 
        c.parentCommentId === comment.id || 
        (c as any).parentId === comment.id ||
        (c as any).parent_id === comment.id
      )
      
      // A comment is answered if it has replies
      const isAnswered = replies.length > 0
      
      return {
        ...comment,
        replies: replies,
        isAnswered: isAnswered,
        hasReplies: replies.length > 0,
        repliesCount: replies.length,
        // Mock launchId for demonstration - should come from API
        launchId: 95
      }
    })

    // Return only top-level comments (not replies) - filter out comments that are replies
    const topLevelComments = commentsWithReplies.filter(comment => 
      !comment.parentCommentId && 
      !(comment as any).parentId && 
      !(comment as any).parent_id
    )
    
    return topLevelComments
  }
  
  if (comments.loading) return <Loading />

  const organizedComments = organizeComments(comments.data)

  return (
    <>
      <div className={`card ${className}`}>
        {/* Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>
              Comentários
            </span>
            <span className='text-muted mt-1 fw-bold fs-7'>
              Gerenciamento de comentários da plataforma
            </span>
          </h3>
          <div className='card-toolbar'>
            <div className='d-flex align-items-center gap-3'>
              <div className='d-flex align-items-center'>
                <span className='badge badge-success me-2'>{organizedComments.filter(c => c.isAnswered).length}</span>
                <span className='fs-7 text-muted'>Respondidos</span>
              </div>
              <div className='d-flex align-items-center'>
                <span className='badge badge-danger me-2'>{organizedComments.filter(c => !c.isAnswered).length}</span>
                <span className='fs-7 text-muted'>Não respondidos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className='card-body py-3'>
          {organizedComments.length === 0 ? (
            <div className="text-center py-10">
              <div className="mb-4">
                <KTSVG path="/media/icons/duotune/communication/com012.svg" className="svg-icon-1 text-muted" />
              </div>
              <p className="text-muted fs-6 fw-semibold">
                Nenhum comentário encontrado
              </p>
            </div>
          ) : (
            <div className="timeline">
              {organizedComments.map((comment, index) => (
                <div key={comment.id || index}>
                  <CommentCard
                    comment={comment}
                    onReply={handleReply}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                  
                  {/* Show reply form if this comment is being replied to */}
                  {replyingTo?.id === comment.id && (
                    <CommentReplyForm
                      parentComment={comment}
                      onCancel={handleCancelReply}
                      onSuccess={handleReplySuccess}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <CommentEditModal
        show={showEditModal}
        comment={selectedComment}
        onHide={() => setShowEditModal(false)}
        onSuccess={handleEditSuccess}
      />
    </>
  )
}

export {CommentWidget}
