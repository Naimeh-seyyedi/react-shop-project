import {
  Box,
  CircularProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";



const TableOrder = ({ data }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "17px",
        }}
      ></Box>

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, minHeight: 100 }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{width:"50px"}}> کالا</TableCell>
              <TableCell sx={{width:"50px"}}>قیمت </TableCell>
              <TableCell sx={{width:"50px"}}>تعداد</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.cart?.cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell sx={{width:"50px"}}>
                  {item?.name} {item?.product.model}
                </TableCell>
                <TableCell sx={{width:"50px"}}>{item?.totalRow.toLocaleString() + " تومان "} </TableCell>
                <TableCell sx={{width:"50px"}}>{item?.orderCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableOrder;
