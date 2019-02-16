import ccxt

newtonxchange = ccxt.newtonxchange()

print newtonxchange.fetch_trades('BTC/USDT')