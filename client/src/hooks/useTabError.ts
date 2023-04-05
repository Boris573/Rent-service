import { useEffect, useState } from 'react';

export const useTabError = (tabFields: any, formik: any, activeTab: string) => {
  const [tabsWithErrors, setTabsWithErrors] = useState<{ [key: string]: boolean } | null>(null);

  useEffect(() => {
      setTabsWithErrors(Object.keys(tabFields).reduce((acc, tabName: string) => ({
        ...acc,
       [tabName]: tabFields[tabName].some(
          (field: any) =>
            formik.touched[field as keyof typeof formik.touched] &&
            formik.errors[field as keyof typeof formik.errors]
          )
        }), {}))
    }, [activeTab, formik.touched, formik.errors, tabFields]
  );

  return { tabsWithErrors }
};
