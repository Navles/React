import React from "react";
import {
  BallTriangle,
  InfinitySpin,
  Vortex,
  // Triangle,
} from "react-loader-spinner";

export default function Loader() {
  return (
    <div>
      <div className="loader-overlay">
        <div className="loader-content">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            visible={true}
          />
          {/* <InfinitySpin width="200" color="#4fa94d" /> */}
          {/* <Triangle
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          /> */}
          {/* <Vortex
            visible={true}
            height="150"
            width="150"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={["red", "green", "blue", "yellow", "orange", "purple"]}
          /> */}
        </div>
      </div>
    </div>
  );
}
