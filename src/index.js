const helper = require('./helper');
const path = require('path');

// Constants
const SNAPSHOT_DIR = "snapshot";
const PUBLIC_DIR = "public"
const TMP_DIR = "build/test-hugo/out";


function addSnapshot(ssPath){
  // required directories
  helper.require_dir(SNAPSHOT_DIR, TMP_DIR);

  //build hugo
  helper.run_hugo("-d " + TMP_DIR);

  //copy files or dir from TMP_DIR to SNAPSHOT_DIR
  const resolvedPath = path.resolve(TMP_DIR, ssPath);
  const destDir = path.join(SNAPSHOT_DIR, path.dirname(ssPath));
  helper.require_dir(destDir);

  if (helper.is_dir(resolvedPath)){
    helper.copy_dir(resolvedPath, destDir);
  }
  else {
    helper.copy_files(resolvedPath, destDir) ;
  }
}

function test(options){
  helper.echo("Options: " + JSON.stringify(options));

  let successful = true;


  if (options.htmlproofer){
    let shellProcess = helper.run_htmlproofer();
    successful = successful && (shellProcess.code === 0);
  }

  if (options.compareSnapshot){
    let exitCode = compareSnapshot();
    successful = successful && (exitCode === 0);
  }

  if (!successful){
    process.exit(1);
  }
}

function compareSnapshot(){
  let snapshotFiles = helper.find(SNAPSHOT_DIR).map(file => file.substr(SNAPSHOT_DIR.length + 1));
  let snapshotFailfast = helper.getConfig().snapshotFailfast;
  if (snapshotFailfast === undefined) snapshotFailfast = true;
  let mismatches = [];

  snapshotFiles.every(file => {
    const hugoPath = path.join(PUBLIC_DIR, "/", file);
    const snapshotPath = path.join(SNAPSHOT_DIR, "/", file);
    const exitCode = helper.diff(hugoPath, snapshotPath);
    if (exitCode) {
      mismatches.push(file);
    }
    if (snapshotFailfast) {
      return exitCode === 0
    }
    return true;
  });

  if (mismatches.length == 0){
    helper.echo("All snapshots matched");
    return 0;
  }
  else {
    console.error("Some snapshots did not match");
    mismatches.forEach(file => console.error("\t" + file));
    return 1;
  }

}


module.exports = {
  addSnapshot,
  test
};