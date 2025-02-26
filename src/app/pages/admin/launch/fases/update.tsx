import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../../store'
import {updateComponentRequest} from '../../../../../store/ducks/component/actions'
import {CKEditor} from 'ckeditor4-react'
import {Component} from '../../../../../store/ducks/component/types'

import momentDurationFormatSetup from 'moment-duration-format';
import { KTIcon } from '../../../../../_metronic/helpers'

const MOMENT = require('moment')
momentDurationFormatSetup(MOMENT)

interface handleCloseProps {
  handleClose: () => void
  child: Component
}

const Update = ({handleClose, child}: handleCloseProps) => {
  const dispatch = useDispatch()
  const [validated, setValidated] = useState(false)
  const component = useSelector((state: ApplicationState) => state.component)
  const [name, setName] = useState<string | undefined>('')
  const [tags, setTags] = useState<string | undefined>('')
  const [description, setDescription] = useState<string | undefined>('')
  const [order, setOrder] = useState<string | undefined>('')
  const [orderby, setOrderby] = useState<string | undefined>('')
  const [status, setStatus] = useState<string>('1')
  const [duration, setDuration] = useState<string | undefined>('')
  const [ckEditor, setCkEditor] = useState(false)

  useEffect(() => {
    setName(child.name)
    setDescription(child.description)
    setOrder(child.order)
    setTags(child.tags)
    setStatus(child.status!)
    setOrderby(child.orderby)
    setDuration(MOMENT.duration(child.duration, "seconds").format("hh:mm:ss", {trim: false}))
  }, [child.name, child.description, child.order, child.duration])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('submit', component.data.id)
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)
    if (name && description) {
      var data = new Date()
      const componentToUpdate = {
        id: child.id,
        name,
        description,
        order,
        //createdAt: (data.getTime() / 1000).toString(), //updated_at
        status,
        duration: MOMENT.duration(duration).asSeconds(),
        tags,
        orderby
      }

      console.log('------------------ COMPONENT TO UPDATE', componentToUpdate)
      dispatch(updateComponentRequest(componentToUpdate))
      handleClose()
    }
  }

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId='fromName'>
          <Form.Label className="required fw-bold fs-6 mb-5">Nome do componente</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={name}
            onChange={(e:any) => setName(e.target.value)}
            name='name'
            className="form-control form-control-lg form-control-solid"
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe o nome do produto
          </Form.Control.Feedback>
        </Form.Group>
        <br />

        <Button
            size="sm"
            className="btn btn-light-primary"
            onClick={() => setCkEditor(!ckEditor)}
          >
            <KTIcon iconName="arrow-mix" className="fs-2" />
            Trocar editor
          </Button>
        <br />
        <br />
        {!ckEditor ? (
          <Form.Group controlId='formDescription'>
            <Form.Label className="required fw-bold fs-6 mb-5">Descrição</Form.Label>
            <Form.Control
              placeholder=''
              //required
              value={description}
              onChange={(e:any) => setDescription(e.target.value)}
              as='textarea'
              rows={3}
              name='description'
              className="form-control form-control-lg form-control-solid"
            />
            <Form.Control.Feedback type='invalid'>
              Por favor informe a descrição do produto
            </Form.Control.Feedback>
          </Form.Group>
        ) : (
          <CKEditor
            config={{versionCheck: false}}
            initData={description}
            onChange={(e: any) => setDescription(e.editor.getData())}
          />
        )}
        <br />
       
        <Button variant='primary' type='submit' className='float-right'>
          Salvar
        </Button>
      </Form>
    </>
  )
}
export default Update
