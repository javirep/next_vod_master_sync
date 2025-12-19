import { Regex } from "aws-sdk/clients/iot";

export type sourceMasterField = {
    key: string;
    defaultValue?: any;
}

export type sourceMasterType = {
    [key: string]: sourceMasterField;
}

export type validationType = {
    required: boolean;
    format?: string;
    afterThan?: number; // index of the field to compare with
    futureDate?: boolean;
    maxLength?: number;
    isUnique?: boolean;
    requiredIfField?: string;
    regex?: Regex;
}

export type transformType = {
    type: string;
    from: string;
    to: string;
    using?: string[];
}

export type outputMasterField = {
    key: string;
    defaultValue?: any;
    header?: string;
    description?: string;
    transform?: transformType;
    validation?: validationType;
}

export type outputMasterType = {
    name: string;
    id: string;
    outputFormat: string;
    outputName?: string;

    tabs: outputTabType[]
}

export type outputTabType = {
    tabName: string,
    content: outputMasterField[]
}

export enum AvailsType {
    RokuAvails = 'rokuAvails',
}

type AvailsDataTypes = {
    type: 'string' | 'number' | 'date';
    format?: string;
}

export type AvailsField = {
    key: string;
    defaultValue?: any;
    type: AvailsDataTypes;
}

