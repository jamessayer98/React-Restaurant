import React from "react";
import Toast from "../Toast";
import Progress from "../Progress";

const WrapperCustom = props => {
  return (
    <React.Fragment>
      <Progress />
      <Toast />
      {props.children}
    </React.Fragment>
  );
};

export default WrapperCustom;
