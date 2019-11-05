const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const uuid = require('uuid/v1');
const redis = require('redis');
const client = redis.createClient(6379);

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({works: []})
  .write()

function setRedis(initialArr, type){
    try {
        client.set("data:work", JSON.stringify(initialArr));
        client.set("type", type);
        console.log('Set Redis cache Successfully...');
    } catch (err){
        console.log("Oop have an Error Occur.... " + err);
    }
}

function getTotalPage(length){
    return (length <= 10) ? 1 : Math.ceil(length/10);
}

module.exports = {
    create: ((req,res,next) => {
        try{
            db.get('works')
                .push({
                    id: uuid(),
                    name: req.body.name,
                    status: req.body.status
                })
                .write()
            res.json({
                status: "success",
                message: "Work added successfully!!",
                data: null
            });
        } catch(err) {
            next(err);
        }
    }),
    listWork: ((req,res,next) => {
        let begin = (parseInt(req.query.page)-1)*10;
        let end = (parseInt(req.query.page)-1)*10 + 10;
        try{
            const listWorkGetFromDatabase = db.get('works')
                            .value()
            const listWorkGetFromDatabaseLength = db.get('works')
                                    .size()
                                    .value()
            let listWork = listWorkGetFromDatabase;
            let totalPage;
            switch(req.query.type) {
                case "search":
                    listWork = listWorkGetFromDatabase.filter((el) => el.name.includes(req.query.searchValue));
                    setRedis(listWorkGetFromDatabase, "search");
                    break;
                case "sort":
                        switch (req.query.sortValue) {
                            case("increase"):
                                listWork = listWorkGetFromDatabase.sort((a,b) => a.name.localeCompare(b.name));
                                break;
                            case("decrease"):
                                listWork = listWorkGetFromDatabase.sort((a,b) => b.name.localeCompare(a.name));
                               break;
                            case("isActive"):
                                listWork = [...listWorkGetFromDatabase.filter((el) => el.status === "show").sort((a,b) =>  a.name.localeCompare(b.name)),
                                ...listWorkGetFromDatabase.filter((el) => el.status === "hide").sort((a,b) =>  a.name.localeCompare(b.name))];
                               break;
                            case("isDisable"):
                                listWork = [...listWorkGetFromDatabase.filter((el) => el.status === "hide").sort((a,b) =>  a.name.localeCompare(b.name)),
                                ...listWorkGetFromDatabase.filter((el) => el.status === "show").sort((a,b) =>  a.name.localeCompare(b.name))];
                                break;
                            default: 
                                listWork = listWorkGetFromDatabase;
                            }
                    setRedis(listWorkGetFromDatabase, "sort");
                    break;
                default:
                    setRedis(listWorkGetFromDatabase, "list");
                    break;
            }
            totalPage = getTotalPage(listWork.length);
            if(totalPage === 1) {
                res.json({
                    status: "success",
                    message: "Work list found!!!",
                    data: {
                        dataSource: "server",
                        totalPage: totalPage,
                        listWorkArr: listWork
                    }
                })
            } else {
                listWorkArr = Object.keys(listWork).map(item => listWork[item]).slice(begin, end);
                res.json({
                    status: "success",
                    message: "Work list found!!!",
                    data: {
                        dataSource: "server",
                        totalPage: totalPage,
                        listWorkArr
                    }
                })
            }
        } catch(err) {
            console.log(err);
            next(err);
        }
    }),
    update:((req,res,next) => {
        console.log(req.body);
        try{
            db.get('works')
                .find({id: req.body.id})
                .assign({ name: req.body.name, status: req.body.status})
                .write()
            res.json({
                status: "success",
                message: "Work updated successfully!!",
                data: null
            });
        } catch(err){
            next(err);
        }
    }),
    delete: ((req,res,next) => {
        try{
            db.get('works')
                .remove({id: req.body.id})
                .write()
            res.json({
                status: "success",
                message: "Work deleted successfully!!",
                data: null
            });
        } catch(err) {
            next(err);
        }
    })
}