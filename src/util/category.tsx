export const categoriesWithColors = [
  { name: "adventure", color: "bg-yellow-500 text-white" },
  { name: "action", color: "bg-red-500 text-white" },
  { name: "shonen", color: "bg-blue-500 text-white" },
  { name: "fantasy", color: "bg-purple-500 text-white" },
  { name: "supernatural", color: "bg-green-500 text-white" },
  { name: "horror", color: "bg-gray-800 text-white" },
];

export const categoryColor = (name: string) => {
  return categoriesWithColors.find((e) => e.name == name)?.color;
};
