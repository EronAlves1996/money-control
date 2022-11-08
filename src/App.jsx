import { useState } from "react";
import "./App.css";
import { SelectionOptions } from "./SelectionOptions";

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

function parseWalletsAndYears(data) {
  data.reduce(
    (acc, trans) => {
      const wallet = trans.wallet;
      const date = new Date(trans.date);
      const year = date.getYear();

      if (!acc.wallets.some((w) => w === wallet)) {
        acc.wallets.push(wallet);
      }

      if (!acc.years.some((y) => y === year)) {
        acc.years.push(year);
      }

      return acc;
    },
    { wallets: [], years: [] }
  );
}

function Main() {
  const [isHaveFile, setIsHaveFile] = useState(false);
  const [wallets, setWallets] = useState([]);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState(null);
  const [data, setData] = useState({});

  function parseFile(file) {
    file.text().then((transactions) => setData(JSON.parse(transactions)));
  }

  if (data) {
    const wAY = parseWalletsAndYears(data);
    setYears(wAY.years);
    setWallets(wAY.wallets);
  }

  return (
    <main>
      {isHaveFile ? (
        <>
          <header>
            <h3>Movimentações</h3>
            <SelectionOptions
              walletsOpts={{ wallets, setWallets }}
              yearOpts={{ years, setYears }}
              monthOpts={{ months, setMonths }}
              data={data}
            />
          </header>
          <MovimentationTable
            wallets={wallets}
            years={years}
            months={months}
            data={data}
          />
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
