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

const existingForms = [
  {
    id: "FRM-001",
    title: "New Patient Intake Form",
    status: "Active",
    created: "2024-07-15",
    responses: 124,
  },
  {
    id: "FRM-002",
    title: "Telemedicine Consent Form",
    status: "Active",
    created: "2024-06-01",
    responses: 350,
  },
  {
    id: "FRM-003",
    title: "Pre-Consultation Questionnaire",
    status: "Draft",
    created: "2024-08-01",
    responses: 0,
  },
  {
    id: "FRM-004",
    title: "Patient Feedback Survey",
    status: "Archived",
    created: "2023-12-20",
    responses: 88,
  },
];

export default function FormsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-headline">Patient Form Builder</CardTitle>
          <CardDescription>
            Create, manage, and view responses for your custom patient forms.
          </CardDescription>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Form
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Form Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Responses</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {existingForms.map((form) => (
              <TableRow key={form.id}>
                <TableCell className="font-medium">{form.title}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      form.status === "Active"
                        ? "default"
                        : form.status === "Draft"
                        ? "secondary"
                        : "outline"
                    }
                    className={form.status === 'Active' ? 'bg-accent text-accent-foreground' : ''}
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
