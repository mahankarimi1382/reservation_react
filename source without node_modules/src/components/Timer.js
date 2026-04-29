import React, { useState, useRef, useEffect } from "react";

const Timer = ({ time,setIsFinish }) => {
  const [tryAgain, setTryAgain] = useState(false);

  const Ref = useRef(null);
  const [timer, setTimer] = useState("00:00:00");
  console.log(timer);
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    setTimer("");

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + time * 60);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  const onClickReset = () => {
    clearTimer(getDeadTime());
  };

  useEffect(() => {
    if(timer === "00:01"){
      setIsFinish(true)

    }
    if (timer === "00:00") {
      setTryAgain(true);
    }
  }, [timer]);

  return (
    <div style={{ textAlign: "center" }}>
      {tryAgain ? (
        <button
          onClick={() => {
            setTryAgain(false);
            onClickReset();
          }}
        >
          ارسال مجدد
        </button>
      ) : (
        <h2>{timer}</h2>
      )}
    </div>
  );
};

export default Timer;
