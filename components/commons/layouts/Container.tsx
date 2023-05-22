import React from "react";

interface Props {
  children: React.ReactNode;
}

function Container(props: Props) {
  return (
    <div
      className="container mx-auto px-4 sm:px-6"
      style={{ width: "100%", maxWidth: 720 }}
    >
      {props.children}
    </div>
  );
}

export default Container;
