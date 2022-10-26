import { Character } from "@/types/character";

export const _characters: Array<Character> = [
    {
        id: "1",
        name: "Rick Sanchez",
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        status: "Alive",
        species: "Human",
        created: "2017-11-04T18:48:46.250Z",
        episode: [
            {
                id: "1",
                name: "The episode",
            },
        ],
        location: {
            id: "1",
            name: "Earth",
        },
    },
    {
        id: "2",
        name: "Morty Smith",
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
        status: "Alive",
        species: "Human",
        created: "2017-11-04T18:48:46.250Z",
        episode: [
            {
                id: "1",
                name: "The episode",
            },
        ],
        location: {
            id: "1",
            name: "Earth",
        },
    },
    {
        id: "3",
        name: "Alien Googah",
        image: "https://rickandmortyapi.com/api/character/avatar/13.jpeg",
        status: "unknown",
        species: "Alien",
        created: "2017-11-04T18:48:46.250Z",
        episode: [
            {
                id: "1",
                name: "The episode",
            },
        ],
        location: {
            id: "1",
            name: "Earth",
        },
    }
];