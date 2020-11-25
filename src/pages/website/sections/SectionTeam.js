import React from 'react';
import { Link } from 'gatsby';
// import team1 from '../../../../static/website/team/team-1.png'
// import news from '../../../../static/website/team/news.webp';
import FlipCard from '../components/FlipCard';

const SectionTeam = (props) => {

  const RenderBlog = () => {
    return props.blog.edges.map (({node}) => (
      <div className="newsitem" key={node.id}>
        <img src={node.frontmatter.featuredimage.childImageSharp.fluid.src} className="newsitem-photo" alt="News" />
        <div className="newsitem-title terciary-header">{node.frontmatter.title}</div>
        <div className="newsitem-description newsdescription">&nbsp;</div>
        <Link to={node.excerpt} target="_blank" className="newsitem-link link">Read More</Link>
      </div>
    ));
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
              <FlipCard/>
              <FlipCard/>
              <FlipCard/>
              <FlipCard/>
            {/* <div className="team-box">
              <img src={team1} className="team-box-photo" alt="Joseph Sticoo" />
              <p className="team-box-name">Preston Van Loon</p>
              <p className="team-box-position">Co-Founder &amp; Blockchain Lead</p>
            </div>
            <div className="team-box">
              <img src={team1} className="team-box-photo" alt="Joseph Sticoo" />
              <p className="team-box-name">Cristian Espinoza</p>
              <p className="team-box-position">Blockchain Developer</p>
            </div>
            <div className="team-box">
              <img src={team1} className="team-box-photo" alt="Joseph Sticoo" />
              <p className="team-box-name">Thomas Matzner</p>
              <p className="team-box-position">Co-Founder &amp; CBO</p>
            </div> */}
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