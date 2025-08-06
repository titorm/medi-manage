import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  Calendar,
  FileText,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const quickStats = [
  {
    title: "Today's Appointments",
    value: "12",
    icon: Calendar,
    change: "+2",
    changeType: "increase",
  },
  {
    title: "Pending Prescriptions",
    value: "4",
    icon: FileText,
    change: "-1",
    changeType: "decrease",
  },
  {
    title: "New Patients",
    value: "3",
    icon: Users,
    change: "+3",
    changeType: "increase",
  },
];

const complianceAlerts = [
  {
    title: "CFM Update: New Telemedicine Guidelines",
    description: "New regulations regarding digital security in teleconsultations will be effective starting next month. Review your practices.",
    date: "2024-08-15",
  },
  {
    title: "LGPD Reminder: Data Consent Forms",
    description: "Ensure all patient data collection forms have been updated with the latest LGPD consent clauses.",
    date: "2024-08-10",
  },
  {
    title: "Security Alert: Phishing Attempts",
    description: "We've detected an increase in phishing emails targeting medical professionals. Be vigilant.",
    date: "2024-08-05",
  },
];

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quickStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change} from last day
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline">Regulation Compliance Monitor</CardTitle>
          </div>
          <CardDescription>
            Stay informed about important regulatory and security updates.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {complianceAlerts.map((alert) => (
            <Alert key={alert.title}>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="font-bold">{alert.title}</AlertTitle>
              <AlertDescription>
                <p>{alert.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Posted on: {alert.date}
                </p>
              </AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
