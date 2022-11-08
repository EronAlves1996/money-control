import { useEffect } from "react";
import { SelectWallets } from "./SelectWallets";

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

      <SelectXWValidation opts={yearOpts} />

      <SelectXWValidation opts={monthOpts} />
    </nav>
  );
}

function SelectXWValidation({ opts }) {
  const attr = Object.keys(opts).at(0);

  return opts[attr] && opts[attr].length !== 1 ? (
    <SelectX
      subject={opts[Object.keys(opts).at(0)]}
      setSubject={opts[Object.keys(opts).at(1)]}
    />
  ) : null;
}

function SelectX({ subject, setSubject }) {
  const attr = Object.keys(subject[0]).at(0);
  console.log(subject);

  return (
    <section className={attr} role="region" key="1">
      {subject.map((s) => (
        <button
          onClick={() => {
            setSubject(
              subject.map((sub) =>
                sub[attr] === s[attr]
                  ? { ...sub, selected: true }
                  : { ...sub, selected: false }
              )
            );
          }}
          key={s[attr].toString()}
        >
          {s[attr]}
        </button>
      ))}
    </section>
  );
}
