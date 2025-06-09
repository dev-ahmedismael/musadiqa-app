"use client";

import CreatePageLayout from "@/common/Layouts/CreatePageLayout";
import ProjectForm, { ProjectFormData } from "@/forms/project";
import { show } from "@/services/api";
import { normalizeFormData } from "@/utils/normalizeFormData";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export default function EditProject() {
  const params = useParams();

  const [data, setData] = useState<undefined | ProjectFormData>(undefined);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!params.id) return;
      try {
        const result = await show("projects", params.id as string);
        setData(result.data.data as ProjectFormData);
      } catch (error) {
        console.error("Failed to fetch tax rate", error);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <CreatePageLayout title="تعديل المشروع">
      <ProjectForm
        defaultValues={data && normalizeFormData(data)}
        id={params.id as string}
      />
    </CreatePageLayout>
  );
}
