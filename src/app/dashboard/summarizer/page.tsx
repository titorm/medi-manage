"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { summarizePatientHistory } from "@/ai/flows/summarize-patient-history";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Bot, Clipboard, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const summarizerFormSchema = z.object({
  patientHistory: z.string().min(50, {
    message: "Patient history must be at least 50 characters to summarize.",
  }),
});

type SummarizerFormValues = z.infer<typeof summarizerFormSchema>;

export default function SummarizerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const { toast } = useToast();

  const form = useForm<SummarizerFormValues>({
    resolver: zodResolver(summarizerFormSchema),
    defaultValues: {
      patientHistory: "",
    },
  });

  async function onSubmit(values: SummarizerFormValues) {
    setIsLoading(true);
    setSummary("");
    try {
      const result = await summarizePatientHistory({ patientHistory: values.patientHistory });
      setSummary(result.summary);
    } catch (error) {
      console.error("Error summarizing history:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate summary. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(summary);
    toast({
      title: "Copied!",
      description: "Summary copied to clipboard.",
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Patient History Summarizer</CardTitle>
          <CardDescription>
            Paste the patient's full history to generate a concise summary.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <FormField
                control={form.control}
                name="patientHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Patient History</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste the complete medical history here..."
                        className="resize-y min-h-[300px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Summarizing...
                  </>
                ) : (
                  <>
                    <Bot className="mr-2 h-4 w-4" />
                    Generate Summary
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Card>
        <CardHeader className="flex flex-row justify-between items-start">
          <div>
            <CardTitle className="font-headline">Generated Summary</CardTitle>
            <CardDescription>A concise overview of the patient's history.</CardDescription>
          </div>
          {summary && (
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Clipboard className="h-4 w-4 mr-2" />
              Copy
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? (
             <div className="space-y-2 p-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : (
            <div className="prose prose-sm max-w-none text-foreground bg-secondary/50 p-4 rounded-md min-h-[300px]">
              {summary || "The generated summary will appear here."}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
