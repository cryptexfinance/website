import React from "react"
import { Image, Stack } from "react-bootstrap";
import { PostType, Posts } from "../../../../constants/social";


const Card = (post: PostType) => { 
  return (
    <div style={{ position: "relative" }}>
      <Stack className="post-card">
        <Stack direction="horizontal" className="mb-2">
          <Stack direction="horizontal">
            <Image src={post.image} alt={post.username} height={56} width={56} />
            <Stack className="ms-1" direction="vertical">
              <h3>{post.username}</h3>
              <span>{post.name}</span>
            </Stack>
          </Stack>  
        </Stack>
        <Stack direction="vertical">
          {post.post}
        </Stack>  
      </Stack>
    </div>  
  )
}

const SectionSocial = () => { 
  return (
    <Stack id="social" className="section-social" direction="vertical" gap={2}>
      <h1 className="mb-3">Lorem Ipsum</h1>
      <div className="posts">
        {Posts.map((post) => (
          <Card {...post} />
        ))}
      </div>
    </Stack>
  )
}

export default SectionSocial;
