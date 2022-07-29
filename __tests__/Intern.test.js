const Intern = require('../lib/Intern');

test('creates an intern object', () => {
    const intern = new Intern('Snowlee', 'snowlee@gmail.com', 4, 'REEE NC');

    expect(intern.name).toBe('Snowlee');
    expect(intern.email).toBe('snowlee@gmail.com');
    expect(intern.id).toEqual(expect.any(Number));
    expect(intern.school).toBe('REEE NC');
});

test("gets the intern's school", () => {
    const intern = new Intern('Snowlee', 'snowlee@gmail.com', 4, 'REEE NC');

    expect(intern.getSchool()).toEqual(expect.stringContaining("REEE NC"));
});

test("gets the intern role", () => {
    const intern = new Intern('Snowlee', 'snowlee@gmail.com', 4, 'REEE NC');

    expect(intern.getRole()).toEqual(expect.stringContaining("Intern"));
});