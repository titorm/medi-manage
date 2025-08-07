import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getTranslations } from "next-intl/server";

export default async function FormsPage() {
  const t = await getTranslations("FormsPage");

  const existingForms = [
    {
      id: "FRM-001",
      title: t("form1Title"),
      status: t("statusActive"),
      created: "2024-07-15",
      responses: 124,
    },
    {
      id: "FRM-002",
      title: t("form2Title"),
      status: t("statusActive"),
      created: "2024-06-01",
      responses: 350,
    },
    {
      id: "FRM-003",
      title: t("form3Title"),
      status: t("statusDraft"),
      created: "2024-08-01",
      responses: 0,
    },
    {
      id: "FRM-004",
      title: t("form4Title"),
      status: t("statusArchived"),
      created: "2023-12-20",
      responses: 88,
    },
  ];
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-headline">{t('title')}</CardTitle>
          <CardDescription>
            {t('description')}
          </CardDescription>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t('createButton')}
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('formTitle')}</TableHead>
              <TableHead>{t('status')}</TableHead>
              <TableHead>{t('responses')}</TableHead>
              <TableHead>{t('dateCreated')}</TableHead>
              <TableHead className="text-right">{t('actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {existingForms.map((form) => (
              <TableRow key={form.id}>
                <TableCell className="font-medium">{form.title}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      form.status === t("statusActive")
                        ? "default"
                        : form.status === t("statusDraft")
                        ? "secondary"
                        : "outline"
                    }
                    className={form.status === t("statusActive") ? 'bg-accent text-accent-foreground' : ''}
                  >
                    {form.status}
                  </Badge>
                </TableCell>
                <TableCell>{form.responses}</TableCell>
                <TableCell>{form.created}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
