import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'

import {useSelector, useDispatch} from 'react-redux'

import {createExtraRequest} from '../../../../../store/ducks/component/actions'
import {Extras} from '../../../../../store/ducks/extras/types'
import {ApplicationState} from '../../../../../store'

// interface ParamTypes {
//   id: string
// }

interface handleCloseProps {
  handleClose: () => void
}

const Create = ({handleClose}: handleCloseProps) => {
  const [keyExtra, setkeyExtra] = useState('url')
  const [valueExtra, setvalueExtra] = useState('')
  const [validated, setValidated] = useState(false)
  // const {id} = useParams<ParamTypes>();
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

    if (keyExtra && valueExtra) {
      var data = new Date()
      const extra: Extras = {
        keyExtra,
        valueExtra,
        componentId: component.data.id,
        //createdAt: data.getTime() / 1000,
        status: '1',
      }
      console.log('extra to save:', extra)
      console.log('component:', component)

      dispatch(createExtraRequest(extra))

      handleClose()
      /* history.goBack() */
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
            value={keyExtra}
            onChange={(e:any) => setkeyExtra(e.target.value)}
            disabled
          />
          <Form.Control.Feedback type='invalid'>Por favor informe o nome</Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group controlId='formDescription'>
          <Form.Label className="required fw-bold fs-6 mb-5">Endereço (url)</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={valueExtra}
            onChange={(e:any) => setvalueExtra(e.target.value)}
            // as="textarea" rows={3}
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe a descrição
          </Form.Control.Feedback>
        </Form.Group>
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
