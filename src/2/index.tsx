import React, { useEffect, useState } from "react";

import Input from "./components/Input";
import List from "./components/List";
// import spinner from react-icons
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
  const [countries, setCountries] = useState<Country[]>([]); // Updated name for clarity
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState<string | null>(null); // Error message state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Improved error handling with generic default
  const handleError = (error: Error) => {
    console.error("Error fetching countries:", error);
    setError("An error occurred. Please try again later.");
  };

  const handleSearchChange = (newTerm: string) => {
    setSearchTerm(newTerm);
    setCurrentPage(1); // Reset page to 1 when search term changes
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const fetchCountries = async () => {
    setIsLoading(true); // Set loading state
    setError(null); // Clear any previous errors

    try {
      const url =
        "https://list-of-all-countries-and-languages-with-their-codes.p.rapidapi.com/countries";
      const options = {
        method: "GET",
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
      setIsLoading(false); // Clear loading state after success or failure
    }
  };

  useEffect(() => {
    fetchCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="task2">
      <div className="task2-header">
        <h1>Country Code Language List</h1>
      </div>
      {!isLoading ? (
        // add a spinner from react-icons
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
