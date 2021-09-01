const express = require('express');
const mongoose = require('mongoose');

const app = express(); // Express object

app.use(express.json()); // Middleware to convert unreadable data to js object 

// creation and start of server 
app.listen(8000, () => {
    console.log("server is running");
})

mongoose.connect("mongodb://localhost:27017/pokeapi", { useNewUrlParser: true }, () => {
    console.log("mongo server connected");
})

// schema for pokemons collection 
const pokemonSchema = new mongoose.Schema({
    name: String,
    type: String,
    imageUrl: String
})

// model for pokemons collection that will be used for all the operations 
const pokemonModel = new mongoose.model('pokemons', pokemonSchema);

// Assignment -- Get API

// To get all pokemon 

app.get("/getallpokemondata", async (req, res) => {
    let data = await pokemonModel.find();
    console.log(data);
    res.send(data);
})

// To get a single pokemon data based on id 

app.get("/getpokemondata/:id", async (req, res) => {
    let id = req.params.id;
    let pokemon = await pokemonModel.find({ _id: id });
    res.send({ Status: "Success", PokemonDetails: pokemon })
})

// To get a single pokemon data based on type 

app.get("/getpokemondata/type/:type", async (req, res) => {
    let type = req.params.type;
    let pokemon = await pokemonModel.find({ type: type });
    res.send({ PokemonData: pokemon, mesage: "pokemon details getting succesfully" })
})


// Assignment -- POST API

// To create a new pokemon 

app.post("/createpokemon", (req, res) => {
    let pokemon = req.body;
    console.log(pokemon)
    let pokemonObj = new pokemonModel(pokemon);
    pokemonObj.save((error, data) => {
        if (error === null) {
            res.send({ Status: "Success", Message: "Pokemon created" })
        }
    })
})

