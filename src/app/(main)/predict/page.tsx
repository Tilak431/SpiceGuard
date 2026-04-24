'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getRiskPrediction } from '@/app/actions';
import type { PredictAdulterationRiskOutput } from '@/ai/flows/predict-adulteration-risk';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, BrainCircuit, Shield, ShieldAlert, ShieldCheck, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';


const formSchema = z.object({
  sourcing: z.string().min(10, 'Please provide more detail on sourcing.'),
  weatherPatterns: z.string().min(10, 'Please describe recent weather patterns.'),
  economicFactors: z.string().min(10, 'Please describe relevant economic factors.'),
  batchDetails: z.string().min(10, 'Please provide detailed batch information.'),
});

type FormData = z.infer<typeof formSchema>;

export default function PredictPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictAdulterationRiskOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sourcing: '',
      weatherPatterns: '',
      economicFactors: '',
      batchDetails: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setResult(null);
    const response = await getRiskPrediction(data);
    setIsLoading(false);

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      toast({
        variant: "destructive",
        title: "Prediction Failed",
        description: response.error || "An unknown error occurred.",
      });
    }
  };

  const getRiskColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'high': return 'text-red-500';
      default: return 'text-foreground';
    }
  };

  const getRiskIcon = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low': return <ShieldCheck className="h-6 w-6" />;
      case 'medium': return <ShieldAlert className="h-6 w-6" />;
      case 'high': return <Shield className="h-6 w-6" />;
      default: return <Shield className="h-6 w-6" />;
    }
  };


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
          <BrainCircuit className="size-8 text-primary" /> Predictive Adulteration Risk
        </h1>
        <p className="text-muted-foreground mt-2">
          Use our AI tool to analyze various factors and predict the risk of adulteration in a batch of red chili powder.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Input Batch Data</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="sourcing"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sourcing</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Guntur, Andhra Pradesh - single-farm cooperative" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weatherPatterns"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recent Weather Patterns</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Unseasonal heavy rains during harvest season" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="economicFactors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Economic Factors</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Market price spike due to low yield" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="batchDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Batch Details</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Batch #GNT-78B, color slightly duller than average, passed initial visual inspection." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Predict Risk'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline">AI Risk Analysis</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex items-center justify-center">
            {isLoading ? (
              <div className="text-center text-muted-foreground">
                <BrainCircuit className="mx-auto h-16 w-16 animate-pulse text-primary" />
                <p className="mt-4">AI is processing data...</p>
              </div>
            ) : result ? (
              <div className="w-full space-y-4">
                <div className={`p-4 rounded-lg bg-card border ${getRiskColor(result.riskLevel)}`}>
                  <div className="flex items-center gap-3">
                    {getRiskIcon(result.riskLevel)}
                    <span className={`text-2xl font-bold font-headline uppercase`}>{result.riskLevel} Risk</span>
                  </div>
                </div>
                <div>
                    <div className='flex justify-between items-center mb-1'>
                        <span className="text-sm font-medium">Confidence Score</span>
                        <span className="text-sm font-bold font-headline text-accent">{(result.confidenceScore * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={result.confidenceScore * 100} className="h-2 [&>*]:bg-accent" />
                </div>
                <div className="space-y-3">
                    <div>
                        <h4 className="font-semibold text-primary">Risk Factors:</h4>
                        <p className="text-muted-foreground text-sm">{result.riskFactors}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-accent">Recommendations:</h4>
                        <p className="text-muted-foreground text-sm">{result.recommendations}</p>
                    </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <Zap className="mx-auto h-16 w-16" />
                <p className="mt-4">Prediction results will appear here.</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              AI predictions are for informational purposes only and should not be considered a substitute for laboratory testing.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
