import React from "react";
import loaderGif from "../../loader.gif";

const Loader = ({className}) => <div className={`loader loading`}>
  <img src={loaderGif} alt="loader"/>
</div>;
export default Loader;