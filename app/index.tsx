import { useEffect, useState } from "react";
import { Text, View, FlatList, Image, Modal, Button } from "react-native";
import { Pokemon } from "../types";
import { fetchPokemonList, fetchPokemonDetails } from "@/services/pokemonService";
import { styles } from "@/styles/pokemonCardStyles";

export default function Index() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [speciMon, setSpeciMon] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function fetchPokemon() {
      setLoading(true);
      const pokeList = await fetchPokemonList("https://pokeapi.co/api/v2/pokemon", 20);
      setPokemonList(pokeList);
      setLoading(false);
    };

    fetchPokemon();

    async function fetchSpeciMon() {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/1");
        const data = await response.json();
        setSpeciMon(data.sprites.front_default);
      }
      catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    }
    fetchSpeciMon();
  }, []);

  function toggleModalStatus(modalStatus: boolean) {
    setModalVisible(modalStatus);
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
        keyExtractor={(item) => item.name}
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

