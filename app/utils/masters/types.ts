import { VideoModel } from "../../models/VideoModel";

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
    master: outputMasterField[]
    outputName?: string;
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

