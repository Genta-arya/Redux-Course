import React from "react";
import Header from "./Header";
import Content from "./Content";
import FooterDaisy from "../../Component/FooterDaisy";
import Footer from "../../Component/Footer";

const IndexLp = () => {
  return (
    <main className="bg-white">
      <Header />
      <Content />
      <FooterDaisy />

      <Footer />
    </main>
  );
};

export default IndexLp;
