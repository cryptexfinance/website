import React,{ useEffect, useState } from 'react';
import { BigNumber, utils } from "ethers";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import image from '../../../../static/website/home/main.webp';
import tcap from '../../../../static/website/home/tcap.svg';
import appEndpoint from '../../../endpoint';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const SectionMain = () => {

  const format = (num, decimals) => num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,      
    maximumFractionDigits: decimals,
  });
  const [firstLoad, setFirstLoad] = useState(true)
  const [totalTcapPrice, setTotalTcapPrice] = useState(0.0);
  const [tcapPrice, setTcapPrice] = useState(0.0);
  const { loading, data, networkStatus} = useQuery(GET_TCAP_PRICE, {
      variables: {},
      pollInterval: 600000,
      fetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true
    }
  );

  useEffect(() => {
    const loadData = async () => {
      if (typeof (data) !== "undefined") {
        const currentTotalPrice = BigNumber.from(await data?.oracles[0].answer);
        const TotalTcapPrice = currentTotalPrice.mul(10000000000);

        setTotalTcapPrice(format( parseFloat(utils.formatEther(TotalTcapPrice)), 0));
        setTcapPrice(format(parseFloat(utils.formatEther(TotalTcapPrice.div(10000000000))), 2));
        setFirstLoad(false)
      } else {
        console.log(data);
      }
    }
    
    loadData();
  }, [networkStatus]);  

  return ( 
    <div className="section-main">      
        <Col xs={12} sm={12} md={12} lg={6} className="main-info">
          <div className="main-title header">The World's First <br/>Total Crypto Market Cap Token</div>

          <Row>
            <Col md={8} lg={8} className="market-cap">
              <div className="data">
                <div className="main-number-pink">{loading && firstLoad && <p>Loading...</p>} {data && "$" + totalTcapPrice}</div>            
                <div className="main-bold-text">Total Crypto Market Capitalization</div>
              </div>
              <div>
                <div className="main-divider"></div>
              </div>  
            </Col>
            <Col md={4} lg={4} className="tcap-data">
              <div className="main-number-blue">{loading && firstLoad  && <p>Loading...</p>} {data && "$" + tcapPrice}</div>          
              <div className="main-tcap">
                <img src={tcap} className="main-tcap-image" alt="TCAP" />
                <div className="main-tcap-text">&nbsp;TCAP</div>
              </div>
            </Col>
          </Row>
          <div className="button-to-app">
            <a href={appEndpoint} rel="noopener noreferrer" className="button-pink main-button main-button-link" target="_blank">
              Go to App
            </a>
          </div>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="image">          
          <img src={image} alt="Main" className="main-image" />          
        </Col>      
    </div>
  )
}

export default SectionMain

const GET_TCAP_PRICE = gql`
  query {
    oracles(first: 1, orderBy: updatedAt, orderDirection: desc) {
      answer
    }
  }
`