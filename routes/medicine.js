
import Joi from 'joi'; 
import express from 'express'
import Medicine from '../models/medicine.js';
import Fuse from 'fuse.js'

const router = express.Router();

router.post("/",async (req , res) => {

    const { error } = validateMedicine(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    console.log(req.body)
    const medicine = new Medicine({
        generic_name:req.body.generic_name.toLowerCase(),
        usage:req.body.usage,
        side_effect:req.body.side_effect
    })
    await medicine.save();
    return res.status(201).send(medicine);
})

router.get('/:generic_name',async (req, res)=>{
    // let medicine = await Medicine.findOne({generic_name:req.params.generic_name})

    // if (!medicine) return res.status(400).send("invalid task id");
    // res.send(medicine);
    const generic_name = req.params.generic_name
    const medicines = await Medicine.find()

    const fuse = new Fuse(medicines, {
      keys: ["generic_name"],
      threshold: 0.99, 
      includeScore: true,
    });
    const result = fuse.search(generic_name)
    if(result.length === 0) return res.status(400).send('Medicine not found in database.')

      return res.status(200).send(result[0].item)
})


function validateMedicine(medicine) {
  const schema = Joi.object({
    generic_name: Joi.string().required(),
    usage:Joi.string().required(),
    side_effect:Joi.string().required(),
  });
  return schema.validate(medicine);
}

export default router;
