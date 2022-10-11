import React from 'react';
import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import {useHistory, useLocation} from "react-router";

const Layout = ({children}) => {

    const { push } = useHistory()

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" onClick={() => push('/')} component="div" sx={{ flexGrow: 1 }}>
                            Home
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            {children}
        </div>

    );
};

export default Layout;