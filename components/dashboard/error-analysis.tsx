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
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface ErrorAnalysisProps {
  data: MonkeyTypeData;
}

export function ErrorAnalysis({ data }: ErrorAnalysisProps) {
  const { metrics, errorWordFrequency, errorLetterFrequency } = data;

  // Prepare metrics data for chart
  const metricsData = [
    { name: "Overall", value: metrics.overallErrorRate },
    { name: "Short Words", value: metrics.shortWordsErrorRate },
    { name: "Medium Words", value: metrics.mediumWordsErrorRate },
    { name: "Long Words", value: metrics.longWordsErrorRate },
    { name: "Special Chars", value: metrics.wordsWithSpecialCharsErrorRate },
    { name: "With Numbers", value: metrics.wordsWithNumbersErrorRate },
    { name: "Uppercase", value: metrics.uppercaseWordsErrorRate },
    { name: "Capitalized", value: metrics.capitalizedWordsErrorRate },
  ];

  // Prepare error distribution data
  const errorDistributionData = [
    { name: "Error Words", value: data.summary.errorWords },
    { name: "Corrected Words", value: data.summary.correctedWords },
  ];

  // Prepare top error words data
  const topErrorWords = errorWordFrequency.slice(0, 10).map((item) => ({
    name: item.word,
    value: item.frequency,
  }));

  // Prepare top error letters data
  const topErrorLetters = errorLetterFrequency.slice(0, 10).map((item) => ({
    name: item.letter,
    value: item.count,
  }));

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Error Rates by Word Type</CardTitle>
          <CardDescription>
            Comparison of error rates across different word characteristics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={metricsData}
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
          <CardTitle>Error vs Corrected Distribution</CardTitle>
          <CardDescription>
            Proportion of error words to corrected words
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={errorDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(1)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {errorDistributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [value, "Count"]}
                  labelClassName="dark:text-black"
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Most Frequent Error Words</CardTitle>
          <CardDescription>
            Words you most commonly make errors on
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topErrorWords}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={60} />
                <Tooltip
                  formatter={(value) => [value, "Frequency"]}
                  labelClassName="dark:text-black"
                />
                <Bar dataKey="value" fill="hsl(var(--chart-2))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
