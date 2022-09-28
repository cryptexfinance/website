import React, { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { sanitizePostData } from "../utils/utils";
import { PostItemType, PostItemDefault } from "../types";
import defaultImg from "../../../static/img/2.png";

type props = {
  key: number;
  data: any;
}

export const PostItem = ({ key, data }: props) => {
  const [post, setPost] = useState<PostItemType>(PostItemDefault);

  useEffect (() => {
    const clean = () => {
      const p = sanitizePostData(data);
      setPost(p);
    }
    clean();
  }, [])

  const sliceExcerpt = (excerpt: string): string => {
    if (excerpt.length > 100) {
      return post.excerpt.slice(0, 98).concat("...")
    }

    return excerpt;
  };

  return (
    <div key={key} className="post-item">
      <div className="post-img-container">
        {post.imageUrl !== "" ? (
          <img
            src={post.imageUrl}
            className="post-image"
            alt={post.imageAltText}
          />
        ) : (
          <img src={defaultImg} className="post-image" />
        )}
      </div>
      <div className="post-item-content">
        <div className="tags">
          <a
            rel="noreferrer"
            className="post-tagbox one"
          >
            TCAP
          </a>
          <a rel="noreferrer" className="post-tagbox two" >
            Index
          </a>
          <a rel="noreferrer" className="post-tagbox taglink three">
            Safety
          </a>
        </div>
        <div className="title">
          <a>{post.title}</a>
        </div>
        <div className="excerpt">
          { ReactHtmlParser(sliceExcerpt(post.excerpt)) }
        </div>
      </div>
      <div className="post-item-footer">
        <a className="post-link">
          Check it out
        </a>
      </div>
    </div>    
  );
};
