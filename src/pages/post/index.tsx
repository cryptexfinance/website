import React, { useEffect, useState } from "React";
import ReactHtmlParser from "react-html-parser";
import { useQuery, gql } from "@apollo/client";

import { PostType, PostDefault } from "../../components/types";

const POST_QUERY = gql`
  query {
    post(id: 80, idType: DATABASE_ID) {
      databaseId
      title
      content
      dates
    }
  }
`;

const Post = () => {
  // const [postData, setPostData] = useState(PostDefault); 

  /* const { loading, data, networkStatus } = useQuery(POST_QUERY, {
    variables: {},
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true
  }); */

 /* useEffect(() => {
    const load = () => {
      console.log("Entra aqui");
      if (data !== null) {
        console.log(data.post);
        /* setPostData({
          id: parseInt(data.post.databaseId),
          title: data.post.title.toString(),
          content: data.post.content.toString(),
          date: data.post.date.toString(),
          seo: {},
        }); 
      }
    };
    load();
  }, [networkStatus]); */

  /*if (loading) {
    return <h4>Loading...</h4>
  } */

  return (
    <div className="post">
      <h4>aaa</h4>
    </div>
  )
}

export default Post;
