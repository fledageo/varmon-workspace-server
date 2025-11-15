
const checkRole = (roles = []) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ status: "error", message: "Unauthorized" });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({ status: "error", message: "Forbidden: Insufficient permissions" });
    }

    next();
  };
};

module.exports = checkRole;