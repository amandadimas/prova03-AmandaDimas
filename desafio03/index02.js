// SOLID - Single Responsibility Principle
class Invoice {
    constructor(items) {
        this.items = items;
      }
    
      total() {
        return this.items.reduce((s, i) => s + i.price, 0);
    }
}
    
class InvoiceRepository {
    save(invoice) {
        throw new Error("Método save() não implementado");
    }
}

// Implementação concreta (pode ter várias)
class DatabaseInvoiceRepository extends InvoiceRepository {
    save(invoice) {
        console.log("💾 Salvando no banco de dados...", invoice.total());
    }
}

// Outra implementação possível (extensão sem alterar código)
class FileInvoiceRepository extends InvoiceRepository {
    save(invoice) {
        console.log("📝 Salvando em arquivo texto... Total:", invoice.total());
    }
}

class InvoicePrinter {
    print(invoice) {
        console.log("🖨️ Impressão da fatura:");
        invoice.items.forEach(i => console.log(`- ${i.name}: R$ ${i.price}`));
        console.log("Total: R$", invoice.total());
    }
}

class InvoiceService {
    constructor(repository, printer) {
        this.repository = repository; 
        this.printer = printer;
    }

    process(invoice) {
        this.repository.save(invoice); 
        this.printer.print(invoice);
    }
}

// itens da compra
const invoice = new Invoice([
    { name: "Mouse", price: 80 },
    { name: "Teclado", price: 120 },
    { name: "Monitor", price: 900 }
]);

const repository = new DatabaseInvoiceRepository();

const printer = new InvoicePrinter();

const service = new InvoiceService(repository, printer);
service.process(invoice);