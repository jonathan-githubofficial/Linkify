import jwt from "jsonwebtoken";

// Define the secret used for verifying tokens
const secret = 'test';

// Define the auth middleware function
const auth = async (req, res, next) => {
  try {
    // Get the authorization header from the request
    const token = req.headers.authorization.split(" ")[1];

    // Check if the token is a custom token or not
    const isCustomAuth = token.length < 500;

    let decodedData;

    // If it's a custom token, verify it with the secret and set the user ID on the request
    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      // If it's not a custom token, decode it and set the subject as the user ID on the request
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }    

    // Call the next middleware
    next();
  } catch (error) {
    // Log any errors to the console
    console.log(error);
  }
};

export default auth;
