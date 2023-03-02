import * as React from 'react'
import moment from 'moment'

const Footer = () => {
  const currYear = moment().year();

  return (
    <div className='footer-container'>
      <div className='linear-row' />
      <div className='content'>
        <div className='image-container'>
       {/*    <img src={FooterImage} alt='No Data' /> */}
        </div>
        <div className='info-section'>
          © {currYear}{/*  Mana Common. */} All Rights Reserved. | {(
            <a
              href="https://www.ticketfairy.com/privacy-policy/"
              target="_blank"
              rel="noreferrer"
            >Privacy</a>
          )} | {' '}
          {(
            <a
              href="https://www.ticketfairy.com/terms-of-service/"
              target="_blank"
              rel="noreferrer"
            >
              Terms
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default Footer