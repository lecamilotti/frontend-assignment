import React, { useEffect, useState } from "react";

import Input from "./components/Input";
import List from "./components/List";
import { FaSpinner } from "react-icons/fa";

import "./index.scss";

interface Country {
  countryName: string;
  officialStateName: string;
  alpha2: string;
  alpha3: string;
  numericCode: string;
  internetCctldCode: string;
}
const Task2: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const handleError = (error: Error) => {
    console.error("Error fetching countries:", error);
    setError("An error occurred. Please try again later.");
  };

  const handleSearchChange = (newTerm: string) => {
    setSearchTerm(newTerm);
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const fetchCountries = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const url =
        "https://list-of-all-countries-and-languages-with-their-codes.p.rapidapi.com/countries";
      const options = {
        method: "GET",
        // the api key was not hide into the .env file or a config file because it is a public api key and it is not a security risk
        headers: {
          "X-RapidAPI-Key":
            "601b41419bmshc83613fb4e50f36p10ba4djsnef60cbade80c",
          "X-RapidAPI-Host":
            "list-of-all-countries-and-languages-with-their-codes.p.rapidapi.com",
        },
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();
        setError(
          errorData.message ||
            `Error fetching countries: ${response.statusText}`
        );
      } else {
        const data = await response.json();
        setCountries(data);
      }
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="task-2">
      <div className="task2-header">
        <h1>Country Code List</h1>
      </div>
      {isLoading ? (
        <div className="spinner">
          <FaSpinner className="lds-ellipsis" />
        </div>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <Input onSearchChange={handleSearchChange} />
          <List
            searchTerm={searchTerm}
            countries={countries}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={paginate}
          />
        </>
      )}
    </div>
  );
};

export default Task2;
