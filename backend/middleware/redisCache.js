const redis = require('redis');
const client = redis.createClient(6379);

module.exports = {
    redisCache: function(request,response,next){
        console.log('in redis middleware', request.body.type);
        client.get("type", (err,res) => {
            if(res = request.body.type){
                response.json({
                    dataSource: "cache"
                })
            } else next();
        })
    }
}