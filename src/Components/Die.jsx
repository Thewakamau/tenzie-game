import React from "react"

const Die = ({ value, holdDice, held }) => {
	return (
		<>
			<div
				className='dice-value'
				style={{
					backgroundColor: held ? "green" : "white",
				}}
				onClick={holdDice}
			>
				<h2>{value}</h2>
			</div>
		</>
	)
}

export default Die
