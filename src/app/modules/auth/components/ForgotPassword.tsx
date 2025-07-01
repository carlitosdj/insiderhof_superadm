import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {requestPassword} from '../core/_requests'

const initialValues = {
  email: '',
}

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('Email é obrigatório'),
})

export function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  // Detecta tema atual
  const isDark = typeof document !== 'undefined' && document.documentElement.getAttribute('data-bs-theme') === 'dark';

  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setHasErrors(undefined)
      setTimeout(() => {
        requestPassword(values.email)
          .then(() => {
            setHasErrors(false)
            setLoading(false)
          })
          .catch(() => {
            setHasErrors(true)
            setLoading(false)
            setSubmitting(false)
            setStatus('The login detail is incorrect')
          })
      }, 1000)
    },
  })

  return (
    <div className="d-flex flex-center flex-column flex-lg-row-fluid">
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
        <div className="card-body p-10">
          <form
            className='form w-100'
            noValidate
            id='kt_login_password_reset_form'
            onSubmit={formik.handleSubmit}
          >
            <div className='text-center mb-10'>
              <h1 className='text-gray-900 fw-bolder mb-3 fs-2x' style={{color: isDark ? '#fff' : undefined}}>Recuperar senha</h1>
              <div className='text-gray-500 fw-semibold fs-6'>
                Informe seu email para receber o link de redefinição de senha.
              </div>
            </div>

            {hasErrors === true && (
              <div className='alert alert-danger d-flex align-items-center p-5 mb-10'>
                <span className="svg-icon svg-icon-2hx text-danger me-4"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#F1416C" fillOpacity="0.3"/><path d="M15 9L9 15" stroke="#F1416C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 9L15 15" stroke="#F1416C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                <div className='d-flex flex-column'>
                  <h4 className='mb-1 text-danger'>Erro ao enviar</h4>
                  <span>Não foi possível enviar o email, tente novamente.</span>
                </div>
              </div>
            )}

            {hasErrors === false && (
              <div className='mb-10 bg-light-info p-8 rounded'>
                <div className='text-info'>Enviamos um link de redefinição para seu email.</div>
              </div>
            )}

            <div className='fv-row mb-8'>
              <label className='form-label fw-bolder text-gray-900 fs-6' style={{color: isDark ? '#fff' : undefined}}>Email</label>
              <input
                type='email'
                placeholder='Digite seu email'
                autoComplete='off'
                {...formik.getFieldProps('email')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.email && formik.errors.email},
                )}
                style={{
                  borderRadius: '8px',
                  border: '1px solid var(--kt-input-border-color)',
                  backgroundColor: isDark ? '#23272f' : '#f5f6fa',
                  color: isDark ? '#fff' : '#222',
                }}
              />
              {formik.touched.email && formik.errors.email && (
                <div className='fv-plugins-message-container invalid-feedback'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.email}</span>
                  </div>
                </div>
              )}
            </div>

            <div className='d-grid mb-10'>
              <button type='submit' id='kt_password_reset_submit' className='btn btn-primary btn-lg' style={{borderRadius: '8px', fontWeight: 600}} disabled={formik.isSubmitting || !formik.isValid || loading}>
                {!loading && <span className='indicator-label'>Enviar</span>}
                {loading && (
                  <span className='indicator-progress' style={{ display: "block" }}>
                    Enviando...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
            <div className='d-grid mb-2'>
              <Link to='/auth/login'>
                <button
                  type='button'
                  id='kt_login_password_reset_form_cancel_button'
                  className='btn btn-light btn-lg'
                  style={{borderRadius: '8px', fontWeight: 600}}
                >
                  Cancelar
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
