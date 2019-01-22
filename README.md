Automated Testing for Hugo site
=================================

# Install and Usages
```
npm install test-hugo --save-dev
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
    "build": "hugo -D",
    "test-hugo": "test-hg"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {},
  "devDependencies": {
    "test-hugo": "^1.0.0"
  },
  "test-hugo": {
    "options": "-D",
    "diff": "--brief -b",
    "snapshotFailfast": false,
    "htmlproofer": "/usr/local/lib/ruby/gems/2.6.0/bin/htmlproofer"
  }
}
```

Usages
```
npm run test-hugo -- --add-snapshot <PATH>
npm run test-hugo -- --htmlproofer <true|false>
npm run test-hugo -- --compare-snapshot <true|false>
```

# Overview
The following validations will run on `npm run test-hugo`:
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
    "htmlproofer": "/usr/local/lib/ruby/gems/2.6.0/bin/htmlproofer" # default is htmlproofer, set this option if you need to specify a path
  }
```

## Sample project
See the `huwent` hugo site inside `test` folder

# External Dependencies
- [htmlproofer](https://github.com/gjtorikian/html-proofer): requires Ruby

# License
MIT