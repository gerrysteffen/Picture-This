import React from 'react';
import { acceptInvite } from '../ApiClient';
function InviteItem(props) {
const accept = async ()=>{
let newShare = await acceptInvite({albumId: props.invite._id})

props.setSharedAlbums([newShare, ...props.sharedAlbums])
let invites = props.invites
let remainingInvites = invites.filter((element)=> {return element._id !== props.invite._id})
props.setInvites(remainingInvites)
}

    return (
        <div>
            <p>{props.invite.albumName}</p>
            <button onClick={accept}>accept</button>
            <button>reject</button>
        </div>
    );
}

export default InviteItem;