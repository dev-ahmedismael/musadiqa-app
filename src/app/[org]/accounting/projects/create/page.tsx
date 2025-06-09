import CreatePageLayout from "@/common/Layouts/CreatePageLayout";
import ProjectForm from "@/forms/project";

export default function CreateNewProject() {
  return (
    <CreatePageLayout title="إضافة مشروع">
      <ProjectForm />
    </CreatePageLayout>
  );
}
