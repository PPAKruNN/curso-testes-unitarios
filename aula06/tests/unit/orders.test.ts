import { faker } from "@faker-js/faker";

import { createOrder, getOrderByProtocol } from "../../src/order-service";
import * as orderRepository from "../../src/order-repository";
import { OrderInput } from "../../src/validator";

describe("Order Service Tests", () => {
  it("should create an order", async () => {
    const input: OrderInput = {
      client: "Maria",
      description: "Teste do mock mock",
    };

    jest
      .spyOn(orderRepository, "create")
      .mockImplementationOnce((order: OrderInput): any => {
        return { protocol: "Mock string", status: "IN_PREPARATION" };
      });

    const res = await createOrder(input);

    expect(res).toEqual({
      protocol: expect.any(String),
      status: "IN_PREPARATION",
    });
  });

  it("should return an order based on the protocol", async () => {
    jest
      .spyOn(orderRepository, "getByProtocol")
      .mockImplementationOnce((protocol: string): any => {
        return { protocol: "Mock string", status: "IN_PREPARATION" };
      });

    const res = await getOrderByProtocol("AAA");

    expect(res).toEqual({
      protocol: "Mock string",
      status: "IN_PREPARATION",
    });
  });

  it("should return status INVALID when protocol doesn't exists", async () => {
    jest
      .spyOn(orderRepository, "getByProtocol")
      .mockImplementationOnce((): any => {
        return undefined;
      });

    const res = await getOrderByProtocol("AAA");

    expect(res).toEqual({
      protocol: "AAA",
      status: "INVALID",
    });
  });
});
