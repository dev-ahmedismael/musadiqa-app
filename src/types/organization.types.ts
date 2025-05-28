export type Organization = {
  name: string;
  industry: string;
  currency: string;
  country: string;
  is_vat_registered: boolean;
  employees_count: string;
  domains: Domain[];
  logo?: string;
};

export type Domain = {
  domain: string;
};
