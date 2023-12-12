import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [searchItem, setSearchItem] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [data, setData] = useState([]);

  const handleSearch = (event) => {
    const newSearchTerm = event.target.value;
    setSearchItem(newSearchTerm);

    const filteredResults = data.filter((item) =>
      item.name.toLowerCase().includes(newSearchTerm.toLowerCase())
    );
    setSearchResult(filteredResults);
  };
  var content;
  if (searchItem) {
    content = searchResult;
  } else {
    content = data;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const users = await response.json();
        setData(users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Dynamic Search</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchItem}
        onChange={handleSearch}
      />
      {content.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default App;
