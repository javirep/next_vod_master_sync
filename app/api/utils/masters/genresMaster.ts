import { AmazonPVSeries } from "./AmazonPVSeries";

type GenresMaster = {
    [key: string]: {
        [key: string]: string;
    };
}

export const genresMaster: GenresMaster = {
    action: {
        frequency: 'Action & Adventure',
        amazonPV: 'av_genre_special_interest'
    }, 
    action_sports: {
        frequency: 'Action Sports',
        amazonPV: 'av_genre_sports',
    }, 
    adventure: {
        frequency: 'Action & Adventure',
        amazonPV: 'av_genre_special_interest'
    },
    aerobics: {
        frequency: 'Health & Fitness/Exercise',
        amazonPV: 'av_genre_fitness',
    },
    animals: {  
        frequency: 'Animals',
        amazonPV: 'av_genre_special_interest'
    },
    animated: {
        frequency: 'Animated',
        AmazonPVSeries: 'av_genre_anime'
    },
    arm_wrestling: {
        frequency: 'Sports/Pro Wrestling',
        amazonPV: 'av_genre_sports',
    },
    auto: {
        frequency: 'Auto',
        amazonPV: 'av_genre_sports',
    },
    auto_racing: {
        frequency: 'Auto/Racing',
        amazonPV: 'av_genre_sports',
    },
    aviation: {
        frequency: '',
        amazonPV: 'av_genre_sports',
    },
    badminton: {
        frequency: 'Sports',
        amazonPV: 'av_genre_sports',
    },
    baseball: {
        frequency: 'Sports/Baseball',
        amazonPV: 'av_genre_sports',
    },
    basketball: {
        frequency: 'Sports/Basketball',
        amazonPV: 'av_genre_sports',
    },
    beach_soccer: {
        frequency: 'Sports/Association Football',
        amazonPV: 'av_genre_sports',
    },
    beach_volleyball: {
        frequency: 'Sports/Volleyball',
        amazonPV: 'av_genre_sports',
    },
    biathlon: {
        frequency: 'Sports/Athletes',
        amazonPV: 'av_genre_sports',
    },
    bicycle: {
        frequency: 'Sports/Cycling',
        amazonPV: 'av_genre_sports',
    },
    bicycle_racing: {
        frequency: 'Sports/Cycling',
        amazonPV: 'av_genre_sports',
    },
    boxing: {
        frequency: 'Sports/Boxing',
        amazonPV: 'av_genre_sports',
    },
    "bus./financial":{
        frequency: 'Business/Finance',
        amazonPV: 'av_genre_talk_show_and_variety',
    },
    cricket: {
        frequency: 'Sports/Cricket',
        amazonPV: 'av_genre_sports',
    },
    curling: {
        frequency: 'Sports',
        amazonPV: 'av_genre_sports',
    },
    dance: {
        frequency: 'Dance',
        amazonPV: 'av_genre_sports',
    },
    diving: {
        frequency: 'Action Sports/Scuba Diving',
        amazonPV: 'av_genre_sports',
    },
    documentary: {
        frequency: 'Documentary',
        amazonPV: 'av_genre_documentary',
    },
    field_hockey: {
        frequency: 'Sports/Hockey',
        amazonPV: 'av_genre_sports',
    },
    football: {
        frequency: 'Sports/Football',
        amazonPV: 'av_genre_sports',
    },
    golf: {
        frequency: 'Sports/Golf',
        amazonPV: 'av_genre_sports',
    },
    hockey: {
        frequency: 'Sports/Hockey',
        amazonPV: 'av_genre_sports',
    },
    mixed_martial_arts: {
        frequency: 'Sports/MMA',
        amazonPV: 'av_genre_sports',
    },
    motorcycle: {
        frequency: 'Auto/Motorcycle',
        amazonPV: 'av_genre_sports',
    },
    motorcycle_racing: {
        frequency: 'Action Sports/Motorcycle Racing',
        amazonPV: 'av_genre_sports',
    },
    motorsports: {
        frequency: 'Action Sports/Auto Racing',
        amazonPV: 'av_genre_sports',
    },
    mountain_biking: {
        frequency: 'Action Sports/Mountain Biking',
        amazonPV: 'av_genre_sports',
    },
    poker: {
        frequency: 'Sports/Poker',
        amazonPV: 'av_genre_sports',
    },
    pro_wrestling: {
        frequency: 'Sports/Pro Wrestling',
        amazonPV: 'av_genre_sports',
    },
    sports: {
        frequency: 'Sports',
        amazonPV: 'av_genre_sports',
    },
    soccer: {
        frequency: 'Sports/Association Football',
        amazonPV: 'av_genre_sports',
    },
    softball: {
        frequency: 'Sports',
        amazonPV: 'av_genre_sports',
    },
    sumo_wrestling: {
        frequency: 'Sports/Pro Wrestling',
        amazonPV: 'av_genre_sports',
    },
    tennis: {
        frequency: 'Sports/Tennis',
        amazonPV: 'av_genre_sports',
    },
    volleyball: {
        frequency: 'Sports/Volleyball',
        amazonPV: 'av_genre_sports',
    },
}