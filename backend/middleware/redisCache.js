const redis = require('redis');
const client = redis.createClient(6379);

function getTotalPage(length){
    return (length <= 10) ? 1 : Math.ceil(length/10);
}

module.exports = {
    redisCache: function(request,response,next){
        if(request.method !== 'GET'){
            client.del("type");
            next();
            return;
        }
        try {
            client.get("type", (err,res) => {
                if(!res || res !== request.query.type) {
                    next();
                } else {
                        let type = res;
                        let data = { 
                            dataSource: "cache", 
                            type: request.query.type 
                        }
                        let begin = (parseInt(request.query.page)-1)*10;
                        let end = (parseInt(request.query.page)-1)*10 + 10;
                            client.get("data:work", (err,work) => {
                                let listWork = JSON.parse(work);
                                let totalPage;
                                switch(type){
                                    case "search":
                                        listWork = JSON.parse(work);
                                        listWork = listWork.filter((el) => el.name.includes(request.query.searchValue));
                                        break;
                                    case "sort":
                                        listWork = JSON.parse(work);
                                        switch (request.query.sortValue) {
                                            case("increase"):
                                                listWork = listWork.sort((a,b) => a.name.localeCompare(b.name));
                                                break;
                                            case("decrease"):
                                                listWork = listWork.sort((a,b) => b.name.localeCompare(a.name));
                                               break;
                                            case("isActive"):
                                                listWork = [...listWork.filter((el) => el.status === "show").sort((a,b) =>  a.name.localeCompare(b.name)),
                                                ...listWork.filter((el) => el.status === "hide").sort((a,b) =>  a.name.localeCompare(b.name))];
                                               break;
                                            case("isDisable"):
                                                listWork = [...listWork.filter((el) => el.status === "hide").sort((a,b) =>  a.name.localeCompare(b.name)),
                                                ...listWork.filter((el) => el.status === "show").sort((a,b) =>  a.name.localeCompare(b.name))];
                                                break;
                                            default: 
                                                listWork = listWork;
                                            }
                                    default:
                                        break;
                                }
                                totalPage = getTotalPage(listWork.length);
                                if(totalPage === 1) {
                                    data={...data, listWorkArr: listWork, totalPage: 1}
                                } else {
                                    listWork = Object.keys(listWork).map(item => listWork[item]).slice(begin, end);
                                    data={...data, listWorkArr: listWork, totalPage: totalPage}
                                }
                                response.json({data: data});
                            });
                    }
                })
        } catch (err) {
            console.log('An error Occur on Cache Middleware...');
            next();
        }
    }
}