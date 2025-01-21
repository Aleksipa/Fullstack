import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.medium,
    backgroundColor: theme.colors.white,
    marginTop: -15,
  },
  picker: {
    backgroundColor: theme.colors.white,
    marginVertical: -8,
  },
});

const RepositoryListHeader = ({ selectedSorting, setSelectedSorting }) => {
  return (
    <View style={styles.container}>
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