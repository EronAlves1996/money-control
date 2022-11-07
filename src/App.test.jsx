import { render, screen } from "@testing-library/react";
import App, { SelectWallets } from "./App";

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
