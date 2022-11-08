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

export function SelectYears({ years, selectYear }) {
  const mapYears =
    years && years.length > 1 ? (
      years.map((year) => <a onClick={() => selectYear(year)}>{year}</a>)
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

export function SelectMonths({ selectedYear, months }) {
  return selectedYear && months.length > 1 ? (
    <section className="months">
      {months.map((month) => (
        <a>{month}</a>
      ))}
    </section>
  ) : null;
}

export function SelectionOptions({ walletsOpts }) {
  return (
    <nav>
      <SelectWallets
        wallets={walletsOpts.wallets}
        setWallets={walletsOpts.setWallets}
      />
      <SelectYears />
      <selectedYear />
    </nav>
  );
}