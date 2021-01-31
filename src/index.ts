import { Email } from "./email";
import { Item, ItemProps } from "./item";
import { StoneChallenge } from "./stoneChallenge";
import { Either } from "./utils/either";

//itens array
const itensData: any = [
  { name: "AOC", price: -11111, quantity: 30 },
  { name: "ROG", price: 7550, quantity: 40 },
  { name: "MSI", price: 7550, quantity: 50 },
];
// emails array
const emails: string[] = [
  "1@gmail.com",
  "1@gmail.com",
  "3@gmail.com",
  "4@gmail.com",
  "5@gmail.com",
  "Error",
];
/**
 * @param {item} ItemProps
 * @returns {
 * message,
 * item,
 * }
 */
function createItem(item: ItemProps) {
  const domainItem: any = Item.build(item);
  if (domainItem.isLeft()) return console.error(domainItem.value);
  return { message: `Succes to create Item`, item: domainItem.value };
}
/**
 * @param {address} string
 * @returns {
 * message: string,
 * email,
 * }
 */
function createEmail(address: string) {
  const domainEmail: Either<Email, any> = Email.build({ address });
  if (domainEmail.isLeft()) return console.error(domainEmail.value);
  return {
    message: `Succes to create email`,
    email: domainEmail.value.email,
  };
}

function startChallenge(itens: ItemProps[], emails: string[]) {
  const challenge = StoneChallenge.getInstance();
  for (let item of itens) {
    const domainItem: any = createItem(item);
    if (domainItem && domainItem.item instanceof Item)
      challenge.addItem(domainItem.item);
  }
  for (let mail of emails) {
    const domainMail: any = createEmail(mail);
    if (domainMail && domainMail.email instanceof Email)
      challenge.addEmail(domainMail.email);
  }
  const result = challenge.calculate();
  console.log(result);
}

/**
 * @param {itens} ItemProps[]
 * @param {emails} string[]
 * @returns {
 * ValuePerEmail: Key Value Pair,
 * total: Integer,
 * R$: total em reais.
 * }
 */
startChallenge(itensData, emails);
