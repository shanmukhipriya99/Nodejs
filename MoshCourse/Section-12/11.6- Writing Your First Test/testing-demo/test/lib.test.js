const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

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

describe('registerUser', () => {
    it('should throw if username is falsy', () => {
        const args = [ null, undefined, NaN, 0, '', false];
        args.forEach(a => {
            expect(() => { lib.registerUser(a) }).toThrow();
        });
    }); 

    it('should return a user object if valid username is passed', () => {
        const result = lib.registerUser('Shan');
        expect(result).toMatchObject({ username: 'Shan'})
        expect(result.id).toBeGreaterThan(0);
    });
});

describe('Apply discount function', () => {
    it('should apply 10% discount if customer has more than 10 points', () => {
        db.getCustomerSync = function(customerId) {
            console.log('Fake reading customer...')
            return { id: customerId, points: 20 };
        }
        const order = { customerId: 1, totalPrice: 10};
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
});

describe('notifyCustomer', () => {
    it('should send an email to the customer', () => {
        // const mockFunction = jest.fn();
        // mockFunction.mockReturnValue(1);
        // mockFunction.mockResolvedValue(1);
        // mockFunction.mockRejectedValue(new Error('...'));
        // const result = await mockFunction();

        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' });
        // db.getCustomerSync = function(customerId) {
        //     return { email: 'a' };
        // }

        mail.send = jest.fn();
        // let mailSent = false;
        // mail.send = function (email, message) {
        //     mailSent = true;
        // }
        lib.notifyCustomer({ customerId: 1 });
        expect(mail.send).toHaveBeenCalled();
        // expect(mail.send).toHaveBeenCalledWith('a', '...'); // can be used for arguments, preferably not strings
        expect(mail.send.mock.calls[0][0]).toBe('a');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    });
});