export type PostItemType = {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  imageUrl: string;
  imageAltText: string;
  tags: Array<string>;
};

export type PostType = {
  id: number;
  title: string;
  content: string;
  date: string;
  seo: any;
};

export const PostItemDefault = {
  id: -1,
  title: "",
  date: "",
  excerpt: "",
  imageUrl: "",
  imageAltText: "",
  tags: [],
};

export const PostDefault = {
  id: -1,
  title: "",
  content: "<p></p>",
  date: "",
  seo: {},
}
