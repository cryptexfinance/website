import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";

const PriceFeed = () => {
  const [className, setClassName] = useState("price-feed");

  const handleOnClick = () => {
    setClassName("price-feed-hide");
  };

  return (
    <div className={className}>
      <div className="title">
        <h5>Market Price</h5>
        <Button onClick={handleOnClick}>X</Button>
      </div>  
      <div
        id="crypto-widget-CoinList"
        data-theme="dark"
        data-design="modern"
        data-coin-ids="4434,4784"
      />
    </div>    
  );
};

export default PriceFeed;
