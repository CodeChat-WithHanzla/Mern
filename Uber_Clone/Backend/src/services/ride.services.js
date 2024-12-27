import rideModel from "../models/ride.model.js";
import { getDistanceTime } from "./map.services.js";

const getFare = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }
  const { distance, duration } = await getDistanceTime(pickup, destination);
  console.log(`${distance} + ${duration}`);

  const baseFare = 50;
  const perKmRate = {
    car: 10,
    bike: 5,
    auto: 7,
  };
  const perMinuteRate = {
    car: 2,
    bike: 1,
    auto: 1.5,
  };

  const fare = {
    car: baseFare + (distance/1000) * perKmRate.car + (duration/60) * perMinuteRate.car,
    bike: baseFare + (distance/1000) * perKmRate.bike + (duration/60) * perMinuteRate.bike,
    auto: baseFare + (distance/1000) * perKmRate.auto + (duration/60) * perMinuteRate.auto,
  };
  

  return fare;
};

export const createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType)
    throw new Error("All Fields are required");
  const fare = await getFare(pickup, destination);
  const ride = rideModel.create({
    user,
    pickup,
    destination,
    fare: fare[vehicleType],
  });
  return ride;
};
