import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";

const SubSection = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
    
  }, [props.data]);
 

  const center = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  };

  const { cart, subsectionTitle } = props;


  return (
    <div style={center}>
      {data && data.length > 0 ? (
        <div style={{ width: "100%" }}>
          <div>
            <h2>{subsectionTitle.charAt(0).toUpperCase() + subsectionTitle.slice(1)}</h2>
          </div>
          <div>
            {data.map((item) => (
              <MenuItem
                name={item.name}
                price={item.price}
                onClick={() => props.onItemClick(item.id)}
                disabled={
                  data.filter((value) => cart.includes(value.id)).length > 0 ||
                  (item.id === 11 && props.noCheesecake)
                }
                style={cart.includes(item.id) ? { color: "green" } : null}
                cart={cart}
                id={item.id}
                remove={() => props.onRemove(item.id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>No subsections</div>
      )}
      {data.subsectionTitle}
    </div>
  );
};

export default SubSection;
