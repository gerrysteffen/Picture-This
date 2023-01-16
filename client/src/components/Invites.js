import React, { useEffect } from 'react';
import { useState } from 'react';
import InviteItem from './InviteItem'
function Invites(props) {
const [invites , setInvites] = useState(props.currentUser.pendingInvite)
useEffect(()=>{
    console.log(props.sharedAlbums)
},[])
let individualInvites = invites.map((invite) => {
    return (
      <InviteItem invite = {invite}  setInvites={setInvites} invites={invites} sharedAlbums= {props.sharedAlbums} setSharedAlbums={props.setSharedAlbums}/>
    );
  });

    return (
        <div className='invite-popup'>
            <h2>You have a pending album invite!</h2>
           {individualInvites}
        </div>
    );
}

export default Invites;