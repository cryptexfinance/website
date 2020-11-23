import React,{ useEffect, useState } from 'react'
// import { Container } from "react-bootstrap"
import { BigNumber, utils } from "ethers";
import { Link } from 'gatsby'
import image from '../../../../static/website/home/main.webp'
import tcap from '../../../../static/website/home/tcap.svg'

const SectionMain = (props) => {
  const format = (num, decimals) => num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,      
    maximumFractionDigits: decimals,
  });
  const [totalTcapPrice, setTotalTcapPrice] = useState("0.0");
  const [tcapPrice, setTcapPrice] = useState("0.0");

  useEffect(() => {
    if (props) {
      const currentTotalPrice = BigNumber.from(props.price);
      const TotalTcapPrice = currentTotalPrice.mul(10000000000);
      const tcapprice = currentTotalPrice.div(100000000);
      setTotalTcapPrice(format(parseFloat(tcapprice), 0));
      setTcapPrice(format(parseFloat(utils.formatEther(TotalTcapPrice.div(10000000000))),2));
    } else {
      console.log("Error with props");
      console.log(props);
    }
    
  }, [props]);

  return (
    <>
      <div className="main-title header">The World's First<br/>Total Crypto Market Cap Token</div>
      <div className="main-image">
        <img src={image} alt="Main" className="main-image" />
      </div>
      <div className="main-number-pink">${totalTcapPrice}</div>
      <div className="main-bold-text">Total Crypto Market Capitalization</div>
      <div className="main-divider"></div>
      <div className="main-number-blue">${tcapPrice}</div>
      <div className="main-tcap">
        <img src={tcap} className="main-tcap-image" alt="TCAP" />
        <div className="main-tcap-text">&nbsp;TCAP</div>
      </div>
      {/* <div className="main-number-green">+7.5%</div> */}
      <Link to="https://app.cryptex.finance"  target="_blank">
        <button className="button-pink main-button">Go to App</button>
      </Link>
    </>
  )
}

export default SectionMain