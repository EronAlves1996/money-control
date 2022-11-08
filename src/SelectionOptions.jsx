import { useEffect } from "react";
import { SelectMonths } from "./SelectMonths";
import { SelectWallets } from "./SelectWallets";
import { SelectYears } from "./SelectYears";

export const MONTHS = [
  "JAN",
  "FEV",
  "MAR",
  "ABR",
  "MAI",
  "JUN",
  "JUL",
  "AGO",
  "SET",
  "OUT",
  "NOV",
  "DEZ",
];

function parseMonths(data, year) {
  if (!year) return;
  const monthArr = data.reduce((acc, trans) => {
    const date = new Date(trans.date);
    if (date.getFullYear() !== year.year) return acc;

    if (!acc.some((month) => month === MONTHS[date.getMonth()]))
      acc.push(MONTHS[date.getMonth()]);

    return acc;
  }, []);
  return monthArr.map((month) => {
    return { month, selected: false };
  });
}

export function SelectionOptions({ walletsOpts, yearOpts, monthOpts, data }) {
  const year = yearOpts.years.find((year) => year.selected === true);
  const parsedMonths = parseMonths(data, year);

  useEffect(() => {
    monthOpts.setMonths(parsedMonths);
  }, [year]);

  return (
    <nav>
      <SelectWallets
        wallets={walletsOpts.wallets}
        setWallets={walletsOpts.setWallets}
      />

      {yearOpts.years ? <p>Parece que ainda não há dados carregados!</p> : null}

      {yearOpts.years && yearOpts.years.length !== 1 ? (
        <SelectYears years={yearOpts.years} setYears={yearOpts.setYears} />
      ) : null}

      {monthOpts.months && monthOpts.months.length !== 1 ? (
        <SelectMonths
          months={monthOpts.months}
          setMonths={monthOpts.setMonths}
        />
      ) : null}
    </nav>
  );
}
