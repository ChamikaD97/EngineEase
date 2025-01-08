import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import axios from "axios";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [engineFailureList, setEngineFailureList] = useState([]);
  const API_URL = "http://13.60.98.221:5000";

  const fetchEngineFailures = async () => {
    try {
      // Fetch engine failures
      const engineFailures = await axios.get(`${API_URL}/api/engines`, {
        headers: { Authorization: "token" },
      });
      setEngineFailureList(engineFailures.data);

      // Login user
      const response = await axios.post(`${API_URL}/api/user/login`, {
        comNum: "A",
        password: "A",
      });

      Toast.show({
        type: "success",
        text1: "Data fetched successfully",
        text2: `Engines: ${engineFailures.data.length}`,
      });
    } catch (error) {
      console.error("API Call Error:", error); // Log detailed error
      Toast.show({
        type: "error",
        text1: "API Error",
        text2: error.message,
      });
    }
  };

  useEffect(() => {
    fetchEngineFailures();
  }, []);

  return (
    <View style={styles.container}>
      <Toast position="top" />
      <Text>{engineFailureList.length ? engineFailureList.length : "000"}</Text>
      <Text>{`${API_URL}/api/engines`}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
