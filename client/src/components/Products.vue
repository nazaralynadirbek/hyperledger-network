<template lang="pug">
    .container
        el-table(stripe border :data='products' empty-text='There is no products for sale')
            el-table-column(prop='title' label='Title')
            el-table-column(prop='price' label='Price')
            el-table-column(prop='state' label='State')
            el-table-column(prop='created_by' label='Created by')
            el-table-column(fixed='right' label='Operations')
                template(scope='scope')
                    el-button(v-if='scope.row.state == "FOR_SALE"' type='text' size='small' @click='offer(scope.row)') Make offer
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Products',

        data: function() {
            return {
                products: []
            }
        },

        created: function() {
            axios.get('http://localhost:3000/api/queries/q4')
                .then((response) => {
                    this.products = response.data
                })
        },

        methods: {
            offer: function(product) {
                var customer = JSON.parse(localStorage.getItem('USER'));
                var data =  {
                    $class   : 'org.acme.model.Offer',
                    product  : 'resource:org.acme.model.Product#' + product.id,
                    customer : 'resource:org.acme.model.Customer#' + customer.id,
                    vendor   : product.owner,
                    banker   : 'resource:org.acme.model.Banker#id:0001'
                }

                axios.post('http://localhost:3000/api/Offer', data)
                    .then((response) => {
                        console.log(response.status)
                    })
                    .catch((error) => {
                        console.log(error.response.data)
                    })

                axios.get('http://localhost:3000/api/queries/q4')
                    .then((response) => {
                        this.products = response.data
                    })
            }
        }
    }
</script>

<style lang="scss">
</style>
