/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
// import {Link} from 'react-router-dom'

// import {KTSVG} from '../../../_metronic/helpers'
import { useDispatch } from "react-redux";

// import {useNavigate} from 'react-router-dom'
// import Create from './create'
// import Update from './update'
// import {Wppcamp, WppcampState} from '../../../../store/ducks/wppcamp/types'
// import {deleteCampRequest} from '../../../../store/ducks/wppcamp/actions'
import { LeadsState } from "../../../../store/ducks/leads/types";
import {
  loadLeadsRequest,
  searchLeadsRequest,
  loadLeadListsRequest,
  loadLeadsByListRequest,
  loadExportLeadsRequest,
  setSelectedList,
} from "../../../../store/ducks/leads/actions";
import Pagination from "../../../../customHooks/Pagination";
import { KTIcon } from "../../../../_metronic/helpers";
// import _ from "lodash";
// import { Link } from 'react-router-dom'

type Props = {
  className: string;
  leads: LeadsState;
  page?: string;
  take?: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
};

const ManageLeadsWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  leads,
  page,
  take,
  setCurrentPage,
  currentPage,
}) => {
  const [search, setSearch] = useState("");

  console.log("PARAMS: page", page);
  console.log("PARAMS: take", take);
  console.log("Current PAGE", currentPage);
  // useEffect(() => {
  //   setCurrentPage(+page!)
  // }, [setCurrentPage, currentPage])

  // const [extra, setExtra] = useState<Extras>({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadLeadListsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (leads.exportData.length > 0 && !leads.exportLoading) {
      // Remover duplicatas baseado no email quando exportar todas as listas
      const uniqueLeads = leads.selectedList
        ? leads.exportData
        : leads.exportData.reduce((acc: any[], lead: any) => {
            // Verifica se já existe um lead com esse email
            if (!acc.find((item: any) => item.email === lead.email)) {
              acc.push(lead);
            }
            return acc;
          }, []);

      const csvContent = "data:text/csv;charset=utf-8,"
        + "Nome,Email,Lista,Registro,Confirmado,Confirmado Em,Não Perturbe,Origem\n"
        + uniqueLeads.map((lead: any) => `"${lead.name}","${lead.email}","${lead.list}","${lead.createdAt}","${lead.confirm}","${lead.confirmedAt}","${lead.naoperturbe}","${lead.origin}"`).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      const fileName = leads.selectedList ? `leads_${leads.selectedList}.csv` : "leads_todas_listas.csv";
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [leads.exportData, leads.exportLoading, leads.selectedList]);
  // const history = useHistory();

  const searchLeads = () => {
    console.log("search", search);
    if (search) dispatch(searchLeadsRequest(search));
    else dispatch(loadLeadsRequest(+page!, +take!));
  };

  const exportCSV = () => {
    // Usar "ALL" como palavra-chave para exportar todas as listas
    const listToExport = leads.selectedList || "ALL";
    dispatch(loadExportLeadsRequest(listToExport));
  };

  console.log("leads", leads);
  let count = leads.count;
  // let pages = Math.ceil(+count! / +take!)
  let length = leads?.data?.length;
  return (
    <div>
      {/* <br /> */}
      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className="card-header border-0 pt-6">
          {/* <div className=""> */}
            <div className="card-title">
            {/* begin::Search */}
            <div className="d-flex align-items-center position-relative my-1">
              <KTIcon
                iconName="magnifier"
                className="fs-1 position-absolute ms-6"
              />
              <input
                type="text"
                data-kt-user-table-filter="search"
                className="form-control form-control-solid w-250px ps-14"
                placeholder="Pesquisar..."
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
                onKeyDownCapture={(e: any) =>
                  e.key === "Enter" && searchLeads()
                }
              />
            </div>
            {/* end::Search */}
            <div className="d-flex align-items-center">
              <FormControl
                as="select"
                value={leads.selectedList}
                onChange={(e: any) => {
                  const value = e.target.value;
                  dispatch(setSelectedList(value));
                  if (value) {
                    dispatch(loadLeadsByListRequest(value));
                  } else {
                    dispatch(loadLeadsRequest(+page!, +take!));
                  }
                }}
                className="form-control form-control-solid w-200px me-3"
              >
                <option value="">Todas as listas</option>
                {leads.leadLists?.map((list, index) => (
                  <option key={index} value={list.list}>
                    {list.list}
                  </option>
                ))}
              </FormControl>
              <Button
                variant="primary"
                onClick={exportCSV}
                disabled={leads.exportLoading}
              >
                {leads.exportLoading ? "Exportando..." : "Exportar CSV"}
              </Button>
            </div>
          </div>
          {leads.count > 0 && (
            <div className="card-toolbar text-muted">
              Resultados: {leads.count}
            </div>
          )}
        </div>
        
        {/* end::Header */}
        {/* begin::Body */}
        <div className="card-body py-3">
          {/* begin::Table container */}
          <div className="table-responsive">
            {/* begin::Table */}
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              {/* begin::Table head */}
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="min-w-250px">NOME</th>
                  <th className="min-w-140px">EMAIL</th>
                  <th className="min-w-150px">LISTA</th>
                  <th className="min-w-200px">REGISTRO</th>
                  <th className="min-w-120px">CONFIRMADO</th>
                  <th className="min-w-200px">CONFIRMADO EM</th>
                  <th className="min-w-150px">NÃO PERTURBE</th>
                  <th className="min-w-150px">ORIGEM</th>
                  <th className="min-w-150px">UTMSOURCE</th>
                  <th className="min-w-150px">UTMMEDIUM</th>
                  <th className="min-w-150px">UTMCAMPAIGN</th>
                  <th className="min-w-150px">UTMCONTENT</th>
                  <th className="min-w-150px">UTMID</th>
                  <th className="min-w-150px">UTMTERM</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {Array.isArray(leads.data) && leads.data.map((child, index) => {
                  return (
                    <tr key={index}>
                      {/* <td>
                        <div className='form-check form-check-sm form-check-custom form-check-solid'>
                          <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                        </div>
                      </td> */}
                      <td>
                        <div className="d-flex align-items-center">
                          {/* <div className='symbol symbol-45px me-5'>
                            <img src={toAbsoluteUrl('/media/avatars/150-11.jpg')} alt='' />
                          </div> */}
                          <div className="fw-bold d-flex justify-content-start flex-column">
                            {child.name}
                            {/* <span className='text-muted fw-bold text-muted d-block fs-7'>
                              {child.description}
                            </span> */}
                          </div>
                        </div>
                      </td>
                      <td>
                        {/* <a href='#!' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                          Intertico
                        </a> */}
                        <span className="text-muted fw-bold d-block fs-7">
                          {child.email}
                        </span>
                      </td>
                      <td>
                        {/* <a href='#!' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                          Intertico
                        </a> */}
                        <span className="text-muted fw-bold d-block fs-7">
                          {child.list}
                        </span>
                      </td>
                      <td>
                        {/* <a href='#!' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                          Intertico
                        </a> */}
                        <span className="text-muted fw-bold d-block fs-7">
                          {child.createdAt}
                        </span>
                      </td>
                      <td>
                        {/* <a href='#!' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                          Intertico
                        </a> */}
                        <span className="text-muted fw-bold d-block fs-7">
                          {child.confirm}
                        </span>
                      </td>
                      <td>
                        {/* <a href='#!' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                          Intertico
                        </a> */}
                        <span className="text-muted fw-bold d-block fs-7">
                          {child.confirmedAt}
                        </span>
                      </td>
                      <td>
                        {/* <a href='#!' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                          Intertico
                        </a> */}
                        <span className="text-muted fw-bold d-block fs-7">
                          {child.naoperturbe}
                        </span>
                      </td>
                      <td>
                        {/* <a href='#!' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                          Intertico
                        </a> */}
                        <span className="text-muted fw-bold d-block fs-7">
                          {child.origin}
                        </span>
                      </td>
                      <td>
                        <span className="text-muted fw-bold d-block fs-7">
                          {child.utmSource}
                        </span>
                      </td>
                      <td>
                        <span className="text-muted fw-bold d-block fs-7">
                          {child.utmMedium}
                        </span>
                      </td>
                      <td>
                        <span className="text-muted fw-bold d-block fs-7">
                          {child.utmCampaign}
                        </span>
                      </td>
                       <td>
                        <span className="text-muted fw-bold d-block fs-7">
                          {child.utmContent}
                        </span>
                      </td>
                       <td>
                        <span className="text-muted fw-bold d-block fs-7">
                          {child.utmId}
                        </span>
                      </td>
                       <td>
                        <span className="text-muted fw-bold d-block fs-7">
                          {child.utmTerm}
                        </span>
                      </td>

                      {/* <td>
                        <div className='d-flex justify-content-end flex-shrink-0'>
                          <a
                            href='#!'
                            onClick={() => history.push('/wppgroup/'+child.id)}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <KTSVG
                              path='/media/icons/duotune/general/gen019.svg'
                              className='svg-icon-3'
                            />
                          </a>
                          <a
                            href='#!'
                            onClick={() => updateComponent(child)}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                          </a>
                          <a
                            href='#!'
                            onClick={() => { if (window.confirm('Deseja realmente excluir: ' + child.name + '?')) deleteComponent(child)  } }
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                          >
                            <KTSVG
                              path='/media/icons/duotune/general/gen027.svg'
                              className='svg-icon-3'
                            />
                          </a>
                        </div>
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>
          {/* end::Table container */}
        </div>
        {/* begin::Body */}
      </div>

      {!search && !leads.selectedList ? (
        <Pagination
          className=""
          currentPage={currentPage!}
          totalCount={count}
          pageSize={take}
          onPageChange={(page: any) => setCurrentPage(page)}
          link="leads"
        />
      ) : (
        ""
      )}
    </div>
  );
};

export { ManageLeadsWidget };
