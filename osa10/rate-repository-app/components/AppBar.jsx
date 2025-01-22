import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import Constants from 'expo-constants';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import theme from '../theme';
import Text from './Text';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    paddingBottom: theme.spacing.large,
  },
  scrollView: {
    paddingHorizontal: theme.spacing.large,
  },
  tabText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  tab: {
    padding: theme.spacing.medium,
  },
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const { data } = useQuery(ME);
  const isSignedIn = data?.me;
  
  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <Link to="/" component={Pressable} style={styles.tab}>
          <Text style={styles.tabText}>Repositories</Text>
        </Link>
        {isSignedIn ? (
          <>
            <Link to="/create-review" component={Pressable} style={styles.tab}>
              <Text style={styles.tabText}>Create a review</Text>
            </Link>
            <Link to="/my-reviews" component={Pressable} style={styles.tab}>
              <Text style={styles.tabText}>My reviews</Text>
            </Link>
            <Pressable onPress={signOut} style={styles.tab}>
              <Text style={styles.tabText}>Sign out</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Link to="/signin" component={Pressable} style={styles.tab}>
              <Text style={styles.tabText}>Sign in</Text>
            </Link>
            <Link to="/signup" component={Pressable} style={styles.tab}>
              <Text style={styles.tabText}>Sign up</Text>
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar; 