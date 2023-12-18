import React from "react";
import { Helmet } from "react-helmet";
import Header from "./Header";
import Content from "./Content";
import FooterDaisy from "../../Component/FooterDaisy";
import Footer from "../../Component/Footer";
import CustomerReviews from "./CustomerReview";
import image from "../../../../assets/seo.png"
const IndexLp = () => {
  return (
    <main className="bg-white">
      <Helmet>
        <title>HKKS SHOP</title>
        <meta
          name="description"
          content="Welcome to HKKS SHOP"
        />
        <meta property="og:title" content="HKKS SHOP" />
        <meta
          property="og:description"
          content="Welcome to HKKS SHOP"
        />
        <meta
          property="og:image"
          content={`https://www.hkks.shop` + image}
        />
      </Helmet>

      <Header />
      <Content />
      <CustomerReviews />

      <FooterDaisy />

      <Footer />
    </main>
  );
};

export default IndexLp;
