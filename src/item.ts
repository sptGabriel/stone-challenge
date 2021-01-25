import {
  invalidItemNAMEERROR,
  invalidItemQuantityERROR,
  invalidPriceERROR,
} from "./appErrorHandler";
import { logger } from "./loggerProvider";
import { isNumber } from "./utils/isNumber";
import { isString } from "./utils/isString";

export interface ItemProps {
  name: string;
  price: number;
  quantity: number;
}
// here is my item domain
export class Item {
  readonly name: string;
  readonly price: number;
  readonly quantity: number;

  private constructor({ name, quantity, price }: ItemProps) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
  }

  public get total() {
    return this.price * this.quantity;
  }

  static build(item: ItemProps): Item | void {
    if (!isString(item.name)) return logger.error(invalidItemNAMEERROR(item));
    if (!isNumber(item.quantity))
      return logger.error(invalidItemQuantityERROR(item));
    if (!isNumber(item.price)) return logger.error(invalidPriceERROR(item));
    const domainItem = new Item({
      name: item.name,
      quantity: item.quantity,
      price: item.price * 100,
    });
    return domainItem
      ? domainItem
      : logger.error({
          message: `Unexpected error to crate Item`,
          item: item,
        });
  }
}
