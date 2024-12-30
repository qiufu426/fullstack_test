import express from 'express';
import morgan from'morgan';
const app = express()
app.use(express.json())
app.use(morgan('dev'));
app.use(express.static('dist'))
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

  app.get('/api/persons',(request,response)=>{
    response.json(persons);
  })
  app.get('/info',(request,response)=>{
    const time=new Date();
    response.send(`<p>Phonebook has info ${persons.length} for people</p><br/><p>${time}</p>`);
  })
  app.get('/api/persons/:id',(request,response)=>{
  
    const person=persons.find((person)=>{
      return person.id===request.params.id
    })
    console.log(person);
    response.json(person);
  })
  app.delete('/api/persons/:id',(request,response)=>{
    const person=persons.filter(person=>person.id!==request.params.id);
    console.log(person);
    response.status(204).end();
  })
  app.post('/api/persons',(request,response)=>{
    const person=request.body;
    person.id=Math.floor(Math.random()*1000)+1;
    if(persons.find(persons=>persons.name==person.name||persons.number==person.number))
    {
       response.status(400).send('error:exist');
    }else{
       response.json(person);
    }
  })
  const PORT = 3005
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })