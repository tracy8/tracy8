const express = require('express');
const app = express()
app.use(express.json())
let courses = [
    {id: 1, name: "course 1"},
    {id: 2, name: "course 2"},
    {id: 3, name: "course 3"},
    {id: 4, name: "course 4"},
]
//get all courses
app.get('/api/courses', (req, res) =>{
    return res.send(courses);
})
//get course by id
app.get('/api/courses/:id',(req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course id is not found');
    return res.send(course)
});
app.post('/api/courses',(req,res) =>{
    if(!req.body.name){ return res.status(400).send('Name is required')}
    const course ={
        id: courses.length +1,
        name: req.body.name
    }
    courses.push(course);
    res.status(201).send(course);
});
const port = 3000
app.listen(port,()=>{
    console.log(`Server runing on port...${port}`)
});