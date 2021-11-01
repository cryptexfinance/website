import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/esm/Col";
import { tagColor } from "../../components/utils/tags";
import "../../styles/main.scss";

const BlogPostPreview = ({ entry, widgetFor }) => {
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const title = entry.getIn(['data', 'title']);
  const author = entry.getIn(['data', 'author']);
  const date = entry.getIn(['data', 'date']);
  const tags = entry.getIn(['data', 'tags']);

  return (
    <section id="news" className="section-blogpost">
      <Col sm={12} md={12} lg={12} className="post">
        {tags && tags.size > 0 ? (
          <div className="tags">
            {tags.map((tag) => {
              const tColor = tagColor([], tag);
              return  <a
                        target="_blank"
                        className="tagbox"
                        style={{ color: tColor, borderColor: tColor }}
                      >
                        {tag}
                      </a>
            })}
          </div>
        ) : null}
        <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
          {title}
        </h1>
        <h6 className="post-date">
          {date.toLocaleDateString(undefined, dateOptions)} | {author}
        </h6>
        {widgetFor('body')}
      </Col>  
    </section>
  )
}

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BlogPostPreview