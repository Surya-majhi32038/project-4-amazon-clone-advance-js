import { formatCurrency } from "../../scripts/utils/money.js";

describe('Test suite: formateCurrency',()=>{
    it('converts price into dollars',()=>{
        expect(formatCurrency(2095)).toEqual('20.95');
    });
    it('work with price 0 value ',()=>{
        expect(formatCurrency(0)).toEqual('0.00');
    });
    it('round up to nearest value ',()=>{
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
});

