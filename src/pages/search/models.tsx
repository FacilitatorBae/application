const sortFields = {
  PRICE_LOW_TO_HIGH: "priceLowToHigh",
  PRICE_HIGH_TO_LOW: "priceHighToLow",
  FEES_LOW_TO_HIGH: "feesLowToHigh",
  FEES_HIGH_TO_LOW: "feesHighToLow",
};

const {
  PRICE_LOW_TO_HIGH,
  PRICE_HIGH_TO_LOW,
  FEES_LOW_TO_HIGH,
  FEES_HIGH_TO_LOW,
} = sortFields;

const menuItemsLabel = {
  [PRICE_LOW_TO_HIGH]: {
    label: "Price (low to high)",
    field: "price",
    criteria: "asc",
  },
  [PRICE_HIGH_TO_LOW]: {
    label: "Price (high to low)",
    field: "price",
    criteria: "desc",
  },
  [FEES_LOW_TO_HIGH]: {
    label: "Fees (low to high)",
    field: "fee",
    criteria: "asc",
  },
  [FEES_HIGH_TO_LOW]: {
    label: "Fees (high to low)",
    field: "fee",
    criteria: "desc",
  },
};

const firstCharToCaps = (term: string) =>
  (term && term[0]?.toUpperCase() + term.slice(1)) || "";

export { menuItemsLabel, firstCharToCaps };
