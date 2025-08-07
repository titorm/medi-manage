"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generatePrescription } from "@/ai/flows/generate-prescription";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Bot, Clipboard, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";

const prescriptionFormSchema = z.object({
  patientName: z.string().min(2, {
    message: "Patient name must be at least 2 characters.",
  }),
  doctorName: z.string().min(2, {
    message: "Doctor name must be at least 2 characters.",
  }),
  diagnosis: z.string().min(10, {
    message: "Diagnosis must be at least 10 characters.",
  }),
  medicalHistory: z.string().min(10, {
    message: "Medical history must be at least 10 characters.",
  }),
});

type PrescriptionFormValues = z.infer<typeof prescriptionFormSchema>;

export default function PrescriptionsPage() {
  const t = useTranslations("PrescriptionsPage");
  const [isLoading, setIsLoading] = useState(false);
  const [prescription, setPrescription] = useState("");
  const { toast } = useToast();

  const form = useForm<PrescriptionFormValues>({
    resolver: zodResolver(prescriptionFormSchema),
    defaultValues: {
      patientName: "",
      doctorName: "",
      diagnosis: "",
      medicalHistory: "",
    },
  });

  async function onSubmit(values: PrescriptionFormValues) {
    setIsLoading(true);
    setPrescription("");
    try {
      const result = await generatePrescription(values);
      setPrescription(result.prescriptionText);
    } catch (error) {
      console.error("Error generating prescription:", error);
      toast({
        variant: "destructive",
        title: t('errorTitle'),
        description: t('errorDescription'),
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(prescription);
    toast({
      title: t('copied'),
      description: t('copiedDescription'),
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">{t('title')}</CardTitle>
          <CardDescription>
            {t('description')}
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="patientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('patientName')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('placeholderPatient')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="doctorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('doctorName')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('placeholderDoctor')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="diagnosis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('diagnosis')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('placeholderDiagnosis')}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="medicalHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('medicalHistory')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('placeholderHistory')}
                        className="resize-none"
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
                    {t('generatingButton')}
                  </>
                ) : (
                  <>
                    <Bot className="mr-2 h-4 w-4" />
                    {t('generateButton')}
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
            <CardTitle className="font-headline">{t('generatedTitle')}</CardTitle>
            <CardDescription>{t('generatedDescription')}</CardDescription>
          </div>
          {prescription && (
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Clipboard className="h-4 w-4 mr-2" />
              {t('copy')}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : (
            <pre className="whitespace-pre-wrap font-body text-sm bg-secondary/50 p-4 rounded-md min-h-[200px]">
              {prescription || t('initialText')}
            </pre>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
