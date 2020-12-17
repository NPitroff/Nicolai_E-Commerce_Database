const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

//======================GET ALL TAGS=================//
router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll(req.params, {
      include: [{ models: Product, through: ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});
//============FIND A TAG BY ITS ID===============//
router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      // include: [{ model: Product, through: ProductTag }],
    });
    //======ERROR IF TAGDATA ID DOES NOT EXIST=====
    if (!tagData) {
      res.status(404).json({ message: "NO TAG WITH THIS ID." });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//=======CREATE A NEW TAG===========//
//======================================================
// {
//   "id":10,
//   "tag_name":"Grogu Doll"

// }
//======================================================
router.post("/", async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});
//=============UPDATE TAG DATA=======//
router.put("/:id", async (req, res) => {
  try {
    const tagData = await Tag.update(
      {
        id: req.params.id,
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!tagData) {
      res.status(404).json({ message: "No Tag found with this id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//=============DELETE TAG DATA==================//
router.delete("/:id", async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: "No Tag found with this id!" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
