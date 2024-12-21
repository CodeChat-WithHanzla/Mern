import captainModel from "../models/captain.model.js";

export const createCaptain = async ({ fullName, email, hashPassword, vehicle }) => {
    if (!fullName?.firstName || !email || !hashPassword || !vehicle?.color || !vehicle?.plate || !vehicle?.capacity || !vehicle?.vehicleType)
        throw new Error("All fields are required");
    const captain = await captainModel.create({
        fullName: {
            firstName: fullName.firstName,
            lastName: fullName.lastName,
        },
        email,
        password: hashPassword,
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType,
        },
    });
    return captain;
};