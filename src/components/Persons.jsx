const Persons = ({ persons, deleting }) => (
        <ul>
            {persons.map(person =>
                <li key={person.id}>
                    {person.name}: {person.number} <button onClick={()=>deleting(person.id, person.name)} >Delete</button>
                </li>
            )}
        </ul>
    )

export default Persons