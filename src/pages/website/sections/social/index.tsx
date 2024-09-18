import React from "react"
import { Image, Stack } from "react-bootstrap";
import { PostType, Posts } from "../../../../constants/social";
import xLogo from "../../../../../static/website/ecosystem/x_logo.svg"


const Card = (post: PostType) => { 
  return (
    <div style={{ position: "relative" }}>
      <Stack className="post-card">
        <Stack direction="horizontal" className="mb-2 justify-content-between">
          <Stack direction="horizontal">
            <Image className="profile-pic" src={post.image} alt={post.username} height={54} width={54} />
            <Stack className="ms-2" direction="vertical">
              <h3>{post.name}</h3>
              <h3>{post.username}</h3>
            </Stack>
          </Stack>
          <a href={post.link} target="_blank" rel="noreferrer">
            <Image src={xLogo} alt="X" height={30} width={30} />
          </a>  
        </Stack>
        <Stack direction="vertical">
          <p>{post.post}</p>
        </Stack>
      </Stack>
    </div>
  )
}

const SectionSocial = () => { 
  return (
    <Stack id="social" className="section-social" direction="vertical" gap={2}>
      <h1 className="mb-3">What people are saying</h1>
      <div className="posts">
        {Posts.map((post) => (
          <Card {...post} />
        ))}
      </div>
    </Stack>
  )
}

export default SectionSocial;
