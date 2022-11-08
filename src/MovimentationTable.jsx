import { MONTHS } from "./SelectMonths";

export function MovimentationTable({ filters, data }) {
  const filteredData = data.filter((d) => {
    const wallet = filters.wallets.filter((w) => w.checked);
    const year = filters.wallets.filter((y) => y.selected);
    const month = filters.months
      ? filters.months.filter((m) => m.selected)
      : null;

    return (
      data.wallet === wallet &&
      new Date(data.date).getFullYear() === year &&
      MONTHS[new Date(data.date).getMonth()] === month
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
              <td>{d.date}</td>
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
