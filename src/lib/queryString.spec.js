const { queryString, parse } = require("./queryString");

describe("Objeto para query string", () => {
  it("Deve criar um query string válido quando o objeto é igual", () => {
    const obj = {
      nome: "Lucas",
      profissao: "Desenvolvedor",
    };
    expect(queryString(obj)).toBe("nome=Lucas&profissao=Desenvolvedor");
  });

  it("Deve criar um query string válido quando o objeto é igual", () => {
    const obj = {
      nome: "Lucas",
      habilidades: ["JS", "TDD"],
    };
    expect(queryString(obj)).toBe("nome=Lucas&habilidades=JS,TDD");
  });

  it("Deve criar um query string válido quando o objeto é igual", () => {
    const obj = {
      nome: "Lucas",
      habilidades: {
        primeiro: "JS",
        segundo: "TDD",
      },
    };
    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe("Query string para objeto", () => {
  it("Deve converter query string para objeto", () => {
    const qs = "nome=Lucas&profissao=Desenvolvedor";
    expect(parse(qs)).toEqual({
      nome: "Lucas",
      profissao: "Desenvolvedor",
    });
  });

  it("Deve converter query string para objeto", () => {
    const qs = "nome=Lucas";
    expect(parse(qs)).toEqual({
      nome: "Lucas",
    });
  });
});
