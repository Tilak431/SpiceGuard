'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  RadialBarChart,
  RadialBar,
} from 'recharts';
import { dashboardData } from '@/lib/data';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function DashboardPage() {
  const { stats, adulterationByRegion, incidentsOverTime, riskLevelDistribution } =
    dashboardData;
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-headline">
                {stat.value}
              </div>
              {stat.change && (
                <p className="text-xs text-muted-foreground flex items-center">
                  {stat.change.startsWith('+') ? (
                    <ArrowUpRight className="h-4 w-4 text-accent" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-destructive" />
                  )}
                  {stat.change} from last month
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline">Incidents Over Time</CardTitle>
            <CardDescription>
              Reported adulteration incidents in the last 6 months.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-64 w-full">
              <LineChart data={incidentsOverTime}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  allowDecimals={false}
                />
                <ChartTooltip
                  cursor={{ stroke: 'hsl(var(--accent))', strokeWidth: 2, strokeDasharray: '3 3' }}
                  content={<ChartTooltipContent />}
                />
                <Line
                  type="monotone"
                  dataKey="incidents"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{
                    fill: 'hsl(var(--primary))',
                    r: 5,
                  }}
                  activeDot={{
                    r: 7,
                  }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Risk Levels</CardTitle>
            <CardDescription>Distribution of batch risk</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ChartContainer
              config={{}}
              className="mx-auto aspect-square h-64"
            >
              <RadialBarChart
                data={riskLevelDistribution}
                innerRadius="30%"
                outerRadius="100%"
                startAngle={90}
                endAngle={-270}
              >
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent hideLabel nameKey="level" />
                  }
                />
                 <RadialBar dataKey="value" background={{ fill: 'hsla(var(--muted), 0.5)' }}/>
                 <ChartLegend
                  content={<ChartLegendContent nameKey="level" />}
                  className="-translate-y-4"
                />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Adulteration Risk by Region</CardTitle>
          <CardDescription>
            Predicted risk levels based on regional data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={adulterationByRegion} layout="vertical">
                <XAxis type="number" hide />
                <YAxis
                  dataKey="region"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={5}
                  width={100}
                />
                <ChartTooltip
                  cursor={{ fill: 'hsla(var(--muted), 0.5)' }}
                  content={<ChartTooltipContent />}
                />
                <Bar
                  dataKey="risk"
                  radius={5}
                  fill="hsl(var(--primary))"
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
