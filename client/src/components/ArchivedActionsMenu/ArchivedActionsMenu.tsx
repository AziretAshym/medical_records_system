import { Menu, MenuItem, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState } from 'react';

interface ArchivedActionsMenuProps {
  onRestore: () => void;
  onDelete: () => void;
}

const ArchivedActionsMenu: React.FC<ArchivedActionsMenuProps> = ({ onRestore, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => { onRestore(); handleClose(); }}>Разархивировать</MenuItem>
        <MenuItem onClick={() => { onDelete(); handleClose(); }}>Удалить</MenuItem>
      </Menu>
    </>
  );
};

export default ArchivedActionsMenu;
