import React from "react"
import { Image, Stack } from "react-bootstrap";
import { PostType, Posts } from "../../../../components/Social";
import xLogo from "../../../../../static/website/ecosystem/x_logo.svg"


const Card = (post: PostType) => { 
  return (
    <div style={{ position: "relative" }}>
      <Stack className="post-card">
        <Stack direction="horizontal" className="post-header justify-content-between">
          <Stack direction="horizontal">
            <Image className="profile-pic" src={post.image} alt={post.username} />
            <Stack className="ms-2 justify-content-center" direction="vertical">
              <h4 className="mb-0">{post.name}</h4>
              <a className="x_profile_link text-decoration-none" href={`https://x.com/${post.username}`} target="_blank" rel="noreferrer">
                {post.username}
              </a>
            </Stack>
          </Stack>
          <a className="x_post_img" href={post.link} target="_blank" rel="noreferrer">
            <Image src={xLogo} alt="X" />
          </a>  
        </Stack>
        <Stack className="post-body" direction="vertical">
          <p>{post.post}</p>
        </Stack>
      </Stack>
    </div>
  )
}

const SectionSocial = () => { 
  return (
    <Stack id="social" className="section-social" direction="vertical" gap={2}>
      <h1 className="social-title">What people are saying</h1>
      <div className="posts">
        {Posts.map((post) => (
          <Card {...post} />
        ))}
      </div>
    </Stack>
  )
}

export default SectionSocial;
