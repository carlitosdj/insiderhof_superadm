import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
//import { loadLastClassRequest } from '../../../../store/ducks/component/actions'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { User } from "../../../../store/ducks/me/types";
import { Button, Form } from "react-bootstrap";
import { registerLocale, setDefaultLocale } from "react-datepicker";
//import ptBR from 'date-fns/locale/pt-BR';
import {
  // filterUserRequest,
  selectUsersRemoveRequest,
  setFilterEndDateRequest,
  setFilterStartDateRequest,
  // setUserEndDateRequest,
  // setUserStartDateRequest,
} from "../../../../store/ducks/users/actions";
import { useNavigate, useParams } from "react-router-dom";
import {
  loadLaunchRequest,
  loadMyLaunchsRequest,
} from "../../../../store/ducks/dlaunch/actions";

// registerLocale('ptBR', ptBR)
const MOMENT = require("moment");

interface handleCloseProps {
  handleClose: () => void;
}

type ParamTypes = {
  startDate: string
  endDate: string
  launchId: string
};
const Filter = ({ handleClose }: handleCloseProps) => {
  // const {id} = useParams();
  const dispatch = useDispatch();
  const [startDateA, setStartDateA] = useState(new Date());
  const [endDateA, setEndDateA] = useState(new Date());
  const [startDateInt, setStartDateInt] = useState(0);
  const [endDateInt, setEndDateInt] = useState(0);
  const [validated, setValidated] = useState(false);

  const [lid, setLid] = useState(0);

  const { startDate, endDate, launchId } = useParams<ParamTypes>();

  const navigate = useNavigate();
  console.log("startDateInt", startDateInt);
  console.log("endDateInt", endDateInt);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    console.log("handleSubmit");
    console.log("Filters", { startDateInt, endDateInt });

    //dispatch(filterUserRequest(startDateInt, endDateInt))

    //Assim que selecionar um filtro: remove os usuarios que estao marcados
    users.data.map((child) => {
      dispatch(selectUsersRemoveRequest(child));
    });
    

    //redireciona:
    navigate(`/sells/${startDateInt}/${endDateInt}/${lid}`);

    handleClose();
  };
  const setStartDateFunc = (data: any) => {
    console.log("dataStart", data);
    const d1 = new Date(data);

    // Define para 00:00:01
    d1.setHours(0);
    d1.setMinutes(0);
    d1.setSeconds(1);
    d1.setMilliseconds(0);

    console.log(d1);

    // Convertendo para timestamp em segundos
    const result = d1.getTime() / 1000;
    setStartDateInt(result);
    setStartDateA(d1); // Aqui é melhor passar o objeto atualizado
    //dispatch(setUserStartDateRequest(result))
    console.log("RESULT", result)
    console.log("D1", d1)
    //dispatch(setFilterStartDateRequest(result))
    
    //
  };
  const setEndDateFunc = (data: any) => {
    console.log("dataEnd", data);
    const d1 = new Date(data);

    // Define para 23:59:59
    d1.setHours(23);
    d1.setMinutes(59);
    d1.setSeconds(59);
    d1.setMilliseconds(0); // opcional, pode deixar 999 se quiser o último ms do dia

    console.log(d1);

    // Convertendo para timestamp em segundos
    const result = d1.getTime() / 1000;
    console.log("dataEnd", result);

    setEndDateInt(result);
    setEndDateA(d1); // usa o objeto Date com o horário ajustado
    //dispatch(setFilterEndDateRequest(result))
  };

  const me = useSelector((state: ApplicationState) => state.me);
  const users = useSelector((state: ApplicationState) => state.users);
  const launch = useSelector((state: ApplicationState) => state.launch);
  // console.log("user", users);
  // console.log("launch", launch);

  useEffect(() => {
    dispatch(loadMyLaunchsRequest(me.me!.id!));
    //Se nao tiver dados da redux: seta ontem e 7 dias atras como data range:
    if (startDate && endDate) {
      // console.log("users.filterStartDate", users.filterStartDate);	
      // console.log("users.filterEndDate", users.filterEndDate);	
      setStartDateA(new Date(Number(startDate) * 1000));
      setStartDateInt(Number(startDate));
      setEndDateA(new Date(Number(endDate) * 1000));
      setEndDateInt(Number(endDate));
    } else {
      //console.log("NAO TEM")
      const d1 = new Date();
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 7);
      setStartDateA(yesterday);
      setStartDateInt(Math.floor(yesterday.getTime() / 1000));
      setEndDateA(d1);
      setEndDateInt(Math.floor(d1.getTime() / 1000));
      
    }
  }, []);

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
        <div className="row g-5 gx-xxl-12">
          <div className="col-xxl-12">
            {/* <span className='text-dark fw-bolder fs-6'>Última renovação: {createdAt!.format('DD/MM/YYYY HH:mm')}</span>
          <br/> */}
            
            <DatePicker
              locale="ptBR"
              //showTimeSelect
              //dateFormat="Pp"
              dateFormat="dd/MM/yyyy"
              className="form-control"
              selected={startDateA}
              onChange={(date: any) => setStartDateFunc(date)}
            />
            {/* {startDateInt} {users.filterStartDate} */}
            <br />
            <br />
           
            <DatePicker
              locale="ptBR"
              //showTimeSelect
              //dateFormat="Pp"
              dateFormat="dd/MM/yyyy"
              className="form-control"
              selected={endDateA}
              onChange={(date: any) => setEndDateFunc(date)}
            />
            {/* {endDateInt} {users.filterEndDate} */}
            <br />
            <br />
            {/** Select with launch data: */}
            <select 
              className="form-select"
              onChange={(e: any) => {
                setLid(Number(e.target.value));
              }}
              //defaultValue={users.launchId}
              >
              <option value={0}>Todos</option>
              {launch.myLaunchs.map((child) => {
                return (  
                  <option key={child.id} value={child.id} selected={child.id === Number(launchId)}>
                    {child.name}
                  </option>
                );
              })}
            </select>


            <br />

            <br/>
            <Button variant="primary" type="submit">
              Filtrar
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};
export default Filter;
