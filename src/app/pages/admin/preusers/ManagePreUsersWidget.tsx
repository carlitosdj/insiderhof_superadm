/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { lazy, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";

import { KTIcon } from "../../../../_metronic/helpers";
import { useDispatch } from "react-redux";

import { PreUser } from "../../../../store/ducks/preusers/types";
// import {
//   deleteUserRequest,
//   loadUsersRequest,
//   searchUserRequest,
//   selectUsersAddRequest,
//   selectUsersRemoveRequest,
// } from "../../../../store/ducks/preusers/actions";

import Info from "./info";
import Create from "./create";
import Update from "./update";

import ExportPreUser from "./export";
import Filter from "./filter";
import PreUserCourses from "./userCourses";
import Pagination from "../../../../customHooks/Pagination";

import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

const portugueseStrings = require("react-timeago/lib/language-strings/pt-br");
const buildFormatter = require("react-timeago/lib/formatters/buildFormatter");

const formatter = buildFormatter(portugueseStrings);

const MOMENT = require("moment");
import "moment-timezone";
import { Overview } from "./profile/components/Overview";
import { Cart } from "../../../../store/ducks/carts/types";
import { PreUsersState } from "../../../../store/ducks/preusers/types";
import { deletePreUserRequest, loadPreUsersRequest, searchPreUserRequest, selectPreUsersAddRequest, selectPreUsersRemoveRequest } from "../../../../store/ducks/preusers/actions";

type Props = {
  className: string;
  preusers: PreUsersState;
  page?: string;
  take?: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
};

const ManagePreUsersWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  preusers,
  page,
  take,
  setCurrentPage,
  currentPage,
}) => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [child, setChild] = useState<PreUser>({});
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

  console.log("preusers", preusers);
  const dispatch = useDispatch();
  console.log("TIMEZONE", Intl.DateTimeFormat().resolvedOptions().timeZone);
  console.log("MOMENT TIMEZONE", MOMENT.tz.guess());

  const handleClose = () => {
    setShow(false);
  };

  const createPreUser = () => {
    setAction("createPreUser");
    setShow(true);
  };

  const exportPreUsers = () => {
    setAction("showExport");
    setShow(true);
  };
  const filter = () => {
    setAction("showFilter");
    setShow(true);
  };

  const updatePreUser = (user: PreUser) => {
    setAction("editPreUser");
    setShow(true);
    setChild(user);
  };

  const infoPreUser = (user: PreUser) => {
    setAction("infoPreUser");
    setShow(true);
    setChild(user);
  };

  const userCourses = (user: PreUser) => {
    setAction("userCourses");
    setShow(true);
    setChild(user);
  };

  const deletePreUser = (user: PreUser) => {
    console.log("deletar", user.id);
    dispatch(deletePreUserRequest(user.id!));
  };

  const searchPreUser = () => {
    console.log("search", search);
    if (search) dispatch(searchPreUserRequest(search));
    else dispatch(loadPreUsersRequest(+page!, +take!));
  };

  const selectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setIsAllChecked(true);
      preusers.data.map((child) => {
        dispatch(selectPreUsersRemoveRequest(child)); //Remove antes, pra nao dar duplicação
        dispatch(selectPreUsersAddRequest(child));
      });
    } else {
      setIsAllChecked(false);
      preusers.data.map((child) => {
        dispatch(selectPreUsersRemoveRequest(child));
      });
    }
  };

  const setSelected = (e: React.ChangeEvent<HTMLInputElement>, child: PreUser) => {
    //console.log("CHILD!", child)
    //dispatch(selectPreUsersAddRequest(child))
    console.log("****ENTREI AQUI****");
    console.log("Checked", e.target.checked);
    console.log("child", child);
    if (e.target.checked) {
      dispatch(selectPreUsersAddRequest(child));
      //e.target.checked = false
    } else {
      setIsAllChecked(false);
      dispatch(selectPreUsersRemoveRequest(child));
      //e.target.checked = true
    }
  };

  let count = preusers.count;
  // let pages = Math.ceil(+count! / +take!)
  let length = preusers.data?.length;
  return (
    <div>
      <Modal size="xl" show={show} onHide={handleClose}>
        <div className="modal-header">
          <h2>
            {action === "infoPreUser" ? "Informações do usuário" : ""}
            {action === "userCourses" ? "userCourses" : ""}
            {action === "editPreUser" ? "Editar usuário" : ""}
            {action === "createPreUser" ? "Adicionar usuário" : ""}
            {action === "showExport" ? "Exportar" : ""}
            {action === "showFilter" ? "Filtro" : ""}
          </h2>

          {/* begin::Close */}
          <div
            className="btn btn-sm btn-icon btn-active-color-primary"
            onClick={handleClose}
          >
            <KTIcon className="fs-1" iconName="cross" />
          </div>
          {/* end::Close */}
        </div>
        <div className="modal-body py-lg-10 px-lg-10">
          {action === "infoPreUser" && (
            <Info handleClose={handleClose} child={child} />
          )}
          {action === "userCourses" && (
            <PreUserCourses handleClose={handleClose} child={child} />
          )}
          {action === "editPreUser" && (
            <Update handleClose={handleClose} child={child} />
          )}
          {action === "createPreUser" && <Create handleClose={handleClose} />}
          {action === "showExport" && <ExportPreUser handleClose={handleClose} />}
          {action === "showFilter" ? <Filter handleClose={handleClose} /> : ""}
        </div>
      </Modal>

      {/* <InputGroup className="mb-3">
        <FormControl
          placeholder="Pesquise por e-mail, nome, ou número da turma."
          aria-label="Pesquisa"
          aria-describedby="basic-addon2"
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          onKeyDownCapture={(e: any) => {
            if (e.key === "Enter") searchPreUser();
          }}
        />
        {/* <InputGroup.Append> *x/}
        <Button variant="primary" onClick={searchPreUser} type="submit">
          Pesquisar
        </Button>
        {/* </InputGroup.Append> *x/}


      </InputGroup> */}
      {/* <div style={{ marginLeft: 5 }}>A pesquisa retornou: {count} dados</div>
     
      <div style={{ marginLeft: 5 }}>
        Mostrando: {(+page! - 1) * +take! + 1} -{" "}
        {(+page! - 1) * +take! + +length!}
      </div>
     */}
      {preusers.error && (
        <div>
          {JSON.stringify(preusers.error.message)} <br />
        </div>
      )}

      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className="card-header border-0 pt-5">
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
                onKeyDownCapture={(e: any) => {
                  if (e.key === "Enter") searchPreUser();
                }}
              />
            </div>
            {/* end::Search */}
          </div>
          <div className="card-toolbar">
            <div
              className="d-flex justify-content-end"
              data-kt-user-table-toolbar="base"
            >
              <button
                type="button"
                className="btn btn-light-primary me-3"
                onClick={() => filter()}
              >
                <KTIcon iconName="filter" className="fs-2" />
                Filtro
              </button>

              {/* begin::Export */}
              <button
                type="button"
                className="btn btn-light-primary me-3"
                onClick={() => exportPreUsers()}
              >
                <KTIcon iconName="exit-up" className="fs-2" />
                Exportar
              </button>
              {/* end::Export */}

              {/* begin::Add user */}
              <button
                type="button"
                className="btn btn-light-primary"
                onClick={() => createPreUser()}
              >
                <KTIcon iconName="plus" className="fs-2" />
                Novo
              </button>
              {/* end::Add user */}
            </div>
          </div>
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
                  <th>
                    <div className="form-check form-check-custom form-check-solid">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="kt_settings_notification_email"
                        onChange={(e: any) => selectAll(e)}
                      />
                    </div>
                  </th>
                  {/* <th className="w-20px">ID</th> */}
                  <th className="min-w-100px">NOME</th>
                  <th className="min-w-150px">ÚLTIMO LOGIN</th>
                  <th className="min-w-120px">WHATSAPP</th>
                  <th className="min-w-150px">REGISTRO</th>

                  {/* <th className='min-w-120px'>Última aula assistida</th> */}
                  <th className="min-w-120px">TURMA</th>
                  <th className="min-w-120px">AÇÕES</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {preusers.data?.map((child, index) => {
                  //console.log('CHILD', child)
                  //let dateCreatedAt = child.createdAt
                  var createdAt = MOMENT(child.createdAt).utc(); //.format('DD/MM/YYYY HH:mm')
                 
                  var now = MOMENT(Date()).utc(); //.format('DD/MM/YYYY HH:mm')
                  const regex = /\('([^']+)',\)/g;
                  const whats = child.whatsapp?.replace(
                    /[|&;$%@"<>()+,-]/g,
                    ""
                  );
                  let check = preusers.selectedPreUsers?.filter(
                    (item) => item.id === child.id
                  );
                  let defaultChecked =
                    check.length || isAllChecked ? true : false;

                  return (
                    <tr key={index}>
                      {/* <td>
                        <div className='form-check form-check-sm form-check-custom form-check-solid'>
                          <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                        </div>
                      </td> */}

                      <td>
                        <div className="d-flex align-items-center">
                          <div className="form-check form-check-custom form-check-solid">
                            {/* <img src={'https://app.insiderhof.com.br/files/1678819623100-vf.jpg'} alt='' /> */}
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="selectpreusers"
                              //defaultChecked={defaultChecked}
                              checked={defaultChecked}
                              onChange={(e: any) => setSelected(e, child)}
                            />
                          </div>
                        </div>
                      </td>
                      {/* <td>
                        <div className="d-flex align-items-center">
                          <div className="symbol symbol-45px me-5">
                            {/* <img src={'https://app.insiderhof.com.br/files/1678819623100-vf.jpg'} alt='' /> *x/}
                            {child.id}
                          </div>
                        </div>
                      </td> */}

                      <td className="d-flex align-items-center border-0">
                        <div className="symbol symbol-circle symbol-50px overflow-hidden me-3 ">
                          <div className="symbol-label">
                            xxx
                          </div>
                        </div>
                        <div className="d-flex flex-column">
                          <a
                            href="#!"
                            onClick={() => infoPreUser(child)}
                            className="text-gray-800 fw-bold mb-1 text-hover-primary fs-6"
                          >
                            {child.name}
                          </a>

                          <span className="text-muted">{child.email}</span>
                        </div>
                      </td>
                      <td>
                        xx
                      </td>

                      <td>
                        {/* <a href='#!' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                          Intertico
                        </a> */}
                        <span className="text-muted fw-bold d-block fs-7">
                          <a
                            href={
                              "https://api.whatsapp.com/send?phone=" + whats
                            }
                            target="_blank"
                          >
                            {child.whatsapp}
                          </a>
                        </span>
                      </td>
                      <td>
                        <div>
                          {/* {now.diff(createdAt, "years", true) > 1 ? (
                            <span className="badge badge-light-danger justify-content-center">
                              Expirado{" "}
                              {(
                                now.diff(createdAt, "years", true) * 100
                              ).toFixed(2)}
                              %
                            </span>
                          ) : (
                            <span className="badge badge-light-primary justify-content-center ">
                              Ativo:{" "}
                              {(
                                now.diff(createdAt, "years", true) * 100
                              ).toFixed(2)}
                              %
                            </span>
                          )} */}
                          <span className="text-muted fw-bold d-block fs-7">
                            {createdAt.format("DD/MM/YYYY HH:mm")}
                          </span>
                        </div>
                      </td>

                      {/* <td>
                        {/* <a href='#!' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                          Intertico
                        </a> *x/}
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          Ultima aula assistida
                        </span>
                      </td> */}
                      <td>
                        {/* <a href='#!' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                          Intertico
                        </a> */}
                        <span className="text-muted fw-bold d-block fs-7">
                          xxx
                        </span>
                      </td>

                      <td>
                        <div className="d-flex justify-content-end flex-shrink-0">
                          {/* <a
                                href="#!"
                                onClick={() => console.log}
                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                              >
                                <KTIcon iconName="eye" iconType="outline" />
                                
                              </a>

                              <a
                                href="#!"
                                onClick={() => console.log}
                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                              >
                                <KTIcon iconName="check" iconType="outline" />
                                
                              </a> */}
                          <div>
                            <div className="btn-group">
                              <button
                                className="btn btn-secondary btn-sm dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Ações
                              </button>
                              <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton2"
                              >
                                {/* <li>
                                  <Link
                                    to={"/user/overview/" + child.id}
                                    className="dropdown-item"
                                  >
                                    <KTIcon
                                      iconName="user"
                                      iconType="outline"
                                    />{" "}
                                    Informações B
                                  </Link>
                                </li> */}
                                <li>
                                  <a
                                    href="#!"
                                    onClick={() => infoPreUser(child)}
                                    className="dropdown-item"
                                  >
                                    <KTIcon
                                      iconName="user"
                                      iconType="outline"
                                    />{" "}
                                    Informações
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#!"
                                    onClick={() => userCourses(child)}
                                    className="dropdown-item"
                                  >
                                    <KTIcon
                                      iconName="verify"
                                      iconType="outline"
                                    />{" "}
                                    Cursos
                                  </a>
                                </li>
                                <li>
                                  <hr className="dropdown-divider" />
                                </li>
                                <li>
                                  <a
                                    href="#!"
                                    onClick={() => updatePreUser(child)}
                                    className="dropdown-item"
                                  >
                                    <KTIcon
                                      iconName="user-edit"
                                      iconType="outline"
                                    />{" "}
                                    Editar
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#!"
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          "Deseja realmente excluir: " +
                                            child.name +
                                            "?"
                                        )
                                      )
                                        deletePreUser(child);
                                    }}
                                    className="dropdown-item"
                                  >
                                    <KTIcon
                                      iconName="trash"
                                      iconType="outline"
                                    />{" "}
                                    Remover
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </td>
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

      {/* teste
      {currentPage!}
      {count}
      {take} */}
      {preusers.showPagination ? (
        <Pagination
          className=""
          currentPage={currentPage!}
          totalCount={count}
          pageSize={take}
          onPageChange={(page: any) => setCurrentPage(page)}
          link="preusers"
        />
      ) : (
        ""
      )}
    </div>
  );
};

export { ManagePreUsersWidget };
