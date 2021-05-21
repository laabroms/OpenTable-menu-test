import React, { useEffect, useState } from "react";
import CustomerMenu from "./CustomerMenu";

const Menus = () => {
  const [cart1, setCart1] = useState([]);
  const [cart2, setCart2] = useState([]);
  const [noCheesecake, setNoCheesecake] = useState(false);
  const [total1, setTotal1] = useState(0);
  const [total2, setTotal2] = useState(0);
  const [sumTotal, setSumTotal] = useState(0);

  const handleCart1 = (cart, total) => {
    if (cart.includes(11)) {
      setNoCheesecake(true);
    }
    setCart1(cart);
    setTotal1(total);
  };
  const handleCart2 = (cart, total) => {
    if (cart.includes(11)) {
      setNoCheesecake(true);
    }
    setCart2(cart);
    setTotal2(total);
  };

  useEffect(() => {
    setSumTotal(total1 + total2);
  }, [total1, total2]);

  const center = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  };
  const row = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  };
  return (
    <div>
      {" "}
      <div style={center}>
        {" "}
        <div style={row}>
          {" "}
          <CustomerMenu
            customerNumber={1}
            sendCart={handleCart1}
            noCheesecake={noCheesecake}
          />
          <CustomerMenu
            customerNumber={2}
            sendCart={handleCart2}
            noCheesecake={noCheesecake}
          />
        </div>
      </div>
      <div style={center}>
        {sumTotal ? (
          <h2>TOTAL: ${sumTotal.toFixed(2)}</h2>
        ) : (
          <h2>TOTAL: $0.00</h2>
        )}
      </div>
    </div>
  );
};

export default Menus;
