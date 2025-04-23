import Transaction from "../../domain/entities/Transaction";
import Registry from "../../infra/registry/Registry";
import PaymentGateway from "../gateway/PaymentGateway";
import TransactionRepository from "../repository/TransactionRepository";

export default class ProcessPayment{
    paymentGateway: PaymentGateway;
    transactionRepository: TransactionRepository;

    constructor(readonly registry: Registry){
        this.paymentGateway = registry.inject("paymentGateway");
        this.transactionRepository = registry.inject("transactionRepository");
    }

    async execute (input: Input): Promise<Output>{

        const output = await this.paymentGateway.createTransaction({email: input.email, creditCardToken: input.creditCardToken, price: input.price});
        const transaction = Transaction.create(input.ticketId, input.eventId, output.tid, input.price, output.status);
        await this.transactionRepository.save(transaction);

        return{
            tid: transaction.tid,
            price: transaction.price
        }
    }
}

type Input = {
    ticketId: string,
    eventId: string,
    email: string,
    price: number,
    creditCardToken: string
}

type Output = {
    status: string,
    tid: string,
    price: number
}