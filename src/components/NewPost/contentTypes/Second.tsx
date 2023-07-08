import { useState } from "react";
import { Card, List, ListItem, Breadcrumbs } from "@material-tailwind/react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useNewPost } from "~/hooks/useNewPost";

const mockList = [
  { id: 0, title: "Home" },
  { id: 1, title: "Sports" },
  { id: 2, title: "Gaming" },
  { id: 3, title: "Electronics" },
  { id: 4, title: "Services" },
  { id: 5, title: "Football", parentId: 1 },
  { id: 6, title: "Basketball", parentId: 1 },
  { id: 7, title: "Volleyball", parentId: 1 },
  { id: 8, title: "Headphones", parentId: 2 },
  { id: 9, title: "Graphic Cards", parentId: 2 },
];

const Second = () => {
  const {
    activeStep: activeStep,
    next: nextStep,
    prev: prevStep,
  } = useNewPost();

  const [pickedCategories, setPickedCategories] = useState([]);
  const [parentId, setParentId] = useState(0);

  const listToRender = () => {
    const listToRender = mockList.filter((item) =>
      parentId ? item.parentId === parentId : !item.parentId
    );

    const onListItemClick = (listItem) => {
      const isLastCategory =
        mockList.filter((item) => item.parentId === listItem.id).length === 0;

      setParentId(listItem.id);
      setPickedCategories((prev) => [...prev, listItem]);
      if (isLastCategory) {
        nextStep();
      }
    };

    return listToRender.map((item) => (
      <List>
        <ListItem
          onClick={() => {
            onListItemClick(item);
          }}
        >
          {item.title}
        </ListItem>
      </List>
    ));
  };

  return (
    <>
      <div className="flex w-full flex-col justify-center bg-white">
        <div
          onClick={() => {
            prevStep();
          }}
          className="my-2 ml-2 flex cursor-pointer flex-row font-poppins text-xs"
        >
          <BiChevronLeft size={24} />
          <span className="flex items-center">Prev Step</span>
        </div>
        <div className="text-center font-poppins">Pick the categories</div>
        <Breadcrumbs separator=">">
          <a
            onClick={() => {
              setParentId(0);
              setPickedCategories([]);
            }}
          >
            All
          </a>
          {pickedCategories.map((item) => (
            <a
              onClick={() => {
                setParentId(item.id);
              }}
            >
              {item.title}
            </a>
          ))}
        </Breadcrumbs>
        <div className="flex w-full justify-center py-20">
          <div className="flex w-[450px] flex-row items-center">
            <Card className="h-60 w-96 overflow-y-scroll">
              {listToRender()}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Second;
