import {
  getAddressCoordinate,
  getDistanceTime,
  getAutoCompleteSuggestionsService,
} from "../services/map.services.js";
import { validationResult } from "express-validator";

export const getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { address } = req.query;

  try {
    const coordinates = await getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({ msg: "Coordinates not found." });
  }
};
export const getDistanceTimeController = async (req, res, next) => {
  try {
    const { origin, destination } = req.query;
    const { distance, duration } = await getDistanceTime(origin, destination);
    res.status(200).json({ distance, duration });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server error" });
  }
};
export const getAutoCompleteSuggestions = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { input } = req.query;

  try {
    const suggestions = await getAutoCompleteSuggestionsService(input);
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server error" });
  }
};
