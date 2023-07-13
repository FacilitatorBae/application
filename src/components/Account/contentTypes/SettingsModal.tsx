import React, { useEffect } from "react";
import { Button, Dialog, Input } from "@material-tailwind/react";
import { useState } from "react";
import { type RouterInputs, api } from "~/utils/api";

type UserAddress = RouterInputs["users"]["updateUserAddress"];

interface SettingsModalProps {
  open: boolean;
  handleOpen: () => void;
}
const SettingsModal: React.FC<SettingsModalProps> = ({ open, handleOpen }) => {
  const [addressData, setAddressData] = useState<UserAddress>({
    address: "",
    addressDetails: "",
    country: "",
    state: "",
    zipCode: "",
  });

  const utils = api.useContext();
  const { data: userDetails } = api.users.getUserDetails.useQuery();

  const { mutate: updateAddress } = api.users.updateUserAddress.useMutation({
    onSuccess: async () => {
      await utils.users.getUserDetails.invalidate();
      handleOpen();
    },
  });

  useEffect(() => {
    const userAddress = userDetails?.address;
    if (userAddress) {
      setAddressData({
        address: userAddress.address,
        addressDetails: userAddress.addressDetails || "",
        country: userAddress.country || "",
        state: userAddress.state,
        zipCode: userAddress.zipCode,
      });
    }
  }, [userDetails]);

  const { address, addressDetails, zipCode, state, country } = addressData;

  const handleOnChange = (key: string, value: string) => {
    setAddressData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog
      open={open}
      size="md"
      handler={handleOpen}
      className="flex justify-center bg-transparent shadow-none"
    >
      <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
        <div className="pb-3">
          <Input
            label="Address"
            value={address}
            onChange={(e) => {
              handleOnChange("address", e.target.value);
            }}
          />
        </div>
        <div className="pb-3">
          <Input
            label="Address Details"
            value={addressDetails?.toString()}
            onChange={(e) => {
              handleOnChange("addressDetails", e.target.value);
            }}
          />
        </div>
        <div className="pb-3">
          <Input
            label="Zip Code"
            value={zipCode}
            onChange={(e) => {
              handleOnChange("zipCode", e.target.value);
            }}
          />
        </div>
        <div className="pb-3">
          <Input
            label="State"
            value={state}
            onChange={(e) => {
              handleOnChange("state", e.target.value);
            }}
          />
        </div>
        <div className="pb-3">
          <Input
            label="Country"
            value={country?.toString()}
            onChange={(e) => {
              handleOnChange("country", e.target.value);
            }}
          />
        </div>
        <Button
          onClick={() => {
            updateAddress(addressData);
          }}
        >
          Update
        </Button>
      </div>
    </Dialog>
  );
};

export default SettingsModal;
