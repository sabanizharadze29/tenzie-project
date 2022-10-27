import React, { useState, useEffect } from "react";
import "./App.css";
import Die from "./components/Die";
import Confetti from "react-confetti";
function App() {
  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.floor(Math.random() * 7),
        isHeld: false,
        id: i,
      });
    }

    return newDice;
  }
  const [tenzies, setTenzies] = useState(false);
  const [allDice, setAllDice] = useState(allNewDice());
  const diceElements = allDice.map((dice, index) => {
    return (
      <Die
        key={index}
        holdDice={() => holdDice(dice.id)}
        value={dice.value}
        isHeld={dice.isHeld}
      />
    );
  });
  function holdDice(id) {
    setAllDice((oldDice) =>
      oldDice.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      })
    );
  }
  function clickHandler() {
    if (!tenzies) {
      setAllDice((oldDice) =>
        oldDice.map((dice, index) => {
          return dice.isHeld
            ? { ...dice }
            : {
                value: Math.floor(Math.random() * 7),
                isHeld: false,
                id: index,
              };
        })
      );
    } else {
      setAllDice(allNewDice());
      setTenzies(false);
    }
  }

  useEffect(() => {
    const allDiceHeld = allDice.every((dice) => dice.isHeld === true);
    const firstValue = allDice[0].value;
    const allSameValue = allDice.every((dice) => dice.value === firstValue);
    if (allDiceHeld && allSameValue) {
      setTenzies(true);
    }
  }, [allDice]);
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="info">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-container">{diceElements}</div>
      <button onClick={clickHandler}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
