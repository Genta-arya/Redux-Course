import React from "react";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";

const LoadingSpinner = () => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div className="flex items-center justify-center h-screen">
      <RingLoader css={override} size={150} color={"#123abc"} loading={true} />
    </div>
  );
};

export default LoadingSpinner;
