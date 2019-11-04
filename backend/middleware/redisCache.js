const redis = require('redis');
const client = redis.createClient(6379);

module.exports = {
    redisCache: function(request,response,next){
        console.log(request.query);
        try {
            client.get("type", (err,res) => {
                if(!res || request.query.type !== res) {
                    next();
                } else {
                        let data = { dataSource: "cache", type: request.query.type }
                        client.get("totalPage", (err, res) => {
                            data = {...data, totalPage: res}
                                client.get("data:work", (err,work) => {
                                    let begin = (parseInt(request.query.page)-1)*10;
                                    let end = (parseInt(request.query.page)-1)*10 + 10;
                                    let listWork = JSON.parse(work);

                                    if(listWork.length <= 10) {
                                        data={...data, listWorkArr: listWork}
                                    } else {
                                        listWork = Object.keys(listWork).map(item => listWork[item]).slice(begin, end);
                                        data={...data, listWorkArr: listWork}
                                    }
                                    response.json({data: data})
                            });
                        });
                }
            })
        } catch (err) {next()}
    }
}