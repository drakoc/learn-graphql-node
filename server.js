const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()
const fetch = require('node-fetch')
const DataLoader = require('dataloader')
const schema = require('./schema')

const url = 'https://swapi.co/api'

const fetchPeople = id => fetch(`${url}/people/${id}`).then(res => res.json());
const fetchPlanets = id => fetch(`${url}/planets/${id}`).then(res => res.json());
const fetchStarships = id => fetch(`${url}/starships/${id}`).then(res => res.json());
const fetchVehicles = id => fetch(`${url}/vehicles/${id}`).then(res => res.json());
const fetchSpecies = id => fetch(`${url}/species/${id}`).then(res => res.json());
const fetchFilms = id => fetch(`${url}/films/${id}`).then(res => res.json());

app.use('/graphql', graphqlHTTP(request =>{

  const loader = {
    peopleLoader: peopleLoader = new DataLoader(keys => Promise.all(keys.map(fetchPeople))),
    planetsLoader: planetsLoader = new DataLoader(keys => Promise.all(keys.map(fetchPlanets))),
    starshipsLoader: starshipsLoader = new DataLoader(keys => Promise.all(keys.map(fetchStarships))),
    vehiclesLoader: vehiclesLoader = new DataLoader(keys => Promise.all(keys.map(fetchVehicles))),
    speciesLoader: speciesLoader = new DataLoader(keys => Promise.all(keys.map(fetchSpecies))),
    filmsLoader: filmsLoader = new DataLoader(keys => Promise.all(keys.map(fetchFilms))),
  }

  return {
    schema,
    context: {
      ...loader
    },
    graphiql: true
  }
}))

app.listen(4000)
console.log('Listening...')