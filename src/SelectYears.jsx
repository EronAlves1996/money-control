export function SelectYears({ years, setYears }) {
  return (
    <section className="years" role="region" key="1">
      {years.map((year) => (
        <button
          onClick={() => {
            setYears(
              years.map((years) =>
                years.year === year.year
                  ? { ...years, selected: true }
                  : { ...years, selected: false }
              )
            );
          }}
          key={year.year.toString()}
        >
          {year.year}
        </button>
      ))}
    </section>
  );
}
