import React from 'react'
import { Link } from 'gatsby'
// import team1 from '../../../../static/website/team/team-1.png'
import news from '../../../../static/website/team/news.webp'
import FlipCard from '../components/FlipCard'

const SectionTeam = () => {
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
              <div className="newsitem">
                <img src={news} className="newsitem-photo" alt="News" />
                <div className="newsitem-title terciary-header">How to create time-locked functions using Builder and Solidity</div>
                <div className="newsitem-description newsdescription">Like a conventional index fund, TCAP.X gives investors real-time price...</div>
                <Link to="/" target="_blank" className="newsitem-link link">Read More</Link>
              </div>
              <div className="newsitem">
                <img src={news} className="newsitem-photo" alt="News" />
                <div className="newsitem-title terciary-header">How to create time-locked functions using Builder and Solidity</div>
                <div className="newsitem-description newsdescription">Like a conventional index fund, TCAP.X gives investors real-time price...</div>
                <Link to="/" target="_blank" className="newsitem-link link">Read More</Link>
              </div>
              <div className="newsitem">
                <img src={news} className="newsitem-photo" alt="News" />
                <div className="newsitem-title terciary-header">How to create time-locked functions using Builder and Solidity</div>
                <div className="newsitem-description newsdescription">Like a conventional index fund, TCAP.X gives investors real-time price...</div>
                <Link to="/" target="_blank" className="newsitem-link link">Read More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default SectionTeam