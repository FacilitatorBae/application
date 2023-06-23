import type { RouterInputs } from "~/utils/api";

export type SortField = RouterInputs["products"]["getSearchProducts"]["field"];
export type SortCriteria =
  RouterInputs["products"]["getSearchProducts"]["criteria"];
export type SortMenuItem = {
  label: string;
  field: SortField;
  criteria: SortCriteria;
};

export const sortMenuItems: SortMenuItem[] = [
  {
    label: "Price (low to high)",
    field: "price",
    criteria: "asc",
  },
  {
    label: "Price (high to low)",
    field: "price",
    criteria: "desc",
  },
  {
    label: "Fees (low to high)",
    field: "fee",
    criteria: "asc",
  },
  {
    label: "Fees (high to low)",
    field: "fee",
    criteria: "desc",
  },
];

export const firstCharToCaps = (term: string) =>
  (term && term[0] && term[0].toUpperCase() + term.slice(1)) || "";
