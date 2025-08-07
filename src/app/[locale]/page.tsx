import {useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/routing';
import React from 'react';
import { ArrowRight, Bot, CalendarCheck, FilePlus, ShieldCheck, CreditCard, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/icons";
 
export default function Index({params: {locale}}: {params: {locale: string}}) {
  setRequestLocale(locale);
  const t = useTranslations('HomePage');
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold font-headline text-foreground">
            {t('appName')}
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="#features"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            {t('features')}
          </Link>
          <Link
            href="#pricing"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            {t('pricing')}
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            {t('contact')}
          </Link>
        </nav>
        <Button asChild>
          <Link href="/dashboard">
            {t('getStarted')} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-card">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline text-primary">
                    {t('title')}
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    {t('description')}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/dashboard">
                      {t('goToDashboard')}
                    </Link>
                  </Button>
                </div>
              </div>
              <img
                src="https://placehold.co/600x400.png"
                width="600"
                height="400"
                alt="Hero"
                data-ai-hint="medical dashboard illustration"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                  {t('keyFeatures')}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  {t('betterWorkflow')}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('featureDescription')}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <FeatureCard icon={<ClipboardList />} title={t('featureFormBuilderTitle')} description={t('featureFormBuilderDescription')} />
              <FeatureCard icon={<CalendarCheck />} title={t('featureSchedulingTitle')} description={t('featureSchedulingDescription')} />
              <FeatureCard icon={<Bot />} title={t('featureAIPrescriptionsTitle')} description={t('featureAIPrescriptionsDescription')} />
              <FeatureCard icon={<CreditCard />} title={t('featureBillingTitle')} description={t('featureBillingDescription')} />
              <FeatureCard icon={<FilePlus />} title={t('featureAISummarizerTitle')} description={t('featureAISummarizerDescription')} />
              <FeatureCard icon={<ShieldCheck />} title={t('featureComplianceTitle')} description={t('featureComplianceDescription')} />
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
                {t('pricingTitle')}
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t('pricingDescription')}
              </p>
            </div>
            <div className="flex justify-center">
              <Button asChild size="lg">
                <Link href="/dashboard/billing">
                  {t('viewPlans')}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">{t('footerRights')}</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
              {t('termsOfService')}
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
              {t('privacy')}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="grid gap-2 transform transition-transform duration-300 hover:scale-105">
    <div className="flex items-center gap-4">
      <div className="bg-primary text-primary-foreground rounded-full p-3">
        {React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6" })}
      </div>
      <h3 className="text-lg font-bold font-headline">{title}</h3>
    </div>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);
