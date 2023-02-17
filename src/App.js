import "./App.css";
import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [count, setCount] = React.useState(0)
    const [tenzies, setTenzies] = React.useState(false)
    const [highScore,setHighScore] = React.useState(0)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value;
        const allSameValue = dice.every(die => die.value===firstValue)
        if(allHeld && allSameValue){
          setTenzies(true)
        }
    }, [dice])
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    
    function rollDice() {
        if(!tenzies) {
            setCount(old => old+1)
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            
            setTenzies(false)
            setDice(allNewDice())
            setHighScore(old => (old===0) || (old>count) ? count : old)
            setCount(0)
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Akshat's Tenzies</h1>
            <h2>Your Count: {count}</h2>
            {highScore!==0 && <h3>High Score:{highScore}</h3>}
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>
             {tenzies ? "NEW GAME!!" : "ROLL"}
             
              </button>
            
        </main>
    )
}
//Akshat