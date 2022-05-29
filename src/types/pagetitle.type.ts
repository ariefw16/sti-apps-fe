export interface PageTitle {
  title: string;
  breadcrumbs: PageTitleBreadcrumbs[];
}

export interface PageTitleBreadcrumbs {
  label: string;
  to?: string;
}
