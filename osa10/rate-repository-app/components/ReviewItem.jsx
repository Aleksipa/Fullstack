import React from 'react';
import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.itemBackground,
    flexDirection: 'row',
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
  contentContainer: {
    flex: 1,
  },
  headerText: {
    marginBottom: theme.spacing.small,
  },
  reviewText: {
    marginTop: theme.spacing.small,
  },
});

const ReviewItem = ({ review }) => {
  const { text, rating, createdAt, user } = review.node;

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text color="primary" fontWeight="bold">
          {rating}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text fontWeight="bold" style={styles.headerText}>
          {user.username}
        </Text>
        <Text color="textSecondary">
          {format(new Date(createdAt), 'dd.MM.yyyy')}
        </Text>
        <Text style={styles.reviewText}>{text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem; 