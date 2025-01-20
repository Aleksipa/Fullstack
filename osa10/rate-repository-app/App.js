import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client";
import Main from "./components/Main";
import theme from "./theme";
import createApolloClient from "./utils/apolloClient";

const apolloClient = createApolloClient();

export default function App() {
  return (
    <NativeRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <ApolloProvider client={apolloClient}>
        <View style={styles.container}>
          <Main />
          <StatusBar style="light" />
        </View>
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
