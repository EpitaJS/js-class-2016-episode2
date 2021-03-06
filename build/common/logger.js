'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createFancyLogger(id) {
  id = (id || 'default').toUpperCase();

  function logBetter(level) {
    let prefix = `${ getTimestamp() } - ${ id } - `;

    // handle

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (_lodash2.default.isString(args[0])) args[0] = prefix + args[0];else args.unshift(prefix);

    console[level].apply(console, args);
  }

  /* eslint-disable no-undefined */
  return {
    log: logBetter.bind(undefined, 'log'),
    info: logBetter.bind(undefined, 'info'),
    warn: logBetter.bind(undefined, 'warn'),
    error: logBetter.bind(undefined, 'error')
  };
}

/** Convert a Javascript date to yyy/mm/dd hh:mm:ss.ms
 *
 * @param {Date} d
 */
function getTimestamp(d) {
  /* eslint complexity: [2,9] */
  d = d || new Date();

  let yyyy = d.getFullYear();
  let mm = d.getMonth() + 1; // O-based
  let dd = d.getDate();
  // These lines ensure we have two-digits
  if (mm < 10) mm = '0' + mm;
  if (dd < 10) dd = '0' + dd;

  let hh = d.getUTCHours();
  let mn = d.getUTCMinutes();
  let ss = d.getSeconds();
  let mss = d.getMilliseconds();
  // These lines ensure we have two-digits
  if (hh < 10) hh = '0' + hh;
  if (mn < 10) mn = '0' + mn;
  if (ss < 10) ss = '0' + ss;
  if (mss < 10) mss = '00' + mss;else if (mss < 100) mss = '0' + mss;

  return `${ yyyy }/${ mm }/${ dd } ${ hh }:${ mm }:${ ss }.${ mss }`;
}

/////////////////////////////////////////////////////////

const defaultLogger = createFancyLogger();
defaultLogger.create = createFancyLogger;

exports.default = defaultLogger;
exports.create = createFancyLogger;