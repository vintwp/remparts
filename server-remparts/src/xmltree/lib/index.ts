function getNestedTypes(category, nested: number[] = []) {
  const categories = category['categories'];

  if (!categories) {
    return [];
  }

  for (let i = 0; i < categories.length; i += 1) {
    if (!categories[i]['categories']) {
      nested.push(categories[i]['id']);
    } else {
      const nestedCats = getNestedTypes(categories[i]);
      nested = [...nested, ...nestedCats];
    }
  }

  return nested;
}

function getTreeFromXML(price) {
  const indexesToDelete = [];
  const ptypes = JSON.parse(JSON.stringify(price));

  for (let i = 0; i < ptypes.length; i += 1) {
    if (!ptypes[i].parentId) {
      continue;
    }

    const parentId = ptypes[i].parentId;
    const parentIndex = ptypes.findIndex((ptype) => ptype.id === parentId);

    if (parentIndex !== -1) {
      indexesToDelete.push(i);

      if (!ptypes[parentIndex].categories) {
        ptypes[parentIndex].categories = [ptypes[i]];
      } else {
        ptypes[parentIndex].categories = [
          ...ptypes[parentIndex].categories,
          ptypes[i],
        ];
      }
    }
  }

  const total = ptypes.filter((_, index) => !indexesToDelete.includes(index));
  const departments = price.filter((dep) => !dep.parentId);

  const categoriesWithNested = JSON.parse(JSON.stringify(total)).map(
    (department) => {
      const dept = department.categories.map((depCategory) => {
        if (!depCategory.categories) {
          return depCategory;
        }

        const nestedIds = getNestedTypes(depCategory);

        return {
          ...depCategory,
          nestedIds,
        };
      });

      return dept;
    },
  );

  return { total, departments, categoriesWithNested };
}

export { getNestedTypes, getTreeFromXML };
