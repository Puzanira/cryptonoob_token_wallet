# Token Wallet Project

Два контракта, non-fungible PuzaNCoin на базе ERC721 токена, и fungible PuzCoin на базе ERC20
Поддерживают функции Send, Approve и Mint для каждого из токенов.

## Запуск и сборка проекта 

* Запустить `ganache-cli -e`
* Подключить метамаск к localhost:8545
* Импортировать счет из ganache в метамаск, используя любой приватный ключ (чтобы на аккаунте было 100 ETH)
* Необходимо поставить truffle и задеплоить контракты:
в корне token_wallet_contracts в терминале выполнить 
```
truffle deploy
```
В консоли появится: 
```
Deploying 'PuzCoin'
   -------------------
   > transaction hash:    0x54bd98e716c121b472c6ec1b7222851ccce7f66027d1b0a76b432a3b3d70b08f
   > Blocks: 0            Seconds: 0
   > contract address:    0x69334F78491a25cb630DCCf98C549c220422a910
   > block number:        3

```
* Из консольного вывода скопировать адрес контракта (и PuzCoin, и PuzanCoin) и вставить в token_wallet_frontend/src/tokens/PuzaNCoin.js и PuzCoin.js 
* А также в MetaMask добавить пользовательские токены, вставив эти адреса.
(Добавить токен -> Пользовательский токен -> Адресс контракта -> Далее -> Далее)
* Собрать фронтенд-проект, и разрешить localhost работать с метамаском.
В корне token_wallet_frontend выполнить `npm install` и `npm run start` и при открытии в браузере локалхоста во всплывающем окне метамаска выбрать аккаунты с ETH и нажать "подключить"
* Выпустить токены, чтобы они появились в кошельке, прописав в консоли трюфеля:
```
PuzaNCoin.deployed().then(function(instance) { return instance.createNFT_("<АДРЕСС ВАШЕГО АККАУНТА>", "Moscow"); }).then(function(responseb) { console.log("response", responseb); });
```
и 
```
PuzCoin.deployed().then(function(instance) { return instance.mint("<АДРЕСС ВАШЕГО АККАУНТА>", 100000); }).then(function(responseb) { console.log("response", responseb); });
```
Пример вызова:
```
$ truffle console
truffle(development)> PuzCoin.deployed().then(function(instance) { return instance.mint("0xE96233fE3712F9Ff540e7720e8422998F12cB98c", 100000); }).then(function(responseb) { console.log("response", responseb); });
esponse {
  tx: '0xd6aa9d39926df0ee14d1a36e2daa4c4859e067d6d1c132b620433bae58b2eb14',
  receipt: {
    transactionHash: '0xd6aa9d39926df0ee14d1a36e2daa4c4859e067d6d1c132b620433bae58b2eb14',
    transactionIndex: 0,
    blockHash: '0xf3478cec9285566dc3a73e7ccf2d77769aaa0eb91d09c128dbd4061b801a7235',
.......

```
После выполнения этой команды в вашем метамаске на счете аккаунта должны появиться **10 PUZ** и **1 PUZAN**
* Обновите локалхост и увидите две записи
*   Пользоваться в локальной сети (PUZAN не работает, там что-то с маппингом)

## Пример трансфера
![transfer1](/screenshots/tokens.png)
![transfer2](/screenshots/tokens2.png)
![transfer3](/screenshots/tokens3.png)
