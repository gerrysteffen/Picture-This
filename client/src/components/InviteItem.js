import React from 'react';
import { acceptInvite , rejectAlbum} from '../ApiClient';
function InviteItem(props) {
const accept = async ()=>{
let newShare = await acceptInvite({albumId: props.invite._id})
props.setSharedAlbums([newShare, ...props.sharedAlbums])
let invites = props.invites
let remainingInvites = invites.filter((element)=> {return element._id !== props.invite._id})
props.setInvites(remainingInvites)
}
 
const reject = async ()=>{
    console.log('You were rejected!')
    let rejected = await rejectAlbum( props.invite)
    let invites = props.invites
    let remainingInvites = invites.filter((element)=> {return element._id !== props.invite._id})
    props.setInvites(remainingInvites)
}
    return (
        <div className='invite-item'>
            <p>{props.invite.albumName}</p>
            <div className='accept' ><img onClick={accept} src='../accept.png'></img><img src='../reject.png' onClick={reject}></img></div>

        </div>
    );
}

export default InviteItem;