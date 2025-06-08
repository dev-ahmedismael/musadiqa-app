"use client";
import DataGrid from "@/common/DataGrid/DataGrid";
import { taxTypeOptions } from "@/data/taxes.data";
import { Col } from "@/types/datagrid.types";

const cols: Col[] = [
  {
    key: "name_ar",
    label: "اسم الضريبة باللغة العربية",
  },
  {
    key: "name_en",
    label: "اسم الضريبة باللغة الإنجليزية",
  },
  {
    key: "tax_type",
    label: "نوع الضريبة",
    type: "select",
    options: taxTypeOptions,
  },
  {
    key: "tax_rate",
    label: "المعدل الضريبي",
    formatter: (value) => `${value}%`,
  },
  {
    key: "description",
    label: "الوصف",
  },
];

const path = "tax-rates";

export default function Taxes() {
  return <DataGrid path={path} cols={cols} />;
}
