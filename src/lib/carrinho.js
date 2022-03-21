import find from "lodash/find";
import remove from "lodash/remove";

export default class Carrinho {
  items = [];

  add(item) {
    const procurarItem = { produto: item.produto };

    if (find(this.items, procurarItem)) {
      remove(this.items, procurarItem);
    }
    this.items.push(item);
  }

  remover(produto) {
    remove(this.items, { produto });
  }

  pegarTotal() {
    return this.items.reduce((acc, item) => {
      return acc + item.quantidade * item.produto.preco;
    }, 0);
  }

  summary() {
    const total = this.pegarTotal();
    const items = this.items;

    return {
      total,
      items,
    };
  }

  checkout() {
    const { total, items } = this.summary();

    this.items = [];

    return {
      total,
      items,
    };
  }
}
