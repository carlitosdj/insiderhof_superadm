import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'

import {createComponentRequest} from '../../../../../store/ducks/component/actions'
import {Component as Comp} from '../../../../../store/ducks/component/types'
import {ApplicationState} from '../../../../../store'
import {CKEditor} from 'ckeditor4-react'
import { KTIcon } from '../../../../../_metronic/helpers'

// import momentDurationFormatSetup from 'moment-duration-format';

// const MOMENT = require('moment')
// momentDurationFormatSetup(MOMENT)

// import { Modal } from 'react-bootstrap'
type ParamTypes = {
  id: string
}

interface handleCloseProps {
  handleClose: () => void
}

const Create = ({handleClose}: handleCloseProps) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [order, setOrder] = useState('')
  const [orderby, setOrderby] = useState('')
  const [tags, setTags] = useState('')
  const [duration, setDuration] = useState('00:00:00')
  const [ckEditor, setCkEditor] = useState(false)

  const [validated, setValidated] = useState(false)
  const {id} = useParams<ParamTypes>()
  // const history = useHistory();
  const dispatch = useDispatch()
  const component = useSelector((state: ApplicationState) => state.component)

  console.log('Component inside - create', component)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)

    if (name) {
      var data = new Date()
      const component: Comp = {
        name,
        description,
        //order,
        componentId: +id!,
        //createdAt: (data.getTime() / 1000).toString(),
        status: '1',
        // duration: MOMENT.duration(duration).asSeconds(),
        // tags,
        // orderby,
      }
      console.log('component to save:', component)
      dispatch(createComponentRequest(component))
      handleClose()
      // history.goBack()
    }
  }

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId='fromName'>
          <Form.Label className="required fw-bold fs-6 mb-5">Nome da fase</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            className="form-control form-control-lg form-control-solid"
            autoFocus
          />
          <Form.Control.Feedback type='invalid'>Por favor informe o nome</Form.Control.Feedback>
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
              onChange={(e: any) => setDescription(e.target.value)}
              as='textarea'
              rows={3}
              className="form-control form-control-lg form-control-solid"
            />
            <Form.Control.Feedback type='invalid'>
              Por favor informe a descrição
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
        

        <Button size='sm' variant='primary' type='submit' className='float-right'>
          Salvar
        </Button>
      </Form>
      {/* Deixar o button fora do form.. */}
    </>
  )
}
export default Create
