const Course = ({course}) => {
    console.log(course)
    return (
        course.map(course => 
            <div key={course.id}>
                <h1>{course.name}</h1>
                <ul>
                    {course.parts.map(part => <li key={part.id}>{part.name} <b>{part.exercises}</b></li>)}
                </ul>
                <p>Total: <b>{course.parts.reduce((s,p) => s + p.exercises, 0)}</b></p>
            </div>
        )
    )
}

export default Course