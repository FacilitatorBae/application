import React from "react";
import { Button, Dialog, Input } from "@material-tailwind/react";
import { type Address } from "@prisma/client";
import { useState } from "react";
import { useUserDetails } from "~/hooks/userUserDetails";
import { api } from "~/utils/api";

type UserAddress = Omit<
  Address,
  "id" | "createdAt" | "deletedAt" | "updatedAt"
>;

interface SettingsModalProps {
  open: boolean;
  handleOpen: () => void;
}
const SettingsModal: React.FC<SettingsModalProps> = ({ open, handleOpen }) => {
  const { address: addressCtxData } = useUserDetails();

  const { mutate: updateAddress } =
    api.userDetails.updateUserDetailsById.useMutation();

  const [addressData, setAddressData] = useState<UserAddress>(addressCtxData);

  const { address, addressDetails, zipCode, state, country } = addressData;

  const handleOnChange = (key, value) => {
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
            value={addressDetails}
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
            value={country}
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
