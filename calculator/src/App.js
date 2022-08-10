import { useState } from "react";


function App() {
  
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const ops = ["/", "*", "+", "-", "."];

  // Make it so the button you push shows the same thing in the display, and also denies you typing several operators //
  const updateCalc = value => {
    if (ops.includes(value) && calc === "" || 
        ops.includes(value) && ops.includes(calc.slice(-1))) {
      return;
    }

  //If the last value was not an operator, setResult to eval - evaluates the string provided (5,5 = 10) //
      setCalc(calc + value);
      if (!ops.includes(value)) {
        setResult(eval(calc + value).toString());
      }
  }

  // A loop creating buttons from 0 to 9, storing that in "createDigits", and then calling it further down to make the buttons//
  const createDigits= () => {
  const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        <button 
            onClick={() => updateCalc(i.toString())} 
            key={i}>
            {i}
          </button>
      )
    }
  return digits;
}

// Evaluating our buttonclicks and returns it //
  const calculate = () => {
  setCalc(eval(calc).toString());
}

// Deleting the last digit on the display //
  const deleteLast = () => {
  if (calc === "") {
      return;
    }
    const value = calc.slice(0, -1);
    setCalc(value);
  }
  
  // Deleting all the digits on the display //
  const delAll = () => {
    setCalc("");
  }

  return (
    <div className="container">
      <div className="calculator">
          <p>calc</p>
        <div className="display">
          { result ? <span>({ result })</span> : "" }
          <br></br>
          <br></br>
          { calc || "0" }
        </div>
        <div className="keypad">
          <div className="operators">
            <button onClick={() => updateCalc("/")}>/</button>
            <button onClick={() => updateCalc("*")}>*</button>
            <button onClick={() => updateCalc("+")}>+</button>
            <button onClick={() => updateCalc("-")}>-</button>

            <button className="delbtn" onClick={ deleteLast }>DEL</button>
            <button className="delbtn" onClick={ delAll }>RESET</button>
          </div>

          <div className="digits">
            { createDigits() }
            <button onClick={() => updateCalc("0")}>0</button>
            <button onClick={() => updateCalc(".")}>.</button>
            <button className="equalbtn" onClick={ calculate }>=</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
