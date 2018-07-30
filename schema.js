const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql')

const PlanetType = new GraphQLObjectType({
  name: 'planet',
  description: 'All planets from Start Wars...',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: ' name of the planet'
    },
    rotation_period: {
      type: GraphQLInt,
    },
    orbital_period: {
      type: GraphQLInt
    },
    diameter: {
      type: GraphQLInt
    },
    climate: {
      type: GraphQLString
    },
    gravity: {
      type: GraphQLString
    },
    terrain: {
      type: GraphQLString
    },
    surface_water: {
      type: GraphQLInt
    },
    population: {
      type: GraphQLInt
    },
    residents: {
      type: new GraphQLList(PeopleType),
      resolve: (root, args, context) => {
        return root.residents.map(url => {      
          let id= url.match(/\/people\/(\d+)/)[1];          
          return context.peopleLoader.load(id)
        })
      }
    },
    films: {
      type: new GraphQLList(FilmType),
      resolve: (root, args, context) => {
        return root.films.map(url => {        
          let id= url.match(/\/films\/(\d+)/)[1];          
          return context.filmsLoader.load(id)
        })
      }
    }
  })
});

const StarShipType = new GraphQLObjectType({
  name: 'starship',
  description: 'Starships from Start Wars series',
  fields: () => ({
    name: {
      type: GraphQLString
    },
    model: {
      type: GraphQLString
    },
    manufacturer: {
      type: GraphQLString
    },
    cost_in_credits: {
      type: GraphQLString
    },
    length: {
      type: GraphQLString
    },
    max_atmosphering_speed: {
      type: GraphQLString
    },
    crew: {
      type: GraphQLString
    },
    passengers: {
      type: GraphQLString
    },
    cargo_capacity: {
      type: GraphQLString
    },
    consumables: {
      type: GraphQLString
    },
    hyperdrive_rating: {
      type: GraphQLString
    },
    MGLT: {
      type: GraphQLString
    },
    starship_class: {
      type: GraphQLString
    },
    pilots: {
      type: new GraphQLList(PeopleType),
      resolve: (root, args, context) => {
        return root.pilots.map(url => {        
          let id = url.match(/\/people\/(\d+)/)[1];          
          return context.peopleLoader.load(id)
        })
      } 
    },
    films: {
      type: new GraphQLList(FilmType),
      resolve: (root, args, context) => {
        return root.films.map(url => {        
          let id= url.match(/\/films\/(\d+)/)[1];          
          return context.filmsLoader.load(id)
        })
      }
    }
  })
})

const SpeciesType = new GraphQLObjectType({
  name: 'species',
  description: '...',
  fields: () => ({
    name: {
      type: GraphQLString
    },
    classification: {
      type: GraphQLString
    },
    designation: {
      type: GraphQLString
    },
    average_height: {
      type: GraphQLString
    },
    skin_colors: {
      type: GraphQLString
    },
    hair_colors: {
      type: GraphQLString
    },
    eye_colors: {
      type: GraphQLString
    },
    average_lifespan: {
      type: GraphQLString
    },
    homeworld: {
      type: PlanetType,
      resolve: (root, args, context) => {
        let id = root.homeworld.match(/\/planets\/(\d+)/)[1]
        return context.planetsLoader.load(id)
      }
    },
    language: {
      type: GraphQLString
    },
    people: {
      type: new GraphQLList(PeopleType),
      resolve: (root, args, context) => {
        return root.people.map(url => {        
          let id= url.match(/\/people\/(\d+)/)[1];          
          return context.peopleLoader.load(id)
        })
      } 
    },
    films: {
      type: new GraphQLList(FilmType),
      resolve: (root, args, context) => {
        return root.films.map(url => {        
          let id= url.match(/\/films\/(\d+)/)[1];          
          return context.filmsLoader.load(id)
        })
      }
    }
  })
})

const FilmType = new GraphQLObjectType({
  name:'films',
  description: 'Episodes from Start Wars series',
  fields: () => ({
    title: {
      type: GraphQLString
    },
    episode_id: {
      type: GraphQLInt
    },
    opening_crawl: {
      type: GraphQLString
    },
    director: {
      type: GraphQLString
    },
    producer: {
      type: GraphQLString
    },
    release_date: {
      type: GraphQLString
    },
    characters: {
      type: new GraphQLList(PeopleType),
      resolve: (root, args, context) => {
        return root.characters.map(url => {        
          let id= url.match(/\/people\/(\d+)/)[1];          
          return context.peopleLoader.load(id)
        })
      } 
    },
    planets: {
      type: new GraphQLList(PlanetType),
      resolve: (root, args, context) => {
        return root.planets.map(url => {      
          let id= url.match(/\/planets\/(\d+)/)[1];          
          return context.planetsLoader.load(id)
        })
      }
    },
    starships: {
      type: new GraphQLList(StarShipType),
      resolve: (root, args, context) => {
        return root.starships.map(url => {       
          let id= url.match(/\/starships\/(\d+)/)[1];          
          return context.starshipsLoader.load(id)
        })
      }
    },
    vehicles: {
      type: new GraphQLList(VehiclesType),
      resolve: (root, args, context) => {
        return root.vehicles.map(url => {        
          let id= url.match(/\/vehicles\/(\d+)/)[1];          
          return context.vehiclesLoader.load(id)
        })
      } 
    },
    species: {
      type: new GraphQLList(SpeciesType),
      resolve: (root, args, context) => {
        return root.species.map(url => {        
          let id= url.match(/\/species\/(\d+)/)[1];          
          return context.speciesLoader.load(id)
        })
      }
    },
  })
})

