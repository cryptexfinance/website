import React, { useState } from 'react'
import { Link, graphql } from 'gatsby'
import reddit from '../../../../static/website/community/reddit.svg'
import discord from '../../../../static/website/community/discord.svg'
import twitter from '../../../../static/website/community/twitter.svg'
import community from '../../../../static/website/community/community.webp'
import addToMailchimp from 'gatsby-plugin-mailchimp'
// const community = lazy(() => import( '../../../../static/website/community/community.webp'))

const SectionCommunity = ({ data }) => {

  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addToMailchimp(email);
    if(result){
      if(result.result){
        console.log(result.msg);
        clearValues();
      }
    }else{
      console.log(result.msg);
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.currentTarget.value);
  };

  const clearValues = () => {
    setEmail('');
  }

  return (
    // <Suspense fallback={<div>Loading...</div>} >
      <section id="community" className="section-community">
        <div className="row">
          <div className="community-title header">
            Join Our Community
          </div>
          <div className="community-subtitle content">
            We’re on a mission to make digital assets simple, accessible, and secure.
          </div>
          <div className="community-icons-row">
            <Link to="https://www.reddit.com/r/totalcryptomarketcap" target="_blank" className="community-item">
              <img src={reddit} className="community-item-icon" alt="Reddit" />
              <div className="community-item-text terciary-header">Reddit</div>
            </Link>
            <Link to="https://discord.gg/N5zEq6b" target="_blank" className="community-item">
              <img src={discord} className="community-item-icon" alt="Reddit" />
              <div className="community-item-text terciary-header">Discord</div>
            </Link>
            <Link to="https://www.twitter.com/cryptexglobal" target="_blank" className="community-item">
              <img src={twitter} className="community-item-icon" alt="Reddit" />
              <div className="community-item-text terciary-header">Twitter</div>
            </Link>
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
    // </Suspense>
  )
}

export default SectionCommunity;

export const pageQuery = graphql`
  query MetadataQuery {
    image: file(base: { eq: "static/website/community/community.webp" }) {
      publicURL
    }
  }
`