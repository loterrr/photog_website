const { Portfolio } = require('../models');

const getPortfolio = async (req, res) => {
    try {
        const items = await Portfolio.findAll();
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const addToPortfolio = async (req, res) => {
    try {
        const { title, image_url, category } = req.body;
        const item = await Portfolio.create({ title, image_url, category });
        res.status(201).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteFromPortfolio = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Portfolio.findByPk(id);
        if (!item) {
            return res.status(404).json({ message: 'Portfolio item not found' });
        }
        await item.destroy();
        res.json({ message: 'Item deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getPortfolio, addToPortfolio, deleteFromPortfolio };
