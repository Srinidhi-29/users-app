import React, { useEffect, useMemo, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import MuiTableHead from "./MuiTableHead";

/**
 * MUI Table component for displaying tabular data.
 * @param {object} props - Component props.
 * @param {string} props.title - Title of the table.
 * @param {array} props.rows - Array of objects representing table rows.
 * @param {array} props.columns - Array of column configuration objects.
 */

export default function MuiTable({ title, rows, columns }) {
  // State variables
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [emptyRows, setEmptyRows] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Update emptyRows when rows change
  useEffect(()=>{    
    setEmptyRows(page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0);
  },[rows])

  // Function to compare descending order
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  // Function to get comparator based on sort order and column
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // Function to perform stable sorting
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Memoized calculation of rows for the current page and sorting order
  const updatedRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <div>
        <Typography
          sx={{ flex: "1 1 100%", pl: 2, mb: 1 }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            {/* Table header */}
            <MuiTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              columns={columns}
            />
            {/* Table body */}
            <TableBody>
              {updatedRows.map((row, index) => {
                return (
                  <TableRow tabIndex={-1} key={row.id}>
                    {columns.map((col,i)=><TableCell key={i}>{row[col.id]}</TableCell>)}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Table Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
  );
}
