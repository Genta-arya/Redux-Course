import React from "react";
import { Helmet } from "react-helmet";
import Header from "./Header";
import Content from "./Content";
import FooterDaisy from "../../Component/FooterDaisy";
import Footer from "../../Component/Footer";
import CustomerReviews from "./CustomerReview";
import image from "../../../../assets/seo.png";
const IndexLp = () => {
  return (
    <main className="bg-white">
      <Header />
      <Content />
      <CustomerReviews />

      <FooterDaisy />

      <Footer />
    </main>
  );
};

export default IndexLp;
