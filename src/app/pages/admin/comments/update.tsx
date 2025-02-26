import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'

import {useSelector, useDispatch} from 'react-redux'
import {updateSupportRequest} from '../../../../store/ducks/support/actions'
import {ApplicationState} from '../../../../store'

interface handleCloseProps {
  handleClose: () => void
  child: any
}

const Update = ({handleClose, child}: handleCloseProps) => {
  const [status, setStatus] = useState<string | undefined>('')
  const [reply, setReply] = useState<string | undefined>('')
  const [validated, setValidated] = useState<boolean>(false)

  const me = useSelector((state: ApplicationState) => state.me)

  const dispatch = useDispatch()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    console.log('handle submit')
    setValidated(true)
    // if(reply){
    var data = new Date()
    const supportToUpdate = child
    supportToUpdate.reply = reply
    supportToUpdate.status = Number(status)
    supportToUpdate.parentAdmin = me.me.id!
    supportToUpdate.adminId = me.me.id!
    supportToUpdate.repliedAt = data.getTime() / 1000

    console.log('support', supportToUpdate)
    dispatch(updateSupportRequest(supportToUpdate))
    handleClose()

    // }
  }

  useEffect(() => {
    setStatus(child.status)
    setReply(child.reply)
  }, [])

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
        {child.parentUser.name} <br />
        {child.message}
        <Form.Group controlId='fromName'>
          <Form.Label className="required fw-bold fs-6 mb-5">Reply</Form.Label>
          <Form.Control
            as='textarea'
            rows={10}
            placeholder=''
            value={reply}
            onChange={(e:any) => setReply(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>Por favor o reply</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='fromName'>
          <Form.Label className="required fw-bold fs-6 mb-5">Status</Form.Label>
          <Form.Control placeholder='' value={status} onChange={(e:any) => setStatus(e.target.value)} />
          <Form.Control.Feedback type='invalid'>Por favor informe o endereço</Form.Control.Feedback>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
      {/* Deixar o button fora do form.. */}
    </>
  )
}
export default Update
