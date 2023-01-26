import React, { useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { Badge, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { StateType } from '../../types';
import InviteHandler from './InviteHandler';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../Redux/actions';

export default function NotificationDropDown() {
  const [open, setOpen] = useState(false);
  const pendingInvites = useSelector(
    (state: StateType) => state.user!.pendingInvite
  );
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const dispatch = useDispatch();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const deleteInvite = (index: number) => {
    console.log('deleting: ', index);
    if (pendingInvites) {
      const newPendingInvites = [...pendingInvites];
      newPendingInvites.splice(index, 1);
      dispatch(updateUser({ pendingInvite: newPendingInvites }));
    }
  };

  return (
    <Stack direction='row' spacing={2}>
      <div>
        <IconButton
          ref={anchorRef}
          size='large'
          color='inherit'
          sx={{ mr: 2 }}
          onClick={handleToggle}
        >
          <Badge badgeContent={pendingInvites?.length} color='error'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement='bottom-start'
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'right top' : 'right top',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id='composition-menu'
                    aria-labelledby='composition-button'
                    onKeyDown={handleListKeyDown}
                  >
                    {pendingInvites &&
                      pendingInvites.map((invite, index) => (
                        <InviteHandler
                          deleteInvite={deleteInvite}
                          key={index}
                          handleClose={handleClose}
                          invite={invite}
                          index={index}
                        />
                      ))}
                  </MenuList>

                  {/* )} */}
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}
