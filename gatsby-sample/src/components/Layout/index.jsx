import React, { useState } from 'react'
import { LoginModal, ForgotPasswordModal } from 'tf-checkout-react'
import Header /*, { X_TF_ECOMMERCE } */ from '../header/index'
import Footer from '../footer/index'
import { setTfCheckoutReactConfigs } from '../../../tf-checkout-config'
// import { getCookieByName } from '../../utils/cookies'

setTfCheckoutReactConfigs()

const Layout = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false)
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false)
  const isWindowDefined = typeof window !== 'undefined'
  const [isLogged, setIsLogged] = useState(false)
/*   const [isLogged, setIsLogged] = useState(
    isWindowDefined ? !!getCookieByName(X_TF_ECOMMERCE) : false
  ) */
  
  const onClose = () => {
    setShowLogin(false)
  }

  const handleOnLogin = (e) => {
    setShowLogin(false)
    setIsLogged(true)
    if(isWindowDefined){
      if(window.location.pathname?.includes('billing')){
        window.location.reload();
      }
    }
  }

  return (
    <>
      <Header setShowLogin={setShowLogin} setIsLogged={setIsLogged} isLogged={isLogged}/>
      <main className='main-layout-content'>
        {showLogin && !isLogged && (
          <LoginModal
            // logo={Logo}
            onClose={onClose}
            onLogin={handleOnLogin}
            onForgotPassword={() => {
              setShowLogin(false)
              setShowResetPasswordModal(true)
            }}
            showForgotPasswordButton
          />
        )}
        {showResetPasswordModal && (
          <ForgotPasswordModal
            onClose={() => {
              setShowResetPasswordModal(false)
            }}
            onLogin={() => {
              setShowResetPasswordModal(false)
              setShowLogin(true)
            }}
            onForgotPasswordSuccess={() => {
              setShowResetPasswordModal(false)
              setShowLogin(true)
            }}
          />
        )}
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout