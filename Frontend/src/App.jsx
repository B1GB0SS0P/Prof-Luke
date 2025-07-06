import './App.css'
import Header from './components/Header'
import Search from './components/Search';
import getTheme from "./theme/theme";
import { ThemeProvider } from '@emotion/react';

export default function App() {
  const theme = getTheme()
  return (
     <ThemeProvider theme={theme}>
      <Header />

      <Search />
    </ThemeProvider>
  )
}
