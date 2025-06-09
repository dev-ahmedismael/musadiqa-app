import CreatePageLayout from "@/common/Layouts/CreatePageLayout";
import BranchForm from "@/forms/branch";

export default function CreateNewBranch() {
  return (
    <CreatePageLayout title="إضافة فرع">
      <BranchForm />
    </CreatePageLayout>
  );
}
