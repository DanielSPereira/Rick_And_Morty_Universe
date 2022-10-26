/* Character type */

type Episode = Array<{
    id: string;
    name: string;
}>

type Location = {
    id: string;
    name: string;
}

export interface Character {
    id: string;
    name: string;
    image: string;
    status: "Alive" | "Dead" | "unknown";
    species: string;
    created: string;
    episode: Episode;
    location: Location;
}