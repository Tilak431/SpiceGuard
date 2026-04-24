'use server';

import {
  predictAdulterationRisk,
  type PredictAdulterationRiskInput,
} from '@/ai/flows/predict-adulteration-risk';
import { z } from 'zod';

const PredictAdulterationRiskInputSchema = z.object({
  sourcing: z.string().min(3, 'Sourcing information is required.'),
  weatherPatterns: z.string().min(3, 'Weather patterns are required.'),
  economicFactors: z.string().min(3, 'Economic factors are required.'),
  batchDetails: z.string().min(3, 'Batch details are required.'),
});

export async function getRiskPrediction(input: PredictAdulterationRiskInput) {
  try {
    const validatedInput = PredictAdulterationRiskInputSchema.parse(input);
    const result = await predictAdulterationRisk(validatedInput);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Invalid input.', details: error.errors };
    }
    console.error('Error in getRiskPrediction:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while getting the prediction.',
    };
  }
}
