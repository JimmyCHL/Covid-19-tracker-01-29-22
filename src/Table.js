import React from "react";
import { styled } from "@mui/material/styles";
import numeral from "numeral";

const Table = ({ countries }) => {
  return (
    <TableContainer>
      {countries.map(({ country, cases }, i) => (
        <tr key={i}>
          <td>{country}</td>
          <td>
            <strong>{numeral(cases).format("0, 0")}</strong>
          </td>
        </tr>
      ))}
    </TableContainer>
  );
};

export default Table;

const TableContainer = styled("div")`
  margin-top: 20px;
  overflow: auto;
  height: 400px;
  color: #6a5d5d;

  tr {
    display: flex;
    justify-content: space-between;
  }

  td {
    padding: 0.5rem;
  }

  tr:nth-of-type(odd) {
    background-color: #f3f2f8;
  }
`;
