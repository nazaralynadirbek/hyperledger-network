/**
* Logic
*/

/**
* Description
* @param {org.acme.model.Offer} offer
* @transaction
*/
function offerTransaction(offer) {
    if (offer.product.state == 'FOR_SALE') {
        offer.product.state = 'BLOCKED';
    } else {
        throw new Error('Product is not for sale')
    }

    if (offer.banker.offers == null) {
        offer.banker.offers = []
    }

    offer.banker.offers.push(offer);

    return getAssetRegistry('org.acme.model.Product')
        .then(function(productRegistry) {
            return productRegistry.update(offer.product)
        })
        .then(function() {
            return getParticipantRegistry('org.acme.model.Banker')
        })
        .then(function(bankerRegistry) {
            return bankerRegistry.update(offer.banker)
        })
}

/**
* Description
* @param {org.acme.model.Trade} trade
* @transaction
*/
function tradeTransaction(trade) {
    var offer = trade.offers[id];
    var vendor = offer.vendor;
    var banker = offer.banker;
    var product = offer.product;
    var customer = offer.customer;

    if (customer.balance < product.price) {
        product.state = 'FOR_SALE';
        trade.offers.splice(id, 1);

        return getAssetRegistry('org.acme.model.Product')
            .then(function(productRegistry) {
                return productRegistry.update(product)
            })
            .then(function() {
                return getParticipantRegistry('org.acme.model.Banker')
            })
            .then(function(bankerRegistry) {
                return bankerRegistry.update(banker)
            })
    }

    // Trade
    customer.balance -= product.price;
    vendor.balance += product.price;

    // Update owner
    product.owner = customer;

    return getAssetRegistry('org.acme.model.Product')
        .then(function(productRegistry) {
            return productRegistry.update(product)
        })
        .then(function() {
            return getParticipantRegistry('org.acme.model.Customer')
        })
        .then(function(customerRegistry) {
            return customerRegistry.update(customer)
        })
        .then(function() {
            return getParticipantRegistry('org.acme.model.Vendor')
        })
        .then(function(vendorRegistry) {
            return vendorRegistry.update(vendor)
        })
}
