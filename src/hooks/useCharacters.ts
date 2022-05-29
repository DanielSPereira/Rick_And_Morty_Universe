import { useContext } from "react";
import { CharactersContext } from "../context/CharactersContext";

export const useCharacters = () => useContext(CharactersContext); 