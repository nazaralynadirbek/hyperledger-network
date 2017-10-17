<template lang="pug">
    .container
        el-table(stripe border :data='offers.offers' empty-text='There is no offers yet')
            el-table-column(label='Product')
                template(scope='scope') {{ scope.row.product | format }}
            el-table-column(label='From')
                template(scope='scope') {{ scope.row.customer | format }}
            el-table-column(label='To')
                template(scope='scope') {{ scope.row.vendor | format }}
            el-table-column(fixed='right' label='Operations' width="120px")
                template(scope='scope')
                    el-button(type='text' size='small' @click='trade(scope)') Trade
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Offers',

        data: function() {
            return {
                offers: []
            }
        },

        created: function() {
            var banker = JSON.parse(localStorage.getItem('USER'));
            axios.get('http://localhost:3000/api/Banker/' + banker.id)
                .then((response) => {
                    this.offers = response.data;
                })
        },

        methods: {
            trade: function(trade) {
                var id = trade.$index;
                var banker = JSON.parse(localStorage.getItem('USER'));

                var data = {
                    $class : 'org.acme.model.Trade',
                    id     : id,
                    banker : banker.$class + "#" + banker.id
                }

                axios.post('http://localhost:3000/api/Trade', data)
                    .then((response) => {
                        if (response.status == 200) {
                            this.$router.push('/dashboard/users');
                        }
                    })
                    .catch((error) => {
                        console.log(error.response.data)
                    })
            }
        },

        filters: {
            format: function(value) {
                return value.substring(24, value.length);
            }
        }
    }
</script>

<style lang="scss">
</style>
