import "./App.css";

function App() {
  return (
    <div>
      <header>
        <h2>$$$ Money Control App $$$</h2>
      </header>
      <main>
        <header>
          <h3>Movimentações</h3>
          <nav>
            <section class="counts">
              <label htmlFor="">
                <input type="checkbox" /> Conta 1
              </label>
              <label htmlFor="">
                <input type="checkbox" /> Conta 2
              </label>
              <label htmlFor="">
                <input type="checkbox" /> Conta 3
              </label>
            </section>
            <section class="years">
              <a href="#">2020</a> <a href="#">2021</a> <a href="#">2022</a>
            </section>
            <section class="months">
              <a href="#">JAN</a> <a href="#">FEV</a> <a href="#">MAR</a>{" "}
              <a href="#">ABR</a> <a href="#">MAI</a> <a href="#">JUN</a>{" "}
              <a href="#">JUL</a> <a href="#">AGO</a> <a href="#">SET</a>{" "}
              <a href="#">OUT</a> <a href="#">NOV</a> <a href="#">DEZ</a>
            </section>
          </nav>
        </header>
        <main>
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Conta</th>
                <th>Descrição</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10/10/2010</td>
                <td>Banco do brasil</td>
                <td>Bala Halls</td>
                <td>R$ 2,00</td>
              </tr>
              <tr>
                <td>10/10/2010</td>
                <td>Banco do brasil</td>
                <td>Bala Halls</td>
                <td>R$ 2,00</td>
              </tr>
              <tr>
                <td>10/10/2010</td>
                <td>Banco do brasil</td>
                <td>Bala Halls</td>
                <td>R$ 2,00</td>
              </tr>
              <tr>
                <td>10/10/2010</td>
                <td>Banco do brasil</td>
                <td>Bala Halls</td>
                <td>R$ 2,00</td>
              </tr>
              <tr>
                <td>10/10/2010</td>
                <td>Banco do brasil</td>
                <td>Bala Halls</td>
                <td>R$ 2,00</td>
              </tr>
            </tbody>
          </table>
        </main>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
