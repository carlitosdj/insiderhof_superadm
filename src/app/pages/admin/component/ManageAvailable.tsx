import {Available} from '../../../../store/ducks/componentavailable/types'
import {Button, Form} from 'react-bootstrap'
import {useEffect, useState} from 'react'
import {Component} from '../../../../store/ducks/component/types'
import {useDispatch} from 'react-redux'
import {updateComponentRequest} from '../../../../store/ducks/component/actions'

interface handleCloseProps {
  handleClose: () => void
  child: Component
}
const ManageAvailable = ({handleClose, child}: handleCloseProps) => {
  const [inputList, setInputList] = useState([
    {turmaNum: '', availableDate: '', componentId: child.id},
  ])
  const [validated, setValidated] = useState(false)

  const dispatch = useDispatch()
  // handle click event of the Remove button

  const handleInputChange = (e: any, index: number, type: string) => {
    const list: any = [...inputList]
    list[index][type] = e.target.value
    setInputList(list)
  }

  const handleRemoveClick = (index: any) => {
    console.log('INDEX to remove', index)
    const list = [...inputList]
    list.splice(index, 1)
    setInputList(list)
  }

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        turmaNum: (parseInt(inputList[inputList.length - 1].turmaNum) + 1).toString(),
        availableDate: '',
        componentId: child.id,
      },
    ])
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)
    console.log('inputList para salvar', inputList)

    let newComponent: Component = {}

    newComponent.id = child.id
    newComponent.available = []

    inputList.map((it) => {
      if (it.availableDate && it.turmaNum && it.componentId)
        newComponent.available.push({
          turmaNum: it.turmaNum,
          availableDate: it.availableDate,
          componentId: it.componentId,
        })
    })

    console.log('NEWCOMPONENT', newComponent)
    dispatch(updateComponentRequest(newComponent))
    handleClose()
  }

  const setConfigItems = (list: Available[]) => {
    // console.log('setConfigItems', list)
    let initialList: any = []
    list.map((it) => {
      let item = {
        id: '' + it.id!,
        turmaNum: it.turmaNum!,
        availableDate: it.availableDate!,
        componentId: child.id,
      }
      initialList.push(item)
    })

    initialList.push({
      turmaNum:  list.length ? (parseInt(list[list.length - 1].turmaNum) + 1).toString() : '1',
      availableDate: '',
      componentId: child.id,
    })
    setInputList(initialList)
  }

  useEffect(() => {
    //Itens para modalidade:
    setConfigItems(child.available)
  }, [])

  //   console.log('VER AQUI', child.available)
  //   console.log('INPUTLIST', inputList)

  return (
    <div>
      <Form validated={validated} onSubmit={handleSubmit}>
        {/* <h3><a href="https://cluemediator.com">Clue Mediator</a></h3> */}
        {inputList.map((x, i) => {
          return (
            <div key={i}>
              <div className='row'>
                <div className='col-5'>
                  <Form.Group>
                    <Form.Control
                      placeholder='Turma Num'
                      name='turmaNum'
                      value={x.turmaNum}
                      onChange={(e) => handleInputChange(e, i, 'turmaNum')}
                    />
                  </Form.Group>
                </div>

                <div className='col-6'>
                  <Form.Group>
                    <Form.Control
                      placeholder='Available Date'
                      name='availableDate'
                      value={x.availableDate}
                      onChange={(e) => handleInputChange(e, i, 'availableDate')}
                    />
                  </Form.Group>
                </div>

                <div className='col-1'>
                  {inputList.length !== 1 && (
                    <Button
                      size='sm'
                      variant='primary'
                      className='float-right'
                      onClick={() => handleRemoveClick(i)}
                    >
                      X
                    </Button>
                  )}
                  <br />
                  <br />
                  {inputList.length - 1 === i && (
                    <Button
                      size='sm'
                      variant='primary'
                      className='float-right'
                      onClick={handleAddClick}
                    >
                      +
                    </Button>
                  )}
                </div>
              </div>
              <br />
            </div>
          )
        })}
        <Button size='sm' variant='primary' type='submit' className='float-right'>
          Salvar
        </Button>{' '}
        <Button
          size='sm'
          variant='secondary'
          type='submit'
          className='float-right'
          onClick={handleClose}
        >
          Close
        </Button>
      </Form>
    </div>
  )
}

export default ManageAvailable
