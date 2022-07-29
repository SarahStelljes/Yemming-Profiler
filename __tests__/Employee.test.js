const Employee = require('../lib/Employee');

test('creates an employee object', () => {
    const employee = new Employee('Sarah', 'sarah.stelljes@gmail.com', 1);

    expect(employee.name).toBe('Sarah');
    expect(employee.email).toBe('sarah.stelljes@gmail.com');
    expect(employee.id).toEqual(expect.any(Number));
});

test("gets an employee's name", () => {
    const employee = new Employee('Sarah', 'sarah.stelljes@gmail.com', 1);

    expect(employee.getName()).toEqual(expect.stringContaining('Sarah'));
});

test("gets an employee's id", () => {
    const employee = new Employee('Sarah', 'sarah.stelljes@gmail.com', 1);

    expect(employee.getId()).toEqual(expect.stringContaining(employee.id.toString()));
});

test("gets an employee's email", () => {
    const employee = new Employee('Sarah', 'sarah.stelljes@gmail.com', 1);

    expect(employee.getEmail()).toEqual(expect.stringContaining(employee.email));
});

test("gets an employee's role", () => {
    const employee = new Employee('Sarah', 'sarah.stelljes@gmail.com', 1);

    expect(employee.getRole()).toEqual(expect.stringContaining('Employee'));
});