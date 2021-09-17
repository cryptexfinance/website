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

  return (
    <div className="share-post">
      <div className="share-caption">
        <h6>Share with</h6>        
      </div>
      <div className="share-buttons">
        <RedditShareButton url={shareUrl()} title={title}>
          <img src="/Reddit.svg" alt="Reddit" />
        </RedditShareButton>
        <button>
          <img src="/Discord.svg" alt="Discord" />
        </button>  
        <TwitterShareButton url={shareUrl()} title={title} hashtags={tags}>
          <img src="/Twitter.svg" alt="Twitter" />
        </TwitterShareButton>
      </div>
    </div>   
  );
}

export default ShareSocial;