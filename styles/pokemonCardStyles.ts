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
        textAlign: "center",
        marginBottom: 10,
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
    /* ---------- MODAL STYLES ---------- */

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)", // dark transparent background
        justifyContent: "center",
        alignItems: "center",
    },

    modalContainer: {
        width: "85%",
        backgroundColor: "#1e1e1e",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
    },

    modalImage: {
        width: 220,
        height: 220,
        resizeMode: "contain",
        marginBottom: 20,
    },

    modalName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 15,
        textTransform: "capitalize",
    },
});