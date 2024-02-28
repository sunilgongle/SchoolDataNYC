import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [overviewParagraph, setOverviewParagraph] = useState('');


  //fetchng the data while component mounts to the DOM
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://data.cityofnewyork.us/resource/s3k6-pzi2.json"
        );
        console.log("data", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  //displaying the school data in a table format
  const displaySchoolData = (datas) => {
    return (
      <div className="data-container">
        <table>
          <thead>
            <tr>
              <th>School name</th>
              <th>DBN</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((details) => {
              return (
                <tr
                  onClick={() =>
                    displayOverviewdata(details.overview_paragraph)
                  }
                  key={details.dbn}
                >
                  <td>{details.school_name} </td>
                  <td>{details.dbn}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  //displying the additional  information of selected particular school data is clicked
  const displayOverviewdata = (paragraph) => {
    setOverviewParagraph(paragraph);
  };

  return (
    <>
      <div className="App">
        <p>School Data</p>
        <br />
        {displaySchoolData(data)}
      </div>
{overviewParagraph &&
      <p> 
        <b> Overview paragraph</b>
        <p> {overviewParagraph} </p>
      </p>
}
    </>
  );
}

export default App;



