'use clients';

import React, { useEffect, useRef } from "react";

import './Table.scss';
import Typography from "../Typography/Typography";
import classNames from "classnames";
import { Checkboxes, CheckboxType } from "../Inputs/Checkboxes/Checkboxes";
import { Checkbox } from "../Inputs/Checkbox/Checkbox";
import { TableRow } from "./Row";
import TableIndexator, { TableIndexatorProps } from "./TableIndexator";
import { NumberInput } from "../Inputs/NumberInput/NumberInput";
import { VideoModel } from "@/app/models/VideoModel";

export type RowType = Partial <VideoModel> & {
    guid: string,
    selected: Boolean
}

type HeaderType = {
    colKey: string;
    colText: string;
    width: number;
};

type TableProps = {
    header: HeaderType[]
    rows: RowType[];
    onRowsPerPageChange: (rowsPerPage: number) => void;
    indexatorInfo: TableIndexatorProps;
    onSelectRows: (selectedRowIds: string, selected: boolean) => void;
};

export const Table: React.FC<TableProps> = (props: TableProps) => {

    const { rows, header, onSelectRows, indexatorInfo, onRowsPerPageChange } = props; 
    const [ colsToShow, setColsToShow ] = React.useState<{[key: string]: boolean}>({});
    const [ allBoxesChecked, setAllBoxesChecked ] = React.useState<boolean>(false);
    const [ rowsToShow, setRowsToShow ] = React.useState<RowType[]>([]);
    const [ loading, setLoading ] = React.useState<boolean>(true);

    const tableRef = useRef<HTMLTableElement>(null);

    useEffect(() => {
        setLoading(true);
        const newColsToShow = header.reduce((acc, col) => {
            acc[col.colKey] = true;
            return acc;
        }, {});

        setColsToShow(newColsToShow);

        setRowsToShow(rows);

        setLoading(false);
    }
    , [rows]);

    const handleCheckboxChange = (newCheckboxes: CheckboxType[]) => {
        setColsToShow(newCheckboxes.reduce((acc, cb) => {
            acc[cb.value] = cb.checked;
            return acc;
        }
        , {}));        
    };

    const getCheckBoxes = () => {
        return header.map((col, i) => {
            return { value: col.colKey, label: col.colText, checked: colsToShow[col.colKey] }
        });
    }

    const handleSelectAllRows = () => {
        rows.forEach( row => onSelectRows(row.guid, !allBoxesChecked))
        setAllBoxesChecked(!allBoxesChecked);
    }

    const handleSelectRow = (rowId: string, selected: boolean) => {
        onSelectRows(rowId, selected);
    }

    if (loading) return <div>Loading...</div>;

    const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onRowsPerPageChange(parseInt(e.target.value));
    };
    
    return (
        <div className="table-wrapper">

            <Checkboxes 
                checkboxes={getCheckBoxes()} 
                onChange={(newCheckboxes) => handleCheckboxChange(newCheckboxes)} 
                className="mb-4"
            />

            <div className="table-container">
                <table className="table" ref={tableRef}>
                    <thead>
                        <tr>
                        {
                            <th><Checkbox label="" checked={allBoxesChecked} onChange={()=>handleSelectAllRows()}/></th>
                        }
                        {
                            header.map((col, index) => {
                                if (colsToShow[col.colKey]) return <th key={index} style={{width: col.width}}>
                                    <Typography type={'input-label'} > {col.colText} </Typography>
                                </th>
                            })
                        }
                        </tr>
                    </thead>
                    <tbody>
                        {rowsToShow.map((row, i) => (
                            <TableRow 
                                key={i} 
                                rowData={row} 
                                className={classNames({ 'grey': i % 2 === 0 })}
                                forceSelected={allBoxesChecked}
                                colsToShow={colsToShow}
                                onSelectRow={(selected: boolean) => handleSelectRow(row['id'], selected)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="table-footer">
                <Typography type='body'>Total count: {indexatorInfo.totalItems}</Typography>

                <TableIndexator { ...indexatorInfo } />
                
                <NumberInput placeholder={rows.length.toString()} labelText={'Results per Page: '} onChange={(e) => {handleRowsPerPageChange(e)}} />
            </div>
        </div>
    );
};