import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { infoHubData } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function InfoHubPage() {
    const getImage = (title: string) => {
        if (title.includes('Adulterants')) return PlaceHolderImages.find(img => img.id === 'info-hub-adulterants');
        if (title.includes('Health')) return PlaceHolderImages.find(img => img.id === 'info-hub-health');
        if (title.includes('Standards')) return PlaceHolderImages.find(img => img.id === 'info-hub-standards');
        return PlaceHolderImages[0];
    }
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">
          Adulteration Information Hub
        </h1>
        <p className="text-muted-foreground mt-2">
          Your central resource for understanding red chili powder adulteration.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        {infoHubData.map((item, index) => {
          const imageData = getImage(item.title);
          return (
            <Card key={index} className="overflow-hidden">
                {imageData && (
                    <div className="relative h-48 w-full">
                        <Image
                            src={imageData.imageUrl}
                            alt={imageData.description}
                            fill
                            style={{ objectFit: 'cover' }}
                            data-ai-hint={imageData.imageHint}
                        />
                    </div>
                )}
              <CardHeader>
                <CardTitle className="flex items-center gap-3 font-headline text-xl text-primary">
                  <item.icon className="h-6 w-6" />
                  <span>{item.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.content}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
