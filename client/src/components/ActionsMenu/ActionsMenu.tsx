import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const ActionsMenu = ({
  onSelect,
  onEdit,
}: {
  onSelect: () => void;
  onEdit: () => void;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleOpen} size="small">
        <MoreHorizIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => { handleClose(); onSelect(); }}>Подробнее</MenuItem>
        <MenuItem onClick={() => { handleClose(); onEdit(); }}>Редактировать</MenuItem>
      </Menu>
    </>
  );
};

export default ActionsMenu;