import DataGrid from "@/common/DataGrid/DataGrid";
import { Col } from "@/types/datagrid.types";

const path = "branches";

const cols: Col[] = [{ key: "name", label: "اسم الفرع" }];

export default function Branches() {
  return <DataGrid path={path} cols={cols} />;
}
