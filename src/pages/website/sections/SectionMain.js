import React,{ useEffect, useState } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import { BigNumber, utils } from "ethers";
import { Link } from 'gatsby'
import image from '../../../../static/website/home/main.webp'
import tcap from '../../../../static/website/home/tcap.svg'

const SectionMain = () => {
  const format = (num, decimals) => num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,      
    maximumFractionDigits: decimals,
  });
  const [totalTcapPrice, setTotalTcapPrice] = useState(0.0);
  const [tcapPrice, setTcapPrice] = useState(0.0);

  const dataq = useStaticQuery(graphql`
    query {
      price {
        tcaps(
              first: 1, 
              orderBy: updatedAt, 
              orderDirection: desc
        ) {
          tcap
        }
      }
    }
  `);

  useEffect(() => {
    if (typeof(dataq.price.tcaps[0].tcap) !== `undefined`) {
      const Tprice = dataq.price.tcaps[0].tcap;
      const currentTotalPrice = BigNumber.from(Tprice);
      const TotalTcapPrice = currentTotalPrice.mul(10000000000);
      const tcapprice = currentTotalPrice.div(100000000);
      setTotalTcapPrice(format(parseFloat(tcapprice), 0));
      setTcapPrice(format(parseFloat(utils.formatEther(TotalTcapPrice.div(10000000000))),2));
    } else {
      console.log("Error with props in main");
      console.log(dataq.price.tcaps[0].tcap);
    }
  }, [dataq]);

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
      <Link to="https://app.cryptex.finance" rel="noopener" rel="noreferrer" target="_blank">
        <button className="button-pink main-button">Go to App</button>
      </Link>
    </>

  )
}

export default SectionMain
