const root = "http://localhost:4000/";

export const getAllPhotos = async () => {
  try {
    const response = await fetch(root);
    const data = response.json();

   
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const uploadPhoto = async (content) => {
  try {
    const response = await fetch(root + "upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
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
      },
      body: JSON.stringify({ id: id }),
    });
    return response
  } catch (error) {
    console.log(error);
  }
};

export const login = async (user) => {
  try {
    const response = await fetch(root + 'login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const loggedUser = await response.json();

    return loggedUser;
  } catch (error) {
    console.log(error)
  }
};

export const reg = async (user) => {
  try {
    const response = await fetch(root + "register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    
    return data;
    
  } catch (error) {
    console.log(error);
  }
};

export const out = async() =>{
  try {
    const response = await fetch(root + 'logout', {
      method: "POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify()
    })
    const data = await response.json
  return data
  } catch (error) {
    console.log(error)
  }
}