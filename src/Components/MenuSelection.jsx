import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./../App.css";
import { Card, CardHeader, Checkbox } from "@mui/material";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import CardContent from "@mui/material/CardContent";

function MenuSelection() {
  const [isTomato, setTomato] = useState(null);
  const [isLettuce, setLettuce] = useState("0");
  const [isPattice, setPattice] = useState("0");
  const [isEgg, setEgg] = useState("0");
  const [name, setName] = useState("");
  const [sauce, setSauce] = useState([]);
  const sauces = [
    { name: "Tomato Sauce", value: 555 },
    { name: "Mayonese", value: 556 },
    { name: "Brazilian Sauce", value: 557 },
    { name: "Hot Sauce", value: 558 },
    { name: "Spicy Sauce", value: 559 },
    { name: "Greenland Sauce", value: 560 },
    { name: "Pickle Sauce", value: 561 },
  ];
  const oldHistory = localStorage.getItem("oldHistory")
    ? JSON.parse(localStorage.getItem("oldHistory"))
    : [];
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

  const updateName = (event) => {
    setName(event.target.value);
  };

  const updateMyHistory = (history) => {
    setHistory(history);
    localStorage.setItem("oldHistory", JSON.stringify(history));
  };

  const sauceSelected = (event) => {
    console.log("filtered before ", sauce);
    if (event.target.checked) {
      if (sauce.length >= 3) {
        alert("can select only 3 sauce");
      } else {
        setSauce((oldArray) => [...oldArray, event.target.value]);
      }
    } else {
      let filtered = sauce.filter((item) => item !== event.target.value);
      setSauce(filtered);
    }
    console.log("filtered after ", sauce);
  };

  const sendOrder = () => {
    if (name !== "" && isTomato) {
      let date = new Date().toISOString().split("T");
      const burgerData = {
        name: name,
        isLettuce: isLettuce,
        isEgg: isEgg,
        isPattice: isPattice,
        isTomato: isTomato,
        date: date[0] + " " + date[1].split(".")[0],
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
      setTomato(null);
      setLettuce("0");
      setEgg("0");
      setName("");
      setPattice("0");
    } else {
      if (name === "") {
        alert("please enter your name ");
      } else if (!isTomato) {
        alert("please select tomato preference ");
      }
    }
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
        <Typography variant="h2" component="div" gutterBottom>
          Menu Selection
        </Typography>
        <FormControl>
          <Typography variant="h4">Veggies</Typography>
          <FormLabel>Tomato</FormLabel>
          <RadioGroup row value={isTomato} onChange={handleTomato}>
            <FormControlLabel value="1" control={<Radio />} label="Yes" />
            <FormControlLabel value="0" control={<Radio />} label="No" />
            <FormControlLabel value={null} control={<Radio />} label="NA" />
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
        <FormControl>
          <Typography variant="h4">Sauces</Typography>

          <FormControlLabel
            control={
              <Checkbox
                checked={sauce.includes("Tomato")}
                value="Tomato"
                onChange={sauceSelected}
              />
            }
            label="Tomato Sauce"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={sauce.includes("Mayo")}
                value="Mayo"
                onChange={sauceSelected}
              />
            }
            label="Mayo"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="Garlic"
                checked={sauce.includes("Garlic")}
                onChange={sauceSelected}
              />
            }
            label="Garlic"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={sauce.includes("Lassan")}
                value="Lassan"
                onChange={sauceSelected}
              />
            }
            label="Lassan"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={sauce.includes("Pickle")}
                value="Pickle"
                onChange={sauceSelected}
              />
            }
            label="Pickle"
          />
        </FormControl>

        <TextField
          style={{ margin: "12px" }}
          id="outlined-basic"
          label="Customer Name"
          variant="outlined"
          value={name}
          onChange={updateName}
        />
        <Button variant="contained" onClick={sendOrder}>
          Order
        </Button>
      </div>
      <div>
        <History history={history} updateMyHistory={updateMyHistory}></History>
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
      {!props.isFromHistory ? (
        <Typography variant="h3" component="div" gutterBottom>
          Burger Preview
        </Typography>
      ) : null}
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
  const deleteHis = (date) => {
    let filterUsed = props.history.filter((item) => item.date !== date);
    props.updateMyHistory(filterUsed);
  };
  return (
    <div>
      <Typography variant="h3" component="div" gutterBottom>
        History
      </Typography>

      {props.history.length <= 0 ? (
        <Typography variant="body" component="div" gutterBottom>
          No History Found
        </Typography>
      ) : (
        props.history.map((item, index) => {
          return (
            <Card key={item.date} style={{ margin: "12px", padding: "12px" }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {item.name ? item.name.charAt(0) : "O"}
                  </Avatar>
                }
                title={item.name}
                subheader={JSON.stringify(item.date)}
              />

              <CardContent>
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
              </CardContent>
              <BurgerPreview
                isTomato={item.isTomato}
                isLettuce={item.isLettuce}
                isPattice={item.isPattice}
                isEgg={item.isEgg}
                isFromHistory={true}
              ></BurgerPreview>

              <Button
                variant="outlined"
                size="small"
                onClick={() => deleteHis(item.date)}
              >
                Delete
              </Button>
            </Card>
          );
        })
      )}
    </div>
  );
}
export default MenuSelection;
