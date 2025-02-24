
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
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

const GET_CHARACTER_DETAILS = gql(/* GraphQL */ `
  query GET_CHARACTER_DETAILS($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
      created
      origin {
        name
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
                            <Link to={`/characters/${character.id}`}>{character.name}</Link>
                            {character.image && (
                                <img
                                    src={character.image}
                                    alt={character.name || "Personnage"}
                                />
                            )}
                        </li>
                    ) : null
                )}
            </ul>
        </div>
    );
}

export function CharacterDetails() {
    console.log("yoyo");
    const { id } = useParams<{ id: string }>();

    const { loading, error, data } = useQuery(GET_CHARACTER_DETAILS, {
        variables: { id: id || "" },
        skip: !id,
    });

    if (!id) {
        return <p>ID invalide ou manquant.</p>;
    }

    if (loading) return <p>Chargement des détails...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    const character = data?.character;

    console.log(data?.character);
    return (
        <div>
            <h1>{character?.name}</h1>
            {character?.image && (
                <img src={character.image}/>
            )}
            <p>
                <strong>Statut :</strong> {character?.status}
            </p>
            <p>
                <strong>Espèce :</strong> {character?.species}
            </p>
            <p>
                <strong>Genre :</strong> {character?.gender}
            </p>
            <p>
                <strong>Origine :</strong> {character?.origin?.name}
            </p>
            <Link to="/characters">⬅ Retour à la liste</Link>
        </div>
    );
}