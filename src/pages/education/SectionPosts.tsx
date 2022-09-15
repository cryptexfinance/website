
import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { PostItem } from "../../components/posts";

const ARTICLES_QUERY = gql`
  query {
    posts {
      nodes {
        date
        excerpt
        databaseId
        title        
        featuredImage {
          node {
            altText
            uri
          }
        }
      }
    }
  }
`;

const SectionPosts = () => {
  const [posts, setPosts] = useState([]);
  const { loading, data, networkStatus } = useQuery(ARTICLES_QUERY, {
    variables: {},
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true
  });

  useEffect(() => {
    const loadData = async () => {
      if (data) {
        setPosts(data.posts.nodes);
        console.log(data.posts.nodes);
      }
    }
    
    loadData();
  }, [networkStatus]);

  if (loading) {
    return <h4>Loading...</h4>;
  }

  return (
    <div className="posts">
      {posts.map((post, index) => {
        return <PostItem key={index} data={post} />
      })}
    </div>
  );
};

export default SectionPosts;
