export const filterProducts = (products, filters) => {
  return products.filter((product) => {
    const categoryMatch = product.category.some((categoryPath) => {
      const categoryParts = categoryPath
        .replace(/&amp;/g, "")
        .split(">")
        .map((item) => item.trim());
      return categoryParts.includes(filters.selectedCategory);
    });

    const colorMatch =
      !filters.color || product.colors?.includes(filters.color);

    const priceMatch =
      !filters.price || checkPriceRange(product.price, filters.price);

    return categoryMatch && colorMatch && priceMatch;
  });
};

export const checkPriceRange = (price, range) => {
  const [min, max] = range.split("-").map((num) => parseFloat(num));
  return price >= min && (!max || price <= max);
};
