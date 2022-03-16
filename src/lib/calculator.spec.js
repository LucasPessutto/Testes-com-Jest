const { sum } = require("./calculator");

it("Deve somar 2 + 2 e o retorno tem que ser 4 ", () => {
  expect(sum(2, 2)).toBe(4);
});

it("Deve transformar 2 + 2 de string para numérico", () => {
  expect(sum("2", "2")).toBe(4);
});

it("Deve retornar um erro se um item for not a number", () => {
  expect(() => {
    sum("", 2);
  }).toThrowError();

  expect(() => {
    sum([2, 2]);
  }).toThrowError();

  expect(() => {
    sum({});
  }).toThrowError();

  expect(() => {
    sum();
  }).toThrowError();
});
