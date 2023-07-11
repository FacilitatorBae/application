import { Button } from "@material-tailwind/react";
import { useUserDetails } from "~/hooks/userUserDetails";

const Settings = () => {
  const { address, updateAddress } = useUserDetails();
  console.log(address);
  return (
    <div className="flex h-full w-[70%] flex-col justify-between bg-gray-300 p-5">
      <div className="pb-5 font-poppins text-3xl font-bold">Settings</div>
      <div className="flex w-full flex-col justify-between pb-5">
        <div className="flex justify-between bg-gray-100 p-2">
          <div className="flex h-full flex-col justify-center font-poppins">
            <div className="font-bold">Address</div>
            <div className="text-sm font-thin">Bank Street, Manhattan, USA</div>
          </div>
          <div className="flex">
            <Button
              onClick={() => {
                updateAddress((prev) => ({ ...prev, address: "JAJA" }));
              }}
              size="sm"
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col justify-between pb-5">
        <div className="flex justify-between bg-gray-100 p-2">
          <div className="flex h-full flex-col justify-center font-poppins">
            <div className="font-bold">Telephone</div>
            <div className="text-sm font-thin">+1 801 9487</div>
          </div>
          <div className="flex">
            <Button size="sm">Edit</Button>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col justify-between pb-5">
        <div className="flex justify-between bg-gray-100 p-2">
          <div className="flex h-full flex-col justify-center font-poppins">
            <div className="font-bold">Payment</div>
            <div className="text-sm font-thin">Visa **** **** **** 7458</div>
          </div>
          <div className="flex">
            <Button size="sm">Edit</Button>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col justify-between pb-5">
        <div className="flex justify-between bg-gray-100 p-2">
          <div className="flex h-full flex-col justify-center font-poppins">
            <div className="font-bold">Privacy</div>
            <div className="text-sm font-thin">
              Allowed cookies & notifications
            </div>
          </div>
          <div className="flex">
            <Button size="sm">Edit</Button>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col justify-between pb-5">
        <div className="flex justify-between bg-gray-100 p-2">
          <div className="flex h-full flex-col justify-center font-poppins">
            <div className="font-bold">Subscriptions</div>
            <div className="text-sm font-thin">Broke bastard (Free tier)</div>
          </div>
          <div className="flex">
            <Button size="sm">Edit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
