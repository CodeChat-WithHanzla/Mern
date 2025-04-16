import axios from "axios";

export const getAddressCoordinate = async (address) => {
  const apiKey = process.env.GOOGLE_MAP_API_SECRET;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address: address,
          key: apiKey,
        },
      }
    );

    if (response.data.status === "OK") {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lng };
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }
  const apiKey = process.env.GOOGLE_MAP_API_SECRET;
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json`,
      {
        params: {
          origins: origin,
          destinations: destination,
          key: apiKey,
        },
      }
    );

    if (response.data.status === "OK") {
      const element = response.data.rows[0].elements[0];
      const distance = element.distance.value;
      const duration = element.duration.value;
      return { distance, duration };
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getAutoCompleteSuggestionsService = async (input) => {
  if (!input) throw new Error("Query is required");
  const apiKey = process.env.GOOGLE_MAP_API_SECRET;
  try {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;
    const response = await axios.get(url);
    if (response.data.status === "OK") return response.data.predictions;
    else throw new Error("Unable to fetch suggestions");
  } catch (error) {
    console.error(error);
    throw error;
  }
};
