export const validateOrder = (order) => {
  const { ord_amount, advance_amount, ord_date, cust_code, ord_description } =
    order;

  const ordAmount = parseFloat(ord_amount);
  const advanceAmount = parseFloat(advance_amount);

  if (!isFinite(ordAmount) || ordAmount <= 0) {
    throw new Error(
      "L'importo dell'ordine è richiesto e deve essere un numero valido."
    );
  }

  if (!isFinite(advanceAmount) || advanceAmount < 0) {
    throw new Error(
      "L'importo anticipato è richiesto e deve essere un numero valido."
    );
  }

  if (advanceAmount > ordAmount) {
    throw new Error(
      "L'importo anticipato non può essere maggiore dell'importo dell'ordine."
    );
  }

  if (!ord_date) {
    throw new Error("La data dell'ordine è richiesta.");
  }
  if (new Date(ord_date) > new Date()) {
    throw new Error("La data dell'ordine non può essere futura.");
  }

  if (!cust_code) {
    throw new Error('Il codice cliente è richiesto.');
  }

  if (!ord_description) {
    throw new Error("La descrizione dell'ordine è richiesta.");
  }
};
