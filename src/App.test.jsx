import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { useState } from "react";
import App, { SelectMonths, SelectWallets, SelectYears } from "./App";

describe("test SelectWallets component", () => {
  it("should not render when no wallet is passed", () => {
    render(<SelectWallets />);
    const el = screen.queryByText("Banco do Brasil");
    expect(el).toBeNull();
  });

  it("should not render when one wallet is passed", () => {
    render(<SelectWallets wallets={["Banco do Brasil"]} />);
    const el = screen.queryByText("Banco do Brasil");
    expect(el).toBeNull();
  });

  it("should render when two or more wallets is passed", () => {
    render(
      <SelectWallets
        wallets={[{ wallet: "Banco do Brasil" }, { wallet: "Santander" }]}
      />
    );
    const el = screen.queryByText("Banco do Brasil");
    const el2 = screen.queryByText("Santander");
    expect(el.textContent).toBe("Banco do Brasil");
    expect(el2.textContent).toBe("Santander");
  });
});

describe("test SelectYears component", () => {
  it("should detect if it has data", () => {
    render(<SelectYears />);
    expect(
      screen.getByText(
        "Você ainda não tem dados. Por favor, crie uma nova transação ou carregue dados."
      )
    ).toBeInTheDocument();
  });

  it("should not render any year if it has only one year", () => {
    render(<SelectYears years={[2022]} />);
    expect(screen.queryByRole("region")).toBe(null);
  });

  it("should render all years passed", () => {
    render(<SelectYears years={[2022, 2023]} />);
    expect(screen.queryByRole("region")).toHaveTextContent("2022");
    expect(screen.queryByRole("region")).toHaveTextContent("2023");
  });
});

describe("test months component", () => {
  it("should render only if years is selected", () => {
    function Wrapper() {
      const [selectedYear, setSelectedYear] = useState("");

      return (
        <>
          <SelectYears years={["2021", "2022"]} selectYear={setSelectedYear} />
          <SelectMonths selectedYear={selectedYear} months={["JAN", "FEV"]} />
        </>
      );
    }

    render(<Wrapper />);
    expect(screen.queryByText("JAN")).toBeNull();
    fireEvent.click(screen.getByText("2022"));
    expect(screen.getByText("JAN")).toBeInTheDocument();
  });

  it("should render only if it has more than 2 months passed", () => {
    function Wrapper() {
      const [selectedYear, setSelectedYear] = useState("");

      return (
        <>
          <SelectYears years={["2021", "2022"]} selectYear={setSelectedYear} />
          <SelectMonths selectedYear={selectedYear} months={["JAN", "FEV"]} />
        </>
      );
    }

    render(<Wrapper />);
    fireEvent.click(screen.getByText("2021"));
    expect(screen.getByText("JAN")).toBeInTheDocument();
    expect(screen.queryByText("MAR")).toBeNull();
  });

  it("should render no month if just one month passed", () => {
    function Wrapper() {
      const [selectedYear, setSelectedYear] = useState("");

      return (
        <>
          <SelectYears years={["2021", "2022"]} selectYear={setSelectedYear} />
          <SelectMonths selectedYear={selectedYear} months={["JAN"]} />
        </>
      );
    }

    render(<Wrapper />);
    fireEvent.click(screen.getByText("2022"));
    expect(screen.queryByText("JAN")).toBeNull();
  });
});

describe("General Integration Test", () => {
  const DATA = [
    {
      date: new Date("2022 10 05"),
      wallet: "Banco do Brasil",
      description: "Bala Halls",
      type: "Gasto diverso",
      value: -2.0,
    },
    {
      date: new Date("2022 10 03"),
      wallet: "Banco do Brasil",
      description: "Garrafa",
      type: "Trabalho",
      value: -15.0,
    },
    {
      date: new Date("2022 07 04"),
      wallet: "Banco do Brasil",
      description: "Ring Light",
      type: "Trabalho",
      value: -125.0,
    },
    {
      date: new Date("2022 04 03"),
      wallet: "Banco do Brasil",
      description: "Bala Halls",
      type: "Gasto diverso",
      value: -2.0,
    },
    {
      date: new Date("2021 05 23"),
      wallet: "Banco do Brasil",
      description: "Garrafa",
      type: "Trabalho",
      value: -15.0,
    },
    {
      date: new Date(),
      wallet: "Santander",
      description: "Ring Light",
      type: "Trabalho",
      value: -125.0,
    },
    {
      date: new Date("2022 03 01"),
      wallet: "Santander",
      description: "Bala Halls",
      type: "Gasto diverso",
      value: -2.0,
    },
    {
      date: new Date("2021 04 01"),
      wallet: "Carteira",
      description: "Garrafa",
      type: "Trabalho",
      value: -15.0,
    },
    {
      date: new Date(),
      wallet: "Carteira",
      description: "Ring Light",
      type: "Trabalho",
      value: -125.0,
    },
  ];

  it("should be able to upload some file", async () => {
    File.prototype.text = jest.fn().mockResolvedValueOnce(JSON.stringify(DATA));
    render(<App />);
    const el = screen.getByTestId("file-upload");
    fireEvent.change(el, {
      target: {
        files: [
          new File(
            [new Blob([JSON.stringify(DATA)], { type: "application/json" })],
            "transacoes.json"
          ),
        ],
      },
    });

    expect(await screen.findByTestId("wallets")).toHaveTextContent(
      /Santander/i
    );
    expect(await screen.findByTestId("wallets")).toHaveTextContent(
      /Banco do Brasil/i
    );
  });
});
