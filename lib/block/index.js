const crypto = require('crypto')
const unixTimestamp = require('unix-timestamp')

module.exports = class Block {
  constructor({
    data = '',
    previousHash = '',
    index = 0
  }) {
    this.calcTimes = 0
    this.previousHash = previousHash
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
      ${String(this.calcTimes)}
    `

    const hash = crypto.createHash('sha256')
    return hash.update(message).digest('hex')
  }

  // 矿工挖矿机制，hash 计算保证每个新的区块前 4 位都为 0
  calculate() {
    const TIME_FLAG = Symbol('time: ')
    console.time(TIME_FLAG)

    while(this.hash.slice(0, 4) !== Array(4).fill(0).join('')) {
      this.calcTimes++
      this.hash = this.generateHash()
    }

    console.timeEnd(TIME_FLAG)
    console.log(`hash: ${this.hash}`)

    return this
  }
}
