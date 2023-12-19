const { createSession, getUserFromSession } = require("../crud/crudSession");
const { getUser } = require("../crud/crudUser");

const currentUser = async (req, res, next) => {
  try {
    const authToken = req.header("Authorization");
    const user = await getUserFromSession(authToken);
    req.currentUser = {
      userInfo: user,
      sessionId: authToken,
    };

    next();
  } catch (error) {
    console.error("Couldn't Get currentUser:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const currentDoctor = async (req, res, next) => {
  try {
    const authToken = req.header("Authorization");
    const user = await getUserFromSession(authToken);
    req.currentUser = {
      userInfo: user,
      sessionId: authToken,
    };

    if (!user || user.role !== "DOCTOR") {
      return res.status(500).json({
        error: "You're Not Authorized to access this recource. DOCTOR ONLY",
      });
    }

    next();
  } catch (error) {
    console.error("Couldn't Get currentUser:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const currentAdmin = async (req, res, next) => {
  try {
    const authToken = req.header("Authorization");
    const user = await getUserFromSession(authToken);
    req.currentUser = {
      userInfo: user,
      sessionId: authToken,
    };

    if (!user || user.role !== "ADMIN") {
      return res.status(500).json({
        error: "You're Not Authorized to access this recource. ADMIN ONLY",
      });
    }

    next();
  } catch (error) {
    console.error("Couldn't Get currentUser:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { currentUser, currentDoctor, currentAdmin };
