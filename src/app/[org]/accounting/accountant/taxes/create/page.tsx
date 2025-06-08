import CreatePageLayout from "@/common/Layouts/CreatePageLayout";
import TaxForm from "@/forms/tax";

export default function CreateNewTax() {
  return (
    <CreatePageLayout title="إضافة ضريبة جديدة">
      <TaxForm />
    </CreatePageLayout>
  );
}
