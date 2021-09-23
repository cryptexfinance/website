import React, { useState } from 'react';
// import { Link } from 'gatsby';
import { toast, ToastContainer } from "react-toastify";
import reddit from '../../../../static/website/community/reddit.svg';
import discord from '../../../../static/website/community/discord.svg';
import twitter from '../../../../static/website/community/twitter.svg';
import medium from '../../../../static/website/community/medium.svg';
import youtube from '../../../../static/website/community/youtube.svg';
import telegram from '../../../../static/website/community/telegram.svg';
import community from '../../../../static/website/community/community.webp';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import toasty from "../../../../static/toasty.png";

const SectionCommunity = ({ data }) => {

  const [email, setEmail] = useState('');

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
      <section id="community" className="section-community">
        <ToastContainer />
        <div className="row">
          <div className="community-title header">
            Join Our Community
          </div>
          <div className="community-subtitle content">
            We’re on a mission to make digital assets simple, accessible, and secure.
          </div>
          <div className="community-icons-row">
            <a href="https://www.reddit.com/r/totalcryptomarketcap" rel="noreferrer" target="_blank" className="community-item">
              <img src={reddit} className="community-item-icon" alt="Reddit" />
              <div className="community-item-text terciary-header">Reddit</div>
            </a>
            <a href="https://discord.gg/cryptex" rel="noreferrer" target="_blank" className="community-item">
              <img src={discord} className="community-item-icon" alt="Discord" />
              <div className="community-item-text terciary-header">Discord</div>
            </a>
            <a href="https://twitter.com/cryptexfinance" rel="noreferrer" target="_blank" className="community-item">
              <img src={twitter} className="community-item-icon" alt="Twitter" />
              <div className="community-item-text terciary-header">Twitter</div>
            </a>
          </div>
          <div className="community-icons-row-2">
            <a href="https://medium.com/cryptexfinance" rel="noreferrer" target="_blank" className="community-item">
              <img src={medium} className="community-item-icon" alt="Medium" />
              <div className="community-item-text terciary-header">Medium</div>
            </a>
            <a href="https://t.me/cryptexfinance" rel="noreferrer" target="_blank" className="community-item">
              <img src={telegram} className="community-item-icon" alt="Telegram" />
              <div className="community-item-text terciary-header">Telegram</div>
            </a>
            <a href="https://www.youtube.com/channel/UCdN17zdr5MCDph75srdhutQ" rel="noreferrer" target="_blank" className="community-item">
              <img src={youtube} className="community-item-icon" alt="Youtube" />
              <div className="community-item-text terciary-header">Youtube</div>
            </a>
          </div>
          <form onSubmit={handleSubmit}>
            <label id="subslbl" htmlFor="subscribe" className="community-subscribe-title heading-secondary">
              Stay in Touch
            <input id="email" value={email} onChange={handleEmailChange} className="community-subscribe-input" placeholder="Email" />
            </label>
            <button className="community-subscribe-button button-pink">Subscribe</button>
          </form>
          <img src={community} className="community-image" alt="Community" />
        </div>
      </section>
  )
}

export default SectionCommunity;
