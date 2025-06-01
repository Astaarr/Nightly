import React from "react";
import Lottie from "lottie-react";
import animationData from "../animations/confirm-animation.json"; 

const ConfirmAnimation = () => {
  return (
    <div className="modal__animation">
      <Lottie animationData={animationData} loop={false} />
    </div>
  );
};

export default ConfirmAnimation;
