import React, { Component } from "react";
import Timer from "./Timer";
import "./Timers.css";

/**
 * items include an array of objects which contains:
 *
 * value: <Timer />
 *
 * id: this.state.quantity
 */
export class Timers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      quantity: 0,
    };
    this.addTimer = this.addTimer.bind(this);
  }
  addTimer() {
    // let newItems = [...this.state.items, 'Hello'];
    let newItems = this.state.items;
    newItems.push({ value: <Timer />, id: this.state.quantity });
    this.setState({ items: newItems, quantity: this.state.quantity + 1 });
  }

  handleRemove(id) {
    let newItems = this.state.items.filter((cs) => {
      console.log(cs.id);
      return cs.id !== id;
    });
    this.setState({ items: newItems });
  }

  render() {
    console.log(this.state);
    let timerItems = this.state.items.map((cs) => {
      return (
        <li className="Timers-item" key={cs.id} id={cs.id}>
          <Timer
            key={cs.id}
            id={cs.id}
            remove={() => this.handleRemove(cs.id)}
          />
        </li>
      );
    });
    return (
      <div className="Timers">
        <h1>Countdown</h1>
        <ul className="Timers-list">{timerItems}</ul>
        <button onClick={this.addTimer} className="Timers-add">
          Add timer
        </button>
      </div>
    );
  }
}

export default Timers;
