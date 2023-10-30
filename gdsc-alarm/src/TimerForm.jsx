import React, { Component } from "react";
import "./TimerForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";
import { faCirclePause } from "@fortawesome/free-regular-svg-icons";

class TimerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: "",
      seconds: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSumbit(evt) {
    evt.preventDefault();
    if (this.props.isFirstTime === true) {
      this.props.getSnapshot(this.state);
      // Do as normal
      this.props.setTimer({ ...this.state, timerState: true });
      this.setState({ minutes: "", seconds: "" });
    } else if (this.props.isCounting) {
      console.log("User paused");
      this.props.setTimer({
        minutes: this.props.minutes,
        seconds: this.props.seconds,
        timerState: false,
      });
    } else {
      console.log("User Continued");
      this.props.setTimer({ ...this.state, timerState: true });
      this.setState({ minutes: "", seconds: "" });
    }
  }
  render() {
    let isCounting = this.props.isCounting;
    return (
      <div className="TimerForm">
        <form className="TimerForm-body" onSubmit={this.handleSumbit}>
          <div className="TimerForm-minute mini-form">
            <label htmlFor="minutes"></label>
            <input
              className={isCounting ? "input-disabled" : "form-minutes"}
              placeholder={this.props.minutes}
              type="text"
              name="minutes"
              id="minutes"
              value={this.state.minutes}
              onChange={this.handleChange}
              autoComplete="off"
            />
            <span>Minutes</span>
          </div>
          <span className="seperator">:</span>
          <div className="TimerForm-second mini-form">
            <label htmlFor="seconds"></label>
            <input
              className={isCounting ? "input-disabled" : "form-seconds"}
              placeholder={this.props.seconds}
              type="text"
              name="seconds"
              id="seconds"
              value={this.state.seconds}
              onChange={this.handleChange}
              autoComplete="off"
            />
            <span>Seconds</span>
          </div>

          <button className="TimerForm-button">
            {!isCounting ? (
              <FontAwesomeIcon icon={faCirclePlay} className="button" />
            ) : (
              <FontAwesomeIcon icon={faCirclePause} className="button" />
            )}
          </button>
        </form>
      </div>
    );
  }
}

export default TimerForm;
