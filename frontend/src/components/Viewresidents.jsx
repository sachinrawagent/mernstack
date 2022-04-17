import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Viewresidents() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getresidents();
  }, []);

  const getresidents = () => {
    const viewlocalid = localStorage.getItem("viewid");
    axios
      .get(`http://localhost:8080/getbyidFlat/${viewlocalid}`)
      .then((response) => {
        console.log(response.data);
        setTableData([response.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Container component="main" maxWidth="m">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Gender</StyledTableCell>
                <StyledTableCell align="right">Age</StyledTableCell>
                <StyledTableCell align="right">Flat Type</StyledTableCell>
                <StyledTableCell align="right">Flat No</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((el) => (
                <StyledTableRow key={el._id}>
                  <StyledTableCell component="th" scope="el">
                    {el.resident[0].name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {el.resident[0].gender}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {el.resident[0].age}
                  </StyledTableCell>
                  <StyledTableCell align="right">{el.type}</StyledTableCell>
                  <StyledTableCell align="right">{el.flatno}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
