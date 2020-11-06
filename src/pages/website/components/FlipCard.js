import React, { Component } from 'react'
import team1 from '../../../../static/website/team/team-1.png'

export class FlipCard extends Component {
  constructor(props) {
    super(props);
    this.state = { flipped: false };
    this.flip = this.flip.bind(this);
  }

  flip = () => {
    this.setState({ flipped: !this.state.flipped });
  }
  render() {
    // var { front, back } = this.props;  
    return (

      <div role="button" tabIndex={0} onMouseEnter={this.flip} onMouseLeave={this.flip} className={"team-box" + (this.state.flipped ? " flipped" : "")}>
        <Front/>
        <Back />
      </div>

    )
  }
}

class Front extends React.Component {
  render() {
    // var {front} = this.props
    return (
      <div className="front">
        <img src={team1} className="team-box-photo" alt="Joseph Sticoo" />
        <p className="team-box-name">Joseph Sticoo</p>
        <p className="team-box-position">Founder &amp; CEO</p>
      </div>
    )
  }
}

class Back extends React.Component {
  render() {
    // var {back} = this.props
    return (
      <div className="back">
        <p className="team-box-name">Joseph Sticoo</p>
        <p className="team-box-description">Bloggity bloggity bloggity blog. This would be the full text of the abbreviated blog post.</p>
      </div>
    )
  }
}


export default FlipCard