import { render, screen } from "@testing-library/react";
import { SelectWallets, SelectYears } from "./App";

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
    render(<SelectWallets wallets={["Banco do Brasil", "Santander"]} />);
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