import React, { useEffect, useState } from 'react';


const ShareSocial = () => {
  return (
    <div className="share-post">
      <div className="share-caption">
        <h6>Share with</h6>        
      </div>
      <div className="share-buttons">
        <img src="/Reddit.svg" alt="Reddit" />
        <img src="/Discord.svg" alt="Discord" />
        <img src="/Twitter.svg" alt="Twitter" />       
      </div>
    </div>   
  );
}

export default ShareSocial;