import { shallowEqual } from "shallow-equal-object";

export class ValueObject<Props extends {[index: string]: any}> {
  public props: Readonly<Props>
  constructor(props:Props){
    this.props = props;
  }
  public equals(object?: ValueObject<Props>): boolean {
    if (object === null || object === undefined) return false;
    if (object.props === undefined) return false;
    return shallowEqual(this.props, object.props);
  }
}