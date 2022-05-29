export interface FetchParams {
  page?: number;
  limit?: number;
  id?: number;
  q?: string;
}

export interface FetchResult<T> {
  rowCount: number;
  data: T;
}

export interface FetchPagingFilter {
  page?: number;
  limit?: number;
}
