import find from "lodash/find";
import remove from "lodash/remove";
import Dinero from "dinero.js";

const calcularPorcentagemDesconto = (amount, { condicao, quantidade }) => {
  if (condicao?.porcentagem && quantidade > condicao.minimo) {
    return amount.percentage(condicao.porcentagem);
  }
  return dinheiro({ amount: 0 });
};

const calcularQuatidadeDesconto = (amount, { condicao, quantidade }) => {
  const par = quantidade % 2 === 0;
  if (condicao?.quantidade && quantidade > condicao.quantidade) {
    return amount.percentage(par ? 50 : 40);
  }
  return dinheiro({ amount: 0 });
};

const calcularDesconto = (amount, quantidade, condicao) => {
  const lista = Array.isArray(condicao) ? condicao : [condicao];

  const [maiorDesconto] = lista
    .map((cond) => {
      if (cond.porcentagem) {
        return calcularPorcentagemDesconto(amount, {
          condicao: cond,
          quantidade,
        }).getAmount();
      } else if (cond.quantidade) {
        return calcularQuatidadeDesconto(amount, {
          condicao: cond,
          quantidade,
        }).getAmount();
      }
    })
    .sort((a, b) => b - a);
  return dinheiro({ amount: maiorDesconto });
};

const dinheiro = Dinero;

(dinheiro.defaultCurrency = "BRL"), (dinheiro.defaultPrecision = 2);

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
    return this.items.reduce((acc, { quantidade, produto, condicao }) => {
      const amount = dinheiro({ amount: quantidade * produto.preco });
      let desconto = dinheiro({ amount: 0 });

      if (condicao) {
        desconto = calcularDesconto(amount, quantidade, condicao);
      }

      return acc.add(amount).subtract(desconto);
    }, dinheiro({ amount: 0 }));
  }

  summary() {
    const total = this.pegarTotal();
    const formatado = total.toFormat("$0,0.00");
    const items = this.items;

    console.log(formatado);

    return {
      total,
      formatado,
      items,
    };
  }

  checkout() {
    const { total, items } = this.summary();

    this.items = [];

    return {
      total: total.getAmount(),
      items,
    };
  }
}
