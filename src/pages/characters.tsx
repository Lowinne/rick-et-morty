import React from "react";
import { useQuery } from "@apollo/client";

import { gql } from "../__generated__/gql";

const GET_ALL_CHARACTERS = gql(/* GraphQL */ `
    query GET_ALL_CHARACTERS($page: Int!) {
      characters(page: $page) {
        info {
          count
        }
        results {
          id
          name
          image
        }
      }
    }
`);

export function RickAndMortyCharactersList() {
    const { loading, error, data } = useQuery(GET_ALL_CHARACTERS, {
      variables: { page: 1 },
    });
  
    if (loading) return <p>Chargement en cours...</p>;
    if (error) return <p>Erreur : {error.message}</p>;
  
    return (
      <div>
        <h1>Liste des personnages de Rick et Morty</h1>
        <p>Total des personnages : {data?.characters?.info?.count ?? 0}</p>
        <ul>
        {data?.characters?.results?.map((character, index) =>
          character ? (
            <li key={character.id ?? index}>
              <h1>{character.id}</h1>
              <h2>{character.name}</h2>
              {character.image && (
                <img src={character.image} alt={character.name || "Personnage"} />
              )}
            </li>
          ) : null
        )}
      </ul>
      </div>
    );
  }
  
