import { useState } from "react";
import { evaluate, format } from "mathjs";
import "./App.css";

function App() {
  const [salary, setSalary] = useState("");
  const [prevSalary, setPrevSalary] = useState("");
  const [newSalary, setNewSalary] = useState("");
  const [increment, setIncrement] = useState();
  const [bonuses, setBonuses] = useState([]);

  const calcBonus = (e) => {
    e.preventDefault();
    const bonus = [];
    for (
      let i = 0.05;
      i <= 2;
      i = format(evaluate(`${i} + 0.05`), { notation: "fixed", precision: 2 })
    ) {
      bonus.push([
        i,
        format(evaluate(`${salary} * ${i}`), {
          notation: "fixed",
          precision: 2,
        }),
      ]);
    }
    setBonuses(bonus);
  };

  const calcIncrement = (e) => {
    e.preventDefault();
    setIncrement(
      evaluate(`((${newSalary} - ${prevSalary}) / ${prevSalary} * 100)`)
    );
  };

  return (
    <div style={{ display: "flex", gap: "10rem" }}>
      <div>
        <form
          onSubmit={calcBonus}
          style={{
            marginBottom: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "0.3rem",
          }}
        >
          <div
            style={{
              alignSelf: "center",
              textTransform: "uppercase",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            calculte bonus
          </div>
          <div>
            base salary:{" "}
            <input
              type={"text"}
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              style={{ padding: "0.3rem" }}
              pattern="[0-9]+"
            />
          </div>
          <button
            type="submit"
            style={{ width: "100%", backgroundColor: "#3b82f6" }}
          >
            calculate
          </button>
        </form>

        {bonuses.length > 0 && (
          <table style={{ textAlign: "right" }}>
            <thead>
              <tr>
                <th style={{ paddingLeft: "3rem" }}>Month</th>
                <th style={{ paddingLeft: "3rem" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {bonuses.map((x, i) => {
                return (
                  <tr key={i}>
                    <td>{x[0]}</td>
                    <td>{x[1]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div>
        <form
          onSubmit={calcIncrement}
          style={{
            marginBottom: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "0.3rem",
          }}
        >
          <div
            style={{
              alignSelf: "center",
              textTransform: "uppercase",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            calculte increment
          </div>
          <div>
            prev salary:{" "}
            <input
              type={"text"}
              value={prevSalary}
              onChange={(e) => setPrevSalary(e.target.value)}
              style={{ padding: "0.3rem" }}
              pattern="[0-9]+"
            />
          </div>

          <div>
            new salary:{" "}
            <input
              type={"text"}
              value={newSalary}
              onChange={(e) => setNewSalary(e.target.value)}
              style={{ padding: "0.3rem" }}
              pattern="[0-9]+"
            />
          </div>
          <button
            type="submit"
            style={{ width: "100%", backgroundColor: "#3b82f6" }}
          >
            calculate
          </button>
        </form>

        {increment && <div>{increment}%</div>}
      </div>
    </div>
  );
}

export default App;
