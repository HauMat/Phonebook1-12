const Filter = ({filter, Handler}) => (
    <input value={filter} onChange={(e) => Handler(e)} ></input>
)

export default Filter