const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const uuid = require('uuid/v1');

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
    listAll: ((req,res,next) => {
        let begin = (parseInt(req.query.page)-1)*9;
        let end = (parseInt(req.query.page)-1)*9 + 9;
        try{
            const listWork = db.get('works')
                            .value()
            const listWorkLength = db.get('works')
                                    .size()
                                    .value()
            if(listWorkLength <= 9) {
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
                res.json({
                    status: "success",
                    message: "Work list found!!!",
                    data: {
                        totalPage: Math.ceil(listWorkLength/9),
                        listWorkArr
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