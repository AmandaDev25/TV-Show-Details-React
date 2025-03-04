import { createTheme, ThemeProvider } from "@mui/material/styles";
import TvShowDetails from "./pages/footer/tvshowdetails/Index";

const theme = createTheme({
  typography: {
    fontFamily: "'Nunito', sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
     <TvShowDetails />
    </ThemeProvider>
  );
}

export default App;
