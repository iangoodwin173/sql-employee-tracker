
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
    (first_name, last_name, role_id, job_title, manager_id, department_id, salary)
VALUES
    ('Mike', 'Owens', 1, 'Contracts Manager', 4, 1, 120000),
    ('Jeff', 'Adamson', 2, 'Help Desk Admin', 3, 2, 65000),
    ('Andre', 'Ericks', 3, 'HR Coordinator', 1, 3, 85000),
    ('Peter', 'Larsen', 4, 'Inside Sales Rep', 5, 4, 77000);