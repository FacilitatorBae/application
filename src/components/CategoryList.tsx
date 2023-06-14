import { Checkbox, Input } from "@material-tailwind/react";

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
  {
    type: "option",
    title: "Location",
    children: [
      { title: "California", count: 125 },
      { title: "Texas", count: 125 },
      { title: "New York", count: 125 },
      { title: "Florida", count: 125 },
      { title: "Georgia", count: 125 },
      { title: "Illinois", count: 125 },
    ],
  },
];

const CategoryList = () => {
  return (
    <div className="flex h-full w-[25%] flex-col font-poppins">
      <div className="flex flex-col">
        {mockCategory.map((categ) => (
          <div className="flex flex-col">
            <span className="text-lg font-medium">{categ.title}</span>
            {categ.children?.map((child) => (
              <div className="flex flex-row items-baseline font-light">
                <span>{child.title}</span>
                <span className="ml-1 text-xs text-gray-500">
                  ({child.count})
                </span>
              </div>
            ))}
          </div>
        ))}

        <div className="flex flex-col">
          <span className="text-lg font-medium">Price</span>
          <div className="flex w-[40%] flex-row justify-between">
            <Input label="From" />
            <Input label="To" />
            <span>GO</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-medium">Fees</span>
        </div>
        <div className="flex w-full flex-col">
          <span className="text-lg font-medium">Others</span>
          <div className="flex w-[40%] flex-row justify-between">
            <span className="font-light">Free shipping</span>
            <Checkbox />
          </div>
          <div className="flex w-[40%] flex-row justify-between">
            <span className="font-light">Certified Sellers</span>
            <Checkbox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
