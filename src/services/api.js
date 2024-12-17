// src/services/api.js


const BASE_URL = '127.0.0.1:8000'; // Replace with your Django backend URL

// Example function for making a GET request
export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error to handle it in the component that called this function
  }
};

// Example function for making a POST request
export const postData = async (endpoint, data) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers as needed
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error posting data:', error);
    throw error; // Rethrow the error to handle it in the component that called this function
  }
};