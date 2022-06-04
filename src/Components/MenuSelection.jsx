import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./../App.css";
import { Card } from "@mui/material";

function MenuSelection() {
  const [isTomato, setTomato] = useState("0");
  const [isLettuce, setLettuce] = useState("0");
  const [isPattice, setPattice] = useState("0");
  const [isEgg, setEgg] = useState("0");
  const oldHistory = localStorage.getItem("oldHistory")
    ? JSON.parse(localStorage.getItem("oldHistory"))
    : [];
  console.log("oldHistory", oldHistory);

  const [history, setHistory] = useState(oldHistory);

  const handleTomato = (event) => {
    setTomato(event.target.value);
  };

  const handleLettuce = (event) => {
    setLettuce(event.target.value);
  };

  const handlePattice = (event) => {
    setPattice(event.target.value);
  };

  const handleEgg = (event) => {
    setEgg(event.target.value);
  };

  const sendOrder = (event) => {
    const burgerData = {
      isLettuce: isLettuce,
      isEgg: isEgg,
      isPattice: isPattice,
      isTomato: isTomato,
      date: new Date(),
    };
    setHistory((oldArray) => [...oldArray, burgerData]);
    oldHistory.push(burgerData);
    localStorage.setItem("oldHistory", JSON.stringify(oldHistory));
    alert(
      "You order is burger with: Tomato: " +
        Number(isTomato) +
        ", Lettuce: " +
        Number(isLettuce) +
        ", Pattice: " +
        Number(isPattice) +
        " Egg: " +
        Number(isEgg)
    );
  };

  return (
    <div className="main-section">
      <div>
        <BurgerPreview
          isTomato={isTomato}
          isLettuce={isLettuce}
          isPattice={isPattice}
          isEgg={isEgg}
        ></BurgerPreview>
      </div>

      <div
        style={{ display: "flex", flexDirection: "column", padding: "12px" }}
      >
        <Typography variant="h3" component="div" gutterBottom>
          Menu Selection
        </Typography>

        <FormControl>
          <FormLabel>Tomato</FormLabel>
          <RadioGroup row value={isTomato} onChange={handleTomato}>
            <FormControlLabel value="1" control={<Radio />} label="Yes" />
            <FormControlLabel value="0" control={<Radio />} label="No" />
          </RadioGroup>
          <FormLabel>Lettuce</FormLabel>
          <RadioGroup row value={isLettuce} onChange={handleLettuce}>
            <FormControlLabel value="1" control={<Radio />} label="Yes" />
            <FormControlLabel value="0" control={<Radio />} label="No" />
          </RadioGroup>

          <FormLabel>Pattice</FormLabel>
          <RadioGroup row value={isPattice} onChange={handlePattice}>
            <FormControlLabel value="1" control={<Radio />} label="Yes" />
            <FormControlLabel value="0" control={<Radio />} label="No" />
          </RadioGroup>

          <FormLabel>Egg</FormLabel>
          <RadioGroup row value={isEgg} onChange={handleEgg}>
            <FormControlLabel value="1" control={<Radio />} label="Yes" />
            <FormControlLabel value="0" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <Button variant="contained" onClick={sendOrder}>
          Order
        </Button>
      </div>
      <div>
        <History history={history}></History>
      </div>
    </div>
  );
}

function BurgerPreview(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "12px",
      }}
    >
      <Typography variant="h3" component="div" gutterBottom>
        Burger Preview
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "12px",
        }}
      >
        <div
          id="top-bun"
          style={{
            width: "100%",
            backgroundColor: "#e5cb7a",
            height: "70px",
            borderRadius: "20px 20px 0px 0px",
            marginBottom: "6px",
          }}
        ></div>

        {props.isTomato === "1" ? (
          <div
            id="tomato"
            style={{
              width: "100%",
              backgroundColor: "#ec3521",
              height: "35px",
              borderRadius: "8px",
              marginBottom: "6px",
            }}
          ></div>
        ) : null}

        {props.isLettuce === "1" ? (
          <div
            id="lettuce"
            style={{
              width: "100%",
              backgroundColor: "#32c704",
              height: "35px",
              borderRadius: "8px",
              marginBottom: "6px",
            }}
          ></div>
        ) : null}

        {props.isPattice === "1" ? (
          <div
            id="pattice"
            style={{
              width: "100%",
              backgroundColor: "#450101",
              height: "35px",
              borderRadius: "8px",
              marginBottom: "6px",
            }}
          ></div>
        ) : null}

        {props.isEgg !== "0" ? (
          <div
            id="egg"
            style={{
              width: "100%",
              backgroundColor: "#cfcfcf",
              height: "35px",
              borderRadius: "8px",
              marginBottom: "6px",
            }}
          ></div>
        ) : null}

        <div
          id="bottom-bun"
          style={{
            width: "100%",
            backgroundColor: "#e5cb7a",
            height: "70px",
            borderRadius: "0px 0px 20px 20px",
          }}
        ></div>
      </div>
    </div>
  );
}
function History(props) {
  console.log("props.history -> ", props);
  return (
    <div>
      <Typography variant="h3" component="div" gutterBottom>
        History
      </Typography>

      {props.history.length <= 0 ? (
        <Typography variant="h3" component="div" gutterBottom>
          No History Found
        </Typography>
      ) : (
        props.history.map((item) => {
          return (
            <Card style={{ margin: "12px", padding: "12px" }}>
              <Typography variant="p" component="div" gutterBottom>
                Date: {String(item.date).split("GMT")[0]}
              </Typography>
              <Typography variant="p" component="div" gutterBottom>
                Lettuce: {item.isLettuce}
              </Typography>
              <Typography variant="p" component="div" gutterBottom>
                Egg: {item.isEgg}
              </Typography>
              <Typography variant="p" component="div" gutterBottom>
                Pattice: {item.isPattice}
              </Typography>
              <Typography variant="p" component="div" gutterBottom>
                Tomato: {item.isTomato}
              </Typography>
            </Card>
          );
        })
      )}
    </div>
  );
}
export default MenuSelection;
