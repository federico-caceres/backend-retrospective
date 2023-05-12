const retrospectiveCtrl = {};
const Category = require('../db/models/category');
const Card = require('../db/models/card');
const { connection } = require('../db/connectionDB');


// Creación de nueva categoría
retrospectiveCtrl.createCategory = async (req, res) =>
{
    const category = new Category({
        name: req.body.name,
        color: req.body.color,
    });

    category.save()
    .then(() => {
        res.status(201).send(category);
    })
    .catch((error) => {
        res.status(400).send(error);
    });

};

// Obtención de categorías
retrospectiveCtrl.getCategories = async (req, res) => 
{
    try {
        const categories = await Category.find();
        res.status(200).send(categories);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Actualización de categoría
retrospectiveCtrl.updateCategory = async (req, res) =>
{
    try {
        const { id, color } = req.body;
        const category = await Category.findByIdAndUpdate(id, { color }, { new: true });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).send(error.message);
    } 
};

// Creación de nueva tarjeta
retrospectiveCtrl.createCard = async (req, res) =>
{
    try {
        const { description, categoryId } = req.body;

        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({ error: 'Categoria no encontrada' });
        }

        const card = new Card({
            description: description,
            category: category._id,
        });
      
        await card.save();

        res.status(200).json(card);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Obtención de todas las tarjetas
retrospectiveCtrl.getAllCards = async (req, res) =>
{
    try {
        const cards = await Card.find();
        res.status(200).send(cards);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Actualización de datos de tarjeta
retrospectiveCtrl.updateCard = async (req, res) =>
{
    try {
        const { description, id } = req.body;
        const card = await Card.findByIdAndUpdate(id, { description }, { new: true });
        res.status(200).json(card);
    } catch (error) {
        res.status(500).send(error.message);
    } 
};

// Eliminación de tarjeta
retrospectiveCtrl.deleteCard = async (req, res) =>
{
    try {
        const { id } = req.body;
        const card = await Card.findByIdAndDelete(id);
        if (!card) {
            return res.status(404).json({ message: 'Tarjeta no encontrada' });
        }

        res.status(200).json(card);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Actualización de likes de tarjeta
retrospectiveCtrl.updateLikes = async (req, res) =>
{
    try {
        const { id } = req.body;
        
        const card = await Card.findById(id);

        if (!card) {
          return res.status(404).json({success: false, message: 'Tarjeta no encontrada' });
        }

        // Validamos que una tarjeta no pueda tener más de un like
        if (card.likes > 0) {
            return res.status(200).json({success: false, message: 'Solo un me gusta por tarjeta!' });
        }
        card.likes++;
    
        const updatedCard = await card.save();
    
        res.status(200).json({success: true, card: updatedCard});        
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Agregar comentario a tarjeta
retrospectiveCtrl.addComment = async (req, res) =>
{
    try {
        const { id, comment } = req.body;

        const card = await Card.findById(id);
        if (!card) {
          return res.status(404).json({ message: 'La tarjeta no existe' });
        }

        card.comments.push({ text: comment });
        await card.save();
        
        res.status(200).json(card);

      } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
      }
};

module.exports = retrospectiveCtrl;
