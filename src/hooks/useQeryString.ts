import { useSearchParams } from 'react-router-dom';

export const useQeryString = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSortOption = (option: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sort', option);
    setSearchParams(newSearchParams);
  };

  return useQeryString;
};
