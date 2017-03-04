const path = require('path');

const ROOT = path.join(process.cwd());
const CLIENT = path.join(ROOT, 'client');
const SRC = path.join(CLIENT, 'src');
const ASSETS = path.join(CLIENT, 'assets');
const DIST = path.join(ROOT, 'dist');
const APP = path.join(SRC, 'app');
const SERVER = path.join(ROOT, 'server');
const PUBLIC = path.join(DIST, 'public');
const ICONS = path.join(SRC, 'icons');
const STYLES = path.join(SRC, 'styles');
const TESTS = path.join(ROOT, 'tests');
const ASSET_FILE = path.join(SERVER, 'webpack-assets.json');

module.exports = { ROOT, SRC, DIST, ASSETS, APP, ICONS, PUBLIC, STYLES, TESTS, ASSET_FILE };
