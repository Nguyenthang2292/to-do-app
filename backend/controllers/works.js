const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const uuid = require('uuid/v1');
const redis = require('redis');
const client = redis.createClient(6379);

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({works: []})
  .write()

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
    listQueryPage: ((req,res,next) => {
        console.log(req.query);
        let begin = (parseInt(req.query.page)-1)*10;
        let end = (parseInt(req.query.page)-1)*10 + 10;
        try{
            const listWork = db.get('works')
                            .value()
            const listWorkLength = db.get('works')
                                    .size()
                                    .value()
            let redisArr = []
            listWork.map((el) => {
                console.log(el)
            })
            if(listWorkLength <= 10) {
                client.set("type", "list");
                client.set("totalPage", "1");
                client.hmset("data", )
                res.json({
                    status: "success",
                    message: "Work list found!!!",
                    data: {
                        totalPage: 1,
                        listWorkArr: listWork
                    }
                })
            } else {
                listWorkArr = Object.keys(listWork).map(item => listWork[item]).slice(begin, end);
                // client.set("data", {
                //     totalPage: Math.ceil(listWorkLength/10),
                //     listWorkArr: listWork
                // });
                res.json({
                    status: "success",
                    message: "Work list found!!!",
                    data: {
                        totalPage: Math.ceil(listWorkLength/10),
                        listWorkArr
                    }
                })
            }
        } catch(err) {
            next(err);
        }
    }),
    listFilterSearch: ((req,res,next) => {
        console.log(req.query);
        let begin = (parseInt(req.query.page)-1)*10;
        let end = (parseInt(req.query.page)-1)*10 + 10;
        try{
            const listWork = db.get('works')
                            .value()
            const listWorkFilterSearch = listWork.filter((el) => el.name.includes(req.query.searchValue));
            const listWorkLength = listWorkFilterSearch.length;
            if(listWorkLength <= 10) {
                res.json({
                    status: "success",
                    message: "Work list found!!!",
                    data: {
                        totalPage: 1,
                        listWorkArr: listWorkFilterSearch
                    }
                })
            } else {
                listWorkFilterSearch = Object.keys(listWorkFilterSearch).map(item => listWorkFilterSearch[item]).slice(begin, end);
                res.json({
                    status: "success",
                    message: "Work list found!!!",
                    data: {
                        totalPage: Math.ceil(listWorkLength/10),
                        listWorkArr: listWorkFilterSearch
                    }
                })
            }
        } catch(err) {
            next(err);
        }
    }),
    listFilterSort: ((req,res,next) => {
        console.log(req.query);
        let begin = (parseInt(req.query.page)-1)*10;
        let end = (parseInt(req.query.page)-1)*10 + 10;
        try{
            let listWork = db.get('works')
                            .value()
            switch (req.query.sortValue) {
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
            const listWorkLength = listWork.length;
            if(listWorkLength <= 10) {
                res.json({
                    status: "success",
                    message: "Work list found!!!",
                    data: {
                        totalPage: 1,
                        listWorkArr: listWork
                    }
                })
            } else {
                listWork = Object.keys(listWork).map(item => listWork[item]).slice(begin, end);
                res.json({
                    status: "success",
                    message: "Work list found!!!",
                    data: {
                        totalPage: Math.ceil(listWorkLength/10),
                        listWorkArr: listWork
                    }
                })
            }
        } catch(err) {
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