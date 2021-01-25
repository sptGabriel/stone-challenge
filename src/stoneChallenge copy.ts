import { emailAlreadyExistsERROR, invalidEmailERROR } from "./appErrorHandler";
import { Item } from "./item";
import { logger } from "./loggerProvider";
import { isEmail } from "./utils/isEmail";

//here is challenge class
export class StoneChallenger {
  private itens: Item[] = [];
  private emails: string[] = [];

  public addEmail(email: string) {
    if (!isEmail(email)) return logger.error(invalidEmailERROR(email));
    if (this.emails.includes(email))
      return logger.error(emailAlreadyExistsERROR(email));
    this.emails.push(email);
    logger.info(`Email: ${email} has been added to emails list`);
  }

  public addItem(item: Item) {
    if (!(item instanceof Item)) return logger.error(`${item}, is invalid`);
    this.itens.push(item);
    logger.info(`Item: ${item.name} has been added to itens list`);
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
