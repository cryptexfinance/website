import React, { useEffect, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import SectionMain from './sections/SectionMain';
import SectionAbout from './sections/SectionAbout';
import SectionGovernance from './sections/SectionGovernance';
import SectionFeatures from './sections/SectionFeatures';
import SectionTeam from './sections/SectionTeam';
import SectionNews from './sections/SectionNews';
import SectionFaq from './sections/SectionFaq';
import SectionCommunity from './sections/SectionCommunity';

const Home = (data) => {
  const [tagsColor, setTagsColor] = useState([]);
  const dataq = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { templateKey: { eq: "blog-tag" } } }
      ) {
        edges {
          node {
            id
            frontmatter {
              tag
              color  
            }
          }
        }
      }
    }
  `);

  useEffect(() => {
    if (typeof (dataq.allMarkdownRemark.edges) !== "undefined") {
      const tags = [];
      dataq.allMarkdownRemark.edges.map(({ node }) => {
        tags.push({ name: node.frontmatter.tag, color:  node.frontmatter.color });
      });
      setTagsColor(tags);
    }
  }, [dataq]);

  return (
    <>
      <header id="home" className="section-main">
        <SectionMain />
      </header>
      <main>
        <SectionAbout />
        <SectionFeatures />
        <SectionGovernance />
        <SectionTeam />
        <SectionNews tagsColor={tagsColor} />
        <SectionFaq />
        <SectionCommunity />
      </main>
    </>
  )
}

export default Home
