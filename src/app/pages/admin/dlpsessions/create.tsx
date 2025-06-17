import React, { useState, useCallback, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { KTIcon } from "../../../../_metronic/helpers";


import momentDurationFormatSetup from "moment-duration-format";
import { LPSession } from "../../../../store/ducks/dlpsessions/types";
import { createLPSessionRequest } from "../../../../store/ducks/dlpsessions/actions";


const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

interface handleCloseProps {
  handleClose: () => void;
  lpId: number;
}

interface ConfigItem {
  key: string;
  value: string;
}

// Allowed configuration key types
const ALLOWED_CONFIG_KEYS = [
  { value: 'title', label: 'Título' },
  { value: 'subtitle', label: 'Subtítulo' },
  { value: 'type', label: 'Tipo' },
  { value: 'btnText', label: 'Texto do Botão' }
];

const Create = ({ handleClose, lpId }: handleCloseProps) => {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [delay, setDelay] = useState("");
  const [order, setOrder] = useState(0);
  const [status, setStatus] = useState("1");
  const [validated, setValidated] = useState(false);
  const [configItems, setConfigItems] = useState<ConfigItem[]>([]);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  // Use ref to maintain current configItems state
  const configItemsRef = useRef<ConfigItem[]>([]);
  
  // Sync ref with state changes
  useEffect(() => {
    configItemsRef.current = configItems;
    console.log("Ref updated with configItems:", configItems);
  }, [configItems]);

  const dispatch = useDispatch();
  const me = useSelector((state: ApplicationState) => state.me);

  // Debug effect to log configItems changes
  useEffect(() => {
    console.log("configItems changed:", configItems);
  }, [configItems]);

  const addConfigItem = useCallback(() => {
    if (newKey.trim() && newValue.trim()) {
      const newItem = { key: newKey.trim(), value: newValue.trim() };
      setConfigItems(prevItems => {
        const updatedItems = [...prevItems, newItem];
        console.log("Adding new item:", newItem);
        console.log("Updated configItems:", updatedItems);
        return updatedItems;
      });
      setNewKey("");
      setNewValue("");
    }
  }, [newKey, newValue]);

  const removeConfigItem = useCallback((index: number) => {
    setConfigItems(prevItems => prevItems.filter((_, i) => i !== index));
  }, []);

  const updateConfigItem = useCallback((index: number, field: 'key' | 'value', value: string) => {
    setConfigItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[index][field] = value;
      console.log(`Updating item ${index} ${field} to:`, value);
      console.log("Updated configItems:", updatedItems);
      return updatedItems;
    });
  }, []);

  // Get available keys (exclude already used ones)
  const getAvailableKeys = () => {
    const usedKeys = configItems.map(item => item.key);
    return ALLOWED_CONFIG_KEYS.filter(key => !usedKeys.includes(key.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    console.log("=== SUBMIT DEBUG ===");
    console.log("configItems state:", configItems);
    console.log("configItems length:", configItems.length);

    // Check if there's a pending item to add
    let finalConfigItems = [...configItems];
    if (newKey.trim() && newValue.trim()) {
      finalConfigItems.push({ key: newKey.trim(), value: newValue.trim() });
      console.log("Added pending item:", { key: newKey.trim(), value: newValue.trim() });
    }

    console.log("Final configItems:", finalConfigItems);

    // Convert configItems to object
    const configObject = finalConfigItems.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {} as Record<string, string>);

    console.log("configObject after conversion:", configObject);
    console.log("configObject keys:", Object.keys(configObject));
    console.log("configObject values:", Object.values(configObject));

    //if (title) {
      const item: LPSession = {
        lpId,
        type,
        name,
        title,
        subtitle,
        delay,
        order,
        status,
        config: JSON.stringify(configObject)
      };
      console.log("item to be sent:", item);
      console.log("=== END SUBMIT DEBUG ===");
      dispatch(createLPSessionRequest(item));
      handleClose();
    //}
  };

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-12 py-lg-2 px-lg-6">
            
            <Form.Group controlId="formName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Nome
              </Form.Label>
              <Form.Control
                className="form-control form-control-lg form-control-solid"
                placeholder="Digite o nome da sessão"
                required
                value={name}
                onChange={(e: any) => setName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o nome
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formTitle">
              <Form.Label className="fw-bold fs-6 mb-5">
                Título
              </Form.Label>
              <Form.Control
                className="form-control form-control-lg form-control-solid"
                placeholder="Digite o título da sessão"
                //required
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
                autoFocus
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o título
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formSubtitle">
              <Form.Label className="fw-bold fs-6 mb-5">Subtítulo</Form.Label>
              <Form.Control
                placeholder="Digite o subtítulo da sessão"
                value={subtitle}
                onChange={(e: any) => setSubtitle(e.target.value)}
                className="form-control form-control-lg form-control-solid"
                as="textarea"
                rows={3}
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o subtítulo
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formType">
              <Form.Label className="fw-bold fs-6 mb-5">Tipo</Form.Label>
              <Form.Control
                placeholder="Digite o tipo da sessão"
                value={type}
                onChange={(e: any) => setType(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o tipo
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formDelay">
              <Form.Label className="fw-bold fs-6 mb-5">Delay (ms)</Form.Label>
              <Form.Control
                placeholder="Digite o delay em milissegundos"
                value={delay}
                onChange={(e: any) => setDelay(e.target.value)}
                className="form-control form-control-lg form-control-solid"
                type="text"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o delay
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formOrder">
              <Form.Label className="fw-bold fs-6 mb-5">Ordem</Form.Label>
              <Form.Control
                placeholder="Digite a ordem da sessão"
                value={order}
                onChange={(e: any) => setOrder(Number(e.target.value))}
                className="form-control form-control-lg form-control-solid"
                type="number"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a ordem
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formConfig">
              <Form.Label className="fw-bold fs-6 mb-5">Configuração</Form.Label>
              
              {/* Existing config items */}
              {configItems.map((item, index) => (
                <div key={index} className="d-flex gap-2 mb-3 align-items-center">
                  <div className="flex-grow-1">
                    <Form.Select
                      value={item.key}
                      onChange={(e) => updateConfigItem(index, 'key', e.target.value)}
                      className="form-select form-select-solid"
                    >
                      <option value="">Selecione o tipo</option>
                      {ALLOWED_CONFIG_KEYS.map(key => (
                        <option key={key.value} value={key.value}>
                          {key.label}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  <div className="flex-grow-1">
                    <Form.Control
                      placeholder="Valor"
                      value={item.value}
                      onChange={(e) => updateConfigItem(index, 'value', e.target.value)}
                      className="form-control form-control-solid"
                    />
                  </div>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeConfigItem(index)}
                    className="btn-icon btn-sm"
                    title="Remover item"
                  >
                    <KTIcon iconName="trash" className="fs-4" />
                  </Button>
                </div>
              ))}

              {/* Add new config item - only show if there are available keys */}
              {getAvailableKeys().length > 0 && (
                <div className="d-flex gap-2 mb-3 align-items-center">
                  <div className="flex-grow-1">
                    <Form.Select
                      value={newKey}
                      onChange={(e) => setNewKey(e.target.value)}
                      className="form-select form-select-solid"
                    >
                      <option value="">Selecione o tipo</option>
                      {getAvailableKeys().map(key => (
                        <option key={key.value} value={key.value}>
                          {key.label}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  <div className="flex-grow-1">
                    <Form.Control
                      placeholder="Valor"
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      className="form-control form-control-solid"
                    />
                  </div>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={addConfigItem}
                    className="btn-icon btn-sm"
                    disabled={!newKey.trim() || !newValue.trim()}
                    title="Adicionar item"
                  >
                    <KTIcon iconName="plus" className="fs-4" />
                  </Button>
                </div>
              )}

              {configItems.length === 0 && getAvailableKeys().length === 0 && (
                <div className="text-muted small">
                  Todas as configurações disponíveis já foram adicionadas
                </div>
              )}

              {configItems.length === 0 && getAvailableKeys().length > 0 && (
                <div className="text-muted small">
                  Adicione pares de chave-valor para a configuração
                </div>
              )}
            </Form.Group>
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
      {/* Deixar o button fora do form.. */}
    </>
  );
};
export default Create;
