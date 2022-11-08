import { SelectWallets } from "./SelectWallets";

export function SelectionOptions({
  walletsOpts,
  yearOpts,
  monthOpts,
  callbacks,
}) {
  return (
    <nav>
      <SelectWallets
        wallets={walletsOpts.wallets}
        setWallets={walletsOpts.setWallets}
      />

      {yearOpts.years === null ? (
        <p>Parece que ainda não há dados carregados!</p>
      ) : null}

      <SelectXWValidation opts={yearOpts} callback={callbacks.selectYear} />

      <SelectXWValidation opts={monthOpts} callback={callbacks.selectMonth} />
    </nav>
  );
}

function SelectXWValidation({ opts, callback }) {
  const attr = Object.keys(opts).at(0);

  return opts[attr] && opts[attr].length !== 1 ? (
    <SelectX subject={opts[Object.keys(opts).at(0)]} callback={callback} />
  ) : null;
}

function SelectX({ subject, callback }) {
  const attr = Object.keys(subject[0]).at(0);

  return (
    <section className={attr} role="region" key="1">
      {subject.map((s) => (
        <button
          onClick={() => {
            callback(() =>
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
