<template lang="pug">
    .container
        h3 Add product

        el-input(v-model='id')
            template(slot='prepend' width='100px') Identifier

        el-input(v-model='title')
            template(slot='prepend' width='100px') Title

        el-input(v-model='price')
            template(slot='prepend') Price

        el-button(type='primary' @click='add') Continue
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Add',

        data: function() {
            return {
                id: '',
                title: '',
                price: ''
            }
        },

        methods: {
            add: function() {
                if (this.id && this.title && this.price) {
                    var vendor = JSON.parse(localStorage.getItem('USER'));
                    var data = {
                        $class     : 'org.acme.model.Product',
                        id         : 'id:' + this.id,
                        title      : this.title,
                        price      : this.price,
                        state      : 'FOR_SALE',
                        owner      : 'resource:org.acme.model.Vendor#' + vendor.id,
                        created_by : 'resource:org.acme.model.Vendor#' + vendor.id
                    }

                    axios.post('http://localhost:3000/api/Product', data)
                        .then((response) => {
                            if (response.status == 200) {
                                this.$router.push('/dashboard/profile');
                            }
                        })
                        .catch((error) => {
                            console.log(error.response.data)
                        })
                }
            }
        }
    }
</script>

<style lang="scss">
    .container {

        .el-input {
            margin-bottom: 10px;

            &-group__prepend {
                width: 100px;
            }
        }
    }
</style>
