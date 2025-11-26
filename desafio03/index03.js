// --- GRASP: Entidade básica ---
class Pedido {
    constructor(id, itens, total) {
        this.id = id;
        this.itens = itens;
        this.total = total;
    }

    resumo() {
        return `Pedido #${this.id} - Total: R$ ${this.total}`;
    }
}

// --- GRASP: Creator ---
class PedidoController {
    constructor() {
        this.proximoId = 1;
    }

    // --- GRASP: Controller ---
    criarPedido(itens) {
        const total = this.calcularTotal(itens);

        const pedido = new Pedido(this.proximoId++, itens, total);

        console.log("Pedido criado com sucesso!");
        console.log(pedido.resumo());

        return pedido;
    }

    calcularTotal(itens) {
        return itens.reduce((sum, item) => sum + item.preco, 0);
    }
}

// --- Uso ---
const controller = new PedidoController();

controller.criarPedido([
    { nome: "Mouse", preco: 80 },
    { nome: "Teclado", preco: 150 }
]);
