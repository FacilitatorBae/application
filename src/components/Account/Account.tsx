import { Card, List, ListItem } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Summary, Sales, Comms, Purchases, Settings } from "./contentTypes";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useUserDetails } from "~/hooks/userUserDetails";

const Account = () => {
  const { data: sessionData } = useSession();

  const { address, updateAddress } = useUserDetails();

  const { data: userData } = api.userDetails.getUserDetailsById.useQuery({
    id: sessionData?.user.id,
  });

  useEffect(() => {
    if (userData) {
      const { id, updatedAt, createdAt, deletedAt, ...userAddress } =
        userData?.address;
      updateAddress(userAddress);
    }
  }, [userData]);

  const [selectedListItem, setSelectedListItem] = useState("Summary");

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

  return (
    <section className="container mx-auto mt-16 px-4 sm:px-0">
      <div className="pb-16 font-poppins text-5xl font-bold">Hello Santi</div>
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
