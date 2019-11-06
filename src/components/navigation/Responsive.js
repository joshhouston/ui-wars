import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div className='responsive'>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
            <Link to='/Home'>
                <p>Home</p>
            </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <Link to='/dashboard'>
                <p> Dashboard</p>
            </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <Link to='/liked'>
                <p> Likes</p>
            </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <Link to='/challenge'>
                <p> Create</p>
            </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <Link to='/landing'>
                <p> Logout</p>
            </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}