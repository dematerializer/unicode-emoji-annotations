// NOTE: This sets up the mocha test environment by including
// babel-polyfill and chai globals while throwing
// upon any uncaught exception or unhandled promise rejection.

import 'babel-polyfill';
import { expect } from 'chai';

global.expect = expect;

process.on('uncaughtException', (err) => { throw err; });
process.on('unhandledRejection', (err) => { throw err; });
