export function SelectWallets({ wallets, setWallets }) {
  if (wallets && wallets.length > 1) {
    return (
      <section className="counts" data-testid="wallets">
        {wallets.map((wallet) => (
          <label htmlFor={wallet.wallet} key={wallet.wallet}>
            <input
              type="checkbox"
              checked={wallet.checked}
              onChange={(e) => {
                const walletsTemp = [...wallets];
                walletsTemp[
                  walletsTemp.findIndex((w) => w.wallet === wallet)
                ].checked = e.target.checked;
                setWallets(walletsTemp);
              }}
            />
            {wallet.wallet}
          </label>
        ))}
      </section>
    );
  } else return <></>;
}

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
            setMonths({});
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

function parseMonths(data, year) {
  const MONTHS = [
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

export function SelectionOptions({ walletsOpts, yearOpts, monthOpts, data }) {
  return (
    <nav>
      <SelectWallets
        wallets={walletsOpts.wallets}
        setWallets={walletsOpts.setWallets}
      />
      <SelectYears
        years={yearOpts.years}
        setYears={yearOpts.setYears}
        setMonths={monthOpts.setMonthts}
      />
      <SelectMonths
        years={yearOpts.years}
        months={monthOpts.months}
        setMonths={monthOpts.setMonths}
        data={data}
      />
    </nav>
  );
}
