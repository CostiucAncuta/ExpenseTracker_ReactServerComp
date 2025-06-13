export default function formatCurrency(value: number): string {
  const fmt = new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    currencyDisplay: "narrowSymbol",
  });

  return fmt.format(value);
}
