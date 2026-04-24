import { config } from 'dotenv';
config();

import '@/ai/flows/predict-adulteration-risk.ts';
import '@/ai/flows/summarize-adulteration-methods.ts';