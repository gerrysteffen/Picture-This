const root = "http://localhost:4000/";

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

export const getAlbum = async (id: string) => {
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
