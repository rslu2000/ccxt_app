'use strict';
const ccxt = require('./ccxt');


let count = {}
function init(exchange1, exchange2, market) {
    let e1 = new ccxt[exchange1]()
    let e2 = new ccxt[exchange2]()
    return async function run() {
        let [e1OrderBook,
            e2OrderBook] = await Promise.all([e1.fetchOrderBook(market),
            e2.fetchOrderBook(market)]);
        let e1Ask0 = e1OrderBook.asks[0][0];
        let e1Bid0 = e1OrderBook.bids[0][0];
        let e2Ask0 = e2OrderBook.asks[0][0];
        let e2Bid0 = e2OrderBook.bids[0][0];
        let e2Brick = Math.round(((e1Bid0 - e2Ask0) / e2Ask0) * 1000000) / 10000
        let e1Brick = Math.round(((e2Bid0 - e1Ask0) / e1Ask0) * 1000000) / 10000
        console.log(e2Brick + '%', e1Brick + '%')
        if (e2Brick > 0.01 || e1Brick > 0.01) {
            let exchangepair = exchange1 + '/' + exchange2
            count[exchangepair] = count[exchangepair] ? count[exchangepair] + 1 : 1
        }
        return 0
    }
}

let moveBrickFunc1 = init('binance', 'newtonxchange', 'BTC/USDT')

let timer1 = setInterval(moveBrickFunc1, 1000)
setTimeout(() => {
    clearInterval(timer1)
    console.log('binance/newtonxchange 可獲利機會', count['binance/newtonxchange'] || 0,'次')
}, 30000)

let moveBrickFunc2 = init('newtonxchange', 'gateio', 'BTC/USDT')

let timer2 = setInterval(moveBrickFunc2, 1000)
setTimeout(() => {
    clearInterval(timer2)
    console.log('newtonxchange/gateio 可獲利機會', count['newtonxchange/gateio'] || 0,'次')
}, 30000)

let moveBrickFunc3 = init('newtonxchange', 'exx', 'BTC/USDT')

let timer3 = setInterval(moveBrickFunc3, 1000)
setTimeout(() => {
    clearInterval(timer3)
    console.log('newtonxchange/exx 可獲利機會', count['newtonxchange/exx'] || 0,'次')
}, 30000)

