"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const urlForEssences = process.env.NEXT_PUBLIC_OWN_API_URL + "/api/essence";
const urlForLeagues = process.env.NEXT_PUBLIC_OWN_API_URL + "/api/league";

export default function Home() {
  const [tableData, setTableData] = useState(null);
  const [leagues, setLeagues] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecommended, setIsRecommended] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get(urlForLeagues).then((response) => {
      setLeagues(response.data.data.economyLeagues);
      setSelectedLeague(response.data.data.economyLeagues[0].name);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedLeague) {
      setIsLoading(true);
      axios
        .get(urlForEssences + "?league=" + selectedLeague)
        .then((response) => {
          setTableData(response.data);
          setIsLoading(false);
        });
    }
  }, [selectedLeague]);

  useEffect(() => {
    console.log(isRecommended);
  }, [isRecommended]);

  return (
    <main class="container">
      <h1>PoE Essence Comparison</h1>
      <label for="league">
        League
        <select
          id="league"
          value={selectedLeague}
          onChange={(e) => setSelectedLeague(e.target.value)}
          aria-busy={isLoading}
        >
          {leagues &&
            leagues.map((league) => (
              <option key={league.name} value={league.name}>
                {league.name}
              </option>
            ))}
        </select>
      </label>
      <label for="switch">
        <input
          type="checkbox"
          id="switch"
          name="switch"
          role="switch"
          value={isRecommended}
          onChange={(e) => setIsRecommended(e.target.checked)}
        />
        Show only recommended essences
      </label>
      {isLoading ? (
        <div aria-busy="true"></div>
      ) : (
        <table role="grid">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Shrieking</th>
              <th scope="col">Deafening</th>
              <th scope="col">Convert?</th>
            </tr>
          </thead>
          <tbody>
            {tableData &&
              tableData.length > 0 &&
              tableData.map((item) =>
                isRecommended &&
                item.shriekingCost * 3 >= item.deafeningCost ? null : (
                  <tr key={item.base}>
                    <td>{item.base}</td>
                    <td>{item.shriekingCost}</td>
                    <td>{item.deafeningCost}</td>
                    <td>
                      {item.shriekingCost * 3 >= item.deafeningCost ? "N" : "Y"}
                    </td>
                  </tr>
                )
              )}
            {tableData && tableData.length == 0 && (
              <tr>
                <td colSpan={4}>No Data Found</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Shrieking</th>
              <th scope="col">Deafening</th>
              <th scope="col">Convert?</th>
            </tr>
          </tfoot>
        </table>
      )}
      <small align="right">
        Like this page?{" "}
        <a href="https://www.buymeacoffee.com/ajbocar">Buy me a coffee!</a>
      </small>
    </main>
  );
}
