import axios from "axios";

export const getAllPokemons = async () => {
    //Por ahora la vamos a dejar así, solo trae 20 pokemons
    const URL = "https://pokeapi.co/api/v2/pokemon?limit=20";
    const { data } = await axios.get(URL);
    return data.results;
}

export const getAllTypes = async () => {
    const {data} = await axios.get("https://pokeapi.co/api/v2/type")
    return data.results
}

export const getPokemonsByType = async (pokemonType) => {
    const url = `https://pokeapi.co/api/v2/type/${pokemonType}/`

    const{ data } = await axios.get(url);
    const formatPokemons = data.pokemon.map(({pokemon}) => pokemon)
    return formatPokemons;
}

export const getPokemonsById = async (pokemonId) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
    const { data } = await axios.get(url);
    const pokemon = {
        id: data.id,
        name: data.name,
        types: formatTypes(data.types),
        stats: formatStats(data.stats),
        image: data.sprites.versions["generation-v"]["black-white"].animated.front_default,
        weight: data.weight,
        
        height: data.height
    }
    return pokemon;
}

export const getPokemonByUrl = async (pokemonUrl) =>{
    const { data } = await axios.get(pokemonUrl);
    const pokemon = {
        id: data.id,
        name: data.name,
        types: formatTypes(data.types),
        stats: formatStats(data.stats),
        image: data.sprites.versions["generation-v"]["black-white"].animated.front_default
    }
    return pokemon;
}

const formatStats = (stats) => {
    return stats.map((stat) => ({name: stat.stat.name, value: stat.base_stat})
    )}

const formatTypes = (types) =>{
    return types.map((type) => type.type.name)
}

export const joinPokemonTypes = (types = []) => {
    return types.slice(0, 2).join(" / ")
  }