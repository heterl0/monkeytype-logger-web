"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Keyboard } from "lucide-react";
import { OverviewMetrics } from "@/components/dashboard/overview-metrics";
import { ErrorAnalysis } from "@/components/dashboard/error-analysis";
import { SessionAnalysis } from "@/components/dashboard/session-analysis";
import { WordAnalysis } from "@/components/dashboard/word-analysis";
import { Recommendations } from "@/components/dashboard/recommendations";
import { ModeToggle } from "@/components/mode-toggle";
import { useToast } from "@/hooks/use-toast";
import { MonkeyTypeData, processMonkeyTypeData } from "@/lib/data-processing";
import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  const [data, setData] = useState<MonkeyTypeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const storedData = localStorage.getItem("monkeyTypeData");

    if (!storedData) {
      toast({
        title: "No data found",
        description: "Please upload your MonkeyType data first",
        variant: "destructive",
      });
      router.push("/");
      return;
    }

    try {
      const jsonData = JSON.parse(storedData);
      const processedData = processMonkeyTypeData(jsonData);
      setData(processedData);
    } catch (error) {
      toast({
        title: "Error processing data",
        description: "There was an error processing your data",
        variant: "destructive",
      });
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  }, [router, toast]);

  const handleExportReport = () => {
    if (!data) return;

    const reportData = {
      summary: data.summary,
      sessionSummary: data.sessionSummary,
      errorWords: data.errorWords,
      correctedWords: data.correctedWords,
      recommendations: data.recommendations,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "monkeytype-analysis-report.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Report exported",
      description: "Your analysis report has been downloaded",
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-lg">Loading your typing data...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-5">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Keyboard className="h-6 w-6" />
            <h1 className="text-xl font-bold">MonkeyType Analysis</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Upload
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportReport}>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto py-6 px-5">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Typing Performance Dashboard</CardTitle>
            <CardDescription>
              Analysis of {data.summary.totalWords} words across{" "}
              {data.summary.sessionCount} typing sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OverviewMetrics data={data} />
          </CardContent>
        </Card>

        <Tabs defaultValue="error-analysis" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="error-analysis">Error Analysis</TabsTrigger>
            <TabsTrigger value="session-analysis">Session Analysis</TabsTrigger>
            <TabsTrigger value="word-analysis">Word Analysis</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="error-analysis" className="space-y-4">
            <ErrorAnalysis data={data} />
          </TabsContent>

          <TabsContent value="session-analysis" className="space-y-4">
            <SessionAnalysis data={data} />
          </TabsContent>

          <TabsContent value="word-analysis" className="space-y-4">
            <WordAnalysis data={data} />
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <Recommendations data={data} />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t  py-6 mt-10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MonkeyType Analysis. Released
            under the MIT License.
          </p>
          <span className="text-muted-foreground flex items-end gap-4">
            <span className="text-sm">See this helpful! </span>
            <Link href="https://www.buymeacoffee.com/heterl0" target="_blank">
              <Image
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
                width={217}
                height={60}
                className="bg-cover h-10 w-auto"
              />
            </Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
