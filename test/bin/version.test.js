/* eslint-env node, mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { assert } from 'chai';
import path from 'path';
import { exec } from 'child_process';

const binPath = path.relative(process.cwd(), path.join('bin', '_mocha'));

describe('cli - version', function () {
  before(function () {
    this.version = require('../../package.json').version;
  });

  it('--version prints the correct version', function (done) {
    exec(`node ${binPath} --version`, (err, stdout) => {
      assert.isNull(err);
      assert.include(stdout, this.version);
      done();
    });
  });
});
