import React from "react";

interface Props {
  children: React.ReactNode;
  wide?: boolean;
}

function Container(props: Props) {
  return (
    <div
      className="container mx-auto px-4 sm:px-6"
      style={{ width: "100%", maxWidth: props.wide ? 1280 : 720 }}
    >
      {props.children}
    </div>
  );
}

export default Container;
