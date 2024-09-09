import { Request, Response } from "express";

class ServiceTwo {
  public async randomNumber(number: number) {
    console.log(number);
  }
}

export default new ServiceTwo();
