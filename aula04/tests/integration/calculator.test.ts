import supertest from "supertest";
import app from "../../src/app";
import { MathBody } from "../../src/validator";
import calculator from "calculator";

const api = supertest(app);

describe("calculator tests", () => {
  it("when missing params, should return status 422", async () => {
    const mathBody = {
      // missing properties on purpose
      operation: "sum",
    };

    const { status } = await api.post("/math").send(mathBody);
    expect(status).toBe(422);
  });

  it("if operation is invalid, should return status 400", async () => {
    const mathBody = {
      operation: "not",
      n1: 2,
      n2: 2,
    };

    const { status } = await api.post("/math").send(mathBody);
    expect(status).toBe(400);
  });

  it("should sum two numbers", () => {
    const result = calculator.sum(2, 2);
    expect(result).toBe(4);
  });

  it("should subtract two numbers", () => {
    const result = calculator.sub(2, 2);
    expect(result).toBe(0);
  });
  it("should multiply two numbers", () => {
    const result = calculator.mul(7, 2);
    expect(result).toBe(14);
  });

  it("should divide two numbers", () => {
    const result = calculator.div(8, 2);
    expect(result).toBe(4);
  });

  it("should return 0 when diving by zero", () => {
    const result = calculator.div(10, 0);
    expect(result).toBe(0);
  });
});
