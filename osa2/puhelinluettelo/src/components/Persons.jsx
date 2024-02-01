
const Persons = ({ persons, filter, handleClick}) => {
	const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
	return (
		personsToShow.map(person => 
			<div key={person.name}>
				{person.name} {person.number}
				<button onClick={() => handleClick(person.id)}>
					delete
				</button>
			</div>)
	)
}

export default Persons