import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'

import {useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'

// import {ApplicationState} from '../../../../store'
import {Wppgroup} from '../../../../store/ducks/wppgroup/types'
import {createWppgroupRequest} from '../../../../store/ducks/wppgroup/actions'
import { KTIcon } from '../../../../_metronic/helpers'
// import { Modal } from 'react-bootstrap'
type ParamTypes = {
  id: string
}

interface handleCloseProps {
  handleClose: () => void
}

const Create = ({handleClose}: handleCloseProps) => {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  const [validated, setValidated] = useState(false)
  const {id} = useParams<ParamTypes>()
  // const history = useHistory();
  const dispatch = useDispatch()
  // const wppgroup = useSelector((state: ApplicationState) => state.wppgroup)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)

    if (name && url) {
      var data = new Date()
      const component: Wppgroup = {
        name,
        campId: +id!,
        url,
        clicks: 0,
        //createdAt: data.getTime() / 1000,
        status: '1',
      }
      console.log('component to save:', component)
      dispatch(createWppgroupRequest(component))
      handleClose()
      // history.goBack()
    }
  }

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
      <div className="d-flex flex-column flex-xl-row flex-row-fluid">
      <div className="flex-row-fluid py-lg-2 px-lg-6">
        <Form.Group controlId='fromName'>
          <Form.Label className="required fw-bold fs-6 mb-5">Nome do grupo</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={name}
            onChange={(e:any) => setName(e.target.value)}
            className="form-control form-control-lg form-control-solid"
            autoFocus
          />
          <Form.Control.Feedback type='invalid'>Por favor informe o nome</Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group controlId='formDescription'>
          <Form.Label className="required fw-bold fs-6 mb-5">Url</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={url}
            onChange={(e:any) => setUrl(e.target.value)}
            className="form-control form-control-lg form-control-solid"
            // as="textarea" rows={3}
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe a descrição
          </Form.Control.Feedback>
        </Form.Group>
        <br />

     
        </div>
        </div>
        <div className="d-flex flex-stack pt-2 justify-content-start py-lg-2 px-lg-6">
          <Button
            size="sm"
            variant="primary"
            type="submit"
            className="btn btn-lg btn-primary"
          >
            Salvar
            <KTIcon iconName="arrow-right" className="fs-3 ms-2 me-0" />
          </Button>
        </div>
      </Form>
      {/* Deixar o button fora do form.. */}
    </>
  )
}
export default Create
