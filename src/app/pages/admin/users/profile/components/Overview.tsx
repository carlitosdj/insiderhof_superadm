import { useSelector } from "react-redux";
import { ApplicationState } from "../../../../../../store";
import { KTIcon } from "../../../../../../_metronic/helpers";
import Loading from "../../../../../loading";
import _ from "lodash";
import { useEffect, useState } from "react";
import { User } from "../../../../../../store/ducks/me/types";
import { ChartsWidgetGeral } from "./ChartsWidget";
import { ChartsWidgetWeek } from "./ChartsWidgetWeek";

const MOMENT = require("moment");

type overviewProps = {
  user: User;
};

const getValuesCountFromArray = (list: any, num: number) => {
  let values = [];
  for (let i = 0; i < num; i++) {
    const item = list.filter((item: any) => item.hour == i)[0];
    values[i] = item ? item.count : 0;
  }
  return values;
};

const getValuesTimeFromArray = (list: any, num: number) => {
  let values = [];
  for (let i = 0; i < num; i++) {
    const item = list.filter((item: any) => item.hour == i)[0];
    values[i] = item ? item.sum : 0;
  }
  return values;
};


const getValuesWeekFromArray = (list: any, num: number) => {
  let values = [];
  for (let i = 0; i < num; i++) {
    const item = list.filter((item: any) => item.weekday == i)[0];
    console.log("itemxxxxxxxxxx", item)
    values[i] = item ? item.count : 0;
  }
  return values;
};

const getValuesWeekTimeFromArray = (list: any, num: number) => {
  let values = [];
  for (let i = 0; i < num; i++) {
    const item = list.filter((item: any) => item.weekday == i)[0];
    values[i] = item ? item.sum : 0;
  }
  return values;
};

