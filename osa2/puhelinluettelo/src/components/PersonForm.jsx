
const PersonForm = (props) => {
  const { addPerson, newName, handleNameGhange, newNumber, handleNumberChange } = props
  return (
      <form onSubmit={addPerson}>
          <div>name: <input value={newName} onChange={handleNameGhange}/></div>
          <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
          <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonForm