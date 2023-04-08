const fs = require('fs')
const db = require('../db.js')
const key_setup = require('../key_setup.js')


console.log('seting up keys now')
const start = Date.now()
key_setup(start)