/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { lazy, useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";

import { KTIcon } from "../../../../_metronic/helpers";
import { useDispatch } from "react-redux";

import { UsersState } from "../../../../store/ducks/users/types";
import { User } from "../../../../store/ducks/me/types";
import {
  deleteUserRequest,
  loadUsersRequest,
  searchUserRequest,
  selectUsersAddRequest,
  selectUsersRemoveRequest,
} from "../../../../store/ducks/users/actions";

import Info from "./infoUserModal";
import Create from "./create";
import Update from "./update";

import ExportUser from "./export";
import Filter from "./filter";

import Pagination from "../../../../customHooks/Pagination";

import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import TimeAgo from "react-timeago";

const portugueseStrings = require("react-timeago/lib/language-strings/pt-br");
const buildFormatter = require("react-timeago/lib/formatters/buildFormatter");

const formatter = buildFormatter(portugueseStrings);

const MOMENT = require("moment");
import "moment-timezone";
import { Overview } from "./profile/components/Overview";
import { Cart } from "../../../../store/ducks/carts/types";
import { useScrollRestoreAfterBack } from "../../../../customHooks/useScrollRestore";
import CreateSingleMail from "../singlemails/create";
//import { useScrollRestore } from "../../../../customHooks/useScrollRestore";

type Props = {
  className: string;
  users: UsersState;
  page?: string;
  take?: string;
  hasCart?: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  startDate?: string;
  endDate?: string;
};

const ManageUsersWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  users,
  page,
  take,
  hasCart,
  setCurrentPage,
  currentPage,
  startDate,
  endDate,
}) => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [child, setChild] = useState<User>({});
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

  useScrollRestoreAfterBack("/admin/users", "scroll-pos");

  //console.log("users", users);
  const dispatch = useDispatch();
  //const navigate = useNavigate();
  //console.log("TIMEZONE", Intl.DateTimeFormat().resolvedOptions().timeZone);
  //console.log("MOMENT TIMEZONE", MOMENT.tz.guess());

  //const { hasCart } = useParams();

  const handleClose = () => {
    setShow(false);
  };

  const createUser = () => {
    setAction("createUser");
    setShow(true);
  };

  const exportUsers = () => {
    setAction("showExport");
    setShow(true);
  };
  const filter = () => {
    setAction("showFilter");
    setShow(true);
  };

  const updateUser = (user: User) => {
    setAction("editUser");
    setShow(true);
    setChild(user);
  };

  const infoUser = (user: User) => {
    setAction("infoUser");
    setShow(true);
    setChild(user);
  };

  const renovationMail = (user: User) => {
    setAction("renovationMail");
    setShow(true);
    setChild(user);
  };

  const onboardingMail = (user: User) => {
    setAction("onboardingMail");
    setShow(true);
    setChild(user);
  };

  const deleteUser = (user: User) => {
    console.log("deletar", user.id);
    dispatch(deleteUserRequest(user.id!));
  };

  const searchUser = () => {
    console.log("search", search);
    if (search) dispatch(searchUserRequest(search));
    else dispatch(loadUsersRequest(+page!, +take!, hasCart!));
  };

  const preMessageOnboarding = (user: User) => {
    return `<p>Olá ${user.name?.split(" ")[0]}, tudo bem?</p>

      <p>É com imensa alegria que estendemos as boas-vindas a você. Desejamos que este treinamento represente um marco significativo em sua jornada.</p>

      <p>Ao longo desse período você terá acesso à nossa plataforma exclusiva e as datas de liberação dos conteúdos estarão visíveis na plataforma assim que você se conectar.</p>

      <p><b>DADOS DE ACESSO:</b></p>

      <p>Plataforma: <a href='https://app.insiderhof.com.br' target='_blank'><strong>https://app.insiderhof.com.br</strong></a></p>

      <p>No campo e-mail, insira: ${user.email}</p>

      <p>No campo senha, insira a senha criada no processo de inscrição.</p>

      <p>Obs: Caso perca sua senha ou queria alterá-la, na página inicial da plataforma tem um botão escrito: "Esqueci minha senha". Basta clicá-lo e seguir as instruções para a alteração da sua senha.</p>

      <br/>

      <p> Agora, vamos seguir com as instruções iniciais:</p>

      <p> 1. Lembre-se de que é possível alterar sua senha na página inicial, quando estiver conectado ou contatando o suporte.</p>

      <p> 2. Por favor, zele pela confidencialidade de sua senha e evite compartilhá-la com terceiros, uma vez que logins simultâneos serão automaticamente bloqueados.</p>

      <p> 3. Mantenha as discussões na comunidade estritamente relacionadas ao tema do treinamento. Qualquer post que fuja do assunto será sujeito a censura. Este é um espaço destinado à reflexão sobre o conteúdo do treinamento.</p>

      <p> 4. Não promova a si mesmo ou seus interesses pessoais na comunidade, pois essas postagens também estarão sujeitas a censura.</p>

      <p> 5. Encorajamos você a fazer perguntas sempre que necessário. Lembre-se de que não existem perguntas sem valor. O verdadeiro erro está em não questionar.</p>

      <p> 6. Por fim, empenhe-se ao máximo durante o treinamento e tenha em mente que o sucesso depende igualmente de seu esforço e do auxílio do instrutor. Não existe uma fórmula mágica ou atalhos fáceis, mas é crucial contar com um time de apoio para seguir adiante.</p>

      <p> Atenciosamente, Vanessa.</p>`;
  };

  const preMessageRenovation = (user: User) => {
    return `<p>Olá ${user.name?.split(" ")[0]}, tudo bem?</p>
  
      <p>Gostaríamos de informar que seu acesso está prestes a expirar e você pode garantir a renovação antecipada com um desconto exclusivo de mais de <strong>70%</strong>.</p>
  
      <p>Essa é uma oportunidade especial para continuar sua jornada de aprendizado, sem interrupções, aproveitando um benefício que oferecemos apenas para nossos alunos mais comprometidos.</p>
  
      <p>Para aproveitar essa renovação com desconto, basta seguir as orientações enviadas e concluir o processo dentro do prazo estipulado.</p>

      <br/>

      <p><b>INSTRUÇÕES</b></p>

      <p>1. Acesse a plataforma <a href='https://app.insiderhof.com.br' target='_blank'><strong>https://app.insiderhof.com.br</strong></a></p>

      <p>2. Faça seu login.</p>

      <p>3. Clique em "Seu acesso vai expirar, clique aqui.".</p>

      <p>4. Selecione a forma de pagamento e realize sua renovação.</p>

      <br/>
  
      <p>Em caso de dúvidas ou se precisar de qualquer auxílio, estamos à disposição. Você pode:</p>
  
      <p>Chamar um dos nossos atendentes no grupo da sua turma;</p>
      <p>Ou simplesmente responder a este e-mail que entraremos em contato com você o mais breve possível.</p>
  
      <p>Não deixe essa oportunidade passar.</p>
  
      <br/>
  
      <p>Atenciosamente, Vanessa.</p>`;
  };

  const selectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setIsAllChecked(true);
      users.data.map((child) => {
        dispatch(selectUsersRemoveRequest(child)); //Remove antes, pra nao dar duplicação
        dispatch(selectUsersAddRequest(child));
      });
    } else {
      setIsAllChecked(false);
      users.data.map((child) => {
        dispatch(selectUsersRemoveRequest(child));
      });
    }
  };

  const setSelected = (e: React.ChangeEvent<HTMLInputElement>, child: User) => {
    //console.log("CHILD!", child)
    //dispatch(selectUsersAddRequest(child))
    console.log("****ENTREI AQUI****");
    console.log("Checked", e.target.checked);
    console.log("child", child);
    if (e.target.checked) {
      dispatch(selectUsersAddRequest(child));
      //e.target.checked = false
    } else {
      setIsAllChecked(false);
      dispatch(selectUsersRemoveRequest(child));
      //e.target.checked = true
    }
  };

  const handlePos = () => {
    //console.log("POS SAVED", String(window.scrollY));
    sessionStorage.setItem("scroll-pos", String(window.scrollY));
  };

  let count = users.count;
  // let pages = Math.ceil(+count! / +take!)
  let length = users.data?.length;
  return (
    <div>
      <Modal size="xl" show={show} onHide={handleClose}>
        <div className="modal-header">
          <h2>
            {action === "infoUser" ? "Informações do usuário" : ""}
            {action === "editUser" ? "Editar usuário" : ""}
            {action === "createUser" ? "Adicionar usuário" : ""}
            {action === "showExport" ? "Exportar" : ""}
            {action === "showFilter" ? "Filtro" : ""}
            {action === "renovationMail" ? "renovationMail" : ""}
            {action === "onboardingMail" ? "onboardingMail" : ""}
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
          {action === "infoUser" && (
            <Info handleClose={handleClose} child={child} />
          )}

          {action === "editUser" && (
            <Update handleClose={handleClose} child={child} />
          )}
          {action === "createUser" && <Create handleClose={handleClose} />}
          {action === "showExport" && <ExportUser handleClose={handleClose} />}
          {action === "showFilter" && <Filter handleClose={handleClose} />}

          {action === "renovationMail" && (
            <CreateSingleMail
              handleClose={handleClose}
              child={child}
              preMessage={preMessageRenovation(child)}
              preSubject={"Renovação de acesso com vantagens | InsiderHOF"}
            />
          )}
          {action === "onboardingMail" && (
            <CreateSingleMail
              handleClose={handleClose}
              child={child}
              preMessage={preMessageOnboarding(child)}
              preSubject={"Dados de acesso | InsiderHOF"}
            />
          )}
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
            if (e.key === "Enter") searchUser();
          }}
        />
        {/* <InputGroup.Append> *x/}
        <Button variant="primary" onClick={searchUser} type="submit">
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
      {users.error && (
        <div>
          {JSON.stringify(users.error.message)} <br />
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
                  if (e.key === "Enter") searchUser();
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
                onClick={() => exportUsers()}
              >
                <KTIcon iconName="exit-up" className="fs-2" />
                Exportar
              </button>
              {/* end::Export */}

              {/* begin::Add user */}
              <button
                type="button"
                className="btn btn-light-primary"
                onClick={() => createUser()}
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
                  <th className="min-w-200px">ENDEREÇO</th>
                  <th className="min-w-100px">LOGIN EM</th>
                  <th className="min-w-100px">WHATSAPP</th>
                  <th className="min-w-100px">REGISTRO</th>

                  {/* <th className='min-w-120px'>Última aula assistida</th> */}
                  <th className="min-w-100px">
                    {hasCart === "true" ? "TURMA" : "INTENÇÃO"}
                  </th>
                  <th className="min-w-100px">AÇÕES</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {users.data?.map((child, index) => {
                  //console.log('CHILD', child)
                  //let dateCreatedAt = child.createdAt
                  var createdAt = MOMENT(child.createdAt).utc(); //.format('DD/MM/YYYY HH:mm')
                  var lastLoginAt = child.lastLoginAt
                    ? MOMENT(child.lastLoginAt).utc()
                    : "";
                  var now = MOMENT(Date()).utc(); //.format('DD/MM/YYYY HH:mm')
                  const regex = /\('([^']+)',\)/g;
                  const whats = child.whatsapp?.replace(
                    /[|&;$%@"<>()+,-]/g,
                    ""
                  );
                  let check = users.selectedUsers?.filter(
                    (item) => item.id === child.id
                  );
                  let defaultChecked =
                    check.length || isAllChecked ? true : false;

                  return (
                    <tr key={index} style={{ height: "100%" }}>
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
                              id="selectusers"
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

                      <td>
                        <div className="d-flex align-items-center">
                          <div className="symbol symbol-circle symbol-50px overflow-hidden me-3 ">
                            <div className="symbol-label">
                              <img
                                //src={users.user.image}
                                //src={ image?.includes('https://') ? image : '../../files/' + image}
                                src={
                                  child.image?.includes("https://")
                                    ? child.image
                                    : "https://app.insiderhof.com.br/files/" +
                                      child.image
                                }
                                style={{ width: "100%" }}
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; // prevents looping
                                  currentTarget.src =
                                    "https://app.insiderhof.com.br/files/notfound.jpg";
                                }}
                              />
                            </div>
                          </div>
                          <Link
                            to={"/info/" + child.id}
                            onClick={() => handlePos()}
                          >
                            <div className="d-flex flex-column">
                              <div
                                //onClick={() => infoUser(child)}
                                className="text-gray-800 fw-bold mb-1 text-hover-primary fs-6"
                              >
                                {child.name}
                              </div>

                              <span className="text-muted">{child.email}</span>
                            </div>
                          </Link>
                        </div>
                      </td>
                      <td>
                        {child.address && (
                          <div className="d-flex flex-column">
                            <div
                              //onClick={() => infoUser(child)}
                              className="text-gray-800 fw-bold mb-1  fs-6"
                            >
                              {child.address}, {child.addressNumber},{" "}
                              {child.addressDistrict}
                              {child.addressComplement
                                ? ", " + child.addressComplement
                                : ""}
                            </div>
                            <span className="text-muted">
                              {child.city?.name}/{child.state?.state}
                            </span>
                          </div>
                        )}
                      </td>
                      <td>
                        {lastLoginAt && (
                          <span className="badge badge-light-primary justify-content-center ">
                            <TimeAgo
                              date={MOMENT(child.lastLoginAt).utc().toDate()}
                              formatter={formatter}
                            />
                          </span>
                        )}
                        <span className="text-muted fw-bold d-block fs-7">
                          {lastLoginAt
                            ? lastLoginAt?.format("DD/MM/YYYY HH:mm")
                            : ""}
                        </span>
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
                          {hasCart === "true" &&
                            child.cart.map((cart: Cart, index: number) => (
                              <span key={index}>
                                {index + 1}. {" " + cart.launch?.name}
                                {/* {index < child.cart.length - 1 && ","} */}
                                <br />
                              </span>
                            ))}
                          {hasCart === "false" && child.origin}
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
                                    onClick={() => infoUser(child)}
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
                                  <hr className="dropdown-divider" />
                                </li>
                                <li>
                                  <a
                                    href="#!"
                                    onClick={() => onboardingMail(child)}
                                    className="dropdown-item"
                                  >
                                    <KTIcon
                                      iconName="user"
                                      iconType="outline"
                                    />{" "}
                                    Onboarding mail
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#!"
                                    onClick={() => renovationMail(child)}
                                    className="dropdown-item"
                                  >
                                    <KTIcon
                                      iconName="user"
                                      iconType="outline"
                                    />{" "}
                                    Renovation mail
                                  </a>
                                </li>
                                <li>
                                  <hr className="dropdown-divider" />
                                </li>
                                <li>
                                  <a
                                    href="#!"
                                    onClick={() => updateUser(child)}
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
                                        deleteUser(child);
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

      {users.showPagination ? (
        <Pagination
          className=""
          currentPage={currentPage!}
          totalCount={count}
          pageSize={take}
          onPageChange={(page: any) => setCurrentPage(page)}
          link="users"
          hasCart={hasCart}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export { ManageUsersWidget };
