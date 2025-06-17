import React, { useState, useEffect } from "react";
import { RowType } from "./Table";
import { Checkbox } from "../Inputs/Checkbox/Checkbox";
import Typography from "../Typography/Typography";

type RowProps = {
  rowData: RowType;
  colsToShow: {[key: string]: boolean};
  onSelectRow: (selected: boolean) => void;
  forceSelected?: boolean;
  className?: string;
};

export const TableRow = ( {rowData, className, colsToShow, onSelectRow}: RowProps ) => {


  const handleSelect = (selected: boolean) => {
    onSelectRow(selected);
  }

  return (
    <tr className={className}  >
        {
            <th>
                <Checkbox label="" checked={rowData.selected} onChange={(selected) => {handleSelect(selected)}}/>
            </th>
        }
        {
            Object.keys(colsToShow).map((key, j) => <td key={j} height={50}>
                <Typography type='body'>{rowData[key]} </Typography>
            </td> )
        }
    </tr>
  );
}

