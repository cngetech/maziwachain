'use server';
/**
 * @fileOverview Generates sales insights for a milk shop owner using AI.
 *
 * - generateSalesInsights - A function that generates sales insights.
 * - SalesInsightsInput - The input type for the generateSalesInsights function.
 * - SalesInsightsOutput - The return type for the generateSalesInsights function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SalesInsightsInputSchema = z.object({
  salesData: z
    .string()
    .describe(
      'The sales data in a structured format (e.g., CSV or JSON) including product, quantity, price, and timestamp.'
    ),
});
export type SalesInsightsInput = z.infer<typeof SalesInsightsInputSchema>;

const SalesInsightsOutputSchema = z.object({
  insights: z
    .string()
    .describe(
      'A detailed analysis of the sales data, highlighting key trends, popular products, peak sales times, and recommendations for inventory and marketing optimization.'
    ),
});
export type SalesInsightsOutput = z.infer<typeof SalesInsightsOutputSchema>;

export async function generateSalesInsights(input: SalesInsightsInput): Promise<SalesInsightsOutput> {
  return generateSalesInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'salesInsightsPrompt',
  input: {
    schema: z.object({
      salesData: z
        .string()
        .describe(
          'The sales data in a structured format (e.g., CSV or JSON) including product, quantity, price, and timestamp.'
        ),
    }),
  },
  output: {
    schema: z.object({
      insights: z
        .string()
        .describe(
          'A detailed analysis of the sales data, highlighting key trends, popular products, peak sales times, and recommendations for inventory and marketing optimization.'
        ),
    }),
  },
  prompt: `You are an AI assistant specialized in analyzing sales data for milk shops.
  Your goal is to provide actionable insights to the shop owner to optimize their business.

  Analyze the following sales data:
  {{salesData}}

  Identify key trends, popular products, peak sales times, and provide recommendations for inventory and marketing optimization.
  Format your response in a clear and concise manner.
  `,
});

const generateSalesInsightsFlow = ai.defineFlow<
  typeof SalesInsightsInputSchema,
  typeof SalesInsightsOutputSchema
>(
  {
    name: 'generateSalesInsightsFlow',
    inputSchema: SalesInsightsInputSchema,
    outputSchema: SalesInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
