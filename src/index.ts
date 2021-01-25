import { rejects } from "assert";
import { promises } from "fs";
import { resolve } from "path";
import { Item, ItemProps } from "./item";
import { logger } from "./loggerProvider";
import { StoneChallenger } from "./stoneChallenge";
import { parallel } from "./utils/parallel";
import { customPromiseAllSettled } from "./utils/promiseAllSettled";

(async () => {
  //itens array
  const itensData: ItemProps[] = [
    { name: "AOC", price: 75.5, quantity: 30 },
    { name: "ROG", price: 100.99, quantity: 40 },
    { name: "MSI", price: 100.4, quantity: 50 },
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
  const Challenge = new StoneChallenger();
  const itens = await customPromiseAllSettled(
    itensData.map(
      (item) =>
        new Promise<Item>((resolve, reject) => {
          const domainItem: any = Item.build(item);
          if (domainItem instanceof Item) return resolve(domainItem);
          return reject(new Error(domainItem));
        })
    )
  );
  function fillItens() {
    return itens.map(
      (item: any) =>
        new Promise((resolve, reject) => {
          if (item.value instanceof Item) {
            const itemDomain = Challenge.addItem(item.value);
            console.log(itemDomain.value);
            return resolve(item.value);
          }
          reject(new Error(item));
        })
    );
  }
  function fillEmails() {
    return emails.map(
      (email: any) =>
        new Promise((resolve, reject) => {
          const emailHasAdded: any = Challenge.addEmail(email);
          if (emailHasAdded.isLeft()) {
            return reject(new Error(emailHasAdded.value));
          }
          console.log(emailHasAdded.value);
          resolve(emailHasAdded);
        })
    );
  }
  await customPromiseAllSettled([...fillItens(), ...fillEmails()]);
})();

//import { Item } from "./item";
//import { logger } from "./loggerProvider";
//import { StoneChallenger } from "./stoneChallenge";

////itens array
//const itensData: any = [
//  { name: "AOC", price: 75.5, quantity: 30 },
//  { name: "ROG", price: 100.99, quantity: 40 },
//	{ name: "MSI", price: 100.4, quantity: 50 },
//];
//// emails array
//const emails: string[] = [
//  "1@gmail.com",
//  "1@gmail.com",
//  "3@gmail.com",
//  "4@gmail.com",
//  "5@gmail.com",
//  "Error",
//];
//// map itens data and create item domain
//const domainItens: any = itensData.map((item: any) => Item.build(item));
//// create stone challenge
//const Challenge = new StoneChallenger();
//// add emails to emails list on challenge class
//for (let email of emails) Challenge.addEmail(email);
//// for each list of domain itens and add item to itens list on challenge class
//for (let item of domainItens) if (item instanceof Item) Challenge.addItem(item);
//const Result = Challenge.calculate()
//// log the result
//logger.info(Result);
