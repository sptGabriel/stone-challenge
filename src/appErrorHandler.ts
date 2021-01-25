interface ErrorConfig {
  error: string
  message: string;
}

export const invalidEmailERROR = (email: string): ErrorConfig => {
  return {
    error: "EmailFormatERROR",
    message: `This Email: ${email}, Please provide a valid email`,
  };
};
export const emailAlreadyAddedERROR = (email: string): any => {
  return {
    error: "EmailAlreadyExists",
    message: `This Email address: ${email}  already exists.`,
  };
};
export const emptyListError = (listname: string, data: any): any => {
  return {
    error: `${listname.toLowerCase()}ERROR`,
    message: `The ${listname.toLowerCase()} list provided is empty`,
  };
};
export const invalidItemNAMEERROR = (data: any): any => {
  return {
    error: "ItemNameERROR",
    message: `Please provide a valid item name`,
    item: data,
  };
};
export const invalidItemQuantityERROR = (data: any): any => {
  return {
    error: "QuantityERROR",
    message: `Please provide a valid item quantity`,
    item: data,
  };
};
export const invalidPriceERROR = (data: any): any  => {
  return {
    error: "PriceERROR",
    message: `Please provide a valid item price`,
    item: data
  };
};
