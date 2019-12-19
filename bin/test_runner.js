#!/usr/bin/env node

'use strict';

const async = require('async');
const sh = require('shelljs');
const chalk = require('chalk');

const cwd = process.cwd();

async.waterfall([
    eslint,
    babel,
    testRunner
], function (err, result) {
    if (err) throw err;
});

function eslint(next) {
    sh.echo(chalk.green('\nStep 1: Running Eslint'));

    if (sh.exec(`${cwd}/node_modules/.bin/eslint src`).code !== 0) {
        sh.echo(chalk.redBright('eslint failed'));
    } else {
        sh.echo(chalk.green('eslint pass'));
        next(null);
    }
}

function babel(next) {
    sh.echo(chalk.green('\nStep 2: Running Babel'));

    if (sh.exec(`${cwd}/node_modules/.bin/babel src -d dist --verbose --delete-dir-on-start`).code !== 0) {
        sh.echo(chalk.redBright('babel failed'));
    } else {
        sh.echo(chalk.green('babel pass'));
        next(null);
    }
}

function testRunner() {
    sh.echo(chalk.green('\nStep 3: Running Tests'));

    sh.exec(`${cwd}/node_modules/.bin/mocha --exit tests`);
}