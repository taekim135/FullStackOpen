// Ex 2.1 - 2.5

const Header = (props) => <h1>{props.name}</h1>

const Content = ({props}) => {
    // props.parts = list
    //console.log("Inside Content", props)
    return (
        <div>
            {props.parts.map(part => 
                <Part key = {part.id} props = {part}></Part>
            )}
        </div>
    )
}

const Part = ({props}) => {
    //console.log("Inside Part", props)
    return(
        <p>
            {props.name} {props.exercises}
        </p>
    )
}


const Total = ({course}) => {
    //console.log("Inside Total", course);
    
    const total = course.parts.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.exercises;
    } ,0); 

    return(
        <h3>Total of {total} Exercises</h3>
    )
}


const Course = ({course}) =>{
    //console.log("Inside Course", course)
    return (
        <div>
            <h1>Web Development Curriculum</h1>
            <Header name = {course.name}/>
            <Content props={course} />
            <Total course = {course}/>
        </div>
    )
}

export default Course;