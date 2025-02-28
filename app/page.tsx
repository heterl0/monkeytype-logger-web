import { UploadForm } from '@/components/upload-form';
import { ModeToggle } from '@/components/mode-toggle';
import { Keyboard } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Keyboard className="h-6 w-6" />
            <h1 className="text-xl font-bold">MonkeyType Analysis</h1>
          </div>
          <ModeToggle />
        </div>
      </header>
      
      <main className="container py-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">Analyze Your Typing Data</h2>
          <p className="mt-4 text-muted-foreground">
            Upload your MonkeyType JSON data to get detailed insights about your typing performance,
            error patterns, and personalized improvement suggestions.
          </p>
          
          <div className="mt-10">
            <UploadForm />
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MonkeyType Analysis. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}