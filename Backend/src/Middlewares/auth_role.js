export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            // Check if user exists
            if (!req.user) {
                return res.status(401).json({
                    message: "User not authenticated",
                });
            }

            // check if user role is allowed
            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({
                    message: "Access denied",
                });
            }

            next();

        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error: error.message,
            });
        }
    };
};