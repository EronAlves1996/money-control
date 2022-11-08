export function SelectMonths({ months, setMonths }) {
  return (
    <section className="months" role="region">
      {months.map((month) => (
        <button
          onClick={() => {
            setMonths(
              months.map((m) => {
                return m.month === month.month
                  ? { ...m, selected: true }
                  : { ...m, selected: false };
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
