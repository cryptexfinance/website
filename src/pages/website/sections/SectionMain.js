import React from 'react'
// import { Container } from "react-bootstrap"
import { Link } from 'gatsby'
import image from '../../../../static/website/home/main.webp'
import tcap from '../../../../static/website/home/tcap.svg'

const SectionMain = () => {
  return (
    <>
      <div className="main-title header">Own The World's First<br/>Total Crypto Market Cap Token</div>
      <div className="main-image">
        <img src={image} alt="Main" className="main-image" />
      </div>
      <div className="main-number-pink">$252,589,639,105</div>
      <div className="main-bold-text">Total Crypto Market Capitalization</div>
      <div className="main-divider"></div>
      <div className="main-number-blue">$35.23</div>
      <div className="main-tcap">
        <img src={tcap} className="main-tcap-image" alt="TCAP" />
        <div className="main-tcap-text">&nbsp;TCAP</div>
      </div>
      <div className="main-number-green">+7.5%</div>
      <Link to="https://app.cryptex.finance">
        <button className="button-pink main-button">Go to App</button>
      </Link>
    </>
  )
}

export default SectionMain
