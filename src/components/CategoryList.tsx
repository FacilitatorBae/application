const mockCategory = [
  {
    type: "option",
    title: "Condition",
    children: [
      { title: "Brand New", count: 3123 },
      { title: "Used", count: 421 },
    ],
  },
  {
    type: "option",
    title: "Category",
    children: [
      { title: "eSport", count: 125 },
      { title: "Gaming", count: 125 },
      { title: "Toys", count: 125 },
      { title: "Kitchen", count: 125 },
      { title: "Home", count: 125 },
      { title: "Cars", count: 125 },
    ],
  },
];

const CategoryList = () => {
  return (
    <div className="flex h-full w-[25%] flex-col">
      {mockCategory.map((categ) => (
        <div className="flex flex-col">
          <span className="font-bold">{categ.title}</span>
          {categ.children.map((child) => (
            <div className="flex flex-row">
              <span>{child.title}</span>
              <span className="ml-1">({child.count})</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
