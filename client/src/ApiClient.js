const root = "http://localhost:4000/";

export const getAllPhotos = async () => {
  try {
    const response = await fetch(root);
    const data = response.json();

    // const popularOrder = data.sort()
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
  } catch (error) {
    console.log(error);
  }
};
