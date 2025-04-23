import Ticket from "../../domain/entities/Ticket";
import TicketReserved from "../../domain/event/TicketReserved";
import Queue from "../../infra/queue/Queue";
import Registry from "../../infra/registry/Registry";
import PaymentGateway from "../gateway/PaymentGateway";
import EventRepository from "../repository/EventRepository";
import TicketRepository from "../repository/TicketRepository";
import ProcessPayment from "./ProcessPayment";

export default class PurchaseTicket{
    eventRepository: EventRepository;
    ticketRepository: TicketRepository;
    processPayment: ProcessPayment;
    paymentGateway: PaymentGateway;
    queue: Queue;

    constructor(readonly registry: Registry){
        this.eventRepository = registry.inject("eventRepository");
        this.ticketRepository = registry.inject("ticketRepository");
        this.processPayment = registry.inject("processPayment");
        this.paymentGateway = registry.inject("paymentGateway");
        this.queue = registry.inject("queue");
    }

    async execute (input: Input): Promise<Output>{
        const event = await this.eventRepository.get(input.eventId);
        const ticket = Ticket.create(input.eventId, input.email);
        await this.ticketRepository.save(ticket);

        const ticketReserved = new TicketReserved(ticket.ticketId, event.eventId, input.creditCardToken, event.price);
        await this.queue.publish("ticketReserved", ticketReserved);


        /*
       const output = await this.processPayment.execute({ 
            ticketId: ticket.ticketId, 
            eventId: event.eventId, 
            email: ticket.email,
            price: event.price,
            creditCardToken: input.creditCardToken});

        if(output.status === "approved"){
            ticket.approve();
        } else  {
            ticket.cancel();
        }

        await this.ticketRepository.update(ticket);

        return{
            ticketId: ticket.ticketId,
            status: ticket.status,
            tid: output.tid,
            price: output.price
        }

        */
    }
}

type Input = {
    eventId: string,
    email: string,
    creditCardToken: string
}

type Output = {
    ticketId: string,
}