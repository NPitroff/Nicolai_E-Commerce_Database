const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

//================GET ALL PRODUCTS=======================//
router.get("/", async (req, res) => {
  try {
    const productData = await Product.findAll(req.params, {
      include: [
        {
          models: Category,
          attributes: ["id"],
          Product,
          through: ProductTag,
          attributes: ["id"],
          Tag,
          through: ProductTag,
          attributes: ["id"],
        },
      ],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Category and Tag data
});

//================GET ONE PRODUCT========================//
router.get("/:id", async (req, res) => {
  try {
    const productData = await Product.findAll({
      where: {
        id:req.params.id,
      },
      include: [
         Category,
          {
          model: Tag,
          through: ProductTag,
        },
      ],
    });
    //============'IF' STATEMENT SHOULD 'ID' NOT BE FOUND========
    if (!productData) {
      res.status(404).json({ message: "NO PRODUCT BY THAT ID IN INVENTORY" });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//===============CREATE A NEW PRODUCT=============================//
router.post("/", (req, res) => {
  // let data = {
  //     product_name: "Basketball",
  //     price: 200.00,
  //     stock: 3,
  //     tagIds: [1, 2, 3, 4]
  //   }

  //  console.log(req.body)
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_name: product.name,
            price: product.price,
            stock: product.stock,
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//=============UPDATE PRODUCT DATA=================//
router.put("/:id", (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});
//=============DELETE ONE PRODUCT BY IT'S ID VALUE=======================//
router.delete("/:id", async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: "No Product found with this id!" });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
