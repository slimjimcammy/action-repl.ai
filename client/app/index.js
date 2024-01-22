import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";

function Home() {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Link
                href="/divestream"
                style={{ padding: 10, backgroundColor: "red" }}
            >
                Access Divestream
            </Link>
        </View>
    );
}

export default Home;
