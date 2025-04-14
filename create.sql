drop schema fullcycle cascade;
create schema fullcycle;

create table fullcycle.event(
    event_id uuid,
    description text,
    price numeric,
    capacity integer
);

create table fullcycle.ticket (
    ticket_id uuid,
    event_id uuid,
    email text,
    status text
);

create table fullcycle.transaction (
    transaction_id uuid,
    ticket_id uuid,
    event_id uuid,
    price numeric,
    status text
);

insert into fullcycle.event (event_id, description, price, capacity) values ('a0bcd12e3-fg45-hij6-7klm-n8o9pqrstucxy', 'Xuxa 10/10')