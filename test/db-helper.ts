import { newDb } from "pg-mem";

export async function createTestDatabase() {
    const db = newDb();
    const pgp = db.adapters.createPgPromise();
    const connection = pgp();

    // Criando schema e tabelas conforme seu script
    await connection.none(`drop schema if exists fullcycle cascade`);
    await connection.none(`create schema fullcycle`);

    await connection.none(`
        create table fullcycle.event(
            event_id uuid primary key,
            description text,
            price numeric,
            capacity integer
        )
    `);

    await connection.none(`
        create table fullcycle.ticket (
            ticket_id uuid primary key,
            event_id uuid references fullcycle.event(event_id),
            email text,
            status text
        )
    `);

    await connection.none(`
        create table fullcycle.transaction (
            transaction_id uuid primary key,
            ticket_id uuid references fullcycle.ticket(ticket_id),
            event_id uuid references fullcycle.event(event_id),
            tid text,
            price numeric,
            status text
        )
    `);

    await connection.none(`
        insert into fullcycle.event (event_id, description, price, capacity)
        values ('a0bcd12e3-fg45-hij6-7klm-n8o9pqrstucxy', 'Xuxa 10/10/2025 23:00', 300, 1000)
    `);

    return connection;
}
