import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";
import { addTenantUserRequest } from "../../../../store/ducks/tenants/actions";

interface AddTenantUserModalProps {
  tenantId: number;
  show: boolean;
  onHide: () => void;
}

const AddTenantUserModal: React.FC<AddTenantUserModalProps> = ({
  tenantId,
  show,
  onHide,
}) => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);

  const [userId, setUserId] = useState<number | ''>('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'owner' | 'admin' | 'member' | 'viewer'>('member');
  const [searchMode, setSearchMode] = useState<'userId' | 'email'>('email');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);

    const data = {
      userId: searchMode === 'userId' ? Number(userId) : undefined,
      email: searchMode === 'email' ? email : undefined,
      role,
    };

    dispatch(addTenantUserRequest(tenantId, data));

    // Reset form
    setUserId('');
    setEmail('');
    setRole('member');
    setValidated(false);
    onHide();
  };

  const handleClose = () => {
    setUserId('');
    setEmail('');
    setRole('member');
    setValidated(false);
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <div className="modal-header">
        <h2>Adicionar Usuário ao Tenant</h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={handleClose}
        >
          <KTIcon className="fs-1" iconName="cross" />
        </div>
      </div>

      <div className="modal-body py-lg-10 px-lg-10">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {/* Modo de busca */}
          <Form.Group className="mb-5">
            <Form.Label className="required">Buscar usuário por:</Form.Label>
            <div className="d-flex gap-5">
              <Form.Check
                type="radio"
                label="Email"
                checked={searchMode === 'email'}
                onChange={() => setSearchMode('email')}
              />
              <Form.Check
                type="radio"
                label="ID do Usuário"
                checked={searchMode === 'userId'}
                onChange={() => setSearchMode('userId')}
              />
            </div>
          </Form.Group>

          {/* Campo de busca */}
          {searchMode === 'email' ? (
            <Form.Group className="mb-5">
              <Form.Label className="required">Email do Usuário</Form.Label>
              <Form.Control
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@exemplo.com"
              />
              <Form.Text className="text-muted">
                O usuário deve já estar cadastrado no sistema
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Por favor, informe um email válido.
              </Form.Control.Feedback>
            </Form.Group>
          ) : (
            <Form.Group className="mb-5">
              <Form.Label className="required">ID do Usuário</Form.Label>
              <Form.Control
                required
                type="number"
                value={userId}
                onChange={(e) => setUserId(e.target.value ? Number(e.target.value) : '')}
                placeholder="123"
                min="1"
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o ID do usuário.
              </Form.Control.Feedback>
            </Form.Group>
          )}

          {/* Role */}
          <Form.Group className="mb-5">
            <Form.Label className="required">Permissão (Role)</Form.Label>
            <Form.Select
              required
              value={role}
              onChange={(e) => setRole(e.target.value as typeof role)}
            >
              <option value="viewer">Visualizador - Apenas visualizar</option>
              <option value="member">Membro - Visualizar e editar</option>
              <option value="admin">Admin - Controle total exceto billing</option>
              <option value="owner">Owner - Controle total incluindo billing</option>
            </Form.Select>
            <Form.Text className="text-muted">
              <strong>Owner:</strong> Controle total (billing, deletar tenant)
              <br />
              <strong>Admin:</strong> Gerenciar projetos e usuários
              <br />
              <strong>Membro:</strong> Criar e editar conteúdo
              <br />
              <strong>Visualizador:</strong> Apenas visualizar
            </Form.Text>
          </Form.Group>

          {/* Botões */}
          <div className="d-flex justify-content-end mt-6">
            <Button variant="light" onClick={handleClose} className="me-3">
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Adicionar Usuário
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddTenantUserModal;
