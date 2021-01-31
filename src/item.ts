import {
  invalidItemNAMEERROR,
  invalidItemQuantityERROR,
  invalidPriceERROR,
  negativeNumber,
} from "./appErrorHandler";
import { left, right } from "./utils/either";
import { isNumber } from "./utils/isNumber";
import { isString } from "./utils/isString";
import { ValueObject } from "./utils/valueObject";

type Int = bigint

export interface ItemProps {
  name: string;
  price: number;
  quantity: number;
}
// here is my item domain
export class Item extends ValueObject<ItemProps> {
  private constructor({ name, quantity, price }: ItemProps) {
    super({ name, quantity, price });
  }

  public get total() {
    return Number(this.props.price) * this.props.quantity;
  }

  public static build(item: ItemProps) {
    if(item.price < 0 || item.quantity < 0) return left(negativeNumber(item));
    if (!isString(item.name)) return left(invalidItemNAMEERROR(item));
    if (!isNumber(item.quantity)) return left(invalidItemQuantityERROR(item));
    if (!isNumber(item.price)) return left(invalidPriceERROR(item));
    const domainItem = new Item({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    })
    console.log({message:'Item has been created', item: domainItem})
    return right(domainItem
    );
  }
}
