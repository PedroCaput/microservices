import { createTestDatabase } from "./db-helper";
import TransactionRepositoryDataBase from "../src/infra/repository/TransactionRepositoryDataBase";
import TicketRepositoryDataBase from "../src/infra/repository/TicketRepositoryDataBase";
import PurchaseTicket from "../src/application/usecase/PurchaseTicket";

test("Deve comprar um ingresso (sem servidor HTTP)", async () => {
    const connection = await createTestDatabase();

    const ticketRepository = new TicketRepositoryDataBase(connection);
    const transactionRepository = new TransactionRepositoryDataBase(connection);

    const purchaseTicket = new PurchaseTicket(ticketRepository, transactionRepository);

    const input = {
        eventId: "a0bcd12e3-fg45-hij6-7klm-n8o9pqrstucxy",
        email: "john.wick@gmail.com",
        creditCardToken: "987654321"
    };

    const output = await purchaseTicket.execute(input);

    expect(output.ticketId).toBeDefined();
    expect(output.tid).toBeDefined();
    expect(output.status).toBe("paid");
    expect(output.price).toBe(300);
});
