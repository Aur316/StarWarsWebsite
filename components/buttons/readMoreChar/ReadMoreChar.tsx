import React from "react";
interface ReadMoreCharProps {
  onClick: () => void;
}

export default function ReadMoreChar({ onClick }: ReadMoreCharProps) {
  return (
    <div style={{ textAlign: "center" }}>
      <button className="cta" onClick={onClick}>
        <span className="hover-underline-animation"> Read more </span>
        <svg
          id="arrow-horizontal"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="10"
          viewBox="0 0 46 16"
          fill="white"
        >
          <path
            id="Path_10"
            data-name="Path 10"
            d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
            transform="translate(30)"
          ></path>
        </svg>
      </button>
    </div>
  );
}
