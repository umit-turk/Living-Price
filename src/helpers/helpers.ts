import { Price } from "../api/types";

export const groupByCategory = (data: Price[]) => {
  const categories: Record<string, Price[]> = {};

  data.forEach((item) => {
    if (!categories[item.category_name]) {
      categories[item.category_name] = [];
    }
    categories[item.category_name].push(item);
  });

  return Object.keys(categories).map((category) => ({
    title: category,
    data: categories[category],
  }));
};
