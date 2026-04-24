import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analysisData } from '@/lib/data';
import { Lightbulb, Check, FlaskConical } from 'lucide-react';

export default function AnalysisPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">
          Drawback Analysis & Improvements
        </h1>
        <p className="text-muted-foreground mt-2">
          A critical look at the limitations of current methods and recommendations for a more robust testing framework.
        </p>
      </div>

      <Card className="bg-card/80 border-primary/50">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <FlaskConical className="text-primary" />
            Summary of Current Methodologies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground">
            {analysisData.summary}
          </p>
        </CardContent>
      </Card>
      
      <div>
        <h2 className="text-2xl font-bold font-headline mb-4 flex items-center gap-2">
          <Lightbulb className="text-accent" />
          Recommendations for Improvement
        </h2>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          {analysisData.recommendations.map((rec, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline text-lg flex items-center gap-2">
                  <Check className="text-accent" />
                  {rec.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">
                  {rec.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
