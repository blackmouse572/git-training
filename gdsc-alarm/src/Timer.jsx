import React, { Component } from "react";
import "./Timer.css";
import TimerForm from "./TimerForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardStep, faCrosshairs, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan, faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
/**
 * Props:
 *
 * time: Time calculated in seconds
 *
 * isCounting: Check if the timer is counting
 *
 * minutes, seconds: String contains 2 letters for presentation
 *
 * snapShot: {minutes, seconds, time}
 *
 * isFirstTime: Condition to make snapshot work
 */
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: null,
      isCounting: false,
      minutes: "00",
      seconds: "00",
      snapshot: null,
      isFirstTime: true,
    };
    this.startTimer = this.startTimer.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.getSnapshot = this.getSnapshot.bind(this);
    this.retriveSnapshot = this.retriveSnapshot.bind(this);
  }
  /**
   *
   * Set up the timer by providing it time and timerState
   *
   * @param {String} time {minutes, seconds, timerState}
   *
   */
  setTimer(time) {
    let timeInSecs;
    // Time is unpaused by user
    if (this.state.time > 0) {
      timeInSecs = this.state.time;
    } else {
      // Setting for the first time
      timeInSecs = Number(time.minutes * 60) + Number(time.seconds);
    }
    if (timeInSecs > 0) this.startTimer(timeInSecs, time.timerState);
    else console.warn("Already 0");
  }

  static timer;
  /**
   *
   * If one of them is false, stop
   *
   * @param {Number} timeInSecs
   * @param {Boolean} timerState
   */
  startTimer(timeInSecs, timerState) {
    let [minutes, seconds] = this.handleDisplay(timeInSecs);
    if (timeInSecs === 0 || timerState === false) {
      clearTimeout(this.timer);
      this.setState((st) => ({
        time: timeInSecs,
        isCounting: false,
        minutes,
        seconds,
      }));
      console.warn("Time stopped");
    } else {
      this.setState((st) => {
        return {
          ...st,
          time: timeInSecs,
          isCounting: true,
          minutes,
          seconds,
        };
      });

      let promise = new Promise((resolve) => {
        this.timer = setTimeout(resolve, 1000);
      });
      promise.then(() => {
        if (timerState === true) {
          this.startTimer(timeInSecs - 1, timerState);
        }
      });
    }
  }

  handleDisplay(time) {
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    let minutes = Math.floor(time / 60);
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return [minutes.toString(), seconds.toString()];
  }

  /**
   * Create a state 'isFirstTime' = true
   *
   * TimerForm received and in sumbit event: setState the snapshot {Time, minutes, seconds, firstTime}
   *
   * When user press the rewind, setState using the snapshot state
   */
  getSnapshot(snap) {
    let timeInSecs = Number(snap.minutes * 60) + Number(snap.seconds);
    let [minutes, seconds] = this.handleDisplay(timeInSecs);
    this.setState((st) => {
      return {
        ...st,
        snapshot: {
          minutes: minutes,
          seconds: seconds,
          time: timeInSecs,
        },
        isFirstTime: false,
      };
    });
  }

  /**
   * Setting up state.snapshot
   */
  retriveSnapshot() {
    console.log(this.state.isCounting);
    if (this.state.isCounting === false && this.state.snapshot !== null) {
      this.setState((st) => {
        return {
          ...st,
          time: st.snapshot.time,
          minutes: st.snapshot.minutes,
          seconds: st.snapshot.seconds,
        };
      });
    } else {
      console.warn("Not rewind-able!");
    }
  }

  render() {
    let timerButton =
      this.state.isCounting === false
        ? "Timer-icon"
        : "Timer-icon icon-disabled";
    return (
      <div className="Timer">
        <TimerForm
          className="Timer-form"
          setTimer={this.setTimer}
          minutes={this.state.minutes}
          seconds={this.state.seconds}
          isCounting={this.state.isCounting}
          isFirstTime={this.state.isFirstTime}
          getSnapshot={this.getSnapshot}
        />
        <button className="Timer-button" onClick={this.retriveSnapshot}>
          <FontAwesomeIcon icon={faBackwardStep} className={timerButton} />
        </button>
        <button
          className="Timer-button"
          onClick={() => this.startTimer(0, false)}
        >
          <FontAwesomeIcon icon={faTrashCan} className="Timer-icon" />
        </button>
        <button
          className="delete"
          onClick={this.props.remove}
        ><FontAwesomeIcon icon={faXmarkCircle} className="delete-icon" /></button>
      </div>
    );
  }
}

export default Timer;
