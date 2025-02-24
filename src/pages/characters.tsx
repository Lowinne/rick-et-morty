import { useState } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Container,
  Box,
  Button,
  Grid,
  TextField,
} from "@mui/material";

const GET_ALL_CHARACTERS = gql(/* GraphQL */ `
    query GET_ALL_CHARACTERS($page: Int!, $name: String) {
      characters(page: $page, filter: { name: $name }) {
        info {
          count
          pages
        }
        results {
          id
          name
          image
        }
      }
    }
`);

interface Character {
  id: string;
  name: string;
  image: string;
}

export function RickAndMortyCharactersList() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const { loading, error, data } = useQuery(GET_ALL_CHARACTERS, {
      variables: { page, name: searchQuery || null },
    });

    const totalPages = data?.characters?.info?.pages ?? 1;

    if (loading) return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress color="success" />
      </Box>
    );

    if (error) return (
      <Typography variant="h5" align="center" color="error">
        ❌ Erreur : {error.message}
      </Typography>
    );

    return (
      <Container maxWidth="lg" sx={{ bgcolor: "#1E1E1E", color: "#97CE4C", py: 4, borderRadius: 3, boxShadow: 5 }}>
        {/* Barre de recherche */}

        <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
          Liste des personnages de Rick et Morty
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Total des personnages : {data?.characters?.info?.count ?? 0}
        </Typography>
        <Box display="flex" justifyContent="center" mb={3} gap={2}>
          <TextField
            label="Rechercher un personnage"
            variant="outlined"
            fullWidth
            sx={{ maxWidth: 400, bgcolor: "white", borderRadius: 1 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant="contained"
            color="success"
            onClick={() => setSearchQuery(search)}
          >
            Rechercher
          </Button>
        </Box>
                {/* Boutons de navigation en haut */}
                <Box display="flex" justifyContent="center" alignItems="center" mb={3} gap={3}>
          <Button
            variant="contained"
            color="success"
            sx={{ fontSize: "1rem", px: 3, py: 1 }}
            disabled={page <= 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            ⬅ Précédent
          </Button>
          <Typography variant="h6" fontWeight="bold" color="white">
            {page} / {totalPages}
          </Typography>
          <Button
            variant="contained"
            color="success"
            sx={{ fontSize: "1rem", px: 3, py: 1 }}
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Suivant ➡
          </Button>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {data?.characters?.results?.map((character: Character) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={character.id}>
              <Card sx={{ bgcolor: "#2C2C2C", border: "2px solid #97CE4C", boxShadow: 5, borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="260"
                  image={character.image}
                  alt={character.name}
                  sx={{ borderBottom: "4px solid #97CE4C" }}
                />
                <CardContent>
                  <Typography variant="h6" align="center" color="white" fontWeight="bold">
                    {character.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Boutons de navigation en bas */}
        <Box display="flex" justifyContent="center" alignItems="center" mt={4} gap={3}>
          <Button
            variant="contained"
            color="success"
            sx={{ fontSize: "1rem", px: 3, py: 1 }}
            disabled={page <= 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            ⬅ Précédent
          </Button>
          <Typography variant="h6" fontWeight="bold" color="white">
            {page} / {totalPages}
          </Typography>
          <Button
            variant="contained"
            color="success"
            sx={{ fontSize: "1rem", px: 3, py: 1 }}
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Suivant ➡
          </Button>
        </Box>
      </Container>
    );
}
