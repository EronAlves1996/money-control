import { useEffect } from "react";

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

export function SelectMonths({ years, months, setMonths, data }) {
  const year = years.find((year) => year.selected === true);
  const parsedMonths = parseMonths(data, year);

  useEffect(() => {
    setMonths(parsedMonths);
  }, [year]);

  if (!years.some((year) => year.selected === true)) {
    return null;
  }

  return (
    <section className="months" role="region">
      {parsedMonths.map((month) => (
        <button
          onClick={() => {
            setMonths(
              parsedMonths.map((m) => {
                if (m.month === month.month)
                  return { ...month, selected: true };
                return { ...month, selected: false };
              })
            );
          }}
          key={month.month}
        >
          {month.month}
        </button>
      ))}
    </section>
  );
}
