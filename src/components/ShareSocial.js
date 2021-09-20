import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { RedditShareButton, TwitterShareButton } from "react-share";


const ShareSocial = (props) => {
  const { title, shareSlug, tags } = props;
  const [siteUrl, setSiteUrl] = useState("");
  const dataq = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }`
  );

  useEffect(() => {
    if (typeof (dataq.site) !== "undefined") {
      setSiteUrl(dataq.site.siteMetadata.siteUrl)
    } else {
      console.log("Error with props in team");
    }
  }, [dataq]);

  const shareUrl = () => {
    return `${siteUrl}${shareSlug}`;
  }

  const copyCodeToClipboard = (e) => {
    e.preventDefault();
    // Create new element
    const el = document.createElement("textarea");
    // Set value (string to be copied)
    el.value = shareUrl();
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute("readonly", "");
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand("copy");
    // Remove temporary element
    document.body.removeChild(el);
  };


  return (
    <div className="share-post">
      <div className="share-caption">
        <h6>Share with</h6>        
      </div>
      <div className="share-buttons">
        <button onClick={copyCodeToClipboard}>
          <img src="/copy.svg" alt="Discord" />
        </button>
        <RedditShareButton url={shareUrl()} title={title}>
          <img src="/Reddit.svg" alt="Reddit" />
        </RedditShareButton>
        <TwitterShareButton url={shareUrl()} title={title} hashtags={tags}>
          <img src="/Twitter.svg" alt="Twitter" />
        </TwitterShareButton>
      </div>
    </div>   
  );
}

export default ShareSocial;