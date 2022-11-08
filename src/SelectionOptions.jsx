import { SelectMonths } from "./SelectMonths";
import { SelectWallets } from "./SelectWallets";
import { SelectYears } from "./SelectYears";

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
        setMonths={monthOpts.setMonths}
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
