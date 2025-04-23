import axios from 'axios';

test("Deve comprar um ingresso", async function() {
    const input = {
        eventId: "a0bcd12e3-fg45-hij6-7klm-n8o9pqrstucxy",
        email: "john.wick@gmail.com",
        creditCardToken: "987654321"
    }
    const reponse = await axios.post("http://localhost:3000/purchase_ticket", input);
    const output = reponse.data;
    console.log(output);
    expect(output.ticketId).toBeDefined();
    expect(output.tid).toBeDefined();
    expect(output.status).toBe("paid");
    expect(output.price).toBe(300);
    //'https://www.youtube.com/watch?v=gtv9szE_P1U';
});
