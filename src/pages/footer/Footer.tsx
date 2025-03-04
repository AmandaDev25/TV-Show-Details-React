import { useTheme } from "@mui/material/styles";
import { Box, Tab, Tabs, Typography, useMediaQuery } from "@mui/material";

interface FooterProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  show: {
    Synopsis: string;
    Cast: { Name: string }[];
  };
}

export default function Footer({ selectedTab, setSelectedTab, show }: FooterProps) { 
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 
  return (
    <Box
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        bgcolor="rgba(27, 27, 27, 0.9)"
        p={5}
        m={0}
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Tabs
          value={selectedTab}
          onChange={(_, newValue) => setSelectedTab(newValue)}
          textColor="inherit"
          indicatorColor="secondary"
          variant={isMobile ? "fullWidth" : "standard"} 
          style={{ width: "50%", marginBottom: "1rem" }}
        >
          <Tab label="Geral" value="geral" />
          <Tab label="Elenco" value="elenco" />
          <Tab label="Principais prêmios" value="principais prêmios" />
        </Tabs>
        <Box>
          {selectedTab === "geral"  && (
        <Typography variant="caption" style={{ color: '#fff' }}>
          <Typography display='flex' justifyContent='start'>SINOPSE</Typography>
          {show?.Synopsis}
        </Typography>
          )}
          {selectedTab === "elenco" && (
        <Typography variant="caption" style={{ color: '#fff' }}>
          <Typography display='flex' justifyContent='start'>ELENCO</Typography>
           {show?.Cast.map(c => c.Name).join(", ")}
        </Typography>
          )}
           {selectedTab === "principais prêmios" && (
        <Typography variant="caption" style={{ color: '#fff' }}>
          Sem informação disponível no momento
        </Typography>
          )}
        </Box>
      </Box>
  );
}