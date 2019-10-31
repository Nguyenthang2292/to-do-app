module.exports = {
    validate: function(req,res,next){
        if(!req.body.name || !req.body.status || req.body.name === ''){
            res.json({
                status: "failed",
                message: "Check input field"
            });
        } else next();
    }
}