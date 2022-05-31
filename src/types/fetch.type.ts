export interface FetchParams {
  page?: number;
  limit?: number;
  id?: number;
  q?: string;
  refreshToggle?: boolean;
}

export interface FetchResult<T> {
  rowCount: number;
  data: T;
}

export interface FetchPagingFilter {
  page?: number;
  limit?: number;
}
