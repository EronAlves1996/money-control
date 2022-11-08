export function SelectYears({ years, setYears, setMonths }) {
  const mapYears =
    years && years.length > 1 ? (
      years.map((year) => (
        <a
          onClick={() => {
            setYears(
              years.map((years) =>
                years.year === year.year
                  ? { ...year, selected: true }
                  : { ...years, selected: false }
              )
            );
            setMonths(null);
          }}
          key={years.year}
        >
          {year.year}
        </a>
      ))
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
