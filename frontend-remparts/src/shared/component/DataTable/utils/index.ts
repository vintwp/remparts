import { Row } from '@tanstack/react-table';

export function sortDate<T>(rowA: Row<T>, rowB: Row<T>, columnId: string) {
  const dateA = Date.parse(rowA.getValue(columnId));
  const dateB = Date.parse(rowB.getValue(columnId));

  return dateA < dateB ? -1 : dateA === dateB ? 0 : 1;
}
