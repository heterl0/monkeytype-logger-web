"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MonkeyTypeData } from "@/lib/data-processing";

interface OverviewMetricsProps {
  data: MonkeyTypeData;
}

export function OverviewMetrics({ data }: OverviewMetricsProps) {
  const { summary } = data;
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Words</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.totalWords}</div>
          <p className="text-xs text-muted-foreground">
            Across {summary.sessionCount} typing sessions
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.errorRate.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            {summary.errorWords} error words
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Correction Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.correctionRate.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            {summary.correctedWords} corrected words
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Most Common Error</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.mostCommonErrorWord}</div>
          <p className="text-xs text-muted-foreground">
            Avg. error word length: {summary.avgErrorWordLength.toFixed(1)} chars
          </p>
        </CardContent>
      </Card>
    </div>
  );
}