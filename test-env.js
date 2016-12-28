// NOTE: This sets up the mocha test environment by including
// babel-polyfill, chai and fetchMock globals while throwing
// upon any uncaught exception or unhandled promise rejection.

import 'babel-polyfill';
import { expect } from 'chai';
import fetchMock from 'fetch-mock';

global.expect = expect;
global.fetchMock = fetchMock;

process.on('uncaughtException', (err) => { throw err; });
process.on('unhandledRejection', (err) => { throw err; });
