import clsx from 'clsx'
import {KTIcon, toAbsoluteUrl} from '../../../helpers'
import {HeaderNotificationsMenu, HeaderUserMenu, Search, ThemeModeSwitcher} from '../../../partials'
import {useLayout} from '../../core'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../../../store'
import { useState, useEffect } from 'react'

const itemClass = 'ms-1 ms-md-4'
const btnClass =
  'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px'
const userAvatarClass = 'symbol-35px'
const btnIconClass = 'fs-2'

const Navbar = () => {
  const {config} = useLayout()
  const me = useSelector((state: ApplicationState) => state.me)
  const { image } = me.me

  // Check impersonation status
  const [impersonatedTenant, setImpersonatedTenant] = useState<string | null>(null)
  const [isImpersonating, setIsImpersonating] = useState(false)

  useEffect(() => {
    const checkImpersonation = () => {
      const isImpersonatingFlag = localStorage.getItem('isImpersonating') === 'true'
      const tenantName = localStorage.getItem('impersonatedTenantName')

      setIsImpersonating(isImpersonatingFlag)
      setImpersonatedTenant(isImpersonatingFlag ? tenantName : null)
    }

    checkImpersonation()

    // Listen for storage changes (when impersonation is started/stopped)
    const handleStorageChange = () => {
      checkImpersonation()
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleStopImpersonation = () => {
    localStorage.removeItem('currentTenantId')
    localStorage.removeItem('impersonatedTenantName')
    localStorage.removeItem('isImpersonating')
    setImpersonatedTenant(null)
    setIsImpersonating(false)
    alert('Impersonation encerrado. Voltando ao modo super-admin.')
    window.location.href = '/tenants'
  }

  return (
    <div className='app-navbar flex-shrink-0'>
      {/* Impersonation Indicator */}
      {impersonatedTenant && (
        <div className={clsx('app-navbar-item', itemClass)}>
          <div className="d-flex align-items-center bg-warning bg-opacity-10 rounded px-3 py-2">
            <KTIcon iconName="eye" className="fs-3 text-warning me-2" />
            <div className="d-flex flex-column">
              <span className="text-warning fw-bold fs-7">Modo Impersonation</span>
              <span className="text-gray-700 fs-8">{impersonatedTenant}</span>
            </div>
            <button
              className="btn btn-sm btn-icon btn-light-warning ms-3"
              onClick={handleStopImpersonation}
              title="Sair do modo impersonation"
            >
              <KTIcon iconName="cross" className="fs-3" />
            </button>
          </div>
        </div>
      )}

      <div className={clsx('app-navbar-item align-items-stretch', itemClass)}>
        <Search />
      </div>

      {/* <div className={clsx('app-navbar-item', itemClass)}>
        <div id='kt_activities_toggle' className={btnClass}>
          <KTIcon iconName='chart-simple' className={btnIconClass} />
        </div>
      </div> */}

      {/* <div className={clsx('app-navbar-item', itemClass)}>
        <div
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          className={btnClass}
        >
          <KTIcon iconName='element-plus' className={btnIconClass} />
        </div>
        <HeaderNotificationsMenu />
      </div> */}

      {/* <div className={clsx('app-navbar-item', itemClass)}>
        <div className={clsx('position-relative', btnClass)} id='kt_drawer_chat_toggle'>
          <KTIcon iconName='message-text-2' className={btnIconClass} />
          <span className='bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink' />
        </div>
      </div> */}

      <div className={clsx('app-navbar-item', itemClass)}>
        <ThemeModeSwitcher toggleBtnClass={clsx('btn-active-light-primary btn-custom')} />
      </div>

      <div className={clsx('app-navbar-item', itemClass)}>
        <div
          className={clsx('cursor-pointer symbol', userAvatarClass)}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
        >
          <img 
            src={ image?.includes('https://') ? image : 'https://app.insiderhof.com.br/files/' + image}
            //style={{width: '40px', height:'40px'}}
            className=''
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src="https://app.insiderhof.com.br/files/notfound.jpg";
            }}
            />
        </div>
        <HeaderUserMenu />
      </div>

      {config.app?.header?.default?.menu?.display && (
        <div className='app-navbar-item d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-color-primary w-35px h-35px'
            id='kt_app_header_menu_toggle'
          >
            <KTIcon iconName='text-align-left' className={btnIconClass} />
          </div>
        </div>
      )}
    </div>
  )
}

export {Navbar}
