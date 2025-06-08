import CreatePageLayout from "@/common/Layouts/CreatePageLayout";
import TaxForm from "@/forms/tax";

export default function CreateNewBranch() {
  return (
    <CreatePageLayout title="إضافة ضريبة جديدة">
      <TaxForm />
    </CreatePageLayout>
  );
}
