<template lang="pug">
    .container
        .title
            h1 Select method

        .methods
            ul.list
                li(v-if='userState("Vendor")')
                    router-link(to='/dashboard/add')
                        .left
                            i.el-icon-check
                        .right
                            span Add product
                li(v-if='userState("Customer")')
                    router-link(to='/dashboard/products')
                        .left
                            i.el-icon-search
                        .right
                            span Select product
                li(v-if='userState("Banker")')
                    router-link(to='/dashboard/users')
                        .left
                            i.el-icon-picture
                        .right
                            span Users
                li(v-if='userState("Banker")')
                    router-link(to='/dashboard/offers')
                        .left
                            i.el-icon-document
                        .right
                            span Offers
                li(v-if='!userState("Banker")')
                    router-link(to='/dashboard/profile')
                        .left
                            i.el-icon-information
                        .right
                            span Profile details
                li(@click='logout')
                    .left
                        i.el-icon-arrow-left
                    .right
                        span Log Out

        router-view
</template>

<script>
    export default {
        name: 'Dashboard',

        data: function() {
            return {

            }
        },

        methods: {
            logout: function() {
                if (localStorage.getItem('USER')) {
                    localStorage.removeItem('USER')
                }

                this.$router.push({ path: '/' });
            },
            userState: function(type) {
                var data = JSON.parse(localStorage.getItem('USER'));

                return data.$class == 'org.acme.model.' + type;
            }
        }
    }
</script>

<style lang="scss">
    .container {
        height: 100%;
        width: 800px;
        margin: 0 auto;
        padding: 40px 0;

        .title {
            h1 {
                color: #8492A6;
                font-size: 14px;
                margin-bottom: 20px;
            }
        }

        .methods {
            .list {
                li {
                    cursor: pointer;
                    overflow: hidden;
                    min-width: 200px;
                    text-align: center;
                    margin-right: 20px;
                    border-radius: 10px;
                    display: inline-block;
                    background-color: #475669;

                    .left,
                    .right {
                        float: left;
                        padding: 12px 0;
                    }
                    .left {
                        width: 30%;
                        background-color: #1F2D3D;

                        i {
                            color: #E5E9F2;
                            font-size: 12px;
                        }
                    }
                    .right {
                        text-align: left;
                        padding: 12px 12px;
                        width: calc(70% - 40px);

                        span {
                            color: #D3DCE6;
                            font-size: 13px;
                        }
                    }

                    &:hover {
                        opacity: .8;
                    }
                    &:after {
                        content: '';
                        clear: both;
                        display: block;
                    }
                    &:last-child {
                        margin: 0;
                    }
                }
            }
        }

        h3 {
            COLOR: #8492A6;
            font-size: 13px;
            margin-bottom: 10px;
        }
    }
</style>
