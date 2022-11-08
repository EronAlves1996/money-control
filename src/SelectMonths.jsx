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
  const monthArr = data.reduce((acc, trans) => {
    const date = new Date(trans.date);
    if (date.getYear() !== year) return acc;

    if (!acc.some((month) => month === MONTHS[date.getMonth()]))
      acc.push(MONTHS[date.getMonth()]);

    return acc;
  }, []);
  return monthArr.map((month) => {
    return { month, selected: false };
  });
}

export function SelectMonths({ years, months, setMonths, data }) {
  if (!years.some((year) => year.selected === false)) {
    return null;
  }

  const year = years.find((year) => year.selected === true);
  const parsedMonths = parseMonths(data, year);

  if (!months) {
    setMonths(parsedMonths);
  }

  return (
    <section className="months" role="region">
      {parsedMonths.map((month) => (
        <a
          onClick={() => {
            setMonths(
              parsedMonths.map((m) => {
                if (m.month === month.month)
                  return { ...month, selected: true };
                return { ...month, selected: false };
              })
            );
          }}
        >
          month.month
        </a>
      ))}
    </section>
  );
}
