import { invalidEmailERROR } from "./appErrorHandler";
import { Either, left, right } from "./utils/either";
import { isEmail } from "./utils/isEmail";
import { ValueObject } from "./utils/valueObject";

export interface IEmailProps {
  address: string;
}
export class Email extends ValueObject<IEmailProps> {
  get Address(): string {
    return this.props.address;
  }

  private constructor({ address }: IEmailProps) {
    super({ address });
  }

  private static isEmail(email: string) {
    return isEmail(email);
  }

  public static build({
    address,
  }: IEmailProps): Either<any, { email: Email; message: string }> {
    if (!this.isEmail(address)) return left(invalidEmailERROR(address));
    const domainEmail = new Email({ address: address.toLowerCase() });
    console.log({ email: domainEmail.props, message: `Email has been created` })
    return right({ email: domainEmail, message: `Email has been created` });
  }
}
