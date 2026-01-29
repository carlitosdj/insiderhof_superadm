import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { KTIcon } from "../../../../_metronic/helpers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import momentDurationFormatSetup from "moment-duration-format";
import {
  LaunchPhaseExtras,
  LaunchPhaseExtraType,
} from "../../../../store/ducks/dlaunchphaseextras/types";
import { updateLaunchPhaseExtrasRequest } from "../../../../store/ducks/dlaunchphaseextras/actions";
import moment from "moment";
momentDurationFormatSetup(moment);

interface handleCloseProps {
  handleClose: () => void;
  child: LaunchPhaseExtras;
}

const Update = ({ handleClose, child }: handleCloseProps) => {
  const dispatch = useDispatch();
  // const component = useSelector((state: ApplicationState) => state.component);

  const [validated, setValidated] = useState(false);
  const [key, setKey] = useState<string | undefined>("");
  const [value, setValue] = useState<string | undefined>("");
  const [name, setName] = useState<string | undefined>("");
  const [type, setType] = useState<LaunchPhaseExtraType>("text");
  const [status, setStatus] = useState<string>("1");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [price, setPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);

  useEffect(() => {
    setKey(child.key);
    setValue(child.value);
    setStatus(child.status!);
    setName(child.name);
    setType(child.type || "text");

    // Set selected date if type is datetime and value exists
    if (child.type === "datetime" && child.value) {
      // Parse DD/MM/YYYY HH:mm format
      const dateParts = child.value.match(
        /(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})/
      );
      if (dateParts) {
        const [, day, month, year, hours, minutes] = dateParts;
        const date = new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day),
          parseInt(hours),
          parseInt(minutes)
        );
        setSelectedDate(date);
      } else {
        // Fallback to standard Date parsing
        const date = new Date(child.value);
        setSelectedDate(isNaN(date.getTime()) ? null : date);
      }
    } else {
      setSelectedDate(null);
    }
  }, [child.key, child.value, child.type]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //console.log("submit", component.data.id);
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    if (key) {
      // Format value based on type
      let formattedValue = value;
      if (type === "datetime" && selectedDate) {
        // Format as DD/MM/YYYY HH:mm
        const day = selectedDate.getDate().toString().padStart(2, "0");
        const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
        const year = selectedDate.getFullYear().toString();
        const hours = selectedDate.getHours().toString().padStart(2, "0");
        const minutes = selectedDate.getMinutes().toString().padStart(2, "0");
        formattedValue = `${day}/${month}/${year} ${hours}:${minutes}`;
      }

      const componentToUpdate: LaunchPhaseExtras = {
        id: child.id,
        key,
        value: formattedValue,
        name,
        type,
        status: status!,
      };
      console.log("ver", componentToUpdate);
      dispatch(updateLaunchPhaseExtrasRequest(componentToUpdate));
      handleClose();
    }
  };

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-12 py-lg-2 px-lg-6">
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Key
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={key}
                onChange={(e: any) => setKey(e.target.value)}
                name="name"
                className="form-control form-control-lg form-control-solid"
                disabled
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o nome do produto
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formDescription">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Value
              </Form.Label>
              {type === "datetime" ? (
                <DatePicker
                  selected={selectedDate}
                  onChange={(date: Date | null) => {
                    setSelectedDate(date);
                    if (date) {
                      // Format as DD/MM/YYYY HH:mm for display
                      const day = date.getDate().toString().padStart(2, "0");
                      const month = (date.getMonth() + 1)
                        .toString()
                        .padStart(2, "0");
                      const year = date.getFullYear().toString();
                      const hours = date.getHours().toString().padStart(2, "0");
                      const minutes = date
                        .getMinutes()
                        .toString()
                        .padStart(2, "0");
                      setValue(`${day}/${month}/${year} ${hours}:${minutes}`);
                    } else {
                      setValue("");
                    }
                  }}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="dd/MM/yyyy HH:mm"
                  className="form-control form-control-lg form-control-solid"
                  placeholderText="Selecione data e hora"
                  isClearable
                />
              ) : (
                <>
                  <Form.Control
                    placeholder=""
                    //required
                    value={value}
                    onChange={(e: any) => setValue(e.target.value)}
                    className="form-control form-control-lg form-control-solid"
                    as="textarea"
                    rows={type === "template" ? 20 : 8}
                    style={
                      type === "template"
                        ? { fontFamily: "monospace", fontSize: "0.875rem" }
                        : {}
                    }
                  />
                  {type === "template" && (
                    <Form.Text className="text-muted">
                      Use variáveis Handlebars: {"{{name}}"}, {"{{expert}}"},{" "}
                      {"{{eventName}}"}, {"{{url_confirm}}"}, etc.
                    </Form.Text>
                  )}
                </>
              )}
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição do produto
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="formDescription">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Name
              </Form.Label>
              <Form.Control
                placeholder=""
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o nome
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="formDescription">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Type
              </Form.Label>
              <Form.Select
                value={type}
                onChange={(e: any) =>
                  setType(e.target.value as LaunchPhaseExtraType)
                }
                className="form-control form-control-lg form-control-solid"
              >
                <option value="text">Texto</option>
                <option value="link">Link</option>
                <option value="datetime">Data/Hora</option>
                <option value="image">Imagem</option>
                <option value="template">Template de Email</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Por favor selecione o tipo
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
    </>
  );
};
export default Update;
