import { Checkbox, Input, Button } from "@material-tailwind/react";

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
      <div className="flex w-full flex-col">
        <div className="mb-5 w-full text-2xl">Bike with 26 inch wheels</div>
        {mockCategory.map((categ) => (
          <div key={categ.title} className="flex flex-col pb-3">
            <span className="text-lg font-medium">{categ.title}</span>
            {categ.children?.map((child) => (
              <div
                key={child.title}
                className="flex flex-row items-baseline font-light"
              >
                <span>{child.title}</span>
                <span className="ml-1 text-xs text-gray-500">
                  ({child.count})
                </span>
              </div>
            ))}
          </div>
        ))}

        <div className="flex w-full flex-col pb-3">
          <span className="text-lg font-medium">Price</span>
          <div className="flex w-[80%] flex-row items-center justify-between">
            <Input
              containerProps={{ className: "min-w-[72px] max-w-[80px]" }}
              label="From"
            />
            <Input
              containerProps={{ className: "min-w-[72px] max-w-[80px]" }}
              label="To"
            />
            <Button className="ml-2 h-[30px] w-[30px] p-0">GO</Button>
          </div>
        </div>
        <div className="flex flex-col pb-3">
          <span className="text-lg font-medium">Fees</span>
          <div className="flex w-[80%] flex-row items-center justify-between">
            <Input
              containerProps={{ className: "min-w-[72px] max-w-[80px]" }}
              label="From"
            />
            <Input
              containerProps={{ className: "min-w-[72px] max-w-[80px]" }}
              label="To"
            />
            <Button className="ml-2 h-[30px] w-[30px] p-0">GO</Button>
          </div>
        </div>
        <div className="flex w-full flex-col pb-3">
          <span className="text-lg font-medium">Others</span>
          <div className="flex w-[60%] flex-row items-center justify-between">
            <span className="font-light">Free shipping</span>
            <Checkbox
              ripple={false}
              containerProps={{
                className: "p-0",
              }}
            />
          </div>
          <div className="flex w-[60%] flex-row items-center justify-between">
            <span className="font-light">Certified Sellers</span>
            <Checkbox ripple={false} containerProps={{ className: "p-0" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
