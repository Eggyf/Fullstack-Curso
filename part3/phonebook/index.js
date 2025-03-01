const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
var morgan = require("morgan");

const Person = require("./models/persons");

const mongoose = require("mongoose");

// const password = process.argv[2];

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
// const url = process.env.MongoDB_URI;
// console.log(url);
// mongoose.set("strictQuery", false);
// mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// const Person = mongoose.model("Person", personSchema);

morgan("tiny");
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    tokens.body(req, res),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");
});

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(cors());
app.use(express.static("dist"));
// const generateId = () => {
//   const maxId =
//     persons.length > 0 ? Math.max(...persons.map((n) => Number(n.id))) : 0;
//   return String(maxId + 1);
// };

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  if (persons.find((person) => person.name === body.name) != undefined) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });

  response.status(201).json(person);
});

app.get("/", (request, response) => {
  response.send("<h1>Welcome to phonebook API</h1>");
});

app.get("/api/persons", (request, response) => {
  console.log("phonebook:\n");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    response.json(result);
  });
});

app.get("/api/info", async (request, response) => {
  const currentTime = new Date().toLocaleString();
  const personsCount = await Person.countDocuments();

  console.log(personsCount);

  response.send(
    `Phonebook has info for ${personsCount} people <br/>Request received at: ${currentTime}`
  );
});

app.get("/api/persons/:id", (request, response, next) => {
  console.log(request.params.id);
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
