<template lang="pug">
    .container
        el-table(stripe border :data='users' empty-text='There is no users')
            el-table-column(prop='$class' label='Class')
            el-table-column(prop='name' label='Name')
            el-table-column(prop='surname' label='Surname')
            el-table-column(prop='balance' label='Balance')
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Users',

        data: function() {
            return {
                users: []
            }
        },

        created: function() {
            axios.get('http://localhost:3000/api/Customer')
                .then((response) => {
                    this.users = response.data;

                    return axios.get('http://localhost:3000/api/Vendor');
                })
                .then((response) => {
                    for (var key in response.data) {
                        this.users.push(response.data[key]);
                    }
                })
        }
    }
</script>

<style lang="scss">
</style>
