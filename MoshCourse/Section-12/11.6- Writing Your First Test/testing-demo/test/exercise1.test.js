const exercise1 = require('../exercise1');

describe('fizzBuzz', () => {
    it('should check input type', () => {
        expect(() => { exercise1.fizzBuzz('a') }).toThrow();
    });

    it('should check divisibility with 3 and 5', () => {
        const result = exercise1.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });

    it('should check divisibility with 3', () => {
        const result = exercise1.fizzBuzz(9);
        expect(result).toBe('Fizz');
    });

    it('should check divisibility with 5', () => {
        const result = exercise1.fizzBuzz(20);
        expect(result).toBe('Buzz');
    });

    it('Fails divisibility with 3 and 5', () => {
        const result = exercise1.fizzBuzz(2);
        expect(result).toBe(2);
    });
});