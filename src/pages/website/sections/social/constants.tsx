import React from "react"
import meemLogo from '../../../../../static/website/icons/meem.png'


export type PostType = {
  name: string;
  username: string;
  bio: string;
  image: string;
  link: string;
  post: React.ReactElement;
}

export const Posts: Array<PostType> = [
  {
    name: "Jorge DeStephano",
    username: "@jdestephen",
    bio: "Lorem ipsum, or lipsum.",
    image: meemLogo,
    link: "https://x.com/CryptexFinance",
    post: <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.</p>
  },
  {
    name: "David DeStephano",
    username: "@jdestephen",
    bio: "Lorem ipsum, or lipsum.",
    image: meemLogo,
    link: "https://x.com/CryptexFinance",
    post: <p>The passage is attributed to an unknown typesetter in the 15th century.</p>
  },
  {
    name: "Jorge DeStephano",
    username: "@jdestephen",
    bio: "Lorem ipsum, or lipsum.",
    image: meemLogo,
    link: "https://x.com/CryptexFinance",
    post: <p>A practice not without controversy, laying out pages with meaningless.</p>
  },
  {
    name: "David DeStephano",
    username: "@jdestephen",
    bio: "Lorem ipsum, or lipsum.",
    image: meemLogo,
    link: "https://x.com/CryptexFinance",
    post: <p>The passage is attributed to an unknown typesetter in the 15th century.</p>
  },
  {
    name: "Jorge DeStephano",
    username: "@jdestephen",
    bio: "Lorem ipsum, or lipsum.",
    image: meemLogo,
    link: "https://x.com/CryptexFinance",
    post: <p>A practice not without controversy, laying out pages with meaningless.</p>
  },
]