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
} from "recharts";

interface WordAnalysisProps {
  data: MonkeyTypeData;
}

export function WordAnalysis({ data }: WordAnalysisProps) {
  const { errorLetterFrequency, correctedLetterFrequency, summary } = data;

  // Prepare letter frequency data
  const topErrorLetters = errorLetterFrequency.slice(0, 10).map((item) => ({
    name: item.letter,
    value: item.count,
  }));

  const topCorrectedLetters = correctedLetterFrequency
    .slice(0, 10)
    .map((item) => ({
      name: item.letter,
      value: item.count,
    }));

  // Prepare word length comparison data
  const wordLengthData = [
    { name: "Error Words", value: summary.avgErrorWordLength },
    { name: "Corrected Words", value: summary.avgCorrectedWordLength },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Top Letters in Error Words</CardTitle>
          <CardDescription>
            Most frequent letters in words you make errors on
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topErrorLetters}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [value, "Frequency"]}
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
          <CardTitle>Top Letters in Corrected Words</CardTitle>
          <CardDescription>
            Most frequent letters in words you correct
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topCorrectedLetters}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
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

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Average Word Length Comparison</CardTitle>
          <CardDescription>
            Comparison of average word length between error and corrected words
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={wordLengthData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  label={{
                    value: "Average Length (characters)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  formatter={(value) => [
                    `${Number(value).toFixed(1)} characters`,
                    "Average Length",
                  ]}
                  labelClassName="dark:text-black"
                />
                <Bar dataKey="value" fill="hsl(var(--chart-3))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
