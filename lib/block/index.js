const crypto = require('crypto')
const unixTimestamp = require('unix-timestamp')

module.exports = class Block {
  constructor(data, index = 0) {
    this.height = 0
    this.previousHash = ''
    this.index = index
    this.data = data
    this.hash = this.generateHash()
    this.timestamp = unixTimestamp.now()
  }

  generateHash() {
    const message = `
      ${String(this.index)}
      ${String(this.data)}
      ${String(this.timestamp)}
      ${String(this.previousHash)}
      ${String(this.height)}
    `

    const hash = crypto.createHash('sha256')
    return hash(message).digest()
  }

  generateOwnBlock() {
    const TIME_FLAG = Symbol('time: ')
    console.time(TIME_FLAG)

    while() {
      this.height++
    }

    this.hash = this.generateHash()

    const duration = console.timeEnd(TIME_FLAG)

    console.log('%s; \n hash: %s \n', duration, this.hash)
  }
}
