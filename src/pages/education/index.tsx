import React from "react";
import { PageLayout } from "../../components";
import { SEO } from "../../utils";
import SectionMain from "./SectionMain";
import SectionPosts from "./SectionPosts";
import { SearchBar } from "../../components/SearchBar";
import bg from "../../../static/bg.webp";
import bgvideo from "../../../static/bg.mp4"


const Education = () => {

  return (
    <PageLayout>
      <SEO title="Cryptex Academy" />
      <div className="academy">   
        <SectionMain />
        <div className="content">
          <video
            playsInline
            autoPlay
            loop
            muted
            poster={bg}
            className="video"
            id="bgvid"
          >
            <source src={bgvideo} type="video/mp4" />
          </video>
          <SearchBar />
          <SectionPosts />
        </div>  
      </div>  
    </PageLayout>
  );  
};


export default Education;