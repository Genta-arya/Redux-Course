import React from "react";
import Header from "./Header";
import Content from "./Content";
import FooterDaisy from "../../Component/FooterDaisy";
import Footer from "../../Component/Footer";
import CustomerReviews from "./CustomerReview";
import ReviewForm from "./FormReview";

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
