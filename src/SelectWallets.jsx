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
