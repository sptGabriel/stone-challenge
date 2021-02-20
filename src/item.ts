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
export interface IItem {
  Name: string;
  Price: number;
  Quantity: number;
}
// here is my item domain
export class Item implements IItem{
  private name: string;
  private price: number;
  private quantity: number;

  private constructor({name,quantity,price}: ItemProps) {
    this.name = name;
    this.price = price;
    this.quantity = quantity
  }

  public get Name(): string {
    return this.name;
  }
  
  public get Price(): number {
    return this.price;
  }

  public get Quantity(): number {
    return this.quantity;
  }

  public get total() {
    return Number(this.price) * this.quantity;
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
