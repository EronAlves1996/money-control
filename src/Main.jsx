import { useState } from "react";
import { MovimentationTable } from "./MovimentationTable";
import { parseMonths, parseWalletsAndYears } from "./ParsingUtils";
import { SelectionOptions } from "./SelectionOptions";

export function Main() {
  const [isHaveFile, setIsHaveFile] = useState(false);
  const [wallets, setWallets] = useState([]);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState(null);
  const [data, setData] = useState(null);

  function parseFile(file) {
    file.text().then((transactions) => {
      const data = JSON.parse(transactions);
      setData(data);
      setIsHaveFile(true);
      parseData(data);
    });
  }

  function parseData(data) {
    const wAY = parseWalletsAndYears(data);
    setYears(
      wAY.years.map((year) => {
        return { year, selected: false };
      })
    );
    setWallets(
      wAY.wallets.map((wallet) => {
        return { wallet, checked: true };
      })
    );
    setMonths(parseMonths(data));
  }

  const selectedYear =
    years.length !== 0 && years.find((y) => y.selected)
      ? years.find((y) => y.selected).year
      : null;

  function selectYear(callback) {
    setYears(callback());
  }

  function selectMonth(callback) {
    const cbMonths = callback();
    const tempMonth = { ...months };
    tempMonth[selectedYear] = cbMonths;
    setMonths(tempMonth);
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
              monthOpts={{
                months: selectedYear ? months[selectedYear] : null,
                setMonths,
              }}
              callbacks={{ selectYear, selectMonth }}
            />
          </header>
          <MovimentationTable
            filters={{
              wallets,
              years,
              months: selectedYear ? months[selectedYear] : null,
            }}
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
