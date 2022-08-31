
const {getProduct} = require('../elastic')

async function checkProductAmount(req, res, next) {
  try {
    const query = req.query;
    req.query.name = req.query.name.toLowerCase();
    req.query.quantity = req.query.quantity.toLowerCase();

    
    const p = await getProduct("product", req.query.name);
    const filt = p.hits.hits;

    if (!filt[0]) {
      throw { error: `Error, product ${query.name} not find.` };
    }
    if (query.quantity > filt[0]._source.ammountAvailable) {
      throw {
        error: `Not enoght ammount Available for this quantity.You are trying to buy ${query.quantity}, but there its only ${filt[0]._source.ammountAvailable} availablef for this product ${filt[0]._source.name}.`,
      };
    }
    res.locals.product = filt[0]._source;
    next();
    
  } catch (error) {
    console.log('error');
    return res.send(error);
  }
}

module.exports = {
  checkProductAmount,
};
