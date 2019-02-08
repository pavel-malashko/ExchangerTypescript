// создаем класс Data который будем использовать для описание типа
export class Data {
  sum:number;
  val:string;
}


//создаем интерфейс кошелька
interface IWallet{
  sum:number;
  val:string;
}


/**
 * реализуем интерфейс IWallet
 * Устанавливаем currency с типом Data
 * в конструкторе устанавливаем метод currency
 */
export class  Wallet implements  IWallet{
    currency:Data[];
    sum:number;
    val:string;
    constructor(){
      this.setCurList(this.currency);
    }


  //  Устанавливает currency c типом Data
    setCurList(cur:Data[]):any {
        this.currency = cur;
        return cur;
    }


    /**
     * получает баланс в указанной валюте
     * возвращает сумму по указанной валюте, в противном случае 0, если не нашло
     */
    public getBal(val:string):number{
      let idx:number = Wallet.getID(this.currency,val);
      return (idx !== null) ? (this.currency[idx]).sum :0;
    }


    /**
     * производит обмен валюты
     * если сумма отрицательная то возвращает false, если нет ,то возвращает сумму
     */
    transfer(sum:number,val:string): any {
      let idx:number = Wallet.getID(this.currency,val);
      if(sum < 0 && (this.currency[idx].sum + sum) < 0 )  return false;
      else this.currency[idx].sum = this.currency[idx].sum + sum; return this.currency[idx].sum;
    }


    /**
     * статическая функция для поиска ID
     * возвращает pos по указанной валюте, если не нашло то null
     */
    static getID(ar:Data[], val:string): number {
      let pos = ar.map((e)=> e.val).indexOf(val);
      return   (pos !== -1)  ? pos: null;
    }
}


 // описываем интерфейс
interface IExchange {
  baseCurIdx:number; // базовый курc по индексу
  rateData:Map<Number,Number>; //курсы валют
  setBaseCur(val:string):number; // функция для установки базовой валюты
  setRate(val:string, rate:number):void; // функция установки курсов валют
  exchaangeVal(wallet:Wallet, val:string, sum:number):boolean // функция транзакции валюты
}


/**
 * реализуем интерфейс IExchange
 * Устанавливаем currency с типом Data
 * в конструкторе устанавливаем метод currency
 */
export class Exchange extends  Wallet implements IExchange {
  baseCurIdx:number;
  rateData:Map<Number,Number> = new Map<number,number>();


  /**
   * setBaseCur Устанавливает базовый индекс для валюты
   * возвращает индекс
   */
  setBaseCur(val:string):number{
    let idx:number = Exchange.getID(this.currency,val);
    if(idx === null) {
      this.currency.push({sum:0,val:val});
      this.baseCurIdx = this.currency.length -1;
    }
    else {
      this.baseCurIdx = idx;
    }
    return this.baseCurIdx;
  }


   // setRate устанавливает курс для валюты
  setRate(val:string,rate:number):void{
    let idx: number = Exchange.getID(this.currency,val);
    if(idx === null) {
      this.currency.push({sum:0,val:val});
      idx = this.currency.length -1;
    }
    this.rateData.set(idx,rate);
  }


   // exchaangeVal ищет курс к указнной валюте, если не нашел , то  возвращает false, если  нашел то проиходит transfer
  exchaangeVal(wallet:Wallet, val:string, sum:number):boolean  {
    let idx: number = Exchange.getID(this.currency,val);
    let valRate:any =  this.rateData.get(idx);
    let newSum:number = sum*valRate;
    let newVal:string = this.currency[this.baseCurIdx].val;
    if( valRate === undefined ){
      console.log('не найден курс валюта',val);
      return false;
    }
    else{
      wallet.transfer(-sum,val);
      this.transfer(-newSum,newVal);
      this.transfer(sum,val);
      this.transfer(newSum,newVal);
      return true;
    }
  }
}


//это пример работы программы на основе экземпляра класса
let t:Data[]=[{sum:1000,val:'USD'}];
let wallet = new Exchange();
wallet.setCurList(t);
wallet.setBaseCur('USD');
wallet.setRate('RUB',2);
wallet.getBal('USD');
wallet.exchaangeVal(wallet,'RUB',20);
