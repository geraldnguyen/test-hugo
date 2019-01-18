var shell = require("shelljs");
var path = require('path');

function getConfig(){
  const packageJson = require(path.resolve('package.json'));
  return packageJson["test-hugo"];
}

function echo(str){
  shell.exec("echo " + JSON.stringify(str));
}

function is_dir(path){
  return shell.test('-d', path);
}

function require_dir(...paths){
  for (const path of paths) {
    if (! is_dir(path)) {
      shell.mkdir("-p", path);;
    }
  }
}

function change_dir(path){
  shell.cd(path);
}

function copy_dir(from, to){
  shell.cp("-R", from, to);
}

function copy_files(files, toDir){
  shell.cp(files, toDir);
}

function diff(hugoPath, snapshotPath){
  let diffOptions = getConfig().diff || "";
  let process = shell.exec("diff " + diffOptions + " " + hugoPath + " " + snapshotPath);
  return process.code;
}

function find(args){
  return shell.find(args).filter(function(file) { return file.match(/\.html$/); });
}

function run_hugo(options){
  options = getConfig().options + " " + options;
  shell.exec("hugo " + options);
}

function run_htmlproofer(options = "public") {
  return shell.exec("./htmlproofer.sh " + options);
}

module.exports = {
  getConfig,

  echo,
  is_dir,
  require_dir,
  change_dir,
  copy_dir,
  copy_files,

  run_hugo,
  run_htmlproofer,

  diff,
  find
};