import React, { useState } from 'react';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';
import useRepositories from '../hooks/useRepositories';
import { RepositoryListContainer } from './RepositoryListContainer';

const RepositoryList = () => {
  const [selectedSorting, setSelectedSorting] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const navigate = useNavigate();

  const getSortingParams = (sorting) => {
    switch (sorting) {
      case 'highest':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
      case 'lowest':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
      case 'latest':
      default:
        return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
    }
  };

  const { orderBy, orderDirection } = getSortingParams(selectedSorting);
  const { repositories, loading } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchQuery,
  });

  if (loading) {
    return null;
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedSorting={selectedSorting}
      setSelectedSorting={setSelectedSorting}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      navigate={navigate}
    />
  );
};

export default RepositoryList;