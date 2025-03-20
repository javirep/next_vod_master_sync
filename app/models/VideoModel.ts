//import { VideoTypes } from "@/database/models/definitions/Video";

export enum VideoTypes {
    FILM = 'Film',
    EPISODE = 'Episode',
    COMBAT = 'Combat',
}

export enum VideoState { 
    NOT_SENT = 'Not Sent',
    SENT = 'Sent',
    REJECTED = 'Rejected',
    APPROVED = 'Approved',
    SUBMITTED = 'Submitted',
    EXPIRED = 'Expired',
    NA = 'N/A',
}

export type VideoModel = {
    guid: string;
    distributor: string;
    type: string;
    title: string;
    fileName: string;
    synopsis: string;
    shortSynopsis: string;
    series?: string;
    season?: number;
    episode?: number;
    ratingValue: string;
    duration: number;
    rightsStart: string;
    rightsEnd: string;
    rightsTerritory: string;
    releaseDate: string;
    countryOfOrigin: string;
    genre: string;
    tags: string;
    mainCast: string;
    women: boolean;
    adBreaks: string;
    slingId: string;
    teamsID: string;
    brandedVOD: boolean;
    unbrandedVOD: boolean;
    thirdPartyLinear: boolean;
    fubo:VideoState;
    sling:VideoState;
    xumo:VideoState;
    amazon:VideoState;
    pluto:VideoState;
    roku:VideoState;
    vizio:VideoState;
    fsn:VideoState;
    rsc:VideoState;
    selected: boolean;
  };