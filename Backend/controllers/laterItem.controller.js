import catchAsync from "../utils/catchAsync.js";
import LaterItem from "../models/laterItem.model.js";
import Workspace from "../models/workspace.model.js";

export const getLaterItems = catchAsync(async (req, res, next) => {
  const workspaceId = req.workspace.id;

  // Find the workspace
  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    return next(new AppError("No workspace found with that ID", 404));
  }

  // Find all later items for the workspace
  const laterItems = await LaterItem.find({ workspaceId });

  // Send the response
  res.status(200).json({
    srtatus: "success",
    results: laterItems.length,
    data: {
      laterItems: laterItems || [],
    },
  });
});
