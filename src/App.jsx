import { useEffect, useState } from "react";

import "./App.css";
import Modal from "./components/Modal";

function App() {
  const [modalActive, setModalActive] = useState(false);
  const [data, setData] = useState(null);
  const [checkerValute, setCheckerValute] = useState("");

  let prvUrl = `https://www.cbr-xml-daily.ru/daily_json.js`;

  const [array, setArray] = useState([]);
  const getData = async (url) => {
    let request = await fetch(url);
    let result = await request.json();
    return result;
  };
  const fetchMoreData = async () => {
    for (let i = 0; i < 10; i++) {
      let data = await getData(prvUrl);

      setArray((array) => [...array, data]);
      prvUrl = await data.PreviousURL;
      console.log(prvUrl);
    }
  };

  const fetchData = async () => {
    const request = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");

    const result = await request.json();

    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (!data) return <h1>Loading</h1>;
  return (
    <div className="App">
      <div>
        <div style={{ display: "block", justifyContent: "center", maxWidth: 800, margin: "0 auto" }}>
          <div>
            <div className="valuta__header" style={{ display: "flex", padding: 15, justifyContent: "space-between" }}>
              <div>Валюта</div>
              <div>Цена</div>
              <div>Изменение</div>
            </div>
          </div>
          {Object.keys(data?.Valute).map((el, idx) => (
            <div>
              <div
                className="valuta"
                onClick={(e) => {
                  setCheckerValute(`${data?.Valute[el].CharCode}`);
                  fetchMoreData();
                  setModalActive(true);
                }}
                style={{ display: "flex", padding: 15, justifyContent: "space-between" }}
              >
                <span className="tooltiptext">{data?.Valute[el].Name}</span>
                <div>{data?.Valute[el].CharCode}</div>
                <div>
                  {data?.Valute[el].Value}
                  <span style={{ color: "grey" }}> ₽</span>
                </div>
                <div>
                  {(((data?.Valute[el].Value - data?.Valute[el].Previous) / data?.Valute[el].Value) * 100).toFixed(2) >
                  0
                    ? "+" +
                      (((data?.Valute[el].Value - data?.Valute[el].Previous) / data?.Valute[el].Value) * 100).toFixed(2)
                    : (((data?.Valute[el].Value - data?.Valute[el].Previous) / data?.Valute[el].Value) * 100).toFixed(
                        2
                      )}
                  <span style={{ color: "grey" }}> %</span>
                </div>
              </div>
            </div>
          ))}
          <Modal active={modalActive} setActive={setModalActive} setArray={setArray}>
            <h1 style={{ color: "#333f56", textDecoration: "underline" }}>{checkerValute}</h1>
            {Object.keys(array).map((el) => (
              <div
                style={{
                  textAlign: "left",
                  borderBottom: "1px solid black",
                  marginBottom: "5px",
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                <span style={{ display: "inline-block" }}>{array[el].Date.substr(0, 10)}</span>
                <span style={{ display: "inline-block" }}>
                  {array[el].Valute[checkerValute].Value}
                  <span style={{ color: "grey" }}> ₽</span>
                </span>
              </div>
            ))}
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default App;
