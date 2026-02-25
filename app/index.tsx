import { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet, Image, Modal, Button } from "react-native";

type Pokemon = {
  name: string;
  url: string;
};

export default function Index() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [speciMon, setSpeciMon] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  function toggleModalStatus(modalStatus: boolean) {
    setModalVisible(modalStatus);

    console.log(modalVisible);

  }

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
      <Button title="Open Modal" onPress={() => toggleModalStatus(true)} />
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.name} // unique key for each item
        renderItem={({ item }) => (
          <View style={styles.pokemonCard}>
            <Image source={{ uri: item.url }} style={styles.image} />
            <Text style={styles.pokemonName}>{item.name}</Text>
          </View>
        )}
        numColumns={2} // optional, show in grid
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => toggleModalStatus(false)}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View style={{ width: 200, height: 200, backgroundColor: "white", padding: 20 }}>
            <Text>Hello, I am a Modal!</Text>
            <Button title="Close" onPress={() => toggleModalStatus(false)} />
          </View>
        </View>
      </Modal>
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
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  pokemonCard: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    margin: 5,
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
  },
});
