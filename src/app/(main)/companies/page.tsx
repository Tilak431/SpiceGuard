import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { companies } from '@/lib/data';
import { CheckCircle, XCircle } from 'lucide-react';

export default function CompaniesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">
          Company Detection Methods
        </h1>
        <p className="text-muted-foreground mt-2">
          An overview of adulteration detection methods currently employed by
          major red chili powder companies in India.
        </p>
      </div>

      <div className="space-y-6">
        {companies.map((company) => (
          <Card key={company.id}>
            <CardHeader>
              <CardTitle className="font-headline text-xl text-primary">
                {company.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {company.methods.map((method, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg">
                      <div className="flex items-center gap-3">
                        <method.icon className="h-6 w-6 text-accent" />
                        <span>{method.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-2 text-base">
                      <p className="text-muted-foreground">
                        {method.description}
                      </p>
                      <div>
                        <h4 className="font-semibold mb-2">Key Drawbacks:</h4>
                        <ul className="space-y-2">
                          {method.drawbacks.map((drawback, dIndex) => (
                            <li key={dIndex} className="flex items-start gap-2">
                              <XCircle className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                              <span>{drawback}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
