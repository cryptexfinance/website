import React from "react";
import PageLayout from "../../components/PageLayout";
import BlogRoll from "../../components/BlogRoll";
import Header from "../../components/Header";
import SectionHome from "./SectionHome";
import { Seo } from "../../utils";
import bg from "../../../static/bg.webp";
import bgvideo from "../../../static/bg.mp4";

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <PageLayout>
        <Seo title="Blog" />
        <header id="home">
          <Header blogPost={true} />
        </header>
        <section className="section-blogroll">
          <SectionHome />
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
            <BlogRoll />
          </div>
        </section>
      </PageLayout>
    )
  }
};
