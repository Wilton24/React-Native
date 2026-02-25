import { Pokemon } from "../types";

export const fetchPokemonList = async (url: string, limit = 20) => {
    try {
        const response = await fetch(`${url}?limit=${limit}`);
        const data = await response.json();
        return await Promise.all(
            data.results.map(async (result: Pokemon) => {
                const pokemonResponse = await fetch(result.url);
                const pokemonData = await pokemonResponse.json();
                return {
                    name: result.name,
                    url: pokemonData.sprites.front_default,
                };
            })
        );
    } catch (error) {
        console.error("Error fetching Pokémon list:", error);
        throw error;
    };
};

export const fetchPokemonDetails = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data.sprites.front_default;
};