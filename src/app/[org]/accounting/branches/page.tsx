import DataGrid from "@/common/DataGrid/DataGrid";
import { Col } from "@/types/datagrid.types";

const path = "branches";

const cols: Col[] = [
  { key: "name_ar", label: "اسم الفرع باللغة العربية" },
  { key: "name_en", label: "اسم الفرع باللغة الإنجليزية" },
  { key: "phone", label: "رقم الجوال" },
  { key: "commercial_number", label: "رقم السجل التجاري" },
  { key: "building_number", label: "رقم المبنى" },
  { key: "street", label: "الشارع" },
  { key: "district", label: "الحي" },
  { key: "city", label: "المدينة" },
  { key: "postal_code", label: "الرمز البريدي" },
];

export default function Branches() {
  return <DataGrid path={path} cols={cols} />;
}
