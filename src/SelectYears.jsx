export function SelectYears({ years, setYears }) {
  const mapYears =
    years && years.length > 1 ? (
      years.map((year) => (
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
      ))
    ) : (
      <p>
        Você ainda não tem dados. Por favor, crie uma nova transação ou carregue
        dados.
      </p>
    );

  return !years || years.length !== 1 ? (
    <section className="years" role="region" key="1">
      {mapYears}
    </section>
  ) : null;
}
