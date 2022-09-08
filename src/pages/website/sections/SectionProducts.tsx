import React from "react";

type ProductType = {
  id: string;
  title: string;
  subtitle: string;
  link: string;
}

const products = [
  {
    id: "tcap",
    title: "TCAP",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    link: "/tcap"
  },
  {
    id: "tcap",
    title: "THING",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    link: "/nft"
  }
]

const SectionProducts = () => {

  const item = (product: ProductType) => (
    <div id={product.id} className="box products-item">
      <div className="products-info">
        <h2 className="terciary-header">
          {product.title}
        </h2>
        <p className="subtitle">
          {product.subtitle}
        </p>
      </div>
      <div className="products-link">
        <a className="link">Learn More</a>
      </div>
    </div>
  );

  return (
    <div id="products" className="section-products">
      <h1 className="header">
        Cryptex Products
      </h1>
      <p className="subheader">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
      </p>
      <div className="products">
        {products.map((product) => {
          return item(product);
        })}
      </div>
    </div>    
  );
};

export default SectionProducts; 
