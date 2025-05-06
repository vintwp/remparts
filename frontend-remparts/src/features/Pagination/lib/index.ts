export function buildPaginationArray(currentPage: number, maxPages: number) {
  const supposedCenter = [currentPage - 1, currentPage, currentPage + 1];
  const filteredCenter = supposedCenter.filter(p => p > 1 && p < maxPages);
  const shouldIncludeNumberLeft = currentPage === 4;
  const shouldIncludeNumberRight = currentPage === maxPages - 3;
  const shouldIncludeLeftDots = currentPage > 4;
  const shouldIncludeRightDots = currentPage < maxPages - 2;

  if (shouldIncludeNumberLeft) filteredCenter.unshift(2);
  if (shouldIncludeNumberRight) filteredCenter.push(maxPages - 1);

  if (shouldIncludeLeftDots) filteredCenter.unshift(0);
  if (shouldIncludeRightDots) filteredCenter.push(0);

  return [1, ...filteredCenter, maxPages];
}
