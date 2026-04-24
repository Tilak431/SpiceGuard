'use server';

/**
 * @fileOverview Summarizes alternative adulteration methods for red chili powder.
 *
 * - summarizeAdulterationMethods - A function that summarizes alternative adulteration methods.
 * - SummarizeAdulterationMethodsInput - The input type for the summarizeAdulterationMethods function.
 * - SummarizeAdulterationMethodsOutput - The return type for the summarizeAdulterationMethods function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeAdulterationMethodsInputSchema = z.object({
  methodsDescription: z
    .string()
    .describe(
      'Detailed descriptions of alternative methods for detecting adulteration in red chili powder.'
    ),
});
export type SummarizeAdulterationMethodsInput = z.infer<typeof SummarizeAdulterationMethodsInputSchema>;

const SummarizeAdulterationMethodsOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise summary of the alternative adulteration detection methods and their advantages.'
    ),
});
export type SummarizeAdulterationMethodsOutput = z.infer<typeof SummarizeAdulterationMethodsOutputSchema>;

export async function summarizeAdulterationMethods(
  input: SummarizeAdulterationMethodsInput
): Promise<SummarizeAdulterationMethodsOutput> {
  return summarizeAdulterationMethodsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeAdulterationMethodsPrompt',
  input: {schema: SummarizeAdulterationMethodsInputSchema},
  output: {schema: SummarizeAdulterationMethodsOutputSchema},
  prompt: `Summarize the following alternative methods for detecting adulteration in red chili powder, highlighting their key techniques and advantages:\n\n{{{methodsDescription}}}`,
});

const summarizeAdulterationMethodsFlow = ai.defineFlow(
  {
    name: 'summarizeAdulterationMethodsFlow',
    inputSchema: SummarizeAdulterationMethodsInputSchema,
    outputSchema: SummarizeAdulterationMethodsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
