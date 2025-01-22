import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.medium,
    backgroundColor: theme.colors.white,
    paddingTop: 15,
  },
  picker: {
    backgroundColor: theme.colors.white,
    marginVertical: -8,
  },
  searchbar: {
    marginVertical: 10,
    backgroundColor: theme.colors.mainBackground,
  },
});

const RepositoryListHeader = ({ selectedSorting, setSelectedSorting, searchQuery, onSearchChange }) => {
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search repositories..."
        onChangeText={onSearchChange}
        value={searchQuery}
        style={styles.searchbar}
      />
      <Picker
        style={styles.picker}
        selectedValue={selectedSorting}
        onValueChange={(itemValue) => setSelectedSorting(itemValue)}
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  );
};

export default RepositoryListHeader; 