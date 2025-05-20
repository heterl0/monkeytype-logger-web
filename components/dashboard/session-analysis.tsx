"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MonkeyTypeData } from "@/lib/data-processing";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { format } from "date-fns";

interface SessionAnalysisProps {
  data: MonkeyTypeData;
}

export function SessionAnalysis({ data }: SessionAnalysisProps) {
  const { sessionSummary } = data;

  // Prepare session error rate data
  const sessionErrorRateData = sessionSummary.map((session, index) => ({
    name: `Session ${index + 1}`,
    value: session.errorRate,
    date: format(new Date(session.timestamp), "MMM d, yyyy"),
  }));

  // Prepare session words data
  const sessionWordsData = sessionSummary.map((session, index) => ({
    name: `Session ${index + 1}`,
    total: session.totalWords,
    errors: session.errors,
    corrected: session.corrected,
    date: format(new Date(session.timestamp), "MMM d, yyyy"),
  }));

  // Prepare error rate trend data
  const errorRateTrendData = sessionSummary.map((session, index) => ({
    name: `Session ${index + 1}`,
    errorRate: session.errorRate,
    date: format(new Date(session.timestamp), "MMM d, yyyy"),
  }));

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Error Rate by Session</CardTitle>
          <CardDescription>
            Comparison of error rates across different typing sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sessionErrorRateData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  label={{
                    value: "Error Rate (%)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  formatter={(value) => [
                    `${Number(value).toFixed(1)}%`,
                    "Error Rate",
                  ]}
                  labelFormatter={(value) =>
                    `${value} (${
                      sessionErrorRateData[Number(value.split(" ")[1]) - 1]
                        ?.date
                    })`
                  }
                  labelClassName="dark:text-black"
                />
                <Bar dataKey="value" fill="hsl(var(--chart-1))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Words per Session</CardTitle>
          <CardDescription>
            Breakdown of total, error, and corrected words per session
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sessionWordsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [value, "Words"]}
                  labelFormatter={(value) =>
                    `${value} (${
                      sessionWordsData[Number(value.split(" ")[1]) - 1]?.date
                    })`
                  }
                  labelClassName="dark:text-black"
                />
                <Legend />
                <Bar
                  dataKey="total"
                  fill="hsl(var(--chart-3))"
                  name="Total Words"
                />
                <Bar
                  dataKey="errors"
                  fill="hsl(var(--chart-1))"
                  name="Error Words"
                />
                <Bar
                  dataKey="corrected"
                  fill="hsl(var(--chart-2))"
                  name="Corrected Words"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Error Rate Trend</CardTitle>
          <CardDescription>
            Trend of error rates across sessions over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={errorRateTrendData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  label={{
                    value: "Error Rate (%)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  formatter={(value) => [
                    `${Number(value).toFixed(1)}%`,
                    "Error Rate",
                  ]}
                  labelFormatter={(value) =>
                    `${value} (${
                      errorRateTrendData[Number(value.split(" ")[1]) - 1]?.date
                    })`
                  }
                  labelClassName="dark:text-black"
                />
                <Line
                  type="monotone"
                  dataKey="errorRate"
                  stroke="hsl(var(--chart-4))"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
