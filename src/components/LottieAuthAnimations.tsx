import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";

const LottieAuthAnimations: React.FC = () => {
  return (
    <Player
      autoplay
      loop
      src="/img/authAnimation.json"
      style={{ height: "300px", width: "300px" }}
    />
  );
};

export default LottieAuthAnimations;
