import React from "react";
import "./App.css";
import MyFuncComp from "./Components/MyFuncComp";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("constructor");
    this.update = this.update.bind(this);

    this.state = { date: new Date() };
  }
  update() {
    this.setState({
      date: new Date(),
    });
  }
  componentDidMount() {
    console.log("componentDidMount");
    // setInterval(() => {
    // function update() {
    //   this.setState({
    //     date: new Date(),
    //   });
    // }
    //  }, 1000);
  }

  render() {
    console.log("render");
    return (
      <div className="header">
        <i>{this.props.name}I am App Component</i> <br />
        <b>I am App Component</b>
        <b>Hey Check Date ==: {this.state.date.toLocaleTimeString()}</b>
        <button onClick={this.update}>update time</button>
        <MyFuncComp date={this.state.date.toLocaleTimeString()} />
      </div>
    );
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
}
