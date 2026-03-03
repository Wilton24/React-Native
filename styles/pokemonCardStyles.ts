import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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