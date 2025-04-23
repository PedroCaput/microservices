import Transaction from "../../domain/entities/Transaction";
import TransactionRepository from "../../application/repository/TransactionRepository";
import pgp from "pg-promise";

export default class TransactionRepositoryDataBase implements TransactionRepository {
/* // testar banco em memória: 
constructor(private readonly connection: any) {}

    async save(transaction: Transaction): Promise<void> {
        await this.connection.query(
            "insert into fullcyle.transaction (transaction_id, ticket_id, event_id, tid, price, status) values ($1, $2, $3, $4, $5, $6)",
            [
                transaction.transactionId,
                transaction.ticketId,
                transaction.eventId,
                transaction.tid,
                transaction.price,
                transaction.status
            ]
        );
    }
*/

    async save(transaction: Transaction): Promise<void> {
        const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
                await connection.query("insert into fullcyle.transaction (transaction_id, ticket_id, event_id, tid, price, status) values ($1, $2, $3, $4, $5, $6)", [
            transaction.transactionId, transaction.ticketId, transaction.eventId, transaction.tid, transaction.price, transaction.status
        ]);
        await connection.$pool.end();
    }
}