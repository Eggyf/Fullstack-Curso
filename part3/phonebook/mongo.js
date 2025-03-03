const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

// const password = process.argv[2]
const personName = process.argv[3]
const celphone = process.argv[4]

const url = process.env.MONGODB_URI
console.log(url)

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    required: true,
  },
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: personName,
  number: celphone,
})
if (process.argv.length > 3) {
  person.save().then(() => {
    console.log(`added ${personName} number ${celphone} to phonebook`)
    mongoose.connection.close()
  })
}
if (process.argv.length === 3) {
  console.log('phonebook:\n')
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}
