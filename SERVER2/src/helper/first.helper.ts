import firstClient from "../client/first.client";
import { promisify } from "util";
import { order } from "../../../PROTO/src/proto/authPackage/order";
import { value__Output } from "../../../PROTO/src/proto/authPackage/value";

class FirstClientHelper {
  private randomNumberAsync = promisify<order, value__Output>(
    firstClient.getRandomNumber
  ).bind(firstClient);

  public async generateRandomNumber(message: string) {
    const randomNumber = await this.randomNumberAsync(message);
    return randomNumber;
  }
}

export default new FirstClientHelper();
