const { Service } = require('../models');

const getServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const createService = async (req, res) => {
    try {
        const { name, description, duration, price, image_url } = req.body;
        const service = await Service.create({ name, description, duration, price, image_url });
        res.status(201).json(service);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        await service.update(req.body);
        res.json(service);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        await service.destroy();
        res.json({ message: 'Service deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getServices, createService, updateService, deleteService };
