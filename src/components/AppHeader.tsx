'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useRouter, usePathname } from 'next/navigation';
import { SITE_NAME } from '@/lib/constants';

export default function AppHeader({ cartCount = 0 }: { cartCount?: number }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
  ];

  const handleNavClick = (path: string) => {
    router.push(path);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="sticky" elevation={1}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600, cursor: 'pointer' }}
            onClick={() => router.push('/')}
          >
            {SITE_NAME}
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2, mr: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                onClick={() => handleNavClick(item.path)}
                sx={{
                  fontWeight: pathname === item.path ? 600 : 400,
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <IconButton color="inherit" onClick={() => router.push('/cart')}>
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              {SITE_NAME}
            </Typography>
          </Box>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  selected={pathname === item.path}
                  onClick={() => handleNavClick(item.path)}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
