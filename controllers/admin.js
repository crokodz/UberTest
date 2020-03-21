const Product = require('../models/product');
const Category = require('../models/category');
const Offer = require('../models/offer');

exports.getHome = (req, res, next) => {
  res.render('admin/home', {
    pageTitle: 'Home',
    path: '/admin/home',
    editing: false
  });
};

exports.getAddProduct = (req, res, next) => {
  Category.fetchAll()
  .then(categories => {
    Offer.fetchAll()
    .then(offers => {
      res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
        categories: categories,
        offers: offers
      })
      .catch(err => {
            console.log(err);
      })
    })
    .catch(err => {
          console.log(err);
    })
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const category = req.body.category;
  const offer = req.body.offer;
  const product = new Product(title, price, description, imageUrl, category, offer);
  product
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;

  Product.findById(prodId)
  .then(product => {
    if (!product) {
      return res.redirect('/');
    }

    Category.fetchAll()
    .then(categories => {
      Offer.fetchAll()
      .then(offers => {
        res.render('admin/edit-product', {
          pageTitle: 'Edit Product',
          path: '/admin/edit-product',
          editing: editMode,
          product: product,
          categories: categories,
          offers: offers
        })
        .catch(err => {
              console.log(err);
        })
      })
      .catch(err => {
            console.log(err);
      })
    });
  })
  .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedCategory = req.body.category;
  const updatedOffer = req.body.offer;

  const product = new Product(
    updatedTitle,
    updatedPrice,
    updatedDesc,
    updatedImageUrl,
    updatedCategory,
    updatedOffer,
    prodId
  );
  product
    .save()
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(products => {
    Category.fetchAll()
    .then(category => {
      Offer.fetchAll()
      .then(offer => {
        const productList = products.map((itemC, index) => {
          itemC.categoryName = category.filter((c, index) => c._id == itemC.category)[0]['name']
          itemC.discount = offer.filter((o, index) => o._id == itemC.offer)[0]['discount']
          return itemC
        })

        res.render('admin/products', {
          prods: productList,
          pageTitle: 'Admin Products',
          path: '/admin/products',
          offer: offer
        })
        .catch(err => {
              console.log(err);
        })
      })
      .catch(err => {
            console.log(err);
      })
    })
    .catch(err => {
          console.log(err);
    })
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

//Category Controller
exports.getCategories = (req, res, next) => {
  Category.fetchAll()
  .then(categories => {
    res.render('admin/categories', {
      categories: categories,
      pageTitle: 'Admin Categories',
      path: '/admin/categories'
    })
    .catch(err => {
          console.log(err);
    })
  });
};

exports.postAddCategory = (req, res, next) => {
  const name = req.body.name;
  const category = new Category(name);
  category
    .save()
    .then(result => {
      console.log('Created Category');
      res.redirect('/admin/categories');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getAddCategory = (req, res, next) => {
  res.render('admin/edit-category', {
    pageTitle: 'Add Category',
    path: '/admin/add-category',
    editing: false
  });
};

exports.getEditCategory = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const categoryId = req.params.categoryId;

  Category.findById(categoryId)
  .then(category => {
    if (!category) {
      return res.redirect('/');
    }
    res.render('admin/edit-category', {
      pageTitle: 'Edit Category',
      path: '/admin/edit-category',
      editing: editMode,
      category: category
    });
  })
  .catch(err => console.log(err));
};

exports.postEditCategory = (req, res, next) => {
  const categoryId = req.body.categoryId;
  const updatedName = req.body.name;

  const category = new Category(
    updatedName,
    categoryId
  );
  category
    .save()
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/categories');
    })
    .catch(err => console.log(err));
};

exports.postDeleteCategory = (req, res, next) => {
  const categoryId = req.body.categoryId;
  Category.deleteById(categoryId)
    .then(() => {
      console.log('DESTROYED CATEGORY');
      res.redirect('/admin/categories');
    })
    .catch(err => console.log(err));
};


//Offer Controller
exports.getOffers = (req, res, next) => {
  Offer.fetchAll()
  .then(offers => {
    res.render('admin/offers', {
      offers: offers,
      pageTitle: 'Admin Offers',
      path: '/admin/offers'
    })
    .catch(err => {
          console.log(err);
    })
  });
};

exports.postAddOffer = (req, res, next) => {
  const name = req.body.name;
  const discount = req.body.discount;
  const offer = new Offer(name, discount);
  offer
    .save()
    .then(result => {
      console.log('Created Offer');
      res.redirect('/admin/offers');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getAddOffer = (req, res, next) => {
  res.render('admin/edit-offer', {
    pageTitle: 'Add Offer',
    path: '/admin/add-offer',
    editing: false
  });
};

exports.getEditOffer = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const offerId = req.params.offerId;

  Offer.findById(offerId)
  .then(offer => {
    if (!offer) {
      return res.redirect('/');
    }
    res.render('admin/edit-offer', {
      pageTitle: 'Edit Offer',
      path: '/admin/edit-offer',
      editing: editMode,
      offer: offer
    });
  })
  .catch(err => console.log(err));
};

exports.postEditOffer = (req, res, next) => {
  const offerId = req.body.offerId;
  const updatedName = req.body.name;
  const updateddiscount = req.body.discount;

  const offer = new Offer(
    updatedName,
    updateddiscount,
    offerId
  );
  offer
    .save()
    .then(result => {
      console.log('UPDATED OFFER!');
      res.redirect('/admin/offers');
    })
    .catch(err => console.log(err));
};

exports.postDeleteOffer = (req, res, next) => {
  const offerId = req.body.offerId;
  Offer.deleteById(offerId)
    .then(() => {
      console.log('DESTROYED OFFER');
      res.redirect('/admin/offers');
    })
    .catch(err => console.log(err));
};