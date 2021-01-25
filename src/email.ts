import { Either, left, right } from "./utils/either";
import { isEmail } from "./utils/isEmail";
import { ValueObject } from "./utils/valueObject";

export interface IEmailProps {
  value: string;
}

export class Email extends ValueObject<IEmailProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: IEmailProps) {
    super(props);
  }

  private static isEmail(email: string) {
    return isEmail(email);
  }

  public static create(email: string): Either<any, Email> {
    if (!this.isEmail(email)) return left(`any`);
    return right(new Email({ value: email.toLowerCase() }));
  }
}
