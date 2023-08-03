import { Card, List, ListItem, Spinner } from "@material-tailwind/react";
import { useState } from "react";
import { Summary, Sales, Comms, Purchases, Settings } from "./contentTypes";
import { api } from "~/utils/api";

const Account = () => {
  const [selectedListItem, setSelectedListItem] = useState("Summary");

  const { data: userDetails, isLoading } = api.users.getUserDetails.useQuery();

  const listMapping = () => {
    switch (selectedListItem) {
      case "Summary":
        return <Summary />;
      case "Sales":
        return <Sales />;
      case "Comms":
        return <Comms />;
      case "Purchases":
        return <Purchases />;
      case "Settings":
        return <Settings />;
      default:
        break;
    }
  };

  return isLoading ? (
    <div className="flex h-full min-h-[60vh] w-full items-center justify-center">
      <Spinner className="h-16 w-16" />
    </div>
  ) : (
    <section className="container mx-auto mt-16 px-4 sm:px-0">
      <div className="pb-16 font-poppins text-5xl font-bold">
        {userDetails?.name}
      </div>
      <div className="flex flex-row">
        <div className="w-[20%]">
          <Card>
            <List>
              <ListItem
                onClick={() => {
                  setSelectedListItem("Summary");
                }}
                selected={selectedListItem === "Summary"}
              >
                Summary
              </ListItem>
              <ListItem
                onClick={() => {
                  setSelectedListItem("Sales");
                }}
                selected={selectedListItem === "Sales"}
              >
                My Sales
              </ListItem>
              <ListItem
                onClick={() => {
                  setSelectedListItem("Comms");
                }}
                selected={selectedListItem === "Comms"}
              >
                My Comms
              </ListItem>
              <ListItem
                onClick={() => {
                  setSelectedListItem("Purchases");
                }}
                selected={selectedListItem === "Purchases"}
              >
                My Purchases
              </ListItem>
              <ListItem
                onClick={() => {
                  setSelectedListItem("Settings");
                }}
                selected={selectedListItem === "Settings"}
              >
                Settings
              </ListItem>
              <ListItem
                onClick={() => {
                  setSelectedListItem("Sign Out");
                }}
                selected={selectedListItem === "Sign Out"}
              >
                Sign Out
              </ListItem>
            </List>
          </Card>
        </div>
        <div className="ml-[5%] flex w-[75%] justify-center rounded-xl">
          {listMapping()}
        </div>
      </div>
    </section>
  );
};

export default Account;
