const root = 'http://localhost:4000';

export default {
  createAlbum: async (albumName: string, albumDescription: string) => {
    try {
      const response = await fetch(root + '/album', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({album:{albumName: albumName, description: albumDescription}}),
        credentials: 'include',
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  },
  
  getAlbum: async (albumid: string) => {
    try {
      const response = await fetch(root + '/album/' +albumid, {
        method: 'GET',
        credentials: 'include',
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  },
  
  deleteAlbum: async (albumId: string) => {
    try {
      const response = await fetch(root + '/album/' + albumId, {
        method: 'DELETE',
        credentials: 'include',
      });
      return response.json;
    } catch (error) {
      console.log(error);
    }
  },
  
  shareAlbumRequest: async (email: string, albumid: string) => {
    try {
      const response = await fetch(root + '/album/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user: {email: email}, album: {_id: albumid}}),
        credentials: 'include',
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  
  acceptInvite: async (albumId: string) => {
    try {
      const response = await fetch(root + '/album/accept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({album:{_id:albumId}}),
        credentials: 'include',
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  },
  
  removeSharedAlbum: async (albumId: string) => {
    try {
      const response = await fetch(root + '/album/'+albumId, {
        method: 'DELETE',
        credentials: 'include',
      });
      return response.json;
    } catch (error) {
      console.log(error);
    }
  },
  
  rejectAlbum: async (albumId: string) => {
    try {
      const response = await fetch(root + '/album/reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({album: {_id:albumId}}),
        credentials: 'include',
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  },
}