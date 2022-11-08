import { useState } from "react";
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

export function SelectWallets({ wallets, setWallets }) {
  if (wallets && wallets.length > 1) {
    return (
      <section className="counts" data-testid="wallets">
        {wallets.map((wallet) => (
          <label htmlFor={wallet.wallet} key={wallet.wallet}>
            <input
              type="checkbox"
              checked={wallet.checked}
              onChange={(e) => {
                const walletsTemp = [...wallets];
                walletsTemp[
                  walletsTemp.findIndex((w) => w.wallet === wallet)
                ].checked = e.target.checked;
                setWallets(walletsTemp);
              }}
            />
            {wallet.wallet}
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
    <section className="years" role="region">
      {mapYears}
    </section>
  ) : null;
}

export function SelectMonths({ selectedYear, months }) {
  return selectedYear && months.length > 1 ? (
    <section className="months">
      {months.map((month) => (
        <a>{month}</a>
      ))}
    </section>
  ) : null;
}

function SelectionOptions({ walletsOpts }) {
  return (
    <nav>
      <SelectWallets
        wallets={walletsOpts.wallets}
        setWallets={walletsOpts.setWallets}
      />
      <SelectYears />
      <selectedYear />
    </nav>
  );
}

function Main() {
  const MONTHS = [
    "JAN",
    "FEV",
    "MAR",
    "ABR",
    "MAI",
    "JUN",
    "AGO",
    "SET",
    "OUT",
    "NOV",
    "DEZ",
  ];
  const [isHaveFile, setIsHaveFile] = useState(false);
  const [wallets, setWallets] = useState([]);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);

  function parseFile(file) {
    file
      .text()
      .then((transactions) => JSON.parse(transactions))
      .then((res) =>
        res.reduce(
          (acc, trans) => {
            const wallet = trans.wallet;
            const date = new Date(trans.date);
            const year = date.getYear();
            const month = MONTHS[date.getMonth()];

            if (!acc.wallets.some((w) => w === wallet)) {
              acc.wallets.push(wallet);
            }

            if (!acc.years.some((y) => y === year)) {
              acc.years.push(year);
            }

            if (!acc.months.some((m) => m === month)) {
              acc.months.push(month);
            }

            return acc;
          },
          { wallets: [], years: [], months: [] }
        )
      )
      .then((result) => {
        setWallets(
          result.wallets.map((wallet) => {
            return { wallet, checked: false };
          })
        );
        setYears(result.years);
        setMonths(result.months);
      });
  }

  return (
    <main>
      {isHaveFile ? (
        <>
          <header>
            <h3>Movimentações</h3>
            <SelectionOptions walletsOpts={{ wallets, setWallets }} />
          </header>
          <MovimentationTable wallets={wallets} />
        </>
      ) : (
        <>
          <header>
            <h3>Bem vindo!!</h3>
          </header>
          <main>
            <form>
              <label htmlFor="file-upload">
                Abrir Arquivo
                <input
                  type="file"
                  name="file-upload"
                  id="file-upload"
                  data-testid="file-upload"
                  onChange={(e) => {
                    setIsHaveFile(true);
                    parseFile(e.target.files[0]);
                  }}
                />
              </label>
            </form>
            <button>Criar novo extrato</button>
          </main>
        </>
      )}
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
