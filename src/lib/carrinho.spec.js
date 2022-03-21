import Carrinho from "./carrinho";

describe("Carrinho de compras", () => {
  let carrinho;
  let produto = {
    titulo: "Tenis Adidas",
    preco: 35388,
  };

  let produto2 = {
    titulo: "Tenis Nike",
    preco: 41872,
  };

  beforeEach(() => {
    carrinho = new Carrinho();
  });

  describe("PegarTotal", () => {
    it("Deve retornar 0 quando o getTotal() for executado a primeira vez", () => {
      expect(carrinho.pegarTotal()).toEqual(0);
    });

    it("Deve multiplicar a quantidade de preço e receber a quantia total", () => {
      const item = {
        produto,
        quantidade: 2,
      };
      carrinho.add(item);
      expect(carrinho.pegarTotal()).toEqual(70776);
    });

    it("Deve garantir que o tenha apenas um produto no carrinho por vez", () => {
      carrinho.add({
        produto,
        quantidade: 2,
      });

      carrinho.add({
        produto,
        quantidade: 1,
      });

      expect(carrinho.pegarTotal()).toEqual(35388);
    });

    it("Deve atualizar o total quando remover um produto", () => {
      carrinho.add({
        produto,
        quantidade: 2,
      });

      carrinho.add({
        produto: produto2,
        quantidade: 1,
      });

      carrinho.remover(produto);

      expect(carrinho.pegarTotal()).toEqual(41872);
    });
  });

  describe("Checkout", () => {
    it("Deve retornar o objeto com o total e a lista de items", () => {
      carrinho.add({
        produto,
        quantidade: 2,
      });

      carrinho.add({
        produto: produto2,
        quantidade: 3,
      });

      expect(carrinho.checkout()).toMatchInlineSnapshot(`
        Object {
          "items": Array [
            Object {
              "produto": Object {
                "preco": 35388,
                "titulo": "Tenis Adidas",
              },
              "quantidade": 2,
            },
            Object {
              "produto": Object {
                "preco": 41872,
                "titulo": "Tenis Nike",
              },
              "quantidade": 3,
            },
          ],
          "total": 196392,
        }
      `);
    });

    it("Deve retornar o objeto com o total maior que zero e a lista de items", () => {
      carrinho.add({
        produto,
        quantidade: 4,
      });

      carrinho.add({
        produto: produto2,
        quantidade: 2,
      });

      expect(carrinho.pegarTotal()).toBeGreaterThan(0);
      expect(carrinho.checkout()).toMatchInlineSnapshot(`
        Object {
          "items": Array [
            Object {
              "produto": Object {
                "preco": 35388,
                "titulo": "Tenis Adidas",
              },
              "quantidade": 4,
            },
            Object {
              "produto": Object {
                "preco": 41872,
                "titulo": "Tenis Nike",
              },
              "quantidade": 2,
            },
          ],
          "total": 225296,
        }
      `);
    });

    it("Deve zerar o carrinho quando o checkout for chamado", () => {
      carrinho.add({
        produto: produto2,
        quantidade: 3,
      });

      carrinho.checkout();

      expect(carrinho.pegarTotal()).toEqual(0);
    });
  });
});
