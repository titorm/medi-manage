'use server';

/**
 * @fileOverview Summarizes patient medical history to assist doctors.
 *
 * - summarizePatientHistory - A function that summarizes a patient's medical history.
 * - SummarizePatientHistoryInput - The input type for the summarizePatientHistory function.
 * - SummarizePatientHistoryOutput - The return type for the summarizePatientHistory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePatientHistoryInputSchema = z.object({
  patientHistory: z
    .string()
    .describe('The complete medical history of the patient.'),
});
export type SummarizePatientHistoryInput = z.infer<typeof SummarizePatientHistoryInputSchema>;

const SummarizePatientHistoryOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the patient medical history.'),
});
export type SummarizePatientHistoryOutput = z.infer<typeof SummarizePatientHistoryOutputSchema>;

export async function summarizePatientHistory(
  input: SummarizePatientHistoryInput
): Promise<SummarizePatientHistoryOutput> {
  return summarizePatientHistoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizePatientHistoryPrompt',
  input: {schema: SummarizePatientHistoryInputSchema},
  output: {schema: SummarizePatientHistoryOutputSchema},
  prompt: `You are an expert medical summarizer.

  Please summarize the following patient history, highlighting key medical details and relevant background information for a doctor to quickly understand the patient's medical background before a consultation.

  Patient History: {{{patientHistory}}}`,
});

const summarizePatientHistoryFlow = ai.defineFlow(
  {
    name: 'summarizePatientHistoryFlow',
    inputSchema: SummarizePatientHistoryInputSchema,
    outputSchema: SummarizePatientHistoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
