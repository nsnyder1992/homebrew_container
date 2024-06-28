"use client";

import { useState } from "react";

export default function Dice({ diceArray = [0, 0, 1, 1, 2, 3] }) {
  let [values, setValues] = useState([]);
  let [numDice, setNumDice] = useState(1);

  let onRoll = (e) => {
    e.preventDefault();
    let temp = [];
    for (let i = 0; i < numDice; i++) {
      let index = Math.floor(Math.random() * (diceArray.length - 1 - 0 + 1));
      console.log(index);
      temp.push(diceArray[index]);
    }
    console.log(temp);
    setValues(temp);
  };

  return (
    <form className="max-w-sm mx-auto">
      <div class="mb-5">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="dice"
        >
          Number of Dice
        </label>
        <input
          type="number"
          id="dice"
          name="dice"
          min="1"
          max="100"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setNumDice(e.target.value)}
          value={numDice}
        />
      </div>

      <div class="mb-3">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => onRoll(e)}
        >
          Roll!
        </button>
      </div>

      <p style={{ whiteSpace: "pre" }}>
        Dice:{"\t\t"}
        {values?.map((v) => {
          return v + "\t\t";
        })}
      </p>
      <p style={{ whiteSpace: "pre" }}>
        Total:{"\t\t"}
        {values?.reduce((partialSum, a) => partialSum + a, 0)}
      </p>
    </form>
  );
}
