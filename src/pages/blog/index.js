import React from "react";

import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";
import Header from "../../components/Header";
import bg from "../../../static/bg.webp"
import bgvideo from "../../../static/bg.mp4"

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
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

        <header id="home">
          <Header blogPost={true} />
        </header>
        <section className="section-blogroll">          
          <div className="content">
            <BlogRoll />
          </div>
        </section>
      </Layout>
    )
  }
}