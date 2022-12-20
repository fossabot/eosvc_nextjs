import {
  ChatBubbleOutline,
  NotificationsNone,
  PowerSettingsNew,
  Search,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Grid,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <AppBar position="static" className="bg-white z-40  ">
      <Toolbar>
        <Grid container className="flex justify-center items-center">
          <Grid item className="">
            <InputBase
              placeholder="Search topic"
              startAdornment={<Search className="text-md mr-2" />}
              className="hover:bg-gray-200 rounded-md p-2 focus:bg-gray-200"
            />
          </Grid>
          <Grid item sm />
          <Grid item className=" ">
            <IconButton>
              <Badge badgeContent={4} color="secondary">
                <NotificationsNone />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={3} color="primary">
                <ChatBubbleOutline />
              </Badge>
            </IconButton>
            <IconButton>
              <PowerSettingsNew />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
