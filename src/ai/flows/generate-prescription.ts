'use server';

/**
 * @fileOverview Generates a prescription based on patient diagnosis and medical history.
 *
 * - generatePrescription - A function that generates the prescription.
 * - GeneratePrescriptionInput - The input type for the generatePrescription function.
 * - GeneratePrescriptionOutput - The return type for the generatePrescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePrescriptionInputSchema = z.object({
  diagnosis: z.string().describe('The diagnosis of the patient.'),
  medicalHistory: z.string().describe('The medical history of the patient.'),
  patientName: z.string().describe('The name of the patient.'),
  doctorName: z.string().describe('The name of the doctor.'),
});
export type GeneratePrescriptionInput = z.infer<typeof GeneratePrescriptionInputSchema>;

const GeneratePrescriptionOutputSchema = z.object({
  prescriptionText: z.string().describe('The generated prescription text.'),
});
export type GeneratePrescriptionOutput = z.infer<typeof GeneratePrescriptionOutputSchema>;

export async function generatePrescription(input: GeneratePrescriptionInput): Promise<GeneratePrescriptionOutput> {
  return generatePrescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePrescriptionPrompt',
  input: {schema: GeneratePrescriptionInputSchema},
  output: {schema: GeneratePrescriptionOutputSchema},
  prompt: `You are a medical assistant helping doctors generate prescriptions.

  Based on the provided diagnosis and medical history, generate a prescription that complies with CFM standards.

  Patient Name: {{{patientName}}}
  Doctor Name: {{{doctorName}}}
  Diagnosis: {{{diagnosis}}}
  Medical History: {{{medicalHistory}}}

  Prescription:
  `,
});

const generatePrescriptionFlow = ai.defineFlow(
  {
    name: 'generatePrescriptionFlow',
    inputSchema: GeneratePrescriptionInputSchema,
    outputSchema: GeneratePrescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
