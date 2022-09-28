import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Carousel from "react-bootstrap/Carousel";
import addToMailchimp from "gatsby-plugin-mailchimp";
import toasty from "../../../../static/toasty.png";


const SectionCommunity = ({ data }) => {
  const [email, setEmail] = useState("");
  const [index, setIndex] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addToMailchimp(email);
    if(res.result==="success"){
      console.log(res);
      Toast("✔️ You’re Subscribed!", "Keep an eye out for updates from our team.","success");
      clearValues();  
    }else{
      console.log(res);
      Toast("❌    Error", res.msg,"error");
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.currentTarget.value);
  };

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const clearValues = () => {
    setEmail('');
  }

  const Toast = async (
    title,
    body,
    type,
    duration = 3000,
    fn = () => {},
    delay = 0
  ) => {
    const toastConstant = (
      <div className="body">
        <img src={toasty} alt="toasty" className="toasty" />
        <h5>{title}</h5>
        <p>{body}</p>
      </div>
    );
    if(type==="success"){
      toast.success(toastConstant, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: duration,
        hideProgressBar: true,
        delay,
        onClose: () => {
          fn();
        },
      });
    } else {
      toast.error(toastConstant, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: duration,
        hideProgressBar: true,
        delay,
        onClose: () => {
          fn();
        },
      });
    }
    
  };

  return (
    <div id="ecosystem" className="section-ecosystem">
      <ToastContainer />
      <div className="box main">
        <div className="info">
          <h1 className="header">
            Ecosystem
          </h1>
          <h3 className="subtitle">
            Join our community and participate in a one of a kind journey to take action, claim rewards and make frens.
            To start your journey, mint your free Sewage Fruit NFT. A PFP collection with mushroom to grow.
          </h3>
        </div>
        <div className="subscribe">
          <form onSubmit={handleSubmit}>
            <div className="subscribe-data">
              <input
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="subscribe-input"
                placeholder="Subscribe to Newsletter"
              /> 
              <button className="subscribe-button button-pink">Subscribe</button>
            </div>  
          </form>
        </div>
      </div>
      <Carousel
        fade
        interval={null}
        activeIndex={index}
        onSelect={handleSelect}
      >
        <Carousel.Item>
          <div className="item-content">
            <h1 className="header">Sewage Fruits</h1>            
          </div>  
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default SectionCommunity;
