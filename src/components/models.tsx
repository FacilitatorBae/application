const menuItemsFields = {
  MY_PROFILE: "myProfile",
  MY_ORDERS: "myOrders",
  LOGOUT: "logout",
  LOGIN: "logIn",
};

const { MY_PROFILE, MY_ORDERS, LOGOUT, LOGIN } = menuItemsFields;

const menuItemsLabel = {
  [MY_PROFILE]: { label: "My Profile" },
  [MY_ORDERS]: { label: "My Orders" },
  [LOGIN]: { label: "Log In" },
  [LOGOUT]: { label: "Logout" },
};

const firstCharToCaps = (term: string) =>
  (term && term[0]?.toUpperCase() + term.slice(1)) || "";

export { menuItemsFields, menuItemsLabel, firstCharToCaps };
