import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'

import {useSelector, useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../store'

import {Wppcamp} from '../../../../store/ducks/wppcamp/types'
import {updateCampRequest} from '../../../../store/ducks/wppcamp/actions'
import { KTIcon } from '../../../../_metronic/helpers'

interface handleCloseProps {
  handleClose: () => void
  child: Wppcamp
}

const Update = ({handleClose, child}: handleCloseProps) => {
  const dispatch = useDispatch()
  const [validated, setValidated] = useState(false)
  const wppcamp = useSelector((state: ApplicationState) => state.wppcamp)
  const [name, setName] = useState<string | undefined>('')
  const [description, setDescription] = useState<string | undefined>('')
  const [slug, setSlug] = useState<string | undefined>('')
  const [maxclicks, setMaxclicks] = useState<number | undefined>(0)

  useEffect(() => {
    setName(child.name)
    setDescription(child.description)
    setSlug(child.slug)
    setMaxclicks(child.maxclicks)
    // setOrder(child.order)
  }, [child.name, child.description, child.slug, child.maxclicks])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('submit', wppcamp)
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)
    if (name && description && slug && maxclicks) {
      var data = new Date()
      const componentToUpdate: Wppcamp = {
        id: child.id,
        name,
        description,
        //createdAt: data.getTime() / 1000, //updated_at
        status: '1',
        maxclicks: +maxclicks,
        slug,
      }

      console.log('------------------ COMPONENT TO UPDATE', componentToUpdate)
      dispatch(updateCampRequest(componentToUpdate))
      handleClose()
    }
  }

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
      <div className="d-flex flex-column flex-xl-row flex-row-fluid">
      <div className="flex-row-fluid py-lg-2 px-lg-6">
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
            Por favor informe o nome da campanha
          </Form.Control.Feedback>
        </Form.Group>
        <br/>
        <Form.Group controlId='formDescription'>
          <Form.Label className="required fw-bold fs-6 mb-5">Descrição</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={description}
            onChange={(e:any) => setDescription(e.target.value)}
            as='textarea'
            rows={3}
            name='description'
            className="form-control form-control-lg form-control-solid"
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe a descrição da campanha
          </Form.Control.Feedback>
        </Form.Group>
        <br/>
        <Form.Group controlId='fromSlug'>
          <Form.Label className="required fw-bold fs-6 mb-5">Slug</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={slug}
            onChange={(e:any) => setSlug(e.target.value)}
            name='name'
            className="form-control form-control-lg form-control-solid"
          />
          <Form.Control.Feedback type='invalid'>Por favor informe o slug</Form.Control.Feedback>
        </Form.Group>
        <br/>
        <Form.Group controlId='fromMaxclicks'>
          <Form.Label className="required fw-bold fs-6 mb-5">Max cliques</Form.Label>
          <Form.Control
            placeholder=''
            required
            value={maxclicks}
            onChange={(e:any) => setMaxclicks(e.target.value)}
            name='maxclicks'
            className="form-control form-control-lg form-control-solid"
          />
          <Form.Control.Feedback type='invalid'>
            Por favor informe o max clicks
          </Form.Control.Feedback>
        </Form.Group>
        <br/>
        
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
    </>
  )
}
export default Update
