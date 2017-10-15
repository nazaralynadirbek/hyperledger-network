<template lang="pug">
    .container
        .center
            h1 Authorize into system

            el-input(placeholder='Type id here', v-model='input')
                el-select(v-model='select' slot='prepend', placeholder='Select')
                    el-option(v-for='(participant, index) in participants', :key='index', :label='participant', :value='participant')
                el-button(slot='append' icon='arrow-right', @click='enter')

            h2(v-if='errors') {{ errors }}
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Main',

        data: function() {
            return {
                input: '',
                select: '',
                errors: '',
                participants: ['Customer', 'Vendor', 'Banker']
            }
        },

        created: function() {
            if (localStorage.getItem('USER')) {
                this.$router.push({ path: '/dashboard' });
            }
        },

        methods: {
            enter: function() {
                if (this.select == '') {
                    this.errors = 'Please, select type of user and type your identifier';

                    return;
                }

                axios.get('http://localhost:3000/api/' + this.select + '/id:' + this.input)
                    .then((response) => {
                        if (response.status == 200) {
                            localStorage.setItem('USER', JSON.stringify(response.data));

                            this.$router.push({ path: '/dashboard' });
                        }
                    })
                    .catch((error) => {
                        this.errors = 'There is no ' + this.select + ' with such identifier';

                        console.log(error.response.status);
                    })
            }
        }
    }
</script>

<style lang="scss">
    .container {
        height: 100%;
        position: relative;

        .center {
            top: 50%;
            left: 50%;
            width: 380px;
            position: absolute;
            transform: translate(-50%, -50%);

            h1 {
                color: #8492a6;
                font-size: 14px;
                margin-bottom: 20px;
            }

            h2 {
                color: #FF4949;
                font-size: 12px;
                margin-top: 20px;
            }

            .el-input {
                .el-select {
                    width: 100px;
                }
            }
        }
    }
</style>
