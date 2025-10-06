import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// Pokemon API interfaces
interface PokemonListResponse {
  results: Array<{
    name: string;
    url: string;
  }>;
}

interface PokemonSprites {
  front_default: string;
}

interface PokemonDetails {
  id: number;
  name: string;
  sprites: PokemonSprites;
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

// Axios instance with base configuration
const pokemonApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetches a list of 12 Pokemon from the PokeAPI using Axios
 * @returns Promise<Pokemon[]> - Array of Pokemon with id, name, and image
 */
export const fetchPokemonList = async (): Promise<Pokemon[]> => {
  try {
    // Step 1: Get the list of 12 Pokemon
    const listResponse = await pokemonApi.get<PokemonListResponse>('/pokemon?limit=12');
    const listData = listResponse.data;
    
    // Step 2: Fetch detailed data for each Pokemon to get their sprites
    const pokemonPromises = listData.results.map(async (pokemon) => {
      const detailResponse = await axios.get<PokemonDetails>(pokemon.url);
      const detailData = detailResponse.data;
      
      return {
        id: detailData.id,
        name: capitalizeFirstLetter(detailData.name),
        image: detailData.sprites.front_default
      };
    });
    
    // Wait for all Pokemon details to be fetched
    const pokemonList = await Promise.all(pokemonPromises);
    
    return pokemonList;
    
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(`API Error: ${error.response?.status} - ${error.message}`);
    }
    throw error;
  }
};

/**
 * React Query hook for fetching Pokemon list
 * @returns UseQueryResult with Pokemon data, loading state, and error handling
 */
export const usePokemonList = () => {
  return useQuery({
    queryKey: ['pokemon', 'list'],
    queryFn: fetchPokemonList,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (garbage collection time)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

/**
 * Fetches a single Pokemon by ID or name using Axios
 * @param identifier - Pokemon ID (number) or name (string)
 * @returns Promise<Pokemon> - Single Pokemon object
 */
export const fetchSinglePokemon = async (identifier: string | number): Promise<Pokemon> => {
  try {
    const response = await pokemonApi.get<PokemonDetails>(`/pokemon/${identifier}`);
    const data = response.data;
    
    return {
      id: data.id,
      name: capitalizeFirstLetter(data.name),
      image: data.sprites.front_default
    };
    
  } catch (error) {
    console.error(`Error fetching Pokemon ${identifier}:`, error);
    if (axios.isAxiosError(error)) {
      throw new Error(`API Error: ${error.response?.status} - ${error.message}`);
    }
    throw error;
  }
};

/**
 * React Query hook for fetching a single Pokemon
 * @param identifier - Pokemon ID or name
 * @returns UseQueryResult with single Pokemon data
 */
export const useSinglePokemon = (identifier: string | number) => {
  return useQuery({
    queryKey: ['pokemon', 'single', identifier],
    queryFn: () => fetchSinglePokemon(identifier),
    enabled: !!identifier, // only run query if identifier is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });
};

/**
 * Utility function to capitalize the first letter of a string
 */
const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};


