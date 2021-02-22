const ProductController = {};
const Product = require("../models/product");

ProductController.addProduct = (req, res) => {
  
    let products = req.body;
    
    if (products && products._id) {
      if (req.file) {
        products.image = req.file.path;
      }
        Product.findByIdAndUpdate( products._id,{ $set: products },{ new: true })
        .then((update) => {
          return res.status(200).json(update);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const product = new Product({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        image: req.file.path,
        price : req.body.price,
        option : req.body.option,
        countInStock : req.body.countInStock,
        user: req.user._id,
      });
      product.save().then((result) => {
        res.json(result);
      })
      .catch((err) => {
        return res.status(400).json({ err });
      });
      
    }
 
};
ProductController.getProducts = async (req, res, next) => {
  try {
    const size_default = 10;
    let page;
    let searchq = {};
    let sortq = '-_id';

    if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
      page = Math.abs(req.query.page);
    } else {
      page = 1;
    }
    if (req.query.category) {
      searchq = { category: req.query.category, ...searchq };
    }
    if (req.query.price) {
      let p1 = req.query.price.split('-')[0];
      let p2 = req.query.price.split('-')[1];
      
      searchq = { price: {$gt : p1 , $lte : p2}, ...searchq };
    }
    console.log(searchq,'sq');
    const data = await Product.find(searchq).sort(sortq).skip((page - 1) * size_default).limit(size_default);
    const totaldata = await Product.countDocuments().lean();
    // console.log(data);

    return res.json(data);
  } catch (err) {
    res.json(err);
  }
};
ProductController.getProductsList = async (req, res, next) => {
  try {
    const size_default = 10;
    let page;
    if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
      page = Math.abs(req.query.page);
    } else {
      page = 1;
    }
    const data = await Product.find().skip((page - 1) * size_default).limit(size_default);
    const totaldata = await Product.countDocuments().lean();
    // console.log(data);

    return res.json(totaldata);
  } catch (err) {
    res.json(err);
  }
};
ProductController.getProduct = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const data = await Product.findOne({
      _id: id,
    });
    return res.json(data);
  } catch (err) {
    res.json(err);
  }
};

ProductController.deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const deletedata = await Product.findOneAndDelete({ _id: id });
    return res.json(deletedata);
  } catch (err) {
    res.json(err);
  }
};

ProductController.createProductReview = async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.productId)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      return res.status(400).json({error: "product already reviewed"})
      // throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    return res.status(400).json({error: "product not found"})

    // res.status(404)
    // throw new Error('Product not found')
  }
}

module.exports = ProductController;
