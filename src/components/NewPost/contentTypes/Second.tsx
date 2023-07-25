import { useState } from "react";
import {
  Card,
  List,
  ListItem,
  Breadcrumbs,
  IconButton,
} from "@material-tailwind/react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useNewPost } from "~/hooks/useNewPost";
import { api } from "~/utils/api";

const Second = () => {
  const {
    next: nextStep,
    prev: prevStep,
    pickedCategories,
    addPickedCategory,
    removePickedCategory,
    resetPickedCategories,
  } = useNewPost();

  const { data: allCategories } = api.categories.getAllCategories.useQuery();

  const [parentId, setParentId] = useState(0);

  const isPickedLastCategory =
    pickedCategories.length > 0 &&
    allCategories?.filter(
      (item) =>
        item.parentId === pickedCategories[pickedCategories.length - 1]?.id
    ).length === 0;

  const listToRender = () => {
    const listToRender = () => {
      if (!isPickedLastCategory) {
        return pickedCategories &&
          pickedCategories[pickedCategories.length - 1]?.parentId
          ? allCategories?.filter(
              (item) =>
                item.parentId ===
                pickedCategories[pickedCategories.length - 1]?.id
            )
          : allCategories?.filter((item) =>
              parentId ? item.parentId === parentId : !item.parentId
            );
      } else {
        return allCategories?.filter(
          (item) =>
            item.id === pickedCategories[pickedCategories.length - 1]?.id
        );
      }
    };

    const onListItemClick = (listItem: {
      id: number;
      parentId?: number;
      name: string;
    }) => {
      const isLastCategory =
        allCategories?.filter((item) => item.parentId === listItem.id)
          .length === 0;
      if (isLastCategory) {
        if (!pickedCategories.includes(listItem)) {
          setParentId(listItem.id);
          addPickedCategory(listItem);
        }
      } else {
        setParentId(listItem.id);
        addPickedCategory(listItem);
      }
    };

    return listToRender()?.map((item) => (
      <List>
        <ListItem
          onClick={() => {
            onListItemClick(item);
          }}
        >
          {item.name}
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
        <div className="pl-5">
          <Breadcrumbs separator=">">
            <a
              className="font-poppins font-thin"
              onClick={() => {
                setParentId(0);
                resetPickedCategories();
              }}
            >
              All
            </a>
            {pickedCategories.map((item) => (
              <a
                className="font-poppins font-thin"
                onClick={() => {
                  setParentId(item.id);
                  removePickedCategory(item);
                }}
              >
                {item.name}
              </a>
            ))}
          </Breadcrumbs>
        </div>
        <div className="flex w-full justify-center py-20">
          <div className="flex flex-col items-end">
            <Card className="h-60 w-96 overflow-y-scroll">
              {listToRender()}
            </Card>
            {isPickedLastCategory && (
              <div className="rounded-full pt-5">
                <IconButton
                  onClick={() => {
                    nextStep();
                  }}
                  className="rounded-full"
                >
                  <BiChevronRight size={24} />
                </IconButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Second;
