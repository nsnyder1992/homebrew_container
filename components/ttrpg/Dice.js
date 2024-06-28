import { useState } from "react";

export default function Dice({ numDice = 1, diceArray }) {
  let [values, setValues] = useState([]);

  let onRoll = () => {
    let temp = [];
    for (let i of numDice) {
      let index = Math.floor(Math.random() * (diceArray - 1 - 0 + 1));
      temp.push(diceArray[index]);
    }
    setValues(values);
  };

  return (
    <div>
      <button onClick={onRoll}>Roll!</button>
      <p>
        {values?.map((v) => {
          return v + "   ";
        })}
        {" total:  "}
        total: {values.reduce((partialSum, a) => partialSum + a, 0)}
      </p>
    </div>
  );
}
