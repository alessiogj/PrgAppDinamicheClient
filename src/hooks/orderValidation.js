export const validateOrder = (order) => {
    const { ord_num, ord_amount, advance_amount, order_date, cust_code, ord_description } = order;

    const ordNum = Number(ord_num);
    const ordAmount = Number(ord_amount);
    const advanceAmount = Number(advance_amount);

    if (isNaN(ordNum) || ordNum <= 0) {
        throw new Error('Il numero di ordine è richiesto e deve essere un numero valido.');
    }

    if (isNaN(ordAmount) || ordAmount <= 0) {
        throw new Error('L\'importo dell\'ordine è richiesto e deve essere un numero valido.');
    }

    if (isNaN(advanceAmount) || advanceAmount < 0) {
        throw new Error('L\'importo anticipato è richiesto e deve essere un numero valido.');
    }

    if (advanceAmount > ordAmount) {
        throw new Error('L\'importo anticipato non può essere maggiore dell\'importo dell\'ordine.');
    }

    if (!order_date) {
        throw new Error('La data dell\'ordine è richiesta.');
    }
    if (new Date(order_date) > new Date()) {
        throw new Error('La data dell\'ordine non può essere futura.');
    }

    if (!cust_code) {
        throw new Error('Il codice cliente è richiesto.');
    }

    if (!ord_description) {
        throw new Error('La descrizione dell\'ordine è richiesta.');
    }
};
