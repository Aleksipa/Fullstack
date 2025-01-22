import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import RepositoryListHeader from './RepositoryListHeader';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { selectedSorting, setSelectedSorting, searchQuery, onSearchChange } = this.props;

    return (
      <RepositoryListHeader
        selectedSorting={selectedSorting}
        setSelectedSorting={setSelectedSorting}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />
    );
  };

  render() {
    const { repositories, navigate } = this.props;
    
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    const onRepositoryPress = (id) => {
      navigate(`/repository/${id}`);
    };

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => onRepositoryPress(item.id)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}