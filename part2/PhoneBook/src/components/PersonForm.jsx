const PersonForm = ({onSubmit, inputName, inputNum, nameChange, numChange}) =>{
    return (
        <form onSubmit={onSubmit}>
            <div>Name: <input value = {inputName} onChange={nameChange}/></div>
            <div>Number: <input value = {inputNum} onChange = {numChange}/> </div>
            <div><button type="submit">Add</button></div>
        </form>
    )
}


export default PersonForm;