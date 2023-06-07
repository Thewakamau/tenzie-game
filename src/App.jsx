import React from "react"
import Die from "./Components/Die"
import { useState, useEffect } from "react"
import { nanoid } from "nanoid"

const App = () => {
	function generateNewDie() {
		return { value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() }
	}
	const allNewDice = () => {
		//new array to hold my numbers
		const newDice = []
		//loop 10 times to fill the 10 dices
		for (let i = 0; i < 10; i++) {
			newDice.push(generateNewDie())
		}
		return newDice
	}
	const [dice, setdice] = useState(allNewDice())

	//sent as a prop to control all the dice elements
	function holdDice(id) {
		setdice((prevDice) =>
			prevDice.map((die) => {
				return die.id === id ? { ...die, isHeld: !die.isHeld } : die
			})
		)
	}

	//mapping array into array of components
	const diceElements = dice.map((die) => (
		<Die
			key={die.id}
			value={die.value}
			held={die.isHeld}
			holdDice={() => holdDice(die.id)}
		/>
	))
	function Roll() {
		if (!tenzies) {
			setdice((prevDice) =>
				prevDice.map((die) => {
					return die.isHeld ? die : generateNewDie() //held value will not  change
				})
			)
		} else {
			setTenzies(false) //RESETS THE GAME
			setdice(allNewDice)
		}
	}

	const [tenzies, setTenzies] = useState(false)
	//to keep the two pieces of internal state in sync
	useEffect(() => {
		const allHeld = dice.every((die) => die.isHeld)
		const firstValue = dice[0].value
		const allsameValue = dice.every((die) => die.value === firstValue)
		if (allHeld && allsameValue) {
			setTenzies(true)
			alert("Congratulations! You won!")
		}
	}, [dice])

	return (
		<div className='container'>
			<h1>Tenzies Game</h1>
			<p className='instructions'>
				Roll untill the dices are the same. Click the dice to freze it at its
				current value. Enjoy!
			</p>
			<div>
				<div className='Dies'>{diceElements}</div>
			</div>

			<div>
				<button className='roll-btn' onClick={Roll}>
					{tenzies === true ? "New game" : "Roll "}
				</button>
			</div>
		</div>
	)
}

export default App
