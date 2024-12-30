const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://wluosiding:z5P3JvSxkF5hIJvf@cluster0.qz9ig.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Note = mongoose.model('Note', noteSchema)
if(process.argv[3]){
const note = new Note({
  name: process.argv[3],
  number: process.argv[4],
})
note.save().then(result => {
  console.log(`added ${process.argv[3]} ${process.argv[4]} to Phonebook`)
  mongoose.connection.close()
})}else{
Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
}