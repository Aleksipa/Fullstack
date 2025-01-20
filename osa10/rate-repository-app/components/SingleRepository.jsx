import React from 'react';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { View, StyleSheet, Pressable, Linking, FlatList } from 'react-native';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBackground,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.small,
    margin: theme.spacing.large,
  },
  buttonText: {
    color: theme.colors.white,
    textAlign: 'center',
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  const openGitHub = () => {
    Linking.openURL(repository.url);
  };

  return (
    <View>
      <RepositoryItem item={repository} />
      <Pressable style={styles.button} onPress={openGitHub}>
        <Text style={styles.buttonText} fontWeight="bold">
          Open in GitHub
        </Text>
      </Pressable>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id },
  });

  if (loading) {
    return null;
  }

  const repository = data?.repository;
  const reviews = repository?.reviews?.edges || [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ node }) => node.id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      style={styles.container}
    />
  );
};

export default SingleRepository; 