import { MONTHS } from "./ParsingUtils";

export function MovimentationTable({ filters, data }) {
  const filteredData = data.filter((d) => {
    const wallet = filters.wallets.filter((w) => w.checked);
    const year = filters.years.filter((y) => y.selected);
    const month = filters.months
      ? filters.months.filter((m) => m.selected)
      : null;

    return (
      wallet.some((w) => d.wallet === w.wallet) &&
      new Date(d.date).getFullYear() === year[0]?.year &&
      (month ? MONTHS[new Date(d.date).getMonth()] === month[0]?.month : false)
    );
  });
  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Conta</th>
            <th>Descrição</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((d) => (
            <tr key={d.date}>
              <td>{new Date(d.date).toLocaleString()}</td>
              <td>{d.wallet}</td>
              <td>{d.description}</td>
              <td>{d.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
