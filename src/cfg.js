const path = require('path');
const cfgdef = require('aframework/cfgdef');
//----------------------------------------------------------------
const cfg = cfgdef();
//----------------------------------------------------------------
cfg.app.name = 'capofpro';
cfg.app.rootFolder = path.join(__dirname, '..');
const nodeModulesPath = path.join(__dirname, "..", 'node_modules');
cfg.autowire.folders = [
    __dirname,
    path.join(nodeModulesPath, "account_service"),
    path.join(nodeModulesPath, "user_service"),
    path.join(nodeModulesPath, "ai_service"),
    path.join(nodeModulesPath, "message_service"),
];
//----------------------------------------------------------------
cfg.web.port = 3016;
//----------------------------------------------------------------
cfg.redis.enabled = true;
cfg.mysql.enabled = true;
cfg.mysql.database = "leonsagent";
cfg.mysql.username = "root";
cfg.mysql.password = "1qaz2wsx";
cfg.sqlite.enabled = false;
cfg.worker.enabled = true;
//----------------------------------------------------------------
const userServiceSet = require('user_service/src/cfgset');
userServiceSet(cfg);
//----------------------------------------------------------------
const aiServiceSet = require('ai_service/src/cfgset');
aiServiceSet(cfg);
//----------------------------------------------------------------
module.exports = cfg;
