import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client";
import Main from "./components/Main";
import theme from "./theme";
import createApolloClient from "./utils/apolloClient";
import AuthStorage from "./utils/authStorage";
import AuthStorageContext from "./contexts/AuthStorageContext";

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

export default function App() {
  return (
    <NativeRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <View style={styles.container}>
            <Main />
            <StatusBar style="light" />
          </View>
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});
