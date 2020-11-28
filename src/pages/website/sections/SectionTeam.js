import React, { useEffect, useState } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import joe from '../../../../static/website/team/joe.webp'
import preston from '../../../../static/website/team/preston.webp'
import cristian from '../../../../static/website/team/cristian.webp'
import tom from '../../../../static/website/team/tom.webp'

const SectionTeam = (props) => {
  const [tblog, setBlog] = useState({});

  const dataq = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      ) {
        edges {
          node {
            excerpt(pruneLength: 400)
            id
            fields {
              slug
            }
            frontmatter {
              title
              templateKey
              date(formatString: "MMMM DD, YYYY")
              featuredpost
              featuredimage {
                childImageSharp {
                  fluid(maxWidth: 600) {
                      ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  useEffect(() => {
    if (typeof(dataq.allMarkdownRemark.edges) !== `undefined`) {
      setBlog(dataq.allMarkdownRemark);
    } else {
      console.log("Error with props in team");
      console.log(dataq);
    }
  }, [dataq]);

  const RenderBlog = () => {
    return typeof(tblog.edges) !== `undefined` ? tblog.edges.map (({node}) => (
      <div className="newsitem" key={node.id}>
        <img src={node.frontmatter.featuredimage.childImageSharp.fluid.src} className="newsitem-photo" alt="News" />
        <div className="newsitem-title terciary-header">{node.frontmatter.title}</div>
        <div className="newsitem-description newsdescription">&nbsp;</div>
        <Link to={node.excerpt} rel="noreferrer" target="_blank" className="newsitem-link link">Read More</Link>
      </div>
    )) : <div></div>;
  }

  return (
      <section id="team" className="section-team">
        <div className="row">
          <div className="team-title header">
            Team
          </div>
          <div className="team-subtitle content">
            Building the investments of tomorrow, today.
          </div>
          <div className="team-row row">
            <div className="team-box">
              <Flippy
                  flipOnHover={true} // default false
                  flipOnClick={false} // default false
                  flipDirection="horizontal" // horizontal or vertical
                >
                  <FrontSide>
                  <img src={joe} className="team-box-photo" alt="Joseph Sticoo" />
                  <p className="team-box-name">Joe Sticoo</p>
                  <p className="team-box-position">Co-Founder &amp; CEO</p>
                </FrontSide>
                <BackSide >
                  <p className="team-box-name">Joseph Sticoo</p>
                  <p className="team-box-description">A lifelong trader and investment manager, Joseph brings immense knowledge of traditional market structure to the project. He founded Cryptex Finance with the vision of combining Wall Street with world class blockchain development in building state of the art investment solutions for tomorrow.</p>
               </BackSide>
              </Flippy>
            </div>
            <div className="team-box">
              <Flippy
                  flipOnHover={true} // default false
                  flipOnClick={false} // default false
                  flipDirection="horizontal" // horizontal or vertical
                >
                <FrontSide>
                  <img src={preston} className="team-box-photo" alt="Preston Van Loon" />
                  <p className="team-box-name">Preston Van Loon</p>
                  <p className="team-box-position">Co-Founder &amp; Blockchain Lead</p>
                </FrontSide>
                <BackSide>
                  <p className="team-box-name">Preston Van Loon</p>
                  <p className="team-box-description">Preston is CEO and co-founder of Prysmatic Labs and leads a team of dedicated blockchain developers in building critical layer one scaling solutions for Ethereum 2.0. Since January 2018, Preston and team have received nearly $2MM in grant funding to pursue these efforts from the Ethereum Foundation, Vitalik Buterin, Ethereum Community Fund, and many other community members. </p>
                </BackSide>
              </Flippy>
            </div>
            <div className="team-box">
              <Flippy
                  flipOnHover={true} // default false
                  flipOnClick={false} // default false
                  flipDirection="horizontal" // horizontal or vertical
                >
                <FrontSide>
                  <img src={cristian} className="team-box-photo" alt="Cristian Espinoza" />
                  <p className="team-box-name">Cristian Espinoza</p>
                  <p className="team-box-position">Blockchain Developer</p>
                </FrontSide>
                <BackSide>
                  <p className="team-box-name">Cristian Espinoza</p>
                  <p className="team-box-description">Smart Contract Developer certified by ConsenSys, Coffee Lover & Prev. Devcon Scholar at Ethereum Foundation. Leader of the Honduras Ethereum Community.</p>
                </BackSide>
              </Flippy>
            </div>
            <div className="team-box">
              <Flippy
                  flipOnHover={true} // default false
                  flipOnClick={false} // default false
                  flipDirection="horizontal" // horizontal or vertical
                >
                <FrontSide>
                  <img src={tom} className="team-box-photo" alt="Thomas Matzner" />
                  <p className="team-box-name">Thomas Matzner</p>
                  <p className="team-box-position">Co-Founder &amp; CBO</p>
                </FrontSide>
                <BackSide>
                  <p className="team-box-name">Thomas Matzner</p>
                  <p className="team-box-description">Thomas has led planning, branding and marketing initiatives at world class companies and startups. He has taken high volume and celebrity endorsed products from concept to launch with an omnichannel strategy. Thomas' passion is building brands with bold visions of leaving a legacy.</p>
                </BackSide>
              </Flippy>
            </div>
          </div>

          <div className="team-divider">
          </div>
          
          <div className="newsbox">
            <div className="newsbox-title heading-secondary">Latest Posts</div>
            <div className="newsgroup">    
              <RenderBlog/>          
            </div>
          </div>
        </div>
      </section>
  )
}

export default SectionTeam