import React, { useEffect } from "react";
import { useState } from "react";
import InviteItem from "./InviteItem";
function Invites(props) {
  const [invites, setInvites] = useState(props.currentUser.pendingInvite);
  useEffect(() => {}, []);

  const close = ()=> {
props.setInvitePopup(false)
  }
  let individualInvites = invites.map((invite) => {
    return (
     
      <InviteItem
        invite={invite}
        setInvites={setInvites}
        invites={invites}
        sharedAlbums={props.sharedAlbums}
        setSharedAlbums={props.setSharedAlbums}
        setPendingInvites={props.setPendingInvites}
      />
    );
  });

  return (
    <div className="invite-popup">
       <div onClick={close} className="top-right">X</div>
      <h2>You have a pending album invite!</h2>
      {individualInvites}
    </div>
  );
}

export default Invites;
