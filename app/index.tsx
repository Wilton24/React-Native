import { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet, Image } from "react-native";

type Pokemon = {
  name: string;
  url: string;
};

export default function Index() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [speciMon, setSpeciMon] = useState<any>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        );
        const data = await response.json();
        const results = data.results;
        const pokemonData = await Promise.all(
          results.map(async (result: any) => {
            const pokemonResponse = await fetch(result.url);
            const pokemonData = await pokemonResponse.json();
            return {
              name: result.name,
              url: pokemonData.sprites.front_default,
            } as Pokemon;
          })
        );
        setPokemonList(pokemonData);

        console.log(pokemonData);

        // setPokemonList(results.map((result: any) => ({
        //   name: result.name,
        //   url: result.sprites.front_default,
        // } as Pokemon)));

      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };


    async function fetchSpeciMon() {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/1");
        const data = await response.json();
        setSpeciMon(data.sprites.front_default);
        // console.log(`SPECIMON:`, data.sprites.front_default);
      }
      catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    }

    fetchPokemon();
    fetchSpeciMon();
  }, []);




  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading Pokémon...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokedex</Text>
      {/* <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Text style={styles.pokemonName}>{item.name}</Text>
        )}
      /> */}

      <Image
        source={{
          uri: speciMon
        }}
        style={styles.image}
      />
    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  pokemonName: {
    fontSize: 20,
    color: "#fff",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  image: {
    width: 120,
    height: 120, // must define width & height!
    resizeMode: "contain", // optional: contain, cover, stretch
  },
});
