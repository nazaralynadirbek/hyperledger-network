<template lang="pug">
    .container
        el-table(v-if='!vendor' stripe border :data='q1' empty-text='You didn\'t buy anything yet')
            el-table-column(prop='title' label='Product')
            el-table-column(prop='price' label='Price')
            el-table-column(fixed='right' label='Type' width='80')
                template(scope='scope')
                    i.el-icon-minus

        h3(v-if='vendor') For sale
        el-table(v-if='vendor' stripe border :data='q2' empty-text='Empty')
            el-table-column(prop='title' label='Product')
            el-table-column(prop='price' label='Price')
            el-table-column(fixed='right' label='Type' width='80')
                template(scope='scope')

        h3(v-if='vendor') Sold
        el-table(v-if='vendor' stripe border :data='q3' empty-text='Empty')
            el-table-column(prop='title' label='Product')
            el-table-column(prop='price' label='Price')
            el-table-column(fixed='right' label='Type' width='80')
                template(scope='scope')
                    i.el-icon-plus

        h2 Current balance: {{ balance }}
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Profile',

        data: function() {
            return {
                q1: [],
                q2: [],
                q3: []
            }
        },

        created: function() {
            var user = JSON.parse(localStorage.getItem('USER'));

            axios.get('http://localhost:3000/api/queries/q1', {
                params: {
                    ownerParam: 'resource:' + user.$class + '#' + user.id
                }
            })
                .then((response) => {
                    this.q1 = response.data
                })

            if (this.vendor) {
                axios.get('http://localhost:3000/api/queries/q2', {
                    params: {
                        ownerParam: 'resource:' + user.$class + '#' + user.id
                    }
                })
                    .then((response) => {
                        this.q2 = response.data
                    })

                axios.get('http://localhost:3000/api/queries/q3', {
                    params: {
                        ownerParam: 'resource:' + user.$class + '#' + user.id
                    }
                })
                    .then((response) => {
                        this.q3 = response.data
                    })
            }
        },

        computed: {
            balance: function() {
                var user = JSON.parse(localStorage.getItem('USER'));

                return user.balance;
            },
            vendor: function() {
                var data = JSON.parse(localStorage.getItem('USER'));

                return data.$class == 'org.acme.model.Vendor';
            }
        }
    }
</script>

<style lang="scss">
    .container {
        .el-icon-minus {
            color: #FF4949;
            font-size: 12px;
        }
        .el-icon-plus {
            color: #13CE66;
            font-size: 12px;
        }

        .el-table {
            margin-bottom: 20px;

            &:last-child {
                margin-bottom: 0;
            }
        }

        h2 {
            color: #8492A6;
            font-size: 14px;
            margin-top: 20px;
        }
    }
</style>
