
INSERT INTO department (name)
VALUES
    ('Legal'),
    ('IT'),
    ('Operations'),
    ('Sales');


INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Contracts Manager', 120000, 1),
    ('Help Desk Admin', 65000, 2),
    ('HR Coordinator', 85000, 3),
    ('Inside Sales Rep', 77000, 4);


INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Mike', 'Owens', 1, 4),
    ('Jeff', 'Adamson', 2, 3),
    ('Andre', 'Ericks', 3, 1),
    ('Peter', 'Larsen', 4,5);