import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Product } from "../../../../store/ducks/dproduct/types";
import { availableProduct } from "../../../../store/ducks/davailableproduct/types";
import { updateProductRequest } from "../../../../store/ducks/dproduct/actions";
import { ApplicationState } from "../../../../store";
import { useSelector } from "react-redux";
import { loadMyLaunchsRequest } from "../../../../store/ducks/dlaunch/actions";

interface handleCloseProps {
  handleClose: () => void;
  child: Product;
}
const AvailableProduct = ({ handleClose, child }: handleCloseProps) => {
  const [inputList, setInputList] = useState([
    { launchId: "", availableDate: "", productId: child.id, deadline: "" },
  ]);
  const [validated, setValidated] = useState(false);
  const me = useSelector((state: ApplicationState) => state.me);
  const launchs = useSelector((state: ApplicationState) => state.launch);

  const dispatch = useDispatch();
  // handle click event of the Remove button

  const handleInputChange = (e: any, index: number, type: string) => {
    const list: any = [...inputList];
    list[index][type] = e.target.value;
    setInputList(list);
  };

  const handleRemoveClick = (index: any) => {
    console.log("INDEX to remove", index);
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        launchId: "", //(parseInt(inputList[inputList.length - 1].launchId) + 1).toString(),
        availableDate: "",
        productId: child.id,
        deadline: "",
      },
    ]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    console.log("inputList para salvar", inputList);

    let newComponent: Product = {};

    newComponent.id = child.id;
    newComponent.availableProduct = [];

    inputList.map((it) => {
      if (it.launchId && it.productId)
        newComponent.availableProduct?.push({
          launchId: it.launchId,
          availableDate: it.availableDate === "" ? null : it.availableDate,
          productId: it.productId,
          deadline: it.deadline === "" ? null : it.deadline,
        });
    });

    console.log("NEWCOMPONENT", newComponent);
    dispatch(updateProductRequest(newComponent));
    handleClose();
  };

  const setConfigItems = (list: availableProduct[]) => {
    // console.log('setConfigItems', list)
    let initialList: any = [];
    list.map((it) => {
      let item = {
        id: "" + it.id!,
        launchId: it.launchId!,
        availableDate: it.availableDate!,
        productId: child.id,
        deadline: it.deadline!,
      };
      initialList.push(item);
    });

    initialList.push({
      launchId: "", //list.length ? (parseInt(list[list.length - 1].launchId) + 1).toString() : '1',
      availableDate: "",
      productId: child.id,
      deadline: "",
    });
    setInputList(initialList);
  };

  useEffect(() => {
    //Itens para modalidade:
    const availableProducts = child.availableProduct || [];
    setConfigItems(availableProducts);
    dispatch(loadMyLaunchsRequest(me.me.id!));
  }, []);

  //   console.log('VER AQUI', child.available)
  //   console.log('INPUTLIST', inputList)

  return (
    <div>
      <Form validated={validated} onSubmit={handleSubmit}>
        {/* <h3><a href="https://cluemediator.com">Clue Mediator</a></h3> */}
        {inputList.map((x, i) => {
          return (
            <div key={i}>
              <div className="row">
                <div className="col-5">
                  <Form.Group>
                    <Form.Control
                      as="select"
                      value={x.launchId}
                      onChange={(e) => handleInputChange(e, i, "launchId")}
                      className="form-control form-control-lg form-control-solid"
                      //required
                    >
                      <option value="" selected disabled hidden>
                        Selecione
                      </option>
                      {launchs.myLaunchs.map((launch, index) => {
                        return (
                          <option
                            key={index}
                            value={launch.id}
                            selected={+launch.id! === +x.launchId}
                          >
                            {launch.name}
                          </option>
                        );
                      })}
                    </Form.Control>

                    {/* <Form.Control
                      placeholder='Turma Num'
                      name='launchId'
                      value={x.launchId}
                      onChange={(e) => handleInputChange(e, i, 'launchId')}
                    /> */}
                  </Form.Group>
                </div>

                <div className="col-3">
                  <Form.Group>
                    <Form.Control
                      placeholder="Available Date"
                      name="availableDate"
                      value={x.availableDate}
                      onChange={(e) => handleInputChange(e, i, "availableDate")}
                      className="form-control form-control-lg form-control-solid"
                    />
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group>
                    <Form.Control
                      placeholder="Deadline D+X"
                      name="deadline"
                      value={x.deadline}
                      onChange={(e) => handleInputChange(e, i, "deadline")}
                      className="form-control form-control-lg form-control-solid"
                    />
                  </Form.Group>
                </div>

                <div className="col-1">
                  {inputList.length !== 1 && (
                    <Button
                      size="sm"
                      variant="primary"
                      className="float-right"
                      onClick={() => handleRemoveClick(i)}
                    >
                      X
                    </Button>
                  )}
                  <br />
                  <br />
                  {inputList.length - 1 === i && (
                    <Button
                      size="sm"
                      variant="primary"
                      className="float-right"
                      onClick={handleAddClick}
                    >
                      +
                    </Button>
                  )}
                </div>
              </div>
              <br />
            </div>
          );
        })}
        <div className="float-end">
          <Button
            size="sm"
            variant="primary"
            type="submit"
            className=" btn-block btn btn-primary btn-sm mt-4"
          >
            Salvar
          </Button>{" "}
          <Button
            size="sm"
            variant="secondary"
            type="submit"
            className="btn-block btn btn-primary btn-sm mt-4"
            onClick={handleClose}
          >
            Cancelar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AvailableProduct;
