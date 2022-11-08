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

export function parseWalletsAndYears(data) {
  return data.reduce(
    (acc, trans) => {
      const wallet = trans.wallet;
      const date = new Date(trans.date);
      const year = date.getFullYear();

      if (!acc.wallets.some((w) => w === wallet)) {
        acc.wallets.push(wallet);
      }

      if (!acc.years.some((y) => y === year)) {
        acc.years.push(year);
      }

      return acc;
    },
    { wallets: [], years: [] }
  );
}

function putMonth(arr, month, year) {
  if (arr[year].some((m) => m.month === month)) {
  } else arr[year].push({ month, selected: false });
  return arr;
}

export function parseMonths(data) {
  return data.reduce((acc, trans) => {
    const date = new Date(trans.date);
    const year = date.getFullYear();
    const month = MONTHS[date.getMonth()];
    let arr = [];

    if (Object.keys(acc).some((y) => y === year.toString()))
      arr = putMonth(acc, month, year);
    else {
      acc[year] = [];
      arr = putMonth(acc, month, year);
    }

    return arr;
  }, {});
}
