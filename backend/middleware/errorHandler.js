const errorHandler = (err, req, res, next) => {
    if(err.status === 500){
        return res.json({"message": `Server Error Detected.`});
    }
    res.status(err.status);
    res.json({"message": `${err.message}`});
    next();
}


module.exports = errorHandler;