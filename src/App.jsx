import "./App.css";

function MovimentationTable() {
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
          <tr>
            <td>10/10/2010</td>
            <td>Banco do brasil</td>
            <td>Bala Halls</td>
            <td>R$ 2,00</td>
          </tr>
          <tr>
            <td>10/10/2010</td>
            <td>Banco do brasil</td>
            <td>Bala Halls</td>
            <td>R$ 2,00</td>
          </tr>
          <tr>
            <td>10/10/2010</td>
            <td>Banco do brasil</td>
            <td>Bala Halls</td>
            <td>R$ 2,00</td>
          </tr>
          <tr>
            <td>10/10/2010</td>
            <td>Banco do brasil</td>
            <td>Bala Halls</td>
            <td>R$ 2,00</td>
          </tr>
          <tr>
            <td>10/10/2010</td>
            <td>Banco do brasil</td>
            <td>Bala Halls</td>
            <td>R$ 2,00</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}

export function SelectWallets({ wallets }) {
  if (wallets && wallets.length > 1) {
    return (
      <section class="counts">
        {wallets.map((wallet) => (
          <label htmlFor={wallet} key={wallet}>
            <input type="checkbox" />
            {wallet}
          </label>
        ))}
      </section>
    );
  } else return <></>;
}

export function SelectYears({ years, selectYear }) {
  const mapYears =
    years && years.length > 1 ? (
      years.map((year) => <a onClick={() => selectYear(year)}>{year}</a>)
    ) : (
      <p>
        Você ainda não tem dados. Por favor, crie uma nova transação ou carregue
        dados.
      </p>
    );

  return !years || years.length !== 1 ? (
    <section class="years" role="region">
      {mapYears}
    </section>
  ) : null;
}

export function SelectMonths({ selectedYear }) {
  return selectedYear ? (
    <section class="months">
      <a href="#">JAN</a> <a href="#">FEV</a> <a href="#">MAR</a>{" "}
      <a href="#">ABR</a> <a href="#">MAI</a> <a href="#">JUN</a>{" "}
      <a href="#">JUL</a> <a href="#">AGO</a> <a href="#">SET</a>{" "}
      <a href="#">OUT</a> <a href="#">NOV</a> <a href="#">DEZ</a>
    </section>
  ) : null;
}

function SelectionOptions() {
  return (
    <nav>
      <SelectWallets />
      <SelectYears />
      <selectedYear />
    </nav>
  );
}

const DATA = [
  {
    date: new Date(),
    wallet: "Banco do Brasil",
    description: "Bala Halls",
    type: "Gasto diverso",
    value: -2.0,
  },
  {
    date: new Date(),
    wallet: "Banco do Brasil",
    description: "Garrafa",
    type: "Trabalho",
    value: -15.0,
  },
  {
    date: new Date(),
    wallet: "Banco do Brasil",
    description: "Ring Light",
    type: "Trabalho",
    value: -125.0,
  },
];

function Main() {
  return (
    <main>
      <header>
        <h3>Movimentações</h3>
        <SelectionOptions />
      </header>
      <MovimentationTable />
    </main>
  );
}

function App() {
  return (
    <div>
      <header>
        <h2>$$$ Money Control App $$$</h2>
      </header>
      <Main />
      <footer>
        <p>Licença GPL - All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;
