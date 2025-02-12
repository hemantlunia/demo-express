import jwt from "jsonwebtoken";

const authMiddleware = async(req, res, next) => {
    console.log("middleware run");
    
  try {
    const { userToken } = req.cookies;
    // console.log("userToken", userToken);
    

    if (!userToken) {
      return res.json({
        message: "You are Not Authorized, Please Login !",
        success: false,
        error: true,
      });
    }

    jwt.verify(userToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          message: "Token is Not Verified...",
          success: false,
          error: true,
        });
      }
      req.user = decoded;
      console.log("tokenid", req.user);
      
      next();
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error while authenticating, Try Again...",
      success: false,
      error: true,
      status: 500,
    });
  }
};

export default authMiddleware;
