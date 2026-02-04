/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { lazy, useEffect, useMemo, useState } from "react";
import { Modal, FormControl } from "react-bootstrap";

import { KTIcon } from "../../../../_metronic/helpers";
import { useDispatch } from "react-redux";

import { UsersState } from "../../../../store/ducks/users/types";
import { User, UserUtm } from "../../../../store/ducks/me/types";
import { getUserUTMHistory, getUserLeadHistory } from "../../../../services/api";
import { getAppFileUrl } from "../../../../utils/getApiUrl";
import {
  deleteUserRequest,
  loadUsersRequest,
  searchUserRequest,
  selectUsersAddRequest,
  selectUsersRemoveRequest,
  loadUserLaunchesRequest,
  loadUsersByLaunchRequest,
  loadExportUsersRequest,
  setSelectedLaunch,
} from "../../../../store/ducks/users/actions";

import Info from "./infoUserModal";
import Create from "./create";
import Update from "./update";

import ExportUser from "./export";
import Filter from "./filter";

import Pagination from "../../../../customHooks/Pagination";

import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import TimeAgo from "react-timeago";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import portugueseStrings from "react-timeago/lib/language-strings/pt-br";

const formatter = buildFormatter(portugueseStrings);

import moment from "moment";
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
  
  // UTM Modal states
  const [utmShow, setUtmShow] = useState<boolean>(false);
  const [utmData, setUtmData] = useState<UserUtm[]>([]);
  const [loadingUtm, setLoadingUtm] = useState<boolean>(false);
  
  // Lead Modal states
  const [leadData, setLeadData] = useState<any[]>([]);
  const [loadingLead, setLoadingLead] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');

  useScrollRestoreAfterBack("/admin/users", "scroll-pos");

  //console.log("users", users);
  const dispatch = useDispatch();

  // Carregar lista de launches ao montar componente
  useEffect(() => {
    dispatch(loadUserLaunchesRequest());
  }, [dispatch]);

  // Auto-download do CSV SOMENTE quando dados de exportação estiverem prontos
  // Usa flag separada para não disparar ao filtrar
  useEffect(() => {
    if (users.exportData.length > 0 && !users.exportLoading) {
      // Remover duplicatas baseado no email quando exportar todos os launches
      const uniqueUsers = users.selectedLaunch
        ? users.exportData
        : users.exportData.reduce((acc: any[], user: any) => {
            // Verifica se já existe um usuário com esse email
            if (!acc.find((item: any) => item.email === user.email)) {
              acc.push(user);
            }
            return acc;
          }, []);

      const csvContent = "data:text/csv;charset=utf-8,"
        + "Nome,Email,Whatsapp,Curso(s),Registro,Cidade,Estado\n"
        + uniqueUsers.map((user: any) => {
            const courses = user.cart?.map((c: any) => c.launch?.name).filter(Boolean).join("; ") || user.origin || '';
            return `"${user.name}","${user.email}","${user.whatsapp}","${courses}","${user.createdAt}","${user.city?.name || ''}","${user.state?.state || ''}"`;
          }).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      const fileName = users.selectedLaunch
        ? `users_launch_${users.selectedLaunch}.csv`
        : "users_todos_cursos.csv";
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [users.exportData, users.exportLoading, users.selectedLaunch]);
  //const navigate = useNavigate();
  //console.log("TIMEZONE", Intl.DateTimeFormat().resolvedOptions().timeZone);
  //console.log("MOMENT TIMEZONE", moment.tz.guess());

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

  const viewUserUTM = async (user: User) => {
    setLoadingUtm(true);
    setLoadingLead(true);
    try {
      // Buscar dados UTM
      const utmResponse = await getUserUTMHistory(user.id!);
      console.log('Resposta da API UTM:', utmResponse);
      setUtmData(utmResponse.data.data || []);
      
      // Buscar dados LEAD
      const leadResponse = await getUserLeadHistory(user.id!);
      console.log('Resposta da API LEAD:', leadResponse);
      setLeadData(leadResponse.data.data || []);
      setUserEmail(leadResponse.data.userEmail || user.email || '');
      
      setUtmShow(true);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      alert('Erro ao buscar dados do usuário');
    } finally {
      setLoadingUtm(false);
      setLoadingLead(false);
    }
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

  const exportCSVByLaunch = () => {
    // Usar "ALL" como palavra-chave para exportar todos os launches
    const launchToExport = users.selectedLaunch || "ALL";
    dispatch(loadExportUsersRequest(launchToExport));
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

      {/* UTM Modal */}
      <Modal size="xl" show={utmShow} onHide={() => setUtmShow(false)}>
        <div className="modal-header">
          <h2>Histórico UTM - {child.name}</h2>
          <div
            className="btn btn-sm btn-icon btn-active-color-primary"
            onClick={() => setUtmShow(false)}
          >
            <KTIcon className="fs-1" iconName="cross" />
          </div>
        </div>
        <div className="modal-body py-lg-10 px-lg-10">
          {/* Loading state */}
          {(loadingUtm || loadingLead) && (
            <div className="text-center mb-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
              <p className="mt-2">Carregando dados...</p>
            </div>
          )}

          {/* UTM Data Section */}
          {!loadingUtm && !loadingLead && (
            <>
              <div className="mb-5">
                <h4 className="mb-3">Dados UTM do Usuário</h4>
                {utmData.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                      <thead>
                        <tr className="fw-bolder text-muted">
                          <th>Data</th>
                          <th>Origem</th>
                          <th>Meio</th>
                          <th>Campanha</th>
                          <th>Evento</th>
                          <th>Valor</th>
                          <th>Referer</th>
                        </tr>
                      </thead>
                      <tbody>
                        {utmData.map((utm, index) => (
                          <tr key={index}>
                            <td>
                              {moment(utm.createdAt).format('DD/MM/YYYY HH:mm')}
                            </td>
                            <td>
                              <span className="badge badge-light-info">
                                {utm.utmSource || 'direct'}
                              </span>
                            </td>
                            <td>{utm.utmMedium || '-'}</td>
                            <td>{utm.utmCampaign || '-'}</td>
                            <td>
                              <span className={`badge ${
                                utm.eventType === 'purchase'
                                  ? 'badge-light-success'
                                  : 'badge-light-primary'
                              }`}>
                                {utm.eventType === 'purchase' ? 'Compra' : 'Intenção'}
                              </span>
                            </td>
                            <td>
                              {utm.amount ? (
                                <span className="text-success fw-bold">
                                  R$ {parseFloat(utm.amount).toFixed(2)}
                                </span>
                              ) : (
                                <span className="text-muted">-</span>
                              )}
                            </td>
                            <td className="text-truncate" style={{ maxWidth: '200px' }}>
                              {utm.referrer ? (
                                <span title={utm.referrer}>
                                  {utm.referrer.length > 50
                                    ? utm.referrer.substring(0, 50) + '...'
                                    : utm.referrer}
                                </span>
                              ) : (
                                <span className="text-muted">-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-muted">Nenhum dado UTM encontrado para este usuário.</p>
                  </div>
                )}
              </div>

              {/* Lead Data Section */}
              {userEmail && (
                <div>
                  <h4 className="mb-3">Histórico do Email na Tabela LEAD: {userEmail}</h4>
                  {leadData.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                        <thead>
                          <tr className="fw-bolder text-muted">
                            <th>ID</th>
                            <th>Nome</th>
                            <th>WhatsApp</th>
                            <th>Lista</th>
                            <th>Data Criação</th>
                            <th>Origem</th>
                            {/* <th>Status</th> */}
                            <th>Fase Lançamento</th>
                            <th>UTM Source</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leadData.map((lead, index) => (
                            <tr key={index}>
                              <td>
                                <span className="badge badge-light-primary">
                                  #{lead.id}
                                </span>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  {lead.name && (
                                    <div className="symbol symbol-circle symbol-30px me-2">
                                      <div className="symbol-label">
                                        <span className="fw-bold">
                                          {lead.name.charAt(0).toUpperCase()}
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                  <span>{lead.name || '-'}</span>
                                </div>
                              </td>
                              <td>
                                {lead.whatsapp ? (
                                  <a
                                    href={`https://api.whatsapp.com/send?phone=${lead.whatsapp.replace(/[|&;$%@"<>()+,-]/g, '')}`}
                                    target="_blank"
                                    className="text-primary"
                                  >
                                    {lead.whatsapp}
                                  </a>
                                ) : (
                                  <span className="text-muted">-</span>
                                )}
                              </td>
                              <td>
                                {lead.list ? (
                                  <span className="badge badge-light-info">
                                    {lead.list}
                                  </span>
                                ) : (
                                  <span className="text-muted">-</span>
                                )}
                              </td>
                              <td>
                                {moment(lead.createdAt).format('DD/MM/YYYY HH:mm')}
                              </td>
                              <td>
                                {lead.origin ? (
                                  <span className="badge badge-light-warning">
                                    {lead.origin}
                                  </span>
                                ) : (
                                  <span className="text-muted">-</span>
                                )}
                              </td>
                              {/* <td>
                                {lead.naoperturbe ? (
                                  <span className="badge badge-light-danger">
                                    Não Perturbe
                                  </span>
                                ) : lead.confirmed ? (
                                  <span className="badge badge-light-success">
                                    Confirmado
                                  </span>
                                ) : (
                                  <span className="badge badge-light-secondary">
                                    Pendente
                                  </span>
                                )}
                              </td> */}
                              <td>
                                {lead.launchPhase?.name ? (
                                  <span className="badge badge-light-primary">
                                    {lead.launchPhase.name}
                                  </span>
                                ) : (
                                  <span className="text-muted">-</span>
                                )}
                              </td>
                              <td>
                                {lead.utmSource ? (
                                  <span className="badge badge-light-info">
                                    {lead.utmSource}
                                  </span>
                                ) : (
                                  <span className="text-muted">-</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-muted">Nenhum registro encontrado na tabela LEAD para este email.</p>
                    </div>
                  )}
                </div>
              )}
            </>
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
              className="d-flex justify-content-end align-items-center"
              data-kt-user-table-toolbar="base"
            >
              {/* Filtro por launch/curso */}
              <FormControl
                as="select"
                value={users.selectedLaunch}
                onChange={(e: any) => {
                  const value = e.target.value;
                  dispatch(setSelectedLaunch(value));
                  if (value) {
                    dispatch(loadUsersByLaunchRequest(value));
                  } else {
                    dispatch(loadUsersRequest(+page!, +take!, hasCart!));
                  }
                }}
                className="form-control form-control-solid w-200px me-3"
              >
                <option value="">Todos os cursos</option>
                {users.userLaunches?.map((launch, index) => (
                  <option key={index} value={launch.id.toString()}>
                    {launch.name}
                  </option>
                ))}
              </FormControl>

              {/* Exportar por launch */}
              <button
                type="button"
                className="btn btn-light-success me-3"
                onClick={exportCSVByLaunch}
                disabled={users.exportLoading}
              >
                <KTIcon iconName="file-down" className="fs-2" />
                {users.exportLoading ? "Exportando..." : "Exportar CSV Alunos"}
              </button>

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
                  <th className="min-w-100px">ENDEREÇO</th>
                  <th className="min-w-100px">LOGIN EM</th>
                  <th className="min-w-100px">WHATSAPP</th>
                  <th className="min-w-100px">REGISTRO</th>

                  {/* <th className='min-w-120px'>Última aula assistida</th> */}
                  <th className="min-w-100px">ORIGEM</th>
                  <th className="min-w-100px">ÚLTIMO EVENTO</th>
                  <th className="min-w-100px">VALOR</th>
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
                  var createdAt = moment(child.createdAt).utc(); //.format('DD/MM/YYYY HH:mm')
                  var lastLoginAt = child.lastLoginAt
                    ? moment(child.lastLoginAt).utc()
                    : null;
                  var now = moment(Date()).utc(); //.format('DD/MM/YYYY HH:mm')
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
                                    : getAppFileUrl(child.image)
                                }
                                style={{ width: "100%" }}
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; // prevents looping
                                  currentTarget.src = getAppFileUrl("notfound.jpg");
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
                              date={moment(child.lastLoginAt).utc().toDate()}
                              formatter={formatter}
                            />
                          </span>
                        )}
                        <span className="text-muted fw-bold d-block fs-7">
                          {lastLoginAt ? lastLoginAt.format("DD/MM/YYYY HH:mm") : ""}
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
                      {/* Origem Marketing */}
                      <td>
                        <div className="d-flex flex-column">
                          {child.utmSource ? (
                            <>
                              <span className="badge badge-light-info mb-1">
                                {child.utmSource}
                              </span>
                              {child.utmCampaign && (
                                <span className="text-muted text-sm">
                                  - {child.utmCampaign}
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="badge badge-light-secondary">
                              Direto
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Último Evento */}
                      <td>
                        {child.eventType ? (
                          <span className={`badge ${
                            child.eventType === 'purchase' 
                              ? 'badge-light-success' 
                              : 'badge-light-primary'
                          }`}>
                            {child.eventType === 'purchase' ? 'Compra' : 'Intenção'}
                          </span>
                        ) : (
                          <span className="text-muted text-sm">-</span>
                        )}
                      </td>

                      {/* Valor */}
                      <td>
                        {child.amount ? (
                          <span className="text-success fw-bold">
                            R$ {parseFloat(child.amount).toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-muted">-</span>
                        )}
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
                                  <a
                                    href="#!"
                                    onClick={() => viewUserUTM(child)}
                                    className="dropdown-item"
                                  >
                                    <KTIcon
                                      iconName="chart"
                                      iconType="outline"
                                    />{" "}
                                    Ver UTM + Lead
                                  </a>
                                </li>
                                {/* <li>
                                  <a
                                    href="#!"
                                    onClick={() => {
                                      // Buscar apenas dados do lead
                                      setLoadingLead(true);
                                      getUserLeadHistory(child.id!)
                                        .then(response => {
                                          setLeadData(response.data.data || []);
                                          setUserEmail(response.data.userEmail || child.email || '');
                                          setUtmShow(true);
                                        })
                                        .catch(error => {
                                          console.error('Erro ao buscar dados LEAD:', error);
                                          alert('Erro ao buscar dados LEAD do usuário');
                                        })
                                        .finally(() => setLoadingLead(false));
                                    }}
                                    className="dropdown-item"
                                  >
                                    <KTIcon
                                      iconName="envelope"
                                      iconType="outline"
                                    />{" "}
                                    Ver Lead
                                  </a>
                                </li> */}
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
