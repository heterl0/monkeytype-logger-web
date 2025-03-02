"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a JSON file to upload",
        variant: "destructive",
      });
      return;
    }

    if (file.type !== "application/json" && !file.name.endsWith(".json")) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JSON file",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const fileReader = new FileReader();

      fileReader.onload = async (event) => {
        try {
          const jsonData = JSON.parse(event.target?.result as string);

          // Validate the JSON structure
          if (!Array.isArray(jsonData)) {
            throw new Error("Invalid data format: Expected an array");
          }

          // Store the data in localStorage for the dashboard to use
          localStorage.setItem("monkeyTypeData", JSON.stringify(jsonData));

          // Navigate to the dashboard
          router.push("/dashboard");
        } catch (error) {
          toast({
            title: "Invalid JSON data",
            description:
              error instanceof Error
                ? error.message
                : "The file contains invalid JSON data",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };

      fileReader.onerror = () => {
        toast({
          title: "Error reading file",
          description: "There was an error reading the file",
          variant: "destructive",
        });
        setIsLoading(false);
      };

      fileReader.readAsText(file);
    } catch (error) {
      toast({
        title: "Error processing file",
        description: "There was an error processing the file",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid w-full max-w-sm items-center gap-4 mx-auto">
        <label
          htmlFor="monkeytype-data"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Upload MonkeyType JSON Data
        </label>
        <Input
          id="monkeytype-data"
          type="file"
          accept=".json,application/json"
          onChange={handleFileChange}
          className="cursor-pointer"
        />
        <p className="text-sm text-muted-foreground">
          Upload the JSON file exported from your MonkeyType extension
        </p>
      </div>

      <Button
        type="submit"
        disabled={!file || isLoading}
        className="w-full max-w-sm"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Processing...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Analyze Data
          </span>
        )}
      </Button>
    </form>
  );
}
