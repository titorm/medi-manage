import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getTranslations } from "next-intl/server";

const appointments = [
  {
    time: "09:00 AM",
    patient: "John Doe",
    type: "Teleconsultation",
    status: "Confirmed",
    avatar: "https://placehold.co/100x100.png?text=JD",
  },
  {
    time: "10:30 AM",
    patient: "Jane Smith",
    type: "In-Person",
    status: "Confirmed",
    avatar: "https://placehold.co/100x100.png?text=JS",
  },
  {
    time: "01:00 PM",
    patient: "Peter Jones",
    type: "In-Person",
    status: "Pending",
    avatar: "https://placehold.co/100x100.png?text=PJ",
  },
  {
    time: "02:30 PM",
    patient: "Mary Johnson",
    type: "Teleconsultation",
    status: "Confirmed",
    avatar: "https://placehold.co/100x100.png?text=MJ",
  },
  {
    time: "04:00 PM",
    patient: "David Williams",
    type: "Follow-up",
    status: "Canceled",
    avatar: "https://placehold.co/100x100.png?text=DW",
  },
];

export default async function SchedulePage() {
  const t = await getTranslations("SchedulePage");

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
      <Card>
        <CardContent className="p-0">
          <Calendar
            mode="single"
            selected={new Date()}
            className="p-3 w-full"
            classNames={{
              day_selected: "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90",
              day_today: "bg-accent/50 text-accent-foreground",
            }}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">{t('todaysSchedule')}</CardTitle>
          <CardDescription>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-22rem)]">
            <div className="space-y-6">
              {appointments.map((appt) => (
                <div key={appt.time} className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src={appt.avatar} />
                    <AvatarFallback>
                      {appt.patient
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">{appt.patient}</p>
                      <p className="text-sm text-muted-foreground">
                        {appt.time}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-sm text-muted-foreground">{appt.type}</p>
                      <Badge
                        variant={
                          appt.status === "Confirmed"
                            ? "default"
                            : appt.status === "Pending"
                            ? "secondary"
                            : "destructive"
                        }
                        className={appt.status === "Confirmed" ? "bg-accent text-accent-foreground" : ""}
                      >
                        {appt.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
