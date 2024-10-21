import instance from "./constant";

export const register = async (data) => {

  try {
    const response = await instance.post("/register", data);
    console.log(response);
    return response.data; 
  } catch (error) {
    console.error("Error:", error);
    throw error; 
  }


  // await instance
  //   .post("/register", data)
  //   .then((response) => {
  //     return response.data;
  //   })
  //   .catch((error) => {
  //     return "Error - " + error;
  //   });
};

export const checkGstNumber = async (data) => {
  try {
    const response = await instance.post("/checkGstNumber", data);
    console.log(response);
    return response.data; 
  } catch (error) {
    console.error("Error:", error);
    throw error; 
  }
};

// export const login = async (data) => {
//     await instance
//       .post("/login", data)
//       .then((response) => {
//         console.log(response);
//         return response.data;
//       })
//       .catch((error) => {
//         return "Error - " + error;
//       });
// };


export const login = async (formData) => {
  try {
    const response = await instance.post("/login", formData);
    console.log(response);
    return response.data; 
  } catch (error) {
    console.error("Error:", error.message);
    return error; 
  }
};

export const createRecipt = async (data) => {
  try {
    const token=localStorage.getItem("token")
    const response = await instance.post("/CreateReceipt", data,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response);
    return response.data; 
  } catch (error) {
    console.error("Error:", error);
    throw error; 
  }
};

export const getPurchaseBook = async (data) => {
  try {
    const token=localStorage.getItem("token")
    const response = await instance.post("/purchaseBook", data,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response);
    return response.data; 
  } catch (error) {
    console.error("Error:", error);
    throw error; 
  }
};

export const showParchi = async (data) => {
  try {
    const token=localStorage.getItem("token")
    const response = await instance.post("/showParchi", data,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response);
    return response.data; 
  } catch (error) {
    console.error("Error:", error);
    throw error; 
  }
};

export const getProfileInfo = async (data) => {
  try {
    const token=localStorage.getItem("token")
    const response = await instance.post("/profileInfo", data,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response);
    return response.data; 
  } catch (error) {
    console.error("Error:", error);
    throw error; 
  }
};

export const sentPDF=async (data)=>{
  try {
    const token=localStorage.getItem("token")
    const response = await instance.post("/sentPdf", data,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response);
    return response.data; 
  } catch (error) {
    console.error("Error:", error);
    throw error; 
  }
}

export const updateProfile = async (data) => {
  try {
    const token=localStorage.getItem("token")
    const response = await instance.post("/updateProfile", data,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response);
    return response.data; 
  } catch (error) {
    console.error("Error:", error);
    throw error; 
  }
};


