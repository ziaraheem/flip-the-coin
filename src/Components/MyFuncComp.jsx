import React, { useState } from "react";

function MyFuncComp(props) {
  const [color, setColor] = useState("red");
  return (
    <>
      <h1 style={{ color: color }}>Hello from functionla comp</h1>
      <h1>Date is: {props.date}</h1>
      <button onClick={() => setColor("green")}>COLOE</button>
    </>
  );
}

export default MyFuncComp;
