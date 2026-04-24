import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { alternativeMethods } from '@/lib/data';
import { CheckCircle, BookOpen } from 'lucide-react';

export default function AlternativesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">
          Advanced Alternative Methods
        </h1>
        <p className="text-muted-foreground mt-2">
          Explore modern, scientifically advanced methods for detecting adulteration with higher accuracy and efficiency.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {alternativeMethods.map((method) => (
          <Card key={method.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-headline text-xl">
                <method.icon className="h-8 w-8 text-accent" />
                <span>{method.name}</span>
              </CardTitle>
              <CardDescription className="pt-2">{method.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <h4 className="font-semibold mb-2">Advantages:</h4>
              <ul className="space-y-2">
                {method.advantages.map((advantage, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>{advantage}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className='w-full'>
                <a href={method.paperUrl} target="_blank" rel="noopener noreferrer">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Read Technical Paper
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
