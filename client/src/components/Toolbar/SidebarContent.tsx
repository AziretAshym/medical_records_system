import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { User, BadgeHelp, ShieldUser, NotepadText, ScrollText, Archive } from 'lucide-react';

interface Props {
  onLinkClick: () => void;
}

const SidebarContent: React.FC<Props> = ({ onLinkClick }) => {
  const navItem = (
    path: string,
    label: string,
    icon: React.ReactNode
  ) => (
    <NavLink to={path} onClick={onLinkClick} style={{ textDecoration: 'none' }}>
      {({ isActive }) => (
        <ListItemButton
          selected={isActive}
          sx={{
            paddingLeft: 3,
            '& .MuiListItemIcon-root': {
              minWidth: 40
            }
          }}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText
            primary={label}
            primaryTypographyProps={{
              fontSize: 15,
              fontWeight: 'medium'
            }}
          />
        </ListItemButton>
      )}
    </NavLink>
  );

  return (
    <List sx={{ width: '100%' }}>
      {navItem('/patients', 'Пациенты', <User size={20} />)}
      {navItem('/medical-records', 'Приемы', <NotepadText size={20} />)}
      {navItem('/treatments', 'Назначения', <ScrollText size={20} />)}
      {navItem('/admin-panel', 'Админ-панель', <ShieldUser size={20} />)}
      {navItem('/archive', 'Архив', <Archive size={20} />)}
      {navItem('/app-usage', 'Справка', <BadgeHelp size={20} />)}
    </List>
  );
};

export default SidebarContent;