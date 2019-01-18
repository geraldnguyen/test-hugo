Automated Testing for Hugo site
=================================

# Install and Usages
```
npm install test-hugo -g
```

Sample `package.json`:
```json
{
  "name": "huwent",
  "version": "1.0.0",
  "description": "Hugo get tested",
  "main": "index.js",
  "scripts": {
    "hugo": "hugo server -D",
    "build": "hugo -D; npm run test-hugo",
    "test-hugo": "test-hg"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {},

  "test-hugo": {
    "options": "-D",
    "diff": "--brief -b",
    "snapshotFailfast": false
  }
}
```

Usages
```
npm run test-hugo -- --add-snapshot <PATH>
npm run test-hugo -- --htmlproofer <true|false>
npm run test-hugo
```

# Overview
To start testing: `npm run test-hugo`. The following validations are executed:
- Run `htmlproofer` on `public` directory
  - Add `--htmlproofer false` to skip this steps
- Compared recorded snapshots to correcting files under `public` directory
  - Add `--compare-snapshot false` to skip this step

To add or update snapshots: `npm run test-hugo -- --add-snapshot <PATH>`

This tool is configurable by setting appropriate entries in `package.json` file. Example:
```
  "test-hugo": {
    "options": "-D",              # Hugo CLI's options
    "diff": "--brief -b",         # diff's option
    "snapshotFailfast": false     # Stop comparing at first mismatch?
  }
```

## Sample project
Todo

# External Dependencies
- [htmlproofer](https://github.com/gjtorikian/html-proofer): requires Ruby

# License
MIT