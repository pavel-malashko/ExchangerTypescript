"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Data {
}
exports.Data = Data;
class Wallet {
    constructor() {
        this.setCurList(this.currency);
    }
    setCurList(cur) {
        this.currency = cur;
        return cur;
    }
    getBal(val) {
        let idx = Wallet.getID(this.currency, val);
        return (idx !== null) ? (this.currency[idx]).sum : 0;
    }
    transfer(sum, val) {
        let idx = Wallet.getID(this.currency, val);
        if (sum < 0 && (this.currency[idx].sum + sum) < 0)
            return false;
        else
            this.currency[idx].sum = this.currency[idx].sum + sum;
        return this.currency[idx].sum;
    }
    static getID(ar, val) {
        let pos = ar.map((e) => e.val).indexOf(val);
        return (pos !== -1) ? pos : null;
    }
}
exports.Wallet = Wallet;
class Exchange extends Wallet {
    constructor() {
        super(...arguments);
        this.rateData = new Map();
    }
    setBaseCur(val) {
        let idx = Exchange.getID(this.currency, val);
        if (idx === null) {
            this.currency.push({ sum: 0, val: val });
            this.baseCurIdx = this.currency.length - 1;
        }
        else {
            this.baseCurIdx = idx;
        }
        return this.baseCurIdx;
    }
    setRate(val, rate) {
        let idx = Exchange.getID(this.currency, val);
        if (idx === null) {
            this.currency.push({ sum: 0, val: val });
            idx = this.currency.length - 1;
        }
        this.rateData.set(idx, rate);
    }
    exchaangeVal(wallet, val, sum) {
        let idx = Exchange.getID(this.currency, val);
        let valRate = this.rateData.get(idx);
        let newSum = sum * valRate;
        let newVal = this.currency[this.baseCurIdx].val;
        if (valRate === undefined) {
            console.log('не найден курс валюта', val);
            return false;
        }
        else {
            wallet.transfer(-sum, val);
            this.transfer(-newSum, newVal);
            this.transfer(sum, val);
            this.transfer(newSum, newVal);
            return true;
        }
    }
}
exports.Exchange = Exchange;
let t = [{ sum: 1000, val: 'USD' }];
let wallet = new Exchange();
wallet.setCurList(t);
wallet.setBaseCur('USD');
wallet.setRate('RUB', 2);
wallet.getBal('USD');
wallet.exchaangeVal(wallet, 'RUB', 20);
