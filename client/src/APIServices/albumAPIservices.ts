const root = 'http://localhost:4000';

export default {
  createAlbum: async (albumName: string) => {
    try {
      const response = await fetch(root + '/album', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Headers':
          //   'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
          // 'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
        },
        body: JSON.stringify({album:{albumName: albumName}}),
        credentials: 'include',
        // mode: 'cors',
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
        // headers: {
        //   'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Headers':
          //   'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
          // 'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
        // },
        // body: JSON.stringify({album: { _id: albumid }}),
        credentials: 'include',
        // mode: 'cors',
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
        // headers: {
        //   'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Headers':
          //   'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
          // 'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
        // },
        // body: JSON.stringify({album:{ _id: albumId }}),
        credentials: 'include',
        // mode: 'cors',
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
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Headers':
          //   'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
          // 'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
        },
        body: JSON.stringify({user: {email: email}, album: {_id: albumid}}),
        credentials: 'include',
        // mode: 'cors',
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
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Headers':
          //   'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
          // 'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
        },
        body: JSON.stringify({album:{_id:albumId}}),
        credentials: 'include',
        // mode: 'cors',
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
        // headers: {
        //   'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Headers':
          //   'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
          // 'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
        // },
        // body: JSON.stringify({album:{ _Id: albumId }}),
        credentials: 'include',
        // mode: 'cors',
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
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Headers':
          //   'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
          // 'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
        },
        body: JSON.stringify({album: {_id:albumId}}),
        credentials: 'include',
        // mode: 'cors',
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  },
}