import { View, Text, StyleSheet, Image } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.large,
    backgroundColor: theme.colors.itemBackground,
    ...theme.layout.column,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.medium,
  },
  avatarContainer: {
    marginRight: theme.spacing.medium,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 4,
  },
  contentContainer: {
    flex: 1,
    ...theme.layout.column,
  },
  title: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    marginBottom: theme.spacing.small,
  },
  description: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.small,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    alignSelf: 'flex-start',
    padding: theme.spacing.small,
    borderRadius: theme.borderRadius.small,
    marginBottom: theme.spacing.medium,
  },
  statsContainer: {
    ...theme.layout.rowSpaceAround,
    marginTop: theme.spacing.medium,
  },
  statItem: {
    ...theme.layout.centerAll,
  },
  statValue: {
    fontWeight: theme.fontWeights.bold,
    marginBottom: theme.spacing.small / 2,
  },
  statLabel: {
    color: theme.colors.textSecondary,
  },
});

const formatNumber = (num) => {
  return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri: item.ownerAvatarUrl }}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{item.fullName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{formatNumber(item.stargazersCount)}</Text>
          <Text style={styles.statLabel}>Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{formatNumber(item.forksCount)}</Text>
          <Text style={styles.statLabel}>Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.reviewCount}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.ratingAverage}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem; 