import React, { useEffect, useState } from "react";
import { Container, Typography, Tabs, Tab, Card, CardMedia, CardContent, Box } from "@mui/material";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Footer from "../Footer";
import "@fontsource/nunito/700.css";


const SHOW_API = "https://agile-releases.s3.us-east-1.amazonaws.com/tests/tv-shows/SHOW123.json";
const EPISODES_API = "https://agile-releases.s3.us-east-1.amazonaws.com/tests/episodes/SHOW123.json";

interface Show {
  Title: string;
  Year: number;
  Synopsis: string;
  Images: { Background: string };
  Genres: { ID: string; Title: string }[];
  Cast: { ID: string; Name: string }[];
}

interface Episode {
  ID: string;
  Title: string;
  EpisodeNumber: number;
  SeasonNumber: number;
  Synopsis?: string;
  Image?: string;
}

const TvShowDetails: React.FC = () => {
  const [show, setShow] = useState<Show | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedTab, setSelectedTab] = useState("geral");
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);

  useEffect(() => {
    const fetchShowData = async () => {
      try {
        const response = await fetch(SHOW_API);
        const data = await response.json();
        setShow(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do programa:", error);
      }
    };

    const fetchEpisodes = async () => {
      try {
        const response = await fetch(EPISODES_API);
        const data = await response.json();
        setEpisodes(data.filter((ep: Episode) => ep !== null));
      } catch (error) {
        console.error("Erro ao buscar episódios:", error);
      }
    };

    fetchShowData();
    fetchEpisodes();
  }, []);

  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "60rem",
        padding: "20px",
        color: "#fff",
        fontFamily: `'Nunito', sans-serif`,
        backgroundImage: show ? `url(${show.Images.Background})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "darken",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        margin: -1,
        width: "100vw",
      }}
    >
      {show && (
        <Box style={{ textAlign: "start", padding: "20px", borderRadius: "10px" }}>
          <Typography variant="h3">{show.Title}</Typography>
          <Typography variant="subtitle2">{`80 % INDICADO / FICCÃO CIENTIFICA / ${show.Year} / EUA / 14`}</Typography>
          <Box display="flex" justifyContent="flex-end">
            <Tabs
              value={selectedSeason}
              onChange={(_, newValue) => setSelectedSeason(newValue)}
              textColor="inherit"
              indicatorColor="secondary"
            >
              {[...new Set(episodes.map(ep => ep.SeasonNumber)), 3].map(season => (
                <Tab key={season} label={`T${season}`} value={season} />
              ))}
            </Tabs>
          </Box>
          <Box style={{ display: "flex", flexDirection: "column", alignItems: "end", gap: "20px", marginTop: "20px" }}>
            {episodes.filter(ep => ep.SeasonNumber === selectedSeason).map(ep => (
              <Card
                key={ep.ID}
                sx={{
                  width: "100%",
                  maxWidth: 300,
                  backgroundColor: "#222",
                  color: "#fff",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.3)",
                  },
                  animation: "fadeIn 0.5s ease-in-out",
                }}
                onClick={() => setSelectedEpisode(ep.ID)}
              >
                {selectedEpisode === ep.ID && ep.Image && <CardMedia component="img" height="140" image={ep.Image} />}
                <CardContent>

                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">{ep.EpisodeNumber}. {ep.Title}</Typography>
                    <PlayCircleOutlineIcon sx={{ paddingLeft: '0.5rem' }} />
                  </Box>
                  {selectedEpisode === ep.ID && (
                    <Typography fontSize="14px" color="gray">{ep.Synopsis || "Sem sinopse disponível."}  </Typography>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}

      <Footer selectedTab={selectedTab} setSelectedTab={setSelectedTab}
        show={show ? { Synopsis: show.Synopsis, Cast: show.Cast } : { Synopsis: "", Cast: [] }} />
    </Container>
  );
};

export default TvShowDetails;
