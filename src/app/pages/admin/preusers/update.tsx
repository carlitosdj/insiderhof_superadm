import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

// import {useParams, useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { updateUserRequest } from "../../../../store/ducks/users/actions";
// import {ApplicationState} from '../../../../store'

import { User } from "../../../../store/ducks/me/types";
import { loadStateRequest } from "../../../../store/ducks/state/actions";
import { ApplicationState } from "../../../../store";
import { useSelector } from "react-redux";
import { loadCityRequest } from "../../../../store/ducks/city/actions";
import Loading from "../../../loading";
import { KTIcon } from "../../../../_metronic/helpers";
import { PreUser } from "../../../../store/ducks/preusers/types";

interface handleCloseProps {
  handleClose: () => void;
  child: PreUser;
}

const Update = ({ handleClose, child }: handleCloseProps) => {
  const [name, setName] = useState<string | undefined>("");
  //const [username, setUsername] = useState<string | undefined>('')
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");

  const [oldpasswordhash, setOldpasswordhash] = useState<string | undefined>(
    ""
  );

  const [whatsapp, setWhatsapp] = useState<string | undefined>("");
  const [cpf, setCpf] = useState<string | undefined>("");
  const [address, setAddress] = useState<string | undefined>("");

  const [number, setNumber] = useState<string | undefined>("");
  const [bairro, setBairro] = useState<string | undefined>("");
  // const [city, setCity] = useState<string | undefined>('')
  // const [state, setState] = useState<string | undefined>('')
  const [country, setCountry] = useState<string | undefined>("");
  const [cep, setCep] = useState<string | undefined>("");

  const [endereco, setEndereco] = useState<string | undefined>("");

  const [addressCEP, setAddressCEP] = useState<string | undefined>("");

  const [addressNumber, setAddressNumber] = useState<string | undefined>("");
  const [addressDistrict, setAddressDistrict] = useState<string | undefined>(
    ""
  );
  const [addressCity, setAddressCity] = useState<string | undefined>("");
  const [addressState, setAddressState] = useState<string | undefined>("");
  const [addressCountry, setAddressCountry] = useState<string | undefined>("");

  const [numTurma, setNumTurma] = useState<number | undefined>();
  const [role, setRole] = useState<string | undefined>("");

  const [validated, setValidated] = useState<boolean>(false);

  const stateRedux = useSelector((state: ApplicationState) => state.state);
  const cityRedux = useSelector((state: ApplicationState) => state.city);
  console.log("stateRedux", stateRedux);
  console.log("cityRedux", cityRedux);
  // const navigate = useNavigate()
  // const users = useSelector((state: ApplicationState) => state.users)

  const setState = (id: string) => {
    setAddressState(id);
    setAddressCity("");
    dispatch(loadCityRequest(id));
  };

  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    console.log("handle submit");
    setValidated(true);
    //if (name && username && email && whatsapp && cpf && address) {
    console.log("handle submit2");

    console.log("Update User");
    const userToUpdate = {
      id: child.id,
      email,
      newPassword: password,
      numTurma: +numTurma!,
      name,
      whatsapp,
      cpf,
      address,
      addressNumber,
      addressDistrict,
      cityId: addressCity,
      stateId: addressState,
      //addressCountry,
      postalCode: addressCEP,
      roles: role,

      //},
    };

    console.log("user to save", userToUpdate);
    dispatch(updateUserRequest(userToUpdate));
    handleClose();
    //}
  };

  useEffect(() => {
    console.log("CHILD - VER AQUI", child);
    setName(child.name);
    setEmail(child.email);
    setOldpasswordhash(child.password_hash);
    setWhatsapp(child.whatsapp);
    setCpf(child.cpf);
    setAddress(child.address);

    //setNumber(child.addressNumber)
    //setBairro(child.addressDistrict)
    // setCity(child.cityId)
    // setState(child.stateId)
    //setCountry(child.addressCountry)
    setCep(child.postalCode);

    setName(child.name);
    //setUsername(child.username)
    setEmail(child.email);
    setWhatsapp(child.whatsapp);
    setCpf(child.cpf);
    //setAddress(child.endereco)

    //setImage(child.image)

    //setEndereco(child.endereco);

    setAddressNumber(child.addressNumber);
    setAddressDistrict(child.addressDistrict);
    setAddressCity(child.cityId);
    setAddressState(child.stateId);
    //setAddressCountry(child.addressCountry)
    setAddressCEP(child.postalCode);
    //setNumTurma(child.numTurma);
    //setRole(child.roles);
    dispatch(loadStateRequest()); //Puxa componentes com seus filhos primários
    dispatch(loadCityRequest(child.stateId?.toString()!)); //Puxa componentes com seus filhos primários
  }, []);

  return (
    <Form validated={validated} onSubmit={handleSubmit}>
      <div className="d-flex flex-column flex-xl-row flex-row-fluid">
        <div className="flex-row-fluid py-lg-2 px-lg-6">
          <Form.Group controlId="fromName">
            <Form.Label className="required fw-bold fs-6 mb-5">Nome</Form.Label>
            <Form.Control
              placeholder=""
              // required
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              className="form-control form-control-lg form-control-solid"
            />
            <Form.Control.Feedback type="invalid">
              Por favor informe o nome
            </Form.Control.Feedback>
          </Form.Group>
          <br />

          <Form.Group controlId="fromName">
            <Form.Label className="required fw-bold fs-6 mb-5">E-mail</Form.Label>
            <Form.Control
              placeholder=""
              // required
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              className="form-control form-control-lg form-control-solid"
            />
            <Form.Control.Feedback type="invalid">
              Por favor informe o email
            </Form.Control.Feedback>
          </Form.Group>
          <br />
          <Form.Group controlId="fromName">
            <Form.Label className="required fw-bold fs-6 mb-5">Senha</Form.Label>
            <Form.Control
              placeholder="Deixe em branco para não editar a senha atual do usuário"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              className="form-control form-control-lg form-control-solid"
            />
            <Form.Control.Feedback type="invalid">
              Por favor informe a senha
            </Form.Control.Feedback>
          </Form.Group>
          <br />
          <Form.Group controlId="fromName">
            <Form.Label className="required fw-bold fs-6 mb-5">Whatsapp</Form.Label>
            <Form.Control
              placeholder=""
              value={whatsapp}
              onChange={(e: any) => setWhatsapp(e.target.value)}
              className="form-control form-control-lg form-control-solid"
            />
            <Form.Control.Feedback type="invalid">
              Por favor informe o número de whatsapp
            </Form.Control.Feedback>
          </Form.Group>

          <br />
          <Form.Group controlId="fromName">
            <Form.Label className="required fw-bold fs-6 mb-5">CPF</Form.Label>
            <Form.Control
              placeholder=""
              // required
              value={cpf}
              onChange={(e: any) => setCpf(e.target.value)}
              className="form-control form-control-lg form-control-solid"
            />
            <Form.Control.Feedback type="invalid">
              Por favor informe o cpf
            </Form.Control.Feedback>
          </Form.Group>
          <br />

          <Form.Group controlId="fromName">
            <Form.Label className="required fw-bold fs-6 mb-5">Endereço</Form.Label>
            <Form.Control
              placeholder=""
              // required
              value={address}
              onChange={(e: any) => setAddress(e.target.value)}
              className="form-control form-control-lg form-control-solid"
            />
            <Form.Control.Feedback type="invalid">
              Por favor informe o endereco
            </Form.Control.Feedback>
          </Form.Group>
          <br />

          <Form.Group controlId="fromName">
            <Form.Label className="required fw-bold fs-6 mb-5">Número</Form.Label>
            <Form.Control
              placeholder=""
              // required
              value={addressNumber}
              onChange={(e: any) => setAddressNumber(e.target.value)}
              className="form-control form-control-lg form-control-solid"
            />
            <Form.Control.Feedback type="invalid">
              Por favor informe o numero
            </Form.Control.Feedback>
          </Form.Group>
          <br />

          <Form.Group controlId="fromName">
            <Form.Label className="required fw-bold fs-6 mb-5">CEP</Form.Label>
            <Form.Control
              placeholder=""
              // required
              value={addressCEP}
              onChange={(e: any) => setAddressCEP(e.target.value)}
              className="form-control form-control-lg form-control-solid"
            />
            <Form.Control.Feedback type="invalid">
              Por favor informe o cep
            </Form.Control.Feedback>
          </Form.Group>
          <br />

          <Form.Group controlId="fromName">
            <Form.Label className="required fw-bold fs-6 mb-5">Bairro</Form.Label>
            <Form.Control
              placeholder=""
              // required
              value={addressDistrict}
              onChange={(e: any) => setAddressDistrict(e.target.value)}
              className="form-control form-control-lg form-control-solid"
            />
            <Form.Control.Feedback type="invalid">
              Por favor informe o bairro
            </Form.Control.Feedback>
          </Form.Group>
          <br />
        </div>
        <div className="flex-row-fluid py-lg-2 px-lg-6">
          <Form.Group controlId="formBasicSelect">
            <Form.Label className="required fw-bold fs-6 mb-5">Estado</Form.Label>

            {stateRedux.loading ? (
              <Loading />
            ) : (
              <Form.Control
                as="select"
                value={addressState}
                onChange={(e: any) => setState(e.target.value)}
                className="form-control form-control-lg form-control-solid"
                //required
              >
                <option value="" selected disabled hidden>
                  Selecione
                </option>
                {stateRedux.data.map((st: any, index) => {
                  return (
                    <option
                      key={index}
                      value={st.id}
                      selected={+st.id === +stateRedux}
                    >
                      {st.name}
                    </option>
                  );
                })}
              </Form.Control>
            )}
          </Form.Group>
          <br />
          <Form.Group controlId="formBasicSelect">
            <Form.Label className="required fw-bold fs-6 mb-5">Cidade</Form.Label>
            {cityRedux.loading ? (
              <Loading />
            ) : (
              <Form.Control
                as="select"
                value={addressCity}
                onChange={(e: any) => setAddressCity(e.target.value)}
                className="form-control form-control-lg form-control-solid"
                //required
              >
                <option value="" selected disabled hidden>
                  Selecione
                </option>
                {cityRedux.data.map((ct: any, index) => {
                  return (
                    <option
                      key={index}
                      value={ct.id}
                      selected={+ct.id === +cityRedux}
                    >
                      {ct.name}
                    </option>
                  );
                })}
              </Form.Control>
            )}
          </Form.Group>
          <br />

          {/* <Form.Group controlId='fromName'>
          <Form.Label className="required fw-bold fs-6 mb-5">País</Form.Label>
          <Form.Control
            placeholder=''
            // required
            value={addressCountry}
            onChange={(e: any) => setAddressCountry(e.target.value)}
          />
          <Form.Control.Feedback type='invalid'>Por favor informe o país</Form.Control.Feedback>
        </Form.Group>
        <br /> */}

          <Form.Group controlId="fromName">
            <Form.Label className="required fw-bold fs-6 mb-5">Turma</Form.Label>
            <Form.Control
              placeholder=""
              // required
              value={numTurma}
              onChange={(e: any) => setNumTurma(e.target.value)}
              className="form-control form-control-lg form-control-solid"
            />
            <Form.Control.Feedback type="invalid">
              Por favor informe o país
            </Form.Control.Feedback>
          </Form.Group>
          <br />

          <Form.Group controlId="fromName">
            <Form.Label className="required fw-bold fs-6 mb-5">Função</Form.Label>

            <div className="d-flex fv-row">
              <div className="form-check form-check-custom form-check-solid">
                {/* begin::Input */}
                <input
                  className="form-check-input me-3"
                  type="radio"
                  id="consumer"
                  onChange={(e: any) => setRole("consumer")}
                  name="consumer"
                  checked={role === "consumer"}
                />
                {/* end::Input */}
                {/* begin::Label */}
                <label
                  className="form-check-label"
                  htmlFor="consumer"
                >
                  <div className="fw-bolder text-gray-800">Consumidor</div>
                  <div className="text-gray-600">Ideal para alunos</div>
                </label>
                {/* end::Label */}
              </div>
            </div>

            <div className="separator separator-dashed my-5"></div>

            <div className="d-flex fv-row">
              <div className="form-check form-check-custom form-check-solid">
                {/* begin::Input */}
                <input
                  className="form-check-input me-3"
                  type="radio"
                  id="producer"
                  onChange={(e: any) => setRole("producer")}
                  name="drone"
                  checked={role === "producer"}
                />
                {/* end::Input */}
                {/* begin::Label */}
                <label
                  className="form-check-label"
                  htmlFor="producer"
                >
                  <div className="fw-bolder text-gray-800">
                    Produtor de conteúdo
                  </div>
                  <div className="text-gray-600">
                    Para produtores de conteúdo
                  </div>
                </label>
                {/* end::Label */}
              </div>
            </div>

            <div className="separator separator-dashed my-5"></div>

            <div className="d-flex fv-row">
              <div className="form-check form-check-custom form-check-solid">
                {/* begin::Input */}
                <input
                  className="form-check-input me-3"
                  type="radio"
                  id="admin"
                  onChange={(e: any) => setRole("admin")}
                  name="drone"
                  checked={role === "admin"}
                />
                {/* end::Input */}
                {/* begin::Label */}
                <label
                  className="form-check-label"
                  htmlFor="admin"
                >
                  <div className="fw-bolder text-gray-800">Administrador</div>
                  <div className="text-gray-600">
                    Para administradores do sistema
                  </div>
                </label>
                {/* end::Label */}
              </div>
            </div>

            <Form.Control.Feedback type="invalid">
              Por favor informe o papel
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
  );
};
export default Update;
