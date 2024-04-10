import React from "react";

interface ItemProps {
  countryName: string;
  officialStateName: string;
  alpha2: string;
  alpha3: string;
  numericCode: string;
  internetCctldCode: string;
}

const Item: React.FC<ItemProps> = ({
  countryName,
  officialStateName,
  alpha2,
  alpha3,
  numericCode,
  internetCctldCode,
}) => {
  return (
    <tr>
      <td>{countryName}</td>
      <td>{officialStateName}</td>
      <td>{alpha2}</td>
      <td>{alpha3}</td>
      <td>{numericCode}</td>
      <td>{internetCctldCode}</td>
    </tr>
  );
};

export default Item;
