const root = 'http://localhost:4000';

export default {
  // getAllPhotos: async () => {
  //   try {
  //     const response = await fetch(root, {
  //       method: 'GET',
  //       credentials: 'include',
  //     });
  //     const data = response.json();
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },

  uploadPhoto: async (obj: {album: string, data: string}) => {
    try {
      const res = await fetch(root + '/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Headers":
          // "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
          // "Access-Control-Allow-Methods":
          // "GET, HEAD, POST, PUT, DELETE, OPTIONS",
        },
        credentials: 'include',
        body: JSON.stringify({album: {_id: obj.album}, image: {data: obj.data}}),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  },

  likePhoto: async (imageId:string) => {
    try {
      const response = await fetch(root + '/image/like', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: imageId }),
        credentials: 'include',
      });
      return response.json;
    } catch (error) {
      console.log(error);
    }
  },

  deletePhoto: async (imageId: string) => {
    try {
      const response = await fetch(root + '/image/'+ imageId, {
        method: 'DELETE',
        // headers: {
        //   'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Headers':
          //   'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
          // 'Access-Control-Allow-Methods':
          //   'GET, HEAD, POST, PUT, DELETE, OPTIONS',
        // },
        // body: JSON.stringify({ id: imageId }),
        credentials: 'include',
        // mode: 'cors',
      });
      // return response;
    } catch (error) {
      console.log(error);
    }
  },
};
