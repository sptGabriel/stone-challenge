export const invalidEmailERROR = (email: string): any => {
  return {
    error: "EmailFormatERROR",
    message: `Please provide a valid email`,
    data: email
  };
};
export const emailAlreadyAddedERROR = (email: string): any => {
  return {
    error: "EmailAlreadyExists",
    message: `Email address already exists.`,
    data: email
  };
};
export const emptyListError = (listname: string, data: any): any => {
  return {
    error: `${listname.toLowerCase()}ERROR`,
    message: `The list provided is empty`,
    data
  };
};
export const invalidItemNAMEERROR = (data: any): any => {
  return {
    error: "ItemNameERROR",
    message: `Please provide a valid item name`,
    data,
  };
};
export const invalidItemQuantityERROR = (data: any): any => {
  return {
    error: "QuantityERROR",
    message: `Please provide a valid item quantity`,
    data,
  };
};
export const invalidPriceERROR = (data: any): any  => {
  return {
    error: "PriceERROR",
    message: `Please provide a valid item price`,
    data
  };
};
