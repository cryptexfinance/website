import { PostItemType } from "../types";

export const sortAlpha = (a, b) => {
  if (a.value > b.value) {
    return 1;
  }
  if (a.value < b.value) {
    return -1;
  }
  // a must be equal to b
  return 0;
}

export const sanitizePostData = (data) => {
  const postItem = {
    id: -1,
    title: "",
    date: "",
    excerpt: "",
    imageUrl: "",
    imageAltText: "",
    tags: [],
  };
  
  if (data.title && data.databaseId) {
    postItem.id = data.databaseId;
    postItem.title = data.title;
    if (data.excerpt) {
      postItem.excerpt = data.excerpt;
    }
    if(data.featuredImage && data.featuredImage.node) {
      postItem.imageUrl = data.featuredImage.node.uri;
      postItem.imageAltText = data.featuredImage.node.altText;
    }
  }
  return postItem;
};
