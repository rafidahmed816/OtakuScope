import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token
        navigate('/'); // Redirect to the Get Started page
    };

    return (
        <AppBar position="static" style={{ backgroundColor: '#121212' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    OtakuScope
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button color="inherit" component={Link} to="/home" sx={{ marginRight: 2 }}>
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/myanime" sx={{ marginRight: 2 }}>
                        MyAnime
                    </Button>
                    <Button color="inherit" component={Link} to="/lists" sx={{ marginRight: 2 }}>
                        Lists
                    </Button>
                    <Button color="inherit" component={Link} to="/profile" sx={{ marginRight: 2 }}>
                        Profile
                    </Button>
                    <Button color="inherit" component={Link} to="/forum" sx={{ marginRight: 2 }}>
                        Forum
                    </Button>
                    <Button color="secondary" onClick={handleLogout} variant="outlined" sx={{ marginLeft: 2 }}>
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
