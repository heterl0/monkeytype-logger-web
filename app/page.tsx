import { UploadForm } from "@/components/upload-form";
import { ModeToggle } from "@/components/mode-toggle";
import { Keyboard } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  metadataBase: new URL("https://monkeytype-analysis.heterl0.live/"),
  title: "MonkeyType Analysis",
  description:
    "Analyze your MonkeyType typing data with detailed metrics and visualizations.",
  keywords: "MonkeyType, Typing Analysis, Typing Metrics",
  robots: "follow, index",
  openGraph: {
    title: "MonkeyType Analysis",
    description:
      "Analyze your MonkeyType typing data with detailed metrics and visualizations.",
    url: "https://monkeytype-analysis.heterl0.live/",
    siteName: "MonkeyType Analysis",
    type: "website",
    images: [
      {
        url: "https://monkeytype-analysis.heterl0.live/og-image.png",
        width: 1200,
        height: 630,
        alt: "MonkeyType Analysis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MonkeyType Analysis",
    description:
      "Analyze your MonkeyType typing data with detailed metrics and visualizations.",
    images: ["https://monkeytype-analysis.heterl0.live/og-image.png"],
  },
  icons: [
    { rel: "icon", url: "https://monkeytype-analysis.heterl0.live/icon.png" },
    {
      rel: "apple-touch-icon",
      url: "https://monkeytype-analysis.heterl0.live/apple-icon.png",
    },
  ],
  alternates: {
    canonical: "https://monkeytype-analysis.heterl0.live/",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex-col flex ">
      <header className="border-b px-5">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Keyboard className="h-6 w-6" />
            <h1 className="text-xl font-bold">MonkeyType Analysis</h1>
          </div>
          <ModeToggle />
        </div>
      </header>

      <main className="container mx-auto py-10 flex-1">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Analyze Your Typing Data
          </h2>
          <p className="mt-4 text-muted-foreground">
            Upload your MonkeyType JSON data to get detailed insights about your
            typing performance, error patterns, and personalized improvement
            suggestions.
          </p>

          <div className="mt-10">
            <UploadForm />
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
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
