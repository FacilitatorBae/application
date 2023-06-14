const mockCategory = [
  { type: "option", title: "Condition", children: ["Brand New", "Used"] },
  {
    type: "option",
    title: "Category",
    children: ["eSport", "Gaming", "Toys", "Kitchen", "Home", "Cars"],
  },
];

const CategoryList = () => {
  return (
    <div className="flex h-full w-[25%] flex-col">
      {mockCategory.map((categ) => (
        <div className="flex flex-col">
          <span className="font-bold">{categ.title}</span>
          {categ.children.map((child) => (
            <span>{child}</span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
