import CreatePageLayout from "@/common/Layouts/CreatePageLayout";
import CostCenterForm from "@/forms/costcenter";

export default function CreateNewCostCenter() {
  return (
    <CreatePageLayout title="إضافة مركز تكلفة">
      <CostCenterForm />
    </CreatePageLayout>
  );
}
