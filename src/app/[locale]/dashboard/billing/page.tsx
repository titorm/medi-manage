import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";

const plansData = (t: (key: string) => string) => [
  {
    name: "Solo Practitioner",
    price: "$49",
    description: "For individual doctors and small practices.",
    features: [
      "Up to 50 patients",
      "All AI Features",
      "Basic Support",
    ],
    isPopular: false,
  },
  {
    name: "Clinic",
    price: "$199",
    description: "For growing clinics and teams.",
    features: [
      "Up to 500 patients",
      "All AI Features",
      "Team Collaboration",
      "Priority Support",
    ],
    isPopular: true,
  },
  {
    name: "Hospital",
    price: t('contactSales'),
    description: "For large-scale hospital systems.",
    features: [
      "Unlimited Patients",
      "Dedicated Account Manager",
      "Custom Integrations",
      "24/7 Enterprise Support",
    ],
    isPopular: false,
  },
];

export default async function BillingPage() {
  const t = await getTranslations("BillingPage");
  const plans = plansData(t);

  return (
    <div className="grid gap-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">
          {t('title')}
        </h1>
        <p className="text-muted-foreground mt-2">
          {t('description')}
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col ${
              plan.isPopular ? "border-primary ring-2 ring-primary" : ""
            }`}
          >
            <CardHeader>
              {plan.isPopular && (
                <div className="text-sm font-semibold text-primary text-center pb-2">{t('mostPopular')}</div>
              )}
              <CardTitle className="font-headline text-center">{plan.name}</CardTitle>
              <CardDescription className="text-center">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-center mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price.startsWith("$") && (
                  <span className="text-muted-foreground">{t('perMonth')}</span>
                )}
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-accent mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.isPopular ? "default" : "outline"}>
                {plan.price === t('contactSales') ? t('contactSales') : t('choosePlan')}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
