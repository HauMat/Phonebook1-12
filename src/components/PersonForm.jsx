const PersonForm = ({submit, nameHandler, numberHandler}) => (
    <form onSubmit={submit}>
    name:<input onChange={nameHandler} />
    <br />
    number:<input onChange={numberHandler} />
    <button type="submit">add</button>
    </form>
)
export default PersonForm 