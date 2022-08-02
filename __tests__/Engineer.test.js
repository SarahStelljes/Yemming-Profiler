const Engineer = require('../lib/Engineer');

test('creates an engineer object', () => {
    const engineer = new Engineer('Salang', 'salang@gmail.com', 3, 'Salang');

    expect(engineer.name).toBe('Salang');
    expect(engineer.email).toBe('salang@gmail.com');
    expect(engineer.id).toEqual(expect.any(Number));
    expect(engineer.github).toBe('Salang');
});

test("gets an engineer's Github", () => {
    const engineer = new Engineer('Salang', 'salang@gmail.com', 3, 'Salang');

    expect(engineer.getGithub()).toEqual(expect.stringContaining('Salang'));
});

test("gets the engineer's role", () => {
    const engineer = new Engineer('Salang', 'salang@gmail.com', 3, 'Salang');

    expect(engineer.getRole()).toEqual(expect.stringContaining('Engineer'));
});