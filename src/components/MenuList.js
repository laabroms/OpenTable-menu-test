import React, { useEffect, useState } from "react";
import menuJSON from "../../menu-data.json";
import MenuItem from "./MenuItem";
const MenuList = () => {
  const [user1Cart, setUser1Cart] = useState([]);
  const [user2Cart, setUser2Cart] = useState([]);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [sumTotal, setSumTotal] = useState(0);

  let starters = [1, 2, 3, 4];
  let mains = [5, 6, 7, 8];
  let desserts = [9, 10, 11, 12];

  useEffect(() => {

    let allItems = user1Cart.concat(user2Cart);
    let total = 0;

    for (let x = 0; x < allItems.length; x++) {
      if (starters.some((e) => e === allItems[x])) {
        total += menuJSON.starters[allItems[x] - 1].price;
      } else if (mains.some((e) => e === allItems[x])) {
        total += menuJSON.mains[allItems[x] - 5].price;
      } else {
        total += menuJSON.desserts[allItems[x] - 9].price;
      }
    }
    setSumTotal(total);
  }, [user1Cart, user2Cart]);

  const handleAddToCart1 = (id) => {
    let currentCart = [...user1Cart];


    for (let i = 0; i < currentCart.length; i++) {
        
        //checks if there isnt a main yet and there is already an item in the cart
        if ((!mains.some((e) => e === currentCart[i]) && currentCart.length === 1 && !mains.includes(id))) {
            setError1('You must select a main course.');
            return;
        } else if ((currentCart.includes(4) && id === 7) || (currentCart.includes(7) && id === 4)) {
            setError1(
              "You cannot get the prawn cocktail and the salmon fillet."
            );
            return;
        } 
        else {
            continue;
        }

    } 
    currentCart.push(id);
    setError1('');
    setUser1Cart(currentCart);
  };

  const handleAddToCart2 = (id) => {
    let currentCart = [...user2Cart];

    for (let i = 0; i < currentCart.length; i++) {

      //checks if there isnt a main yet and there is already an item in the cart
      if (
        !mains.some((e) => e === currentCart[i]) &&
        currentCart.length === 1 &&
        !mains.includes(id)
      ) {
        setError2("You must select a main course.");
        return;
      } else if ((currentCart.includes(4) && id === 7) || (currentCart.includes(7) && id === 4)) {
            setError2('You cannot get the prawn cocktail and the salmon fillet.');
            return;
        } else {
        continue;
      }
    }
    currentCart.push(id);
    setError2("");
    setUser2Cart(currentCart);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <div>
          <h1 style={{ textAlign: "center" }}>User 1 Menu</h1>

          <div>
            <h3>Starters</h3>
            {menuJSON.starters && menuJSON.starters.length > 0 ? (
              menuJSON.starters.map((item) => (
                <MenuItem
                  price={item.price}
                  name={item.name}
                  style={
                    user1Cart.includes(item.id) ? { color: "green" } : null
                  }
                  onClick={() => handleAddToCart1(item.id)}
                  disabled={
                    user1Cart.filter((x) => starters.indexOf(x) !== -1).length >
                    0
                  }
                />
              ))
            ) : (
              <div>There are no items in the menu</div>
            )}
          </div>
          <div>
            <h3>Main Entrees</h3>
            {menuJSON.mains && menuJSON.mains.length > 0 ? (
              menuJSON.mains.map((item) => (
                <MenuItem
                  price={item.price}
                  name={item.name}
                  style={
                    user1Cart.includes(item.id) ? { color: "green" } : null
                  }
                  disabled={
                    user1Cart.filter((x) => mains.indexOf(x) !== -1).length > 0
                  }
                  onClick={() => handleAddToCart1(item.id)}
                />
              ))
            ) : (
              <div>There are no items in the menu</div>
            )}
          </div>
          <div>
            <h3>Desserts</h3>
            {menuJSON.desserts && menuJSON.desserts.length > 0 ? (
              menuJSON.desserts.map((item) => (
                <MenuItem
                  price={item.price}
                  name={item.name}
                  style={
                    user1Cart.includes(item.id) ? { color: "green" } : null
                  }
                  disabled={
                    user1Cart.filter((x) => desserts.indexOf(x) !== -1).length >
                      0 ||
                    (user1Cart.concat(user2Cart).includes(11) && item.id === 11)
                  }
                  onClick={() => handleAddToCart1(item.id)}
                />
              ))
            ) : (
              <div>There are no items in the menu</div>
            )}
          </div>
          {error1 && <div style={{ color: "red" }}>{error1}</div>}
        </div>
        <div>
          <h1 style={{ textAlign: "center" }}>User 2 Menu</h1>
          <div>
            <h3>Starters</h3>
            {menuJSON.starters && menuJSON.starters.length > 0 ? (
              menuJSON.starters.map((item) => (
                <div>
                  <MenuItem
                    price={item.price}
                    name={item.name}
                    style={
                      user2Cart.includes(item.id) ? { color: "green" } : null
                    }
                    disabled={
                      user2Cart.filter((x) => starters.indexOf(x) !== -1)
                        .length > 0
                    }
                    onClick={() => handleAddToCart2(item.id)}
                  />
                </div>
              ))
            ) : (
              <div>There are no items in the menu</div>
            )}
          </div>
          <div>
            <h3>Main Entrees</h3>
            {menuJSON.mains && menuJSON.mains.length > 0 ? (
              menuJSON.mains.map((item) => (
                <MenuItem
                  price={item.price}
                  name={item.name}
                  style={
                    user2Cart.includes(item.id) ? { color: "green" } : null
                  }
                  disabled={
                    user2Cart.filter((x) => mains.indexOf(x) !== -1).length > 0
                  }
                  onClick={() => handleAddToCart2(item.id)}
                />
              ))
            ) : (
              <div>There are no items in the menu</div>
            )}
          </div>
          <div>
            <h3>Desserts</h3>
            {menuJSON.desserts && menuJSON.desserts.length > 0 ? (
              menuJSON.desserts.map((item) => (
                <MenuItem
                  price={item.price}
                  name={item.name}
                  style={
                    user2Cart.includes(item.id) ? { color: "green" } : null
                  }
                  disabled={
                    user2Cart.filter((x) => desserts.indexOf(x) !== -1).length >
                      0 ||
                    (user2Cart.concat(user1Cart).includes(11) && item.id === 11)
                  }
                  onClick={() => handleAddToCart2(item.id)}
                />
              ))
            ) : (
              <div>There are no items in the menu</div>
            )}
          </div>
          {error2 && <div style={{ color: "red" }}>{error2}</div>}
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        {sumTotal ? (
          <h2>TOTAL: ${sumTotal.toFixed(2)}</h2>
        ) : (
          <h2>TOTAL: $0.00</h2>
        )}
      </div>
    </div>
  );
};

export default MenuList;
