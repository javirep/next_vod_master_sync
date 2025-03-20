'use client';
import React from "react";
import Typography from "./Typography/Typography";
import { Button } from "./Button/Button";
import TextInput from "./Inputs/TextInput/TextInput";
import { SearchInput } from "./Inputs/SearchInput/SearchInput";
import { DateInput } from "./Inputs/DateInput/DateInput";
import { SelectInput } from "./Inputs/SelectInput/SelectInput";
import { Checkbox } from "./Inputs/Checkbox/Checkbox";
import { Checkboxes } from "./Inputs/Checkboxes/Checkboxes";
import { NumberInput } from "./Inputs/NumberInput/NumberInput";
import { Table } from "./Table/Table";

const Components = () => {
    const options = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' }
    ];

    const [checkBoxes, setCheckBoxes] = React.useState([
        { value: '1', label: 'Option 1', checked: false },
        { value: '2', label: 'Option 2', checked: false },
        { value: '3', label: 'Option 3', checked: false }
    ]);

    const tableHeader = [
        { colKey: 'name', colText: 'Name', colType: 'string', width: 300 },
        { colKey: 'age', colText: 'Age', colType: 'number', width: 150 },
        { colKey: 'city', colText: 'City', colType: 'string', width: 200 },
    ];

    const tableRows = [
        { name: 'John Doe', age: '1', city: 'New York' },
        { name: 'Jane Doe', age: '2', city: 'San Francisco' },
        { name: 'John Smith', age: '3', city: 'Los Angeles' },
        { name: 'John Doe', age: '4', city: 'New York' },
        { name: 'Jane Doe', age: '5', city: 'San Francisco' },
        { name: 'John Smith', age: '6', city: 'Los Angeles' },
        { name: 'John Doe', age: '7', city: 'New York' },
        { name: 'Jane Doe', age: '8', city: 'San Francisco' },
        { name: 'John Smith', age: '9', city: 'Los Angeles' },
    ];

    const alertRow = (row) => {
        alert(`Row clicked: ${JSON.stringify(row)}`);
    }


    return (
        <div>
            <Typography type="title">Component Page</Typography>
            <Typography type="body" className="mt-4">Showing how components look like</Typography>

            <div className="mt-8 flex gap-4 items-center">
                <Button type="primary" text="Call to Action" disabled={false} onClick={() => {}} />
                <Button type="secondary" text="Secondary" onClick={() => {}} />
                <Button type="grey" text="Return" onClick={() => {}} />
                <Button type="primary" text="Disabled" disabled={true} onClick={() => {}} />
            </div>

            <div className="mt-8 flex flex-col gap-4">
                <TextInput placeholder="Enter your name" labelText='Text Input:' onChange={() => {}} />
                <SearchInput placeholder="Search" onChange={() => {}} />
                <NumberInput placeholder="Enter a number" labelText='Number Input:' onChange={() => {}} />
                <DateInput placeholder="mm-dd-yyyy" labelText='Start Date:' onChange={() => {}} />
                <SelectInput options={options} onChange={() => {}}  />
                {/* <Checkboxes checkboxes={checkBoxes} onChange={(checkboxes) => {setCheckBoxes(checkboxes)}} /> */}
            </div>

            <div className="mt-8"  style={{width: '800px'}}>
                <Table header={tableHeader} rows={tableRows} addButton={{text: 'show', onClick: alertRow }}/>
            </div>

        </div>
    );
}

export default Components;