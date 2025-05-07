import e from 'express';
import jwt from 'jsonwebtoken';


const auth  = async (req, res, next) => {
    try {
        // why we did this beacuse tokens came like this: "BEARER token....xyz"
        const token = req.headers.authorization.split(" ")[1];  
        let decodedData ;

        if(token) {
            decodedData = jwt.verify(token, process.env.SECRET_TOKEN);

            req.userId = decodedData?.id; 
        }
        else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub  
        }
        next();   // this is mandatory to go to the next middleware
        
    } catch (error) {
        res.status(500).json({ message: "error!!!" });
    }
}

export default auth;