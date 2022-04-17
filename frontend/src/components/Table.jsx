import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { pink } from "@mui/material/colors";

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

export default function ViewTable() {
  const [tableData, setTableData] = useState([]);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    handlePagination();
  }, []);

  const handleView = (id) => {
    localStorage.setItem("viewid", id);
    navigate("/viewresidents");
  };
  const handleNext = () => {
    setCount(count + 1);
    handlePagination();
    console.log(count);
  };
  const handlePrev = () => {
    setCount(count - 1);
    handlePagination();
    console.log(count);
  };

  const handlePagination = () => {
    axios
      .get(`https://apartment-manager-mernstack.herokuapp.com/getFlatspagination?page=${count}&limit=3`)
      .then((response) => {
        console.log(response.data);
        setTableData(response.data.pageData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleHighSort = () => {
    axios
      .get(`https://apartment-manager-mernstack.herokuapp.com/highsortedflat`)
      .then((response) => {
        console.log(response.data);
        setTableData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlelowSort = () => {
    axios
      .get(`https://apartment-manager-mernstack.herokuapp.com/lowsortedflat`)
      .then((response) => {
        console.log(response.data);
        setTableData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmitBlock = (e) => {
    e.preventDefault();
    axios
      .get(`https://apartment-manager-mernstack.herokuapp.com/blockname/${e.target.block.value}`)
      .then((response) => {
        console.log(response.data);
        setTableData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOwnerSort = () => {
    axios
      .get(`https://apartment-manager-mernstack.herokuapp.com/byflattype/Owner`)
      .then((response) => {
        console.log(response.data);
        setTableData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleTenantSort = () => {
    axios
      .get(`https://apartment-manager-mernstack.herokuapp.com/byflattype/Tenant`)
      .then((response) => {
        console.log(response.data);
        setTableData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container component="main" maxWidth="m" sx={{mt:5}}>
        

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell align="right">Type</StyledTableCell>
                <StyledTableCell align="right">Block</StyledTableCell>
                <StyledTableCell align="right">Flat No</StyledTableCell>
                <StyledTableCell align="right">View</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((el) => (
                <StyledTableRow key={el.id}>
                  <StyledTableCell component="th" scope="el">
                    {el._id}
                  </StyledTableCell>
                  <StyledTableCell align="right">{el.type}</StyledTableCell>
                  <StyledTableCell align="right">{el.block}</StyledTableCell>
                  <StyledTableCell align="right">{el.flatno}</StyledTableCell>
                  <StyledTableCell align="right">
                    {
                      <Button
                        variant="contained"
                        onClick={() => handleView(el._id)}
                        sx={{backgroundColor:"red"}}
                      >
                        View
                      </Button>
                    }
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button variant="contained" sx={{backgroundColor:"red"}} onClick={handleNext}>
          Next Page
        </Button>
        <Button variant="contained" sx={{backgroundColor:"red"}} onClick={handlePrev}>
          Prev Page
        </Button>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmitBlock}
          sx={{ mx: 2, mt: 3,   mb: 3, display: "flex" }}
        >
          <Box>
            <TextField
              required
              fullWidth
              name="block"
              label="Search By Block Name"
              type="block"
              id="block"
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3,backgroundColor:"red" }}>
              Submit
            </Button>
          </Box>
          <Box sx={{ mx: 5, px: 2  }}>
            <Button variant="contained" sx={{backgroundColor:"red"}} onClick={handleHighSort}>
              Sort by flatno ASC
            </Button>
            <Button variant="contained" onClick={handlelowSort} sx={{ mx: 2,backgroundColor:"red" }}>
              Sort by flatno DSC
            </Button>
          </Box>
          <Box sx={{ mx: 5, px: 2 }}>
            <Button variant="contained" sx={{backgroundColor:"red"}} onClick={handleOwnerSort}>
              Sort By Owner
            </Button>
            <Button
              variant="contained"
              onClick={handleTenantSort}
              sx={{ mx: 2,backgroundColor:"red" }}
            >
              Sort By Tenant
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
