import { generateProtocolForPacient } from "protocols-generator";
jest.mock("uuid", () => {
  return {
    v4: () => "Valor do mock",
  };
});

describe("calculator tests", () => {
  it("", async () => {
    const result = generateProtocolForPacient("Ana", "Maria", true);
    expect(result).toMatchObject({
      priority: true,
      pacient: "Ana Maria",
      protocol: "Valor do mock",
    });
  });
});