const VehiclesType = new GraphQLObjectType({
  name:'vehicles',
  description: 'Vehicles from Start Wars series',
  fields: () => ({
    name: {
      type: GraphQLString
    },
    model: {
      type: GraphQLString
    },
    manufacturer: {
      type: GraphQLString
    },
    cost_in_credits: {
      type: GraphQLString
    },
    length: {
      type: GraphQLString
    },
    max_atmosphering_speed: {
      type: GraphQLString
    },
    crew: {
      type: GraphQLString
    },
    passengers: {
      type: GraphQLString
    },
    cargo_capacity: {
      type: GraphQLString
    },
    consumables: {
      type: GraphQLString
    },
    vehicle_class: {
      type: GraphQLString
    },
    pilots: {
      type: new GraphQLList(PeopleType),
      resolve: (root, args, context) => {
        return root.pilots.map(url => {        
          let id= url.match(/\/people\/(\d+)/)[1];          
          return context.peopleLoader.load(id)
        })
      } 
    },
    films: {
      type: new GraphQLList(FilmType),
      resolve: (root, args, context) => {
        return root.films.map(url => {        
          let id= url.match(/\/films\/(\d+)/)[1];          
          return context.filmsLoader.load(id)
        })
      }
    },
  })
})

const PeopleType = new GraphQLObjectType({
  name: 'people',
  description: 'Characters from Start Wars series',
  fields: () => ({
    name: {
      type: GraphQLString
    },
    height: {
      type: GraphQLInt
    },
    mass: {
      type: GraphQLInt
    },
    hair_color: {
      type: GraphQLString
    },
    skin_color: {
      type: GraphQLString
    },
    eye_color: {
      type: GraphQLString
    },
    birth_year: {
      type: GraphQLString
    },
    gender: {
      type: GraphQLString
    },
    homeworld: {
      type: PlanetType,
      resolve: (root, args, context) => {
        let id = root.homeworld.match(/\/planets\/(\d+)/)[1]
        return context.planetsLoader.load(id)
      }
    },
    films: {
      type: new GraphQLList(FilmType),
      resolve: (root, args, context) => {
        return root.films.map(url => {
          let id= url.match(/\/films\/(\d+)/)[1];          
          return context.filmsLoader.load(id)
        }        
      )
      }
    },
    species: {
      type: new GraphQLList(SpeciesType),
      resolve: (root, args, context) => {
        return root.species.map(url => {        
          let id= url.match(/\/species\/(\d+)/)[1];          
          return context.speciesLoader.load(id)
        })
      }
    },
    vehicles: {
      type: new GraphQLList(VehiclesType),
      resolve: (root, args, context) => {
        return root.vehicles.map(url => {        
          let id= url.match(/\/vehicles\/(\d+)/)[1];          
          return context.vehiclesLoader.load(id)
        })
      } 
    },
    starships: {
      type: new GraphQLList(StarShipType),
      resolve: (root, args, context) => {
        return root.starships.map(url => {        
          let id= url.match(/\/starships\/(\d+)/)[1];          
          return context.starshipsLoader.load(id)
        })
      }
    },
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: "All the Star Wars data you've ever wanted: Planets, Spaceships, Vehicles, People, Films and Species.\n From all SEVEN Star Wars films.\n Now with The Force Awakens data!",

    fields: () => ({
      planets:{
        type: PlanetType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args, context) => context.planetsLoader.load(args.id)
      },
      people: {
        type: PeopleType,
        args: {
          id: { type: GraphQLInt},
        },
        resolve: (root, args, context) => context.peopleLoader.load(args.id)
      },
      starhsips:{
        type: StarShipType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args, context) => context.starshipsLoader.load(args.id)
      },
      vehicles: {
        type: VehiclesType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args, context) => context.vehiclesLoader.load(args.id)
      },
      species: {
        type: SpeciesType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args, context) => context.speciesLoader.load(args.id)
      },
      films: {
        type: FilmType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args, context) => context.filmsLoader.load(args.id)
      }
    })
  })
})
