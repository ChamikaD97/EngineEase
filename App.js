import { Link } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function App() {
  const [engineFailureList, setEngineFailureList] = useState([]);
  API_URL = "http://13.60.98.221:5000";
  const fetchEngineFailures = async () => {
    try {
      Toast.show({
        type: "success", // or 'error' or 'info'
        text1: `${API_URL}/api/engines - 15`,
      });
      const engineFailures = await axios.get(`${API_URL}/api/engines`, {
        headers: { Authorization: 'token' },
      });
      const response = await axios.post(`${API_URL}/api/user/login`, {
        comNum: 'A',
        password: 'A',
      });

      setEngineFailureList(engineFailures.data);
      Toast.show({
        type: "info", // or 'error' or 'info'
        text1: `${API_URL}/api/engines   - 28`,
      });
    } catch (error) {
      Toast.show({
        type: "error", // or 'error' or 'info'
        text1: 'hi'+error.message,
      });
    }
  };
  useEffect(() => {
    fetchEngineFailures();
  }, []);

  return (
    <View style={styles.container}>
      <Toast position="top" />
      
      <Text>{engineFailureList.length? engineFailureList.length : '000'}</Text>
      <Text>{ `${API_URL}/api/engines`}</Text>
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
