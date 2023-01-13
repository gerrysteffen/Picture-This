import React from 'react';
import Navbar from './Navbar';
function Profile(props) {
    return (
        <div>

            <Navbar />
        <div className='profile'>

            
        
            <div className='right-container'>
                <div>
            <h1>My albums</h1>
            </div>

            <div className='albums'> <div className='album-item'> <img alt ='album' src = " https://res.cloudinary.com/du13z5eh1/image/upload/v1673599988/iszlyduddj7o308xeqfj.png"></img><p>Album Title</p></div></div>
            <div>
                <h1>Shared albums</h1>
                </div>
                <div className='albums'></div>
            
            </div>
           

            </div>
        </div>
    );
}

export default Profile;