'use server';
/**
 * @fileOverview Predicts the risk of adulteration for a given batch of red chili powder.
 *
 * - predictAdulterationRisk - A function that predicts the risk of adulteration.
 * - PredictAdulterationRiskInput - The input type for the predictAdulterationRisk function.
 * - PredictAdulterationRiskOutput - The return type for the predictAdulterationRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictAdulterationRiskInputSchema = z.object({
  sourcing: z.string().describe('The source of the red chili powder (e.g., region, supplier).'),
  weatherPatterns: z.string().describe('Recent weather patterns in the sourcing region.'),
  economicFactors: z.string().describe('Relevant economic factors (e.g., market prices, demand).'),
  batchDetails: z.string().describe('Detailed information about the batch of red chili powder.'),
});
export type PredictAdulterationRiskInput = z.infer<typeof PredictAdulterationRiskInputSchema>;

const PredictAdulterationRiskOutputSchema = z.object({
  riskLevel: z.enum(['low', 'medium', 'high']).describe('The predicted risk level of adulteration.'),
  riskFactors: z.string().describe('The key factors contributing to the predicted risk.'),
  confidenceScore: z.number().describe('A score between 0 and 1 indicating the confidence in the prediction.'),
  recommendations: z.string().describe('Recommendations for mitigating the risk of adulteration.'),
});
export type PredictAdulterationRiskOutput = z.infer<typeof PredictAdulterationRiskOutputSchema>;

export async function predictAdulterationRisk(input: PredictAdulterationRiskInput): Promise<PredictAdulterationRiskOutput> {
  return predictAdulterationRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictAdulterationRiskPrompt',
  input: {schema: PredictAdulterationRiskInputSchema},
  output: {schema: PredictAdulterationRiskOutputSchema},
  prompt: `You are an expert in analyzing the risk of adulteration in red chili powder.

  Based on the provided information, assess the risk level (low, medium, or high) of adulteration for the batch and provide a confidence score (0-1).
  Explain the key factors contributing to the risk and provide recommendations for mitigating the risk.

  Sourcing: {{{sourcing}}}
  Weather Patterns: {{{weatherPatterns}}}
  Economic Factors: {{{economicFactors}}}
  Batch Details: {{{batchDetails}}}

  Format your output as a valid JSON object matching the schema.
  `,
});

const predictAdulterationRiskFlow = ai.defineFlow(
  {
    name: 'predictAdulterationRiskFlow',
    inputSchema: PredictAdulterationRiskInputSchema,
    outputSchema: PredictAdulterationRiskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
