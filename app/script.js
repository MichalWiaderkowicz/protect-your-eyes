import React, { useState } from "react";
import { render } from "react-dom";

const App = () => {
  const [status, setStatus] = useState("off");
  const [time, setTime] = useState(20 * 60);
  const [timer, setTimer] = useState(null);
  console.log(status, time, timer);
  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === "off" && (
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
      {status === "work" && <img src="./images/work.png" />}
      {status === "rest" && <img src="./images/rest.png" />}
      {status !== "off" && <div className="timer">18:23</div>}
      {status === "off" && <button className="btn">Start</button>}
      {status !== "off" && <button className="btn">Stop</button>}
      <button className="btn btn-close">X</button>
    </div>
  );
};

render(<App />, document.querySelector("#app"));
