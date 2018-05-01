const Chain = require('./lib/chain')

const chain = new Chain()
console.log(chain.chain)

chain.add('zhangzhao create')
console.log(chain.chain)

chain.add('bob create')
console.log(chain.chain)

chain.add('zhangzhao create')
console.log(chain.chain)
