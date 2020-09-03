const lib = require('../lib');

test('Our first test', () => {

});

describe('absolute', () => {
    it('should return a +ve num if input is +ve', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    }); 
    
    it('should return a +ve num if input is -ve', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });
    
    it('should return 0 num if input is +ve', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet', () => {
    it('should return the greeting message', () => {
        const result = lib.greet('Shan');
        expect(result).toMatch(/Shan/);
        expect(result).toContain('Shan');
    }); 
});

describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies('Shan');
        // expect(result).toContain('USD');
        // expect(result).toContain('AUD');   // proper way
        // expect(result).toContain('EUR');
        // ideal way
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
    }); 
});

describe('getProduct', () => {
    it('should return the product with the given id', () => {
        const result = lib.getProduct(1);
        // expect(result).toEqual({ id: 1, price: 10 });
        expect(result).toMatchObject({ id: 1, price: 10 });
        // expect(result).toHaveProperty({ id: 1 });
    }); 
});