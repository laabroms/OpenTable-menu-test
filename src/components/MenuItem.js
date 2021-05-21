import React from "react";

const MenuItem = (props) => {

  const row = {
    marginBottom: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const button = {
    width: '100px',
    borderRadius: '3px',
    border: '0.1rem solid #333333',

  }

  

  return (
    <div style={props.style}>
      <div style={row}>
        <div style={{ width: "140px" }}>{props.name}</div>
        <div style={{ width: "50px", textAlign: "end" }}>
          ${props.price.toFixed(2)}
        </div>
        {!props.cart.includes(props.id) ? (
          <button
            style={button}
            onClick={props.onClick}
            disabled={props.disabled}
          >
            Add to Cart
          </button>
        ) : (
          <button style={button} onClick={props.remove}>
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuItem;
