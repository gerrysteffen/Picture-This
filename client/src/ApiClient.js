const root = "http://localhost:4000/";

export const getAllPhotos = async () => {
  try {
    const response = await fetch(root, {
      method: "GET",
      credentials: "include",
    });
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const uploadPhoto = async (content) => {
  console.log(content);
  try {
    const response = await fetch(root + "upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
      },
      body: JSON.stringify(content),
      credentials: "include",
    });
    return response.json;
  } catch (error) {
    console.log(error);
  }
};

export const likePhoto = async (id) => {
  try {
    const response = await fetch(root + "like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
      credentials: "include",
    });
    return response.json;
  } catch (error) {
    console.log(error);
  }
};

export const deletePhoto = async (id) => {
  try {
    const response = await fetch(root + "delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
      },
      body: JSON.stringify({ id: id }),
      credentials: "include",
      mode: "cors",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (user) => {
  try {
    const response = await fetch(root + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include",
    });
    const loggedUser = await response.json();

    return loggedUser;
  } catch (error) {
    console.log(error);
  }
};
export const refreshUser = async () => {
  try {
    const response = await fetch(root + "refresh", {
      method: "GET",
      headers: { "Content-Type": "application/json" },

      credentials: "include",
    });
    const loggedUser = await response.json();

    return loggedUser;
  } catch (error) {
    console.log(error);
  }
};

export const reg = async (user) => {
  try {
    const response = await fetch(root + "register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const out = async () => {
  try {
    const response = await fetch(root + "logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
      credentials: "include",
    });
    const data = await response.json;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createAlbum = async (albumName) => {
  try {
    const response = await fetch(root + "newAlbum", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
      },
      body: JSON.stringify(albumName),
      credentials: "include",
      mode: "cors",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAlbum = async (id) => {
  try {
    const response = await fetch(root + "album", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
      },
      body: JSON.stringify({ _id: id }),
      credentials: "include",
      mode: "cors",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAlbum = async (albumId) => {
  try {
    const response = await fetch(root + "album", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
      },
      body: JSON.stringify({ albumId: albumId }),
      credentials: "include",
      mode: "cors",
    });
    const data = await response.json;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const shareAlbumRequest = async (requestObject) => {
  try {
    const response = await fetch(root + "share-album", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
      },
      body: JSON.stringify(requestObject),
      credentials: "include",
      mode: "cors",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const acceptInvite = async (albumId) => {
  try {
    const response = await fetch(root + "accept-invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
      },
      body: JSON.stringify(albumId),
      credentials: "include",
      mode: "cors",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const removeSharedAlbum = async (albumId) => {
  try {
    const response = await fetch(root + "album", {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
      },
      body: JSON.stringify({ albumId: albumId }),
      credentials: "include",
      mode: "cors",
    });
    const data = await response.json;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const rejectAlbum = async (albumId) => {
  try {
    const response = await fetch(root + "reject-invite", {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
      },
      body: JSON.stringify(albumId),
      credentials: "include",
      mode: "cors",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

