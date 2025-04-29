import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GetStarted from './components/GetStarted';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './pages/Home';
import Lists from './pages/Lists';
import ListDetails from './pages/ListDetails';
import Profile from './components/Profile';
import AnimeDetails from './pages/AnimeDetails';
import Character from './components/Character';
import Staff from './components/Staff';
import Status from './components/Status';
import AllLists from './pages/AllLists';
import ListDetailsPublic from './pages/ListDetailsPublic';

const theme = createTheme({
    palette: {
        mode: 'dark', // Dark mode
        primary: {
            main: '#8B5DFF', // Purple
        },
        background: {
            default: '#121212', // Dark background color
        },
    },
});

const App = () => (
    <ThemeProvider theme={theme}>
        <Router>
            <Routes>
                <Route path="/" element={<GetStarted />} />
                <Route path="/:id" element={<AnimeDetails />} />
                <Route path="/anime/:id" element={<AnimeDetails />} />
                <Route path="/anime/:id/character" element={<Character />} />
                <Route path="/anime/:id/staff" element={<Staff />} />
                <Route path="/anime/:id/status" element={<Status />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/lists" element={<Lists />} />
                <Route path="/lists/:listId" element={<ListDetails />} />
                <Route path="/profile/:username" element={<Profile />} />
                <Route path="/all-lists" element={<AllLists />} />
                <Route path="/public-list/:listId" element={<ListDetailsPublic />} />
                {/* <Route path="/forum" element={<Forum />} /> */}
            </Routes>
        </Router>
    </ThemeProvider>
);

export default App;
