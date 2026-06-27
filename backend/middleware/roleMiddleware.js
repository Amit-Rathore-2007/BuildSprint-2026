exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({
      success: false,
      message: "Only Admin can perform this action.",
    });
  }

  next();
};

exports.isClubOrAdmin = (req, res, next) => {
  if (
    req.user.role !== "Admin" &&
    req.user.role !== "Club"
  ) {
    return res.status(403).json({
      success: false,
      message: "Only Club or Admin can perform this action.",
    });
  }

  next();
};
