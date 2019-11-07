const cluster = require('cluster');
const os = require('os');
const numCPUs = os.cpus().length;
const runServer = require('./app');
const boxen = require('boxen');
const chalk = require('chalk');
const Table = require('cli-table3');
let table = new Table({
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
});

if (cluster.isMaster) {
    console.log(chalk.yellow("Master process") + boxen(chalk.bgGreen.black(`${process.pid}`), {padding: 1, margin: 1, borderStyle: 'classic', borderColor: "green"}) + chalk.yellow("is running................."));
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
      table.push({
            "Worker process": [chalk.yellow("-----------[" + cluster.workers[i+1].process.pid + "]-----------"), i+1,  chalk.bgBlue("is running"), os.cpus()[i].model]
        })
    }

    console.log(table.toString());

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else { runServer() }
 
cluster.on('exit', (Worker) => {
    console.log(`Worker ${Worker.id} died`);
    console.log('Starting a new one...');
    cluster.fork();
})