export function Overview({ user }: overviewProps) {
  const {
    id,
    email,
    whatsapp,
    address,
    addressComplement,
    addressNumber,
    addressDistrict,
    postalCode,
    name,
    createdAt,
    lastLoginAt,
    city,
    state,
    numTurma,
    cpf,
  } = user;

  let formatedcreatedAt = MOMENT(createdAt).utc(); //.format('DD/MM/YYYY HH:mm')
  const component = useSelector((state: ApplicationState) => state.component);
  const onlineusers = useSelector(
    (state: ApplicationState) => state.onlineusers
  )

  const [dataGeral, setDataGeral] = useState<any>([]);
  const [dataById, setDataById] = useState<any>([]);
  const [dataGeralSum, setDataGeralSum] = useState<any>([]);
  const [dataByIdSum, setDataByIdSum] = useState<any>([]);

  const [dataWeekGeral, setDataWeekGeral] = useState<any>([]);
  const [dataWeekGeralSum, setDataWeekGeralSum] = useState<any>([]);
  const [dataWeekById, setDataWeekById] = useState<any>([]);
  const [dataWeekByIdSum, setDataWeekByIdSum] = useState<any>([]);

  useEffect(() => {
      setDataGeral(getValuesCountFromArray(onlineusers.data,24));
      setDataGeralSum(getValuesTimeFromArray(onlineusers.data,24));
      setDataById(getValuesCountFromArray(onlineusers.dataById,24));
      setDataByIdSum(getValuesTimeFromArray(onlineusers.dataById,24));

      setDataWeekGeral(getValuesWeekFromArray(onlineusers.weekData, 7));
      setDataWeekGeralSum(getValuesWeekTimeFromArray(onlineusers.weekData, 7));
      setDataWeekById(getValuesWeekTimeFromArray(onlineusers.weekDataById, 7));
      setDataWeekByIdSum(getValuesWeekTimeFromArray(onlineusers.weekDataById, 7));
  }, []);


  console.log("onlineusers", onlineusers);
  console.log("dataGeral", dataGeral);
  console.log("dataById", dataById);
  console.log("dataGeralSum", dataGeralSum);
  console.log("dataByIdSum", dataByIdSum);

  console.log("dataWeekGeral", dataWeekGeral);
  console.log("dataWeekById", dataWeekById);
  console.log("dataWeekGeralSum", dataWeekGeralSum);
  console.log("dataWeekByIdSum", dataWeekByIdSum);
  

  if (onlineusers.loadingDataById || onlineusers.loadingData)
    return <Loading />;

  return (
    <div className="row g-5 g-xxl-8">
      <div className="col-xl-12">
        <div className={`card mb-5 mb-xxl-8`}>
          {/* begin::Header */}
          <div className="card-header align-items-center border-0 mt-4">
            <h3 className="card-title align-items-start flex-column">
              <span className="fw-bold mb-2 text-gray-900">
                Dados cadastrais
              </span>
              <span className="text-muted fw-semibold fs-7">
                Dados informados pelo cliente
              </span>
            </h3>
          </div>
          {/* end::Header */}
          {/* begin::Body */}
          <div className="card-body pt-5">
            <div className="d-flex align-items-center text-gray-500  me-5 mb-2">
              <KTIcon iconName="geolocation" className="fs-4 me-1" />
              {name}
            </div>

            <div className="d-flex align-items-center text-gray-500  me-5 mb-2">
              <KTIcon iconName="geolocation" className="fs-4 me-1" />
              Refêrencia: EL{id}
            </div>

            <div className="d-flex align-items-center text-gray-500  me-5 mb-2">
              <KTIcon iconName="geolocation" className="fs-4 me-1" />
              Email: {email}
            </div>

            <div className="d-flex align-items-center text-gray-500  me-5 mb-2">
              <KTIcon iconName="geolocation" className="fs-4 me-1" />
              CPF: {cpf}
            </div>

            <div className="d-flex align-items-center text-gray-500  me-5 mb-2">
              <KTIcon iconName="geolocation" className="fs-4 me-1" />
              WhatsApp: {whatsapp}
            </div>

            <div className="d-flex align-items-center text-gray-500  me-5 mb-2">
              <KTIcon iconName="geolocation" className="fs-4 me-1" />
              Último login: {MOMENT(lastLoginAt).format("DD/MM/YYYY HH:mm")}
            </div>

            <div className="d-flex align-items-center text-gray-500  me-5 mb-2">
              <KTIcon iconName="geolocation" className="fs-4 me-1" />
              Última renovação: {formatedcreatedAt.format("DD/MM/YYYY HH:mm")}
            </div>

            <div className="d-flex align-items-center text-gray-500  me-5 mb-2">
              <KTIcon iconName="geolocation" className="fs-4 me-1" />
              Turma: {numTurma}
            </div>

            {component.loadingLastClass ? (
              <Loading />
            ) : (
              <div className="d-flex align-items-center text-gray-500  me-5 mb-2">
                <KTIcon iconName="geolocation" className="fs-4 me-1" />
                Última aula assistida:
                {component.lastclass?.parent?.parent?.name} -{" "}
                {component.lastclass?.parent?.name} -{" "}
                {component.lastclass?.name}
              </div>
            )}

            <div className="d-flex align-items-center text-gray-500  me-5 mb-2">
              <KTIcon iconName="geolocation" className="fs-4 me-1" />
              {address}, {addressNumber}, {addressDistrict}{" "}
              {addressComplement ? `, ${addressComplement}` : ""} - {city?.name}{" "}
              / {state?.state} - {postalCode}
            </div>
          </div>
          {/* end: Card Body */}
        </div>
        <div className="row g-5 g-xxl-8">
          <div className="col-xl-6">
            {dataGeral.length > 0 && (
              <ChartsWidgetGeral
                className="mb-5 mb-xxl-8"
                title="GERAL/QUANTIDADE"
               
                list={dataGeral}
              />
            )}
          </div>
          <div className="col-xl-6">
            {dataGeralSum.length > 0 && (
              <ChartsWidgetGeral
            
                className="mb-5 mb-xxl-8"
                title="GERAL/TEMPO"
                list={dataGeralSum}
              />
            )}
          </div>
        </div>
      </div>

      <div className="col-xl-12">
        <div className="row g-5 g-xxl-8">
          <div className="col-xl-6">
            {dataById.length > 0 && (
              <ChartsWidgetGeral
         
                className="mb-5 mb-xxl-8"
                title="USUARIO/QUANTIDADE"
                list={dataById}
              />
            )}
          </div>
          <div className="col-xl-6">
            {dataByIdSum.length > 0 && (
              <ChartsWidgetGeral
         
                className="mb-5 mb-xxl-8"
                title="USUARIO/TEMPO"
                list={dataByIdSum}
              />
            )}
          </div>
        </div>
      </div>

xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

      <div className="col-xl-12">
        <div className="row g-5 g-xxl-8">
          <div className="col-xl-6">
            {dataWeekGeral.length > 0 && (
              <ChartsWidgetWeek
         
                className="mb-5 mb-xxl-8"
                title="dataWeekGeral"
                list={dataWeekGeral}
              />
            )}
          </div>
          <div className="col-xl-6">

          {dataWeekGeral.length > 0 && (
              <ChartsWidgetWeek
         
                className="mb-5 mb-xxl-8"
                title="dataWeekGeralSum"
                list={dataWeekGeralSum}
              />
            )}
          </div>
        </div>
      </div>


      <div className="col-xl-12">
        <div className="row g-5 g-xxl-8">
          <div className="col-xl-6">
            
          {dataByIdSum.length > 0 && (
              <ChartsWidgetWeek
         
                className="mb-5 mb-xxl-8"
                title="dataWeekById"
                list={dataWeekById}
              />
            )}
          </div>
          <div className="col-xl-6">
            {dataByIdSum.length > 0 && (
              <ChartsWidgetWeek
         
                className="mb-5 mb-xxl-8"
                title="dataWeekByIdSum"
                list={dataWeekByIdSum}
              />
            )}
          </div>
        </div>
      </div>


    </div>
  );
}
