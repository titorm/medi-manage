import { config } from 'dotenv';
config();

import '@/ai/flows/generate-prescription.ts';
import '@/ai/flows/summarize-patient-history.ts';