"use client";

import { useState } from "react";
import Die from "./Die";

export default function Dice({ diceArray = [1, 2, 3, 0, 0, 1] }) {
  let [values, setValues] = useState([]);
  let [numDice, setNumDice] = useState(1);
  let [diffLevel, setDiffLevel] = useState(1);
  let [loading, setLoading] = useState(false);
  let [init, setInit] = useState(false);

  let onRoll = (e) => {
    e.preventDefault();
    if (loading) return;

    if (!init) setInit(true);
    setValues([]);
    setLoading(true);
    setTimeout(rollDice(), 2000);
  };

  let rollDice = () => {
    let temp = [];
    for (let i = 0; i < numDice; i++) {
      let index = Math.floor(Math.random() * 6 + 1) - 1;
      temp.push(index);
    }
    setValues(temp);
    setLoading(false);
  };

  let sum = (values) => {
    console.log("index", values);
    console.log(
      "values",
      values?.map((x) => diceArray[x])
    );
    return values
      ?.map((x) => diceArray[x])
      ?.reduce((partialSum, a) => partialSum + a, 0);
  };

  return (
    <form className="mb-5 max-w-sm mx-auto">
      <div className="mb-5">
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
      <div className="mb-5">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="diff"
        >
          Difficulty level
        </label>
        <input
          type="number"
          id="diff"
          name="diff"
          min="1"
          max="100"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setDiffLevel(e.target.value)}
          value={diffLevel}
        />
      </div>
      <div className="mb-3">
        <button
          className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
            loading ? "disabled cursor-not-allowed opacity-50" : ""
          }`}
          onClick={(e) => onRoll(e)}
        >
          Roll!
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {values?.map((v, key) => (
          <Die key={key} num={v} />
        ))}
      </div>

      {init && !loading ? (
        <>
          <p style={{ whiteSpace: "pre" }}>
            Total:{"\t\t"}
            {sum(values)}
          </p>
          <p
            style={{
              whiteSpace: "pre",
            }}
            className={sum(values) >= diffLevel ? ".success" : ".fail"}
          >
            {sum(values) >= diffLevel ? "Success!" : "Failed :("}
          </p>
        </>
      ) : (
        <></>
      )}
    </form>
  );
}
