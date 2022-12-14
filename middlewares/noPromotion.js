const {formatDate} = require('../utils')

function noPromotion(req, res, next){
    try {
        const query = req.query;
        let current = new Date();
        let product = res.locals.product
        if(!product){
            throw {error:  `product "${req.query.name}" not found.`}
        }
        query.normalprice =  query.quantity * product.price
        query.finalprice =  query.quantity * product.price
        query.earlyDate = formatDate(current.setDate(current.getDate() + product.earlyDate))
        query.promotion = 'no promotion available'
        query.price = product.price

        return res.send(query)
    } catch (error) {
       return res.send(error)
    }
}
module.exports = {noPromotion}