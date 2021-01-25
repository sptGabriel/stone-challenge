import { emailAlreadyAddedERROR, invalidEmailERROR } from "./appErrorHandler";
import { Item } from "./item";
import { logger } from "./loggerProvider";
import { Either, left, right } from "./utils/either";
import { isEmail } from "./utils/isEmail";

//here is challenge class
export class StoneChallenger {
  private itens: Item[] = [];
  private emails: string[] = [];

  public addEmail(email: string) {
    if (!isEmail(email)) return left(invalidEmailERROR(email));
    if (this.emails.includes(email)) return left(emailAlreadyAddedERROR(email));
    this.emails.push(email);
    return right({email, message: `Email has been added to email list`});
  }

  public addItem(item: Item) {
    if (!(item instanceof Item)) {
      return left({ message: `Invalid Item`, data: item });
    }
    this.itens.push(item);
    return right({item, message: `Item has been added to item list`});
  }

  public get Itens() {
    return this.itens;
  }

  public get Emails() {
    return this.emails;
  }

  public calculate() {
    // get total value from itens
    const total = this.itens
      .map((item) => item.total)
      .reduce((sum, current) => sum + current);
    //  resto inteiro da divisão
    let excess = total % this.emails.length;
    // get value per email
    const valuePerEmail = (total - excess) / this.emails.length;
    // key-value pair
    const result: { [email: string]: number } = {};
    // for of  to email key and price
    for (let email of this.emails) {
      //set email key and value
      result[email] = valuePerEmail;
      for (let i = 0; i < this.emails.length && excess > 0; i++) {
        result[email]++;
        excess--;
      }
    }
    return { ValuePerEmail: result, total };
  }
}
