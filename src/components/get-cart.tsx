"use client";

import { useState } from "react";
import { ICart } from '@/types/cart'

export default function GetCartFromServer() {
  const [cartInfo, setCartInfo] = useState({} as ICart);
    // https://maxschmitt.me/posts/next-js-api-proxy
    // to set up a proxy using next js rewrites to avoid CORS problems calling CRT endpoints
  const getCart = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Oun", "E290017");
    myHeaders.append("Content", "application/json");
    myHeaders.append(
      "Origin",
      "https://scut4827hwx29564597-rs.su.retail.dynamics.com"
    );

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    try {
      const response = await fetch(
        `/api/Commerce/Carts('dc5e42f6-bbcc-4f6a-893d-2873fd64a646')`,
        requestOptions
      );
      const cart = await response.json();
      setCartInfo(cart);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const cartLines = () => {
    if (cartInfo?.CartLines) {
        return cartInfo.CartLines.map(cl => <li key={cl.LineId}>{cl.LineId}</li>);
    } else {
        return <></>
    }
  }

  return (
    <div>
      <button onClick={getCart}>Get Cart</button>
      {cartInfo.hasOwnProperty('Id') && <p>Your cart id: {cartInfo.Id}</p>}
      {cartInfo.hasOwnProperty('CartLines') && <ul>{cartLines()}</ul>}
    </div>
  );
}
