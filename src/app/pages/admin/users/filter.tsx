import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { ApplicationState } from '../../../../store'
//import { loadLastClassRequest } from '../../../../store/ducks/component/actions'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {User} from '../../../../store/ducks/me/types'
import { Button, Form } from 'react-bootstrap'
import { registerLocale, setDefaultLocale } from  "react-datepicker";
//import ptBR from 'date-fns/locale/pt-BR';
import { filterUserRequest, selectUsersRemoveRequest, setFilterEndDateRequest, setFilterStartDateRequest } from '../../../../store/ducks/users/actions'
import { useNavigate, useParams } from 'react-router-dom';

// registerLocale('ptBR', ptBR)
import moment from 'moment' 

interface handleCloseProps {
  handleClose: () => void
}

type ParamTypes = {
  take: string;
  page: string;
  hasCart: string;
  startDate: string;
  endDate: string;

};
const Filter = ({handleClose}: handleCloseProps) => {
  // const {id} = useParams();
  const dispatch = useDispatch()
  const [startDateA, setStartDateA] = useState(new Date());
  const [endDateA, setEndDateA] = useState(new Date());
  const [startDateInt, setStartDateInt] = useState(0);
  const [endDateInt, setEndDateInt] = useState(0);
  const [validated, setValidated] = useState(false)

  const { page, take, hasCart, startDate, endDate } = useParams<ParamTypes>();

  const navigate = useNavigate()
  console.log("startDateInt", startDateInt)
  console.log("endDateInt", endDateInt)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)
    console.log('handleSubmit')
    console.log("Filters", { startDateInt, endDateInt})
   
    //dispatch(filterUserRequest(startDateInt, endDateInt))

    //Assim que selecionar um filtro: remove os usuarios que estao marcados
    users.data.map((child)=>{
      dispatch(selectUsersRemoveRequest(child))
    })

    //redireciona:
    navigate(`/users/${page}/${take}/${hasCart}/${startDateInt}/${endDateInt}`)

    handleClose()

  }
  const setStartDateFunc = (data:any) => {
    console.log("dataStart",data)
    const d1 = new Date(data);
    console.log(d1);

    // converting to number
    const result = d1.getTime()/1000;
    setStartDateInt(result)
    setStartDateA(data)
    //dispatch(setFilterStartDateRequest(result))
  }
  const setEndDateFunc = (data:any) => {
    console.log("dataEnd",data)
    const d1 = new Date(data);
    console.log(d1);

    // converting to number
    const result = d1.getTime()/1000;
    console.log("dataEnd",result)
    setEndDateInt(result)
    setEndDateA(data)
    //dispatch(setFilterEndDateRequest(result))
  }

  useEffect(() => {

    //Se nao tiver dados da redux: seta ontem e 7 dias atras como data range:
    if(startDate && endDate){ 
      setStartDateA(new Date(Number(startDate) * 1000));
      setStartDateInt(Number(startDate));
      setEndDateA(new Date(Number(endDate) * 1000));
      setEndDateInt(Number(endDate));

    } else {
      const d1 = new Date();
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 7);
      setStartDateA(yesterday)
      setStartDateInt(Math.floor(yesterday.getTime()/1000))
      setEndDateA(d1)
      setEndDateInt(Math.floor(d1.getTime()/1000))
    }


  }, [])
  const users = useSelector((state: ApplicationState) => state.users)
  console.log("user", users)
  return (
    <>
     <Form validated={validated} onSubmit={handleSubmit}>
      <div className='row g-5 gx-xxl-12'>
        <div className='col-xxl-12'>
          {/* <span className='text-dark fw-bolder fs-6'>Última renovação: {createdAt!.format('DD/MM/YYYY HH:mm')}</span>
          <br/> */}
         
          <DatePicker 
            locale="ptBR"
            //showTimeSelect
            //dateFormat="Pp" 
            dateFormat="dd/MM/yyyy"
            className='form-control' 
            selected={startDateA} 
            onChange={(date:any) => setStartDateFunc(date)} 
          />
          {/* {startDateInt} {users.filterStartDate} */}
          <br/><br/>
         
          <DatePicker 
            locale="ptBR"
            //showTimeSelect
            //dateFormat="Pp" 
            dateFormat="dd/MM/yyyy"
            className='form-control' 
            selected={endDateA} 
            onChange={(date:any) => setEndDateFunc(date)} 
          />
          {/* {endDateInt} {users.filterEndDate} */}
          <br/><br/>
          <Button variant='primary' type='submit'>
            Filtrar
          </Button>
        </div>
      </div>
      </Form>
      
      
    </>
  )
}
export default Filter
