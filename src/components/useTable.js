import { Table } from "@mui/material";
import React from "react";

function useTable(record, headCells) {
  const TblContainer = (props) => <Table>{props.children}</Table>;
  return TblContainer;
}

export default useTable;
