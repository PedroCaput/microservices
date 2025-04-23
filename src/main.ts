import express, { Request, Response} from "express";
import PurchaseTicket from "./application/usecase/PurchaseTicket";
import TicketRepositoryDataBase from "./infra/repository/TicketRepositoryDataBase";
import Registry from "./infra/registry/Registry";
import EventRepositoryDataBase from "./infra/repository/EventRepositoryDataBase";
import FakePaymentGateway from "./infra/gateway/FakePaymentGateway";
import TransactionRepositoryDataBase from "./infra/repository/TransactionRepositoryDataBase";
import ProcessPayment from "./application/usecase/ProcessPayment";
const app = express();
app.use(express.json());
const registry = new Registry();


app.post("/purchase_ticket", async function (req: Request, res: Response) {
    const registry = new Registry();
    registry.provide("ticketRepository", new TicketRepositoryDataBase());
    registry.provide("eventRepository", new EventRepositoryDataBase());
    registry.provide("transactionRepository", new TransactionRepositoryDataBase());
    registry.provide("ProcessPayment", new ProcessPayment(registry));
    registry.provide("paymentGateway", new FakePaymentGateway());
    const purchaseTicket = new PurchaseTicket(registry);
    const output = await purchaseTicket.execute(req.body);
    res.json(output);
});

app.listen(3000);