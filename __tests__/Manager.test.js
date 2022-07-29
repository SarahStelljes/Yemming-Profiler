const Manager = require('../lib/Manager');

test("creates a manager object", () => {
    const manager = new Manager('Sarang', 'sarah.stelljes@gmail.com', 2, 123);

    
    expect(manager.name).toBe('Sarang');
    expect(manager.email).toBe('sarah.stelljes@gmail.com');
    expect(manager.id).toEqual(expect.any(Number));
    expect(manager.officeNumber).toEqual(expect.any(Number));
});

test("gets the manager's role", () => {
    const manager = new Manager('Sarang', 'sarah.stelljes@gmail.com', 2, 123);

    expect(manager.getRole()).toEqual(expect.stringContaining('Manager'));
});