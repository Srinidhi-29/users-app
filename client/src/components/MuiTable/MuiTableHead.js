import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

/**
 * Table header component for MUI table.
 * @param {object} props - Component props.
 * @param {string} props.order - Sorting order ('asc' or 'desc').
 * @param {string} props.orderBy - Currently sorted column ID.
 * @param {number} props.rowCount - Total number of rows.
 * @param {function} props.onRequestSort - Callback function for sorting request.
 * @param {array} props.columns - Array of column configuration objects.
 */

export default function MuiTableHead(props) {
  const { order, orderBy, rowCount, onRequestSort, columns } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            // align={column.numeric ? "right" : "left"}
            padding={"normal"}
            sortDirection={orderBy === column.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : "asc"}
              onClick={createSortHandler(column.id)}
            >
              {column.label}
              {orderBy === column.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
