import React from "react";
import Item from "./Item"; // Import Item component

interface Country {
  countryName: string;
  officialStateName: string;
  alpha2: string;
  alpha3: string;
  numericCode: string;
  internetCctldCode: string;
}

interface ListProps {
  searchTerm: string;
  countries: Country[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
}

const List: React.FC<ListProps> = ({
  searchTerm,
  countries,
  currentPage,
  itemsPerPage,
  onPageChange,
}) => {
  const filteredItems = countries.filter((country) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const countryNameLowerCase = country.countryName.toLowerCase();
    const officialStateNameLowerCase = country.officialStateName.toLowerCase();
    const alpha2LowerCase = country.alpha2.toLowerCase();
    const alpha3LowerCase = country.alpha3.toLowerCase();
    const numericCodeLowerCase = country.numericCode.toLowerCase();
    const internetCctldCodeLowerCase = country.internetCctldCode.toLowerCase();

    return (
      countryNameLowerCase.includes(searchTermLowerCase) ||
      officialStateNameLowerCase.includes(searchTermLowerCase) ||
      alpha2LowerCase.includes(searchTermLowerCase) ||
      alpha3LowerCase.includes(searchTermLowerCase) ||
      numericCodeLowerCase.includes(searchTermLowerCase) ||
      internetCctldCodeLowerCase.includes(searchTermLowerCase)
    );
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Slice the filtered items based on current page and items per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalItemsShowed = currentItems.length + indexOfFirstItem;

  return (
    <div className="list-container">
      <div className="list-header">
        <p>
          Showing {totalItemsShowed} of {filteredItems.length} countries
        </p>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Country Name</th>
              <th>Official State/Region Name</th>
              <th>Alpha-2 Code</th>
              <th>Alpha-3 Code</th>
              <th>Numeric Code</th>
              <th>Internet TLD Code</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((country, index) => (
              <Item key={index} {...country} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default List;
