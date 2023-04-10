const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const data = await Category.findAll({
      include:{
        model: Product
      }
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const data = await Category.findByPk(req.params.id, {
      include: { 
        model: Product
      }
    });
    if(data){
      return res.json(data);
     } else{
      return res.status(404).json({message: "No category found 😟, try again"});
     } 
    } catch (err){
      console.error(err);
       res.status(500).json(err);
      }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  }).then(data =>{
    res.status(201).json(data)
  }).catch(err=>{
    console.log(err);
    res.status(500).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body,{
    where:{
      id: req.params.id
    }
  }).then(data =>{
    if (data[0]){
      return res.json(data)
    } else{ 
      return res.status(404).json({message: "The category doesn't exist, please try again 🥸"})}
  }).catch (err=>{
    console.error(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then (data=>{
    if (data){
      return res.json(data)
    } else { 
      return res.status(404).json({message: "Please try with another category 🫣"})
    }
  }).catch(err=>{
      console.error(err);
      res.status(500).json(err)
    })
});

module.exports = router;
