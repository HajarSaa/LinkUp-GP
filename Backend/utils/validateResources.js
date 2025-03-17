import mongoose from "mongoose";
import catchAsync from "./catchAsync.js";

export const validateResources = (resources) => {
  return async (req, res, next) => {
    // console.log(resources);
    // Get all models
    const models = {};
    resources.forEach((resource) => {
      if (!models[resource.model]) {
        models[resource.model] = mongoose.model(resource.model);
      }
    });

    // Check each resource exists
    for (const resource of resources) {
      const { model: modelName, field, value } = resource;

      // Get actual value from request if needed
      let actualValue = value;
      if (typeof value === "string" && value.startsWith("req.")) {
        const path = value.substring(4).split(".");
        actualValue = req;
        for (const part of path) {
          actualValue = actualValue[part];
        }
      }

      if (actualValue) {
        // Check if ID is valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(actualValue)) {
          return res.status(400).json({
            success: false,
            message: `Invalid ${field} format`,
          });
        }

        // Find the resource
        const Model = models[modelName];
        const foundResource = await Model.findById(actualValue);

        if (!foundResource) {
          return res.status(404).json({
            success: false,
            message: `${modelName} with ${field} ${actualValue} not found`,
          });
        }
      }
    }

    next();
  };
};

// TODO - add this validation on all post requests across all controllers
