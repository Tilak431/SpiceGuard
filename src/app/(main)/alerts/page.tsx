import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { alertsData } from "@/lib/data"
import { Bell, Info, AlertTriangle } from "lucide-react"

export default function AlertsPage() {
    const getAlertIcon = (type: string) => {
        switch (type) {
            case 'critical':
                return <AlertTriangle className="h-4 w-4 text-destructive" />;
            case 'warning':
                return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
            case 'info':
                return <Info className="h-4 w-4 text-blue-500" />;
            default:
                return <Bell className="h-4 w-4" />;
        }
    };

    const getAlertVariant = (type: string) => {
        if (type === 'critical') return 'destructive';
        return 'default';
    }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
          <Bell className="size-8 text-primary" />
          Real-time Alerts
        </h1>
        <p className="text-muted-foreground mt-2">
          Stay updated with the latest news, warnings, and information regarding chili powder adulteration.
        </p>
      </div>

      <div className="space-y-4">
        {alertsData.map((alert) => (
          <Alert key={alert.id} variant={getAlertVariant(alert.type)}>
            {getAlertIcon(alert.type)}
            <AlertTitle className="flex justify-between items-center">
                <span>{alert.title}</span>
                <span className="text-xs text-muted-foreground font-normal">{alert.timestamp}</span>
            </AlertTitle>
            <AlertDescription>
              {alert.description}
            </AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  )
}
