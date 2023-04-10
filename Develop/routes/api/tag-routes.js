const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const data = await Tag.findAll({
      include: 
        {
          model: Product
        }
    });
   res.json(data);
  } catch (err){
    console.error(err);
    res.status(500).json({message:"Sorry, we have an error with your Product 😣"});
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const data = await Tag.findByPk(req.params.id, {
      include: 
        {
          model: Product
        }
    });
    if (data){
      return res.json(data);
    } else { 
      res.status(404).json({ message: "Please try again 🤨"});
    }
  } catch (err){
    console.error(err);
    res.status(500).json({message: "Ummmm... try again, something wrong here 🧐"});
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const data = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(201).json(data);
  } catch(err){
    console.error(err);
    res.status(500).json({message: "Sorry something wrong, try again 🥺"});
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const data = await Tag.update(req.body, {
      where: {
         id: req.params.id
        }
    });
    if(data){
      return res.json(data);
    } else {
      return res.status(404).json({message:"Oh no... the category doesn't exist"});
    }
  } catch (err){
    console.error(err);
    res.status(500).json({
     message: "Something wrong! 🙃", err: err
    });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try { 
    const data = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if(data){
      return res.json(data);
    } else{
      return res.status(404).json({ message: "Something has happened"});
    }
  } catch(err){
    console.error(err);
    res.status(500).json({ message: "Something wrong 😟", err: err});
  }
});

module.exports = router;
