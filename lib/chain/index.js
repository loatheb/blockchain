const fs = require('fs')
const path = require('path')
const Block = require('../block')

module.exports = class Chain {
  constructor() {
    this.chain = [this.initBlock()]
    this.record()
  }

  initBlock() {
    return new Block({
      data: 'genesis',
    })
  }

  add(data) {
    const meta = {
      index: this.chain.length,
      previousHash: this.chain[this.chain.length - 1].hash
    }

    const block = new Block({
      data,
      ...meta,
    }).calculate()

    this.chain.push(block)
    this.record()
  }

  // TODO: add memcached or change to mongodb?
  record() {
    const pathToData = path.resolve(__dirname, '..', 'data.bitchain')

    if (!fs.existsSync(pathToData)) {
      fs.open(pathToData, 'w', (err) => {
        if (err) throw new Error(`create ${pathToData} file fail`)
      })
    }

    const data = JSON.stringify(this.chain, null, 2)
    return fs.writeFileSync(pathToData, data, 'utf8')
  }
}
