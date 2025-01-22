import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';

import { ME } from '../graphql/queries';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  reviewItem: {
    backgroundColor: 'white',
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.small,
  },
  ratingContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.medium,
  },
  rating: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  reviewContent: {
    flexDirection: 'row',
    marginBottom: theme.spacing.medium,
  },
  reviewInfo: {
    flex: 1,
  },
  repositoryName: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    marginBottom: 4,
  },
  date: {
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  separator: {
    height: 10,
  },
});

const ReviewItem = ({ review }) => {
  const navigate = useNavigate();
  
  return (
    <View style={styles.reviewItem}>
      <View style={styles.reviewContent}>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{review.rating}</Text>
        </View>
        <View style={styles.reviewInfo}>
          <Text style={styles.repositoryName}>{review.repository.fullName}</Text>
          <Text style={styles.date}>
            {format(new Date(review.createdAt), 'dd.MM.yyyy')}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data, loading } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const reviewNodes = data?.me?.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews; 