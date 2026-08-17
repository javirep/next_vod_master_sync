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
    allowedValues?: string[];
}

export type transformType = {
    type: string;
    from: string;
    to: string;
    using?: string[];
}

export type ValueDefinition = {
    key: string;
    defaultValue?: any;
    header?: string;
    description?: string;
    transform?: transformType;
    validation?: validationType;
    skipOutput?: boolean;
}

export type TabularOutputDefinition = {
    name: string;
    id: string;
    outputFormat: string;
    outputName?: string;
    requiresDownloadLink?: boolean;

    tabs: TabDefinition[]
}

export type TabDefinition = {
    tabName: string,
    content: ValueDefinition[]
}

export type XmlNodeDefinition = {
    tag: string;
    att?: { [key: string]: ValueDefinition };
    text?: ValueDefinition;
    children?: XmlNodeDefinition[];
}

export type XmlOutputDefinition = {
    name: string;
    id: string;
    outputFormat: string;
    outputName? : string;
    requiresDownloadLink?: boolean;

    namespaces: { [key: string]: string };
    channel_tree: XmlNodeDefinition[];
    item_tree: XmlNodeDefinition[];
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

