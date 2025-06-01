type IPaginateParams<T> = {
  page: number;
  perPage: number;
  data: T[];
  url: string;
};

export type IPaginateResult<T> = {
  data: T[];
  pagination: {
    totalPage: number;
    nextPage: number | null;
    prevPage: number | null;
    firstPage: number;
    lastPage: number;
    from: number;
    to: number;
    perPage: number;
    total: number;
    currentPage: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    url: string;
  };
};

type ICursorPaginateParams = {
  data: any[];
  perPage: number;
  identifier: string | number;
  after?: string | number;
  before?: string | number;
};

export type ICursorPaginateResult = {
  data: any[];
  pagination: {
    hasPrevPage: boolean;
    hasNextPage: boolean;
    startCursor: string | number;
    endCursor: string | number;
    totalPages: number;
  };
};

export function paginate<T>({
  data,
  page,
  perPage,
  url,
}: IPaginateParams<T>): IPaginateResult<T> {
  const offset = (page - 1) * perPage;
  const paginatedItems = data.slice(offset, page * perPage);

  const totalPage = Math.ceil(data.length / perPage);
  const nextPage = page < totalPage ? page + 1 : null;
  const prevPage = page > 1 ? page - 1 : null;

  const firstPage = 1;
  const lastPage = totalPage;

  const from = offset + 1;
  const to = offset + paginatedItems.length;

  const urlWithPage = (page: number): string => `${url}?page=${page}`;

  const pagination = {
    totalPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    from,
    to,
    perPage,
    total: data.length,
    currentPage: page,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPage,
    url: urlWithPage(page),
  };

  return {
    data: paginatedItems,
    pagination,
  };
}

export function cursorPaginate({
  data,
  perPage,
  identifier,
  after,
  before,
}: ICursorPaginateParams): ICursorPaginateResult {
  let offset = 0;

  if (after) {
    offset = data.findIndex((item) => item[identifier] === after) + 1;
  }

  if (before) {
    offset = data.findIndex((item) => item[identifier] === before);
  }

  const paginatedItems = data.slice(offset, offset + perPage);
  const totalPages = Math.ceil(data.length / perPage);

  const hasNextPage = offset + perPage < data.length;
  const hasPrevPage = offset > 0;

  const startCursor = paginatedItems[0]?.[identifier];
  const endCursor = paginatedItems[paginatedItems.length - 1]?.[identifier];

  const pagination = {
    hasNextPage,
    hasPrevPage,
    startCursor,
    endCursor,
    totalPages,
  };

  return {
    data: paginatedItems,
    pagination,
  };
}
