import { useEffect, useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { getUserByToken, login } from "../core/_requests";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { useAuth } from "../core/Auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../../../store";
import { loginUserRequest } from "../../../../store/ducks/me/actions";
import { KTIcon } from "../../../../_metronic/helpers";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .min(1, "Email é obrigatório")
    //.email('Email inválido')
    .required("Email é obrigatório"),
  password: Yup.string()
    .min(1, "Senha é obrigatória")
    .required("Senha é obrigatória"),
});

const initialValues = {
  email: "",
  password: "",
};

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();
  const dispatch = useDispatch();
  const me = useSelector((state: ApplicationState) => state.me);

  // Detecta tema atual
  const isDark = typeof document !== 'undefined' && document.documentElement.getAttribute('data-bs-theme') === 'dark';

  useEffect(() => {
    if (me.error) {
      setLoading(false);
    }
  }, [me.me]);

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setFormSubmitted(true);
      setLoading(true);
      if (values.email && values.password) {
        me.error = false;
        console.log("System is trying to login user...");
        await dispatch(
          loginUserRequest({ email: values.email, password: values.password })
        );
      } else {
        console.log("Erro!");
        setLoading(false);
      }
    },
  });

  // Debug para verificar o estado do formulário
  console.log("Formik state:", {
    values: formik.values,
    touched: formik.touched,
    errors: formik.errors,
    isValid: formik.isValid,
    isSubmitting: formik.isSubmitting,
    loading: loading
  });

  return (
    <div className="d-flex flex-center flex-column flex-lg-row-fluid">
      {/* begin::Card */}
      <div
        className="card card-custom w-100 w-lg-400px shadow-lg"
        style={{
          borderRadius: '16px',
          border: isDark ? '1px solid rgba(255,255,255,0.08)' : 'none',
          background: isDark ? 'rgba(30,30,30,0.92)' : '#fff',
          boxShadow: isDark
            ? '0 8px 32px rgba(0,0,0,0.7)'
            : '0 8px 32px rgba(0,0,0,0.10)',
          transition: 'background 0.3s, box-shadow 0.3s, border 0.3s',
        }}
      >
        {/* begin::Card body */}
        <div className="card-body p-10">
          {/* begin::Logo */}
          {/* <div className="text-center mb-10">
            <Link to="/" className="mb-12">
              <img
                alt="Logo"
                src={toAbsoluteUrl("media/logos/logo-dark.png")}
                className="h-50px theme-light-show"
              />
              <img
                alt="Logo"
                src={toAbsoluteUrl("media/logos/logo-light.png")}
                className="h-50px theme-dark-show"
              />
            </Link>
          </div> */}
          {/* end::Logo */}

          {/* begin::Form */}
          <form
            className="form w-100"
            onSubmit={formik.handleSubmit}
            noValidate
            id="kt_login_signin_form"
          >
            {/* begin::Heading */}
            <div className="text-center mb-10">
              <h1 className="text-gray-900 fw-bolder mb-3 fs-2x">Entrar</h1>
              <div className="text-gray-500 fw-semibold fs-6">
                Painel de administração
              </div>
            </div>
            {/* end::Heading */}

            {/* begin::Error Alert */}
            {me.error && (
              <div className="alert alert-danger d-flex align-items-center p-5 mb-10">
                <KTIcon iconName="shield-cross" className="fs-2hx text-danger me-4" />
                <div className="d-flex flex-column">
                  <h4 className="mb-1 text-danger">Erro no login</h4>
                  <span>{me.error.message}</span>
                </div>
              </div>
            )}

            {/* begin::Form group */}
            <div className="fv-row mb-8">
              <label className="form-label fs-6 fw-bolder text-gray-900">Email</label>
              <input
                placeholder="Digite seu email"
                {...formik.getFieldProps("email")}
                className={clsx(
                  "form-control form-control-lg form-control-solid",
                  { "is-invalid": formSubmitted && formik.errors.email },
                )}
                type="email"
                name="email"
                autoComplete="off"
                autoFocus
                style={{
                  borderRadius: '8px',
                  border: '1px solid var(--kt-input-border-color)',
                  backgroundColor: isDark ? '#23272f' : '#f5f6fa',
                  color: isDark ? '#fff' : '#222',
                }}
              />
              {formSubmitted && formik.errors.email && (
                <div className="fv-plugins-message-container invalid-feedback">
                  <div className="fv-help-block">
                    <span role="alert">{formik.errors.email}</span>
                  </div>
                </div>
              )}
            </div>
            {/* end::Form group */}

            {/* begin::Form group */}
            <div className="fv-row mb-8">
              <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
                Senha
              </label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="off"
                  {...formik.getFieldProps("password")}
                  className={clsx(
                    "form-control form-control-lg form-control-solid",
                    { "is-invalid": formSubmitted && formik.errors.password },
                  )}
                  placeholder="Digite sua senha"
                  style={{
                    borderRadius: '8px',
                    border: '1px solid var(--kt-input-border-color)',
                    backgroundColor: isDark ? '#23272f' : '#f5f6fa',
                    color: isDark ? '#fff' : '#222',
                    paddingRight: '100px',
                  }}
                />
                <button
                  type="button"
                  className="btn btn-icon btn-clear position-absolute top-50 end-0 translate-middle-y"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '4px',
                    transition: 'background-color 0.2s ease',
                    zIndex: 10,
                    right: '24px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--kt-gray-200)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <KTIcon 
                    iconName={showPassword ? "eye-slash" : "eye"} 
                    className="fs-2 text-gray-500"
                  />
                </button>
                <style>{`
                  input.form-control.is-valid, input.form-control.is-invalid {
                    background-image: none !important;
                  }
                `}</style>
              </div>
              {formSubmitted && formik.errors.password && (
                <div className="fv-plugins-message-container invalid-feedback">
                  <div className="fv-help-block">
                    <span role="alert">{formik.errors.password}</span>
                  </div>
                </div>
              )}
            </div>
            {/* end::Form group */}

            {/* begin::Wrapper */}
            <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
              <div />
              <Link to="/auth/forgot-password" className="link-primary">
                Esqueceu a senha?
              </Link>
            </div>
            {/* end::Wrapper */}

            {/* begin::Action */}
            <div className="d-grid mb-10">
              <button
                type="submit"
                id="kt_sign_in_submit"
                className="btn btn-primary btn-lg"
                disabled={loading || !formik.values.email || !formik.values.password}
                style={{
                  borderRadius: '8px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                }}
              >
                {!loading && <span className="indicator-label">Entrar</span>}
                {loading && (
                  <span className="indicator-progress" style={{ display: "block" }}>
                    Entrando...
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                )}
              </button>
            </div>
            {/* end::Action */}
          </form>
          {/* end::Form */}
        </div>
        {/* end::Card body */}
      </div>
      {/* end::Card */}
    </div>
  );
};
