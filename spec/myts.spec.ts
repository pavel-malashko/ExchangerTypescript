import 'jasmine';
import { Data,Exchange,Wallet } from '../myts'
let tmp: Data[] = [{sum:100,val:'USD'}];
let exchange = new Exchange();
describe('ALLm param', () => {
    beforeEach(()=>{
      spyOn(exchange, 'setCurList').and.callThrough();
      spyOn(Wallet, 'getID').and.callThrough();
      spyOn(exchange, 'getBal').and.callThrough();
      spyOn(exchange, 'transfer').and.callThrough();
      spyOn(exchange, 'setBaseCur').and.callThrough();
      spyOn(exchange, 'setRate').and.callThrough();
      spyOn(exchange, 'exchaangeVal').and.callThrough();
            });
    it("проверка типов  и функции setCurList", ()=> {
      let setCurList = exchange.setCurList(tmp)
      expect(exchange.setCurList).toHaveBeenCalled();
      expect(exchange.currency).toBeDefined(tmp)
      console.log("результат функции setCurList: " + setCurList);
      });
      it("проверка функции getID ", ()=> {
        let getID = Wallet.getID(tmp,'USD');
        expect(Wallet.getID).toHaveBeenCalled();
        if ( getID===null )expect(getID).toEqual(null);
        else expect(getID).toEqual(jasmine.any(Number));
        console.log("результат функции getID: " + getID);
      })
      it("проверка функции getBal ", ()=> {
        let getBal = exchange.getBal("USD");
        expect(exchange.getBal).toHaveBeenCalled();
        expect(getBal===exchange.currency[0].sum).toBe(true);
        console.log("результат функции getBal: " + getBal);
      })
      it("проверка функции transfer", ()=> {
        let transfer = exchange.transfer(220,"USD");
        expect(transfer === exchange.currency[0].sum).toBe(true);
        expect(exchange.transfer).toHaveBeenCalled();
        expect(Wallet.getID).toHaveBeenCalled();
        console.log("результат функции transfer: " + transfer);
      })
      it("проверка функции setBaseCur", ()=> {
        let setBaseCur = exchange.setBaseCur("RUB");
        expect(Wallet.getID).toHaveBeenCalled();
        expect(exchange.setBaseCur).toHaveBeenCalled();
        let idx = Wallet.getID(exchange.currency,"RUB");
        if(idx===null)expect(exchange.currency.length -1).toEqual(exchange.baseCurIdx)
        else expect(idx).toEqual(exchange.baseCurIdx)
        console.log("результат функции setBaseCur: " + setBaseCur);
      })
      it("проверка функции setRate", ()=> {
        exchange.setRate("RUB",2);
        expect(Wallet.getID).toHaveBeenCalled();
        let idx = Wallet.getID(exchange.currency,"RUB");
        if (idx===null) expect(exchange.currency.length -1).toEqual(exchange.baseCurIdx)
        console.log("функция setRate работает");
      })
      it("проверка функции exchaangeVal", ()=> {
       let exchaangeVal = exchange.exchaangeVal(exchange,"RUB",20);
       expect(Wallet.getID).toHaveBeenCalled();
       expect(exchange.exchaangeVal).toHaveBeenCalled();
       let idx: number = Exchange.getID(exchange.currency,"RUB");
       let valRate:any =  exchange.rateData.get(idx);
       if (valRate === undefined) expect(exchaangeVal).toBe(false);
       else expect(exchaangeVal).toBe(true);
       console.log("результат функции exchaangeVal: " + exchaangeVal);
      })
});
