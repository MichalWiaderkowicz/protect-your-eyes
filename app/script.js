import React, { useState, useMemo, useEffect } from "react";
import { render } from "react-dom";

const statuses = {
  OFF: "off",
  REST: "rest",
  WORK: "work",
};
const times = {
  TWENTY_SEC: 2,
  TWENT_MIN: 2,
};

const playBell = () => {
  const bell = new Audio("./sounds/bell.wav");
  bell.play();
};

const App = () => {
  const [status, setStatus] = useState("off");
  const [time, setTime] = useState(20 * 60);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (status !== statuses.OFF && time <= 0) {
      setTime(times.TWENTY_SEC);
      setStatus((prevStatus) => {
        if (prevStatus === statuses.WORK) return statuses.REST;
        return statuses.WORK;
      });
      //dzwiek
      playBell();
    }
  }, [time]);

  const padTo2Digits = (num) => {
    return num.toString().padStart(2, "0");
  };

  const formatTime = useMemo(() => {
    const formatedTimer = (seconds) => {
      let minutes = Math.floor(seconds / 60);
      seconds = seconds % 60;
      return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
    };

    return formatedTimer(time);
  }, [time]);

  const startTimer = () => {
    setTime(times.TWENT_MIN);
    setStatus(statuses.WORK);
    setTimer(
      setInterval(() => {
        setTime((time) => time - 1);
      }, 1000)
    );
  };

  const stopTimer = () => {
    clearInterval(timer);
    setStatus(statuses.OFF);
  };

  const closeApp = () => {
    window.close();
  };

  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === statuses.OFF && (
        <div>
          <p>
            According to optometrists in order to save your eyes, you should
            follow the 20/20/20. It means you should to rest your eyes every 20
            minutes for 20 seconds by looking more than 20 feet away.
          </p>
          <p>
            This app will help you track your time and inform you when it's time
            to rest.
          </p>
        </div>
      )}
      {status === statuses.WORK && <img src="./images/work.png" />}
      {status === statuses.REST && <img src="./images/rest.png" />}
      {status !== statuses.OFF && <div className="timer">{formatTime}</div>}
      {status === statuses.OFF && (
        <button className="btn" onClick={startTimer}>
          Start
        </button>
      )}
      {status !== statuses.OFF && (
        <button className="btn" onClick={stopTimer}>
          Stop
        </button>
      )}
      <button className="btn btn-close" onClick={closeApp}>
        X
      </button>
    </div>
  );
};

render(<App />, document.querySelector("#app"));
