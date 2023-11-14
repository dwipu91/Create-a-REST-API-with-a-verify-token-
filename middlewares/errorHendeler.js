


export const  errorHandler = (error, req, res, next) =>{
    // find status conde
    const status = res.statusCode ? res.statusCode : 500;
    
    // send error message
    res.status(status).json({ message: error.message })
}