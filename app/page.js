"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const urlForEssences = process.env.NEXT_PUBLIC_OWN_API_URL + "/api/essence";
const shriekingPrefix = "Shrieking Essence of";
const deafeningPrefix = "Deafening Essence of";

export default function Home() {
  const [tableData, setTableData] = useState(null);
  useEffect(() => {
    axios.get(urlForEssences).then((response) => {
      processResponse(response.data.data.lines);
    });    
  }, []);

  const processResponse = (data) => {
    let tableArray = [];
    let shriekingArray = data.filter((item) =>
      item.name.includes(shriekingPrefix)
    );
    let deafeningArray = data.filter((item) =>
      item.name.includes(deafeningPrefix)
    );
    shriekingArray.forEach((item) => {
      let matchingDeafening = deafeningArray.filter(
        (item2) => item2.baseType === item.baseType
      );
      tableArray.push({
        base: item.baseType,
        shriekingCost: item.chaosValue,
        deafeningCost: matchingDeafening[0].chaosValue,
      });
    });
    setTableData(tableArray);
  };

  return (
    <main class="container">
      <h1>Hello, world!</h1>
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
            tableData.map((item) => (
              <tr key={item.base}>
                <td>{item.base}</td>
                <td>{item.shriekingCost}</td>
                <td>{item.deafeningCost}</td>
                <td>
                  {item.shriekingCost * 3 >= item.deafeningCost ? "N" : "Y"}
                </td>
              </tr>
            ))}
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
    </main>
  );
}
