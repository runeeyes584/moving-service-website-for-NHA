const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createEmployee = async (req, res) => {
    try {
        const { password, ...rest } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const employee = new Employee({ ...rest, password: hashedPassword });
        await employee.save();
        res.status(201).json(employee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const { password, ...rest } = req.body;
        let updateData = { ...rest };
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }
        const employee = await Employee.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.json(employee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.json({ message: 'Employee deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
