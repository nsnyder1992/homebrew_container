"use client";

import { useEffect, useState } from "react";

const show = ["show-1", "show-2", "show-3", "show-4", "show-5", "show-6"];

const Die = ({ num }) => {
  let [side, setSide] = useState(0);

  useEffect(() => {
    rollDice(num);
  }, [num]);

  let rollDice = (num) => {
    setTimeout(setSide(num), 2000);
  };

  useEffect(() => {
    console.log("side", show[side]);
  }, [side]);

  return (
    <div className="dice-container p-4">
      <div id="dice" className="dice dice-one">
        {side == 0 || side == 5 ? (
          <div id="dice-one-side-one" className="side one">
            <div className="dot one-1"></div>
          </div>
        ) : (
          <></>
        )}

        {side == 1 ? (
          <div id="dice-one-side-two" className="side two">
            <div className="dot two-1"></div>
            <div className="dot two-2"></div>
          </div>
        ) : (
          <></>
        )}

        {side == 2 ? (
          <div id="dice-one-side-three" className="side three">
            <div className="dot three-1"></div>
            <div className="dot three-2"></div>
            <div className="dot three-3"></div>
          </div>
        ) : (
          <></>
        )}

        {side == 3 || side == 4 ? (
          <div id="dice-one-side-four" className="side four  bg-slate-600">
            <div className="no-dot"></div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Die;
