import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'gatsby'
// import { DASHBOARD_URL } from '../../constants'
// import { deleteCookieByName, getCookieByName } from '../../utils/cookies'

// export const X_TF_ECOMMERCE = 'X-TF-ECOMMERCE'

const Header = ({ setShowLogin, isLogged, setIsLogged }) => {
  const [isNavExpanded, setIsNavExpanded] = useState(false)

  const isWindowDefined = useRef(typeof window !== 'undefined')

  const handleLogout = async () => {
    // deleteCookieByName(X_TF_ECOMMERCE)

    if (isWindowDefined.current) {
      window.localStorage.removeItem('access_token')
      window.localStorage.removeItem('user_data')
      setIsLogged(false)
      window.location.href = '/'
    }
  }

  const handleLogin = useCallback(
    (e) => {
      switch (e?.type) {
        case 'tf-login':
          setIsLogged(true)
          break
        case 'tf-logout':
          setIsLogged(false)
          break
        default:
          break
      }
    },
    [setIsLogged],
  )

  useEffect(() => {
    const isWindowDefined = typeof window !== 'undefined'
    // const xTfEcommerce = getCookieByName(X_TF_ECOMMERCE)
    const accessToken = isWindowDefined
      ? window.localStorage.getItem('access_token')
      : null

    if (!isLogged && (/* xTfEcommerce || */ accessToken)) {
      setIsLogged(true)
    }
  }, [isLogged, setIsLogged])

  useEffect(() => {
    if (isWindowDefined.current) {
      window.document.addEventListener('tf-login', handleLogin)
      return () => {
        window.document.removeEventListener('tf-login', handleLogin)
      }
    }
  }, [handleLogin])

  useEffect(() => {
    if (isWindowDefined.current) {
      window.document.addEventListener('tf-logout', handleLogin)
      return () => {
        window.document.removeEventListener('tf-logout', handleLogin)
      }
    }
  }, [handleLogin])

  useEffect(() => {
    const body = document.querySelector('body')
    if (isNavExpanded) {
      body.style.overflow = 'hidden'
    } else {
      body.style.overflow = 'visible'
    }
  }, [isNavExpanded])

  return (
    <div className="header">
      <div className="linear-row" />
      <div className="header-contianer">
        <div className="logo-container">
       {/*    <Link to="/">
            <img src={Logo} alt="No Data" height={58} width={99} />
          </Link> */}
        </div>
        <nav className="nav">
          <div className={isNavExpanded ? 'nav-menu expanded' : 'nav-menu'}>
            {/*  <a 
          className='nav-button' 
          target='_blank' 
          href={DASHBOARD_URL}
          >
          Manage Events
        </a> */}
            <button
              className="hamburger"
              onClick={() => {
                setIsNavExpanded(!isNavExpanded)
              }}
            >
              {isNavExpanded ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="25"
                  viewBox="0 0 100 80"
                  overflow="visible"
                  stroke="white"
                  strokeWidth="10"
                  strokeLinecap="round"
                >
                  <line x2="50" y2="50" />
                  <line x1="50" y2="50" />
                </svg>
              ) : (
                <svg viewBox="0 0 100 80" width="80" height="20">
                  <rect width="80" height="10" rx="8"></rect>
                  <rect y="30" width="80" height="10" rx="8"></rect>
                  <rect y="60" width="80" height="10" rx="8"></rect>
                </svg>
              )}
            </button>
            <ul>
              {isLogged ? (
                <>
                  <li>
                    <Link className="nav-button" to="/orders">
                      My Tickets
                    </Link>
                  </li>
                  <li>
                    <button className="nav-button" onClick={handleLogout}>
                      Log out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <div className="nav-button">
                    <button onClick={() => setShowLogin(true)}>Login</button>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Header
