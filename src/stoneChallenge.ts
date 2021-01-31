import { emailAlreadyAddedERROR } from "./appErrorHandler";
import { Email } from "./email";
import { Item } from "./item";
import { formatter } from "./utils/currencyBR";

interface ChallengerProps {
  itens: Item[];
  emails: Email[];
}
//here is challenge class
export class StoneChallenge {
  private static instance: StoneChallenge;
  public readonly itens: Item[] = [];
  public readonly emails: string[] = [];

  static getInstance(): StoneChallenge {
    if (!StoneChallenge.instance)
      StoneChallenge.instance = new StoneChallenge();
    return StoneChallenge.instance;
  }

  public addEmail(email: Email) {
    if (!(email instanceof Email)) {
      return console.error({
        error: `Invalid Email Type`,
        message: `Please provide a valid email`,
        data: email,
      });
    }
    if (this.emails.includes(email.Address))
      return console.error(emailAlreadyAddedERROR(email.Address));
    this.emails.push(email.Address);
    console.log({
      address: email.Address,
      message:
        "The email address was successfully added to the challenge email list",
    });
  }

  public addItem(item: Item) {
    if(!(item instanceof Item)) return console.error({
      error: `Invalid Item Type`,
      message: `Please provide a valid item`,
      data: item,
    })
    this.itens.push(item);
    console.log({
      item: item.props,
      message: "The item was successfully added to the challenge item list",
    });
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
    return { ValuePerEmail: result, total, R$: formatter.format(total / 100) };
  }
}
