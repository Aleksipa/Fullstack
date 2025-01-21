import React, { useState } from 'react';
import useRepositories from '../hooks/useRepositories';
import { RepositoryListContainer } from './RepositoryListContainer';
import RepositoryListHeader from './RepositoryListHeader';

const RepositoryList = () => {
  const [selectedSorting, setSelectedSorting] = useState('latest');

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
  const { repositories, loading } = useRepositories({ orderBy, orderDirection });

  if (loading) {
    return null;
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      ListHeaderComponent={
        <RepositoryListHeader
          selectedSorting={selectedSorting}
          setSelectedSorting={setSelectedSorting}
        />
      }
    />
  );
};

export default RepositoryList;