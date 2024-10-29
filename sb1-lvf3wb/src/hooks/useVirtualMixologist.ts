import { useState } from 'react';
import { getDrinkRecommendation, DrinkRecommendation } from '../services/gemini';

interface VirtualMixologistState {
  isLoading: boolean;
  error: string | null;
  recommendation: DrinkRecommendation | null;
}

export function useVirtualMixologist() {
  const [state, setState] = useState<VirtualMixologistState>({
    isLoading: false,
    error: null,
    recommendation: null,
  });

  const getRecommendation = async (mood: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const recommendation = await getDrinkRecommendation(mood);
      setState(prev => ({ ...prev, recommendation, isLoading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to get recommendation. Please try again.',
        isLoading: false,
      }));
    }
  };

  return {
    ...state,
    getRecommendation,
  };
}