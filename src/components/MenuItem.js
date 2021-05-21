import React from "react";

const MenuItem = (props) => {

  const row = {
    marginBottom: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  

  return (
    <div style={props.style}>
      <div
        style={row}
      >
        <div style={{ width: "140px" }}>{props.name}</div>
        <div style={{ width: "50px", textAlign: "end" }}>
          ${props.price.toFixed(2)}
        </div>
        <div>{props.id}</div>

        <button onClick={props.onClick} disabled={props.disabled}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
