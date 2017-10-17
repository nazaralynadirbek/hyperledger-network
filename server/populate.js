const axios = require('axios');

axios.post('http://localhost:3000/api/Banker', {
    $class  : 'org.acme.model.Banker',
    id      : 'id:0001',
    name    : 'Amanda',
    surname : 'Seyfried',
    balance : 0
})

axios.post('http://localhost:3000/api/Customer', {
    $class  : 'org.acme.model.Customer',
    id      : 'id:0001',
    name    : 'John',
    surname : 'Wick',
    balance : 50000
})

axios.post('http://localhost:3000/api/Vendor', {
    $class  : 'org.acme.model.Vendor',
    id      : 'id:0001',
    name    : 'Aliya',
    surname : 'Sergazina',
    balance : 10000
})

axios.post('http://localhost:3000/api/Product', {
    $class     : 'org.acme.model.Product',
    id         : 'id:0001',
    title      : 'Product A',
    price      : 500,
    state      : 'FOR_SALE',
    owner      : 'resource:org.acme.model.Vendor#id:0001',
    created_by : 'resource:org.acme.model.Vendor#id:0001'
})

axios.post('http://localhost:3000/api/Product', {
    $class     : 'org.acme.model.Product',
    id         : 'id:0002',
    title      : 'Product B',
    price      : 1000,
    state      : 'FOR_SALE',
    owner      : 'resource:org.acme.model.Vendor#id:0001',
    created_by : 'resource:org.acme.model.Vendor#id:0001'
})

axios.post('http://localhost:3000/api/Product', {
    $class     : 'org.acme.model.Product',
    id         : 'id:0003',
    title      : 'Product C',
    price      : 1500,
    state      : 'FOR_SALE',
    owner      : 'resource:org.acme.model.Vendor#id:0001',
    created_by : 'resource:org.acme.model.Vendor#id:0001'
})
