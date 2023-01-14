import React, { useEffect ,useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";

function Profile(props) {

const [userAlbums, setUserAlbums] = useState([])
    const navigate = useNavigate()
   
useEffect(()=>{
  
})

    return (
        <div>

            <Navbar />
        <div className='profile'>

            
        
            <div className='right-container'>
                <div>
            <h1>My albums</h1>
            </div>

            <div className='albums'> <div className='album-item'  onClick={()=>navigate('/main')}> <img alt ='album' src = " https://res.cloudinary.com/du13z5eh1/image/upload/v1673599988/iszlyduddj7o308xeqfj.png"></img><p>Album Title</p></div></div>
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