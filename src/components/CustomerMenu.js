import React, { useEffect, useState } from "react";
import menuJSON from "../../menu-data.json";
import SubSection from "./SubSection";

const CustomerMenu = (props) => {
  const [menu, setMenu] = useState([]);
  const [customerCart, setCustomerCart] = useState([]);
  const [error, setError] = useState("");
  const [starters, setStarters] = useState([]);
  const [mains, setMains] = useState([]);
  const [desserts, setDesserts] = useState([]);

  useEffect(() => {
    if (menuJSON) {
      setMenu(menuJSON);
      let start = [];
      Object.values(menuJSON.starters).forEach((num) => start.push(num.id));
      setStarters(start);
      let main = [];
      Object.values(menuJSON.mains).forEach((num) => main.push(num.id));
      setMains(main);
      let dessert = [];
      Object.values(menuJSON.desserts).forEach((num) => dessert.push(num.id));
      setDesserts(dessert);
    }
  }, [menuJSON]);

  const container = {
    backgroundColor: "#E8E9EB",
    padding: "1rem",
    borderRadius: "1rem",
    minWidth: "23rem",
    width: "30rem",
    boxShadow: "0 1rem 3rem rgba(54, 54, 58, 0.2)",
    margin: "1rem",
  };

  const addToCartHandler = (id) => {
    let currentCart = [...customerCart];

    // loops through cart ids
    //checks no mains && item in cart
    if (
      currentCart.length === 1 &&
      !mains.includes(currentCart[0]) &&
      !mains.includes(id)
    ) {
      setError("You must select a main course.");
      return;
    } else if (
      (id === 4 && currentCart.includes(7)) ||
      (id === 7 && currentCart.includes(4))
    ) {
      setError("You cannot get prawn cocktail and salmon fillet.");
      return;
    } else {
      currentCart.push(id);
      setError("");
      setCustomerCart(currentCart);

      let total = getTotal(currentCart);

      props.sendCart(currentCart, total);
    }
  };

  const getTotal = (currentCart) => {
    let total = 0;
    for (let x = 0; x < currentCart.length; x++) {
      if (starters.includes(currentCart[x])) {
        let item = Object.values(
          menuJSON.starters.filter((e) => e.id === currentCart[x])
        );
        total += item[0].price;
      } else if (mains.includes(currentCart[x])) {
        let item = Object.values(
          menuJSON.mains.filter((e) => e.id === currentCart[x])
        );
        total += item[0].price;
      } else {
        let item = Object.values(
          menuJSON.desserts.filter((e) => e.id === currentCart[x])
        );
        total += item[0].price;
      }
    }
    return total;
  };

  const removeFromCartHandler = (id) => {
    let currentCart = [...customerCart];

    let index = currentCart.indexOf(id);
    if (index >= 0) {
      currentCart.splice(index, 1);
    }

    let total = getTotal(currentCart);
    console.log(total)
    setCustomerCart(currentCart);

    props.sendCart(currentCart, total);
  };

  return (
    <div style={container}>
      <h1 style={{ textAlign: "center" }}>
        Customer {props.customerNumber} Order
      </h1>
      {menu && Object.keys(menu).length > 0 ? (
        Object.values(menu).map((subsection, index) => (
          <SubSection
            data={subsection}
            subsectionTitle={Object.keys(menu)[index]}
            onItemClick={addToCartHandler}
            onRemove={removeFromCartHandler}
            cart={customerCart}
            noCheesecake={props.noCheesecake}
          />
        ))
      ) : (
        <div>No items in menu</div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default CustomerMenu;
