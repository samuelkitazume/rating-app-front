<template>
  <el-container>
    <el-row type="flex" justify="center" class="big-row">
      <el-col :xs="18" :sm="18" :md="18" :lg="12">
        <el-card shadow="always" class="box-card">
          <div slot="header" class="clearfix">
            <span><strong>{{ requester }}</strong> is asking for your evaluation</span>
          </div>
          <div class="rate-component">
            <el-row>
              <el-col :span="24">
                <span>Service description</span>
              </el-col>
              <el-col :span="24">
                <h4>{{ description }}</h4>
              </el-col>
              <el-col :span="24">
                <el-rate v-model="evaluation"></el-rate>
              </el-col>
              <el-col :span="24">
                <div v-if="authorized">
                  <el-card>
                    <!-- {{ user }} -->
                    <img :src="user.picture" :alt="user.name">
                    <span>Rate as <strong>{{ user.name }}</strong></span>
                  </el-card>
                </div>
                <div v-else>
                  <el-button @click="loginClick">Login</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import Requester from '../requester';

const requester = new Requester();

export default {
  name: 'Rate',
  data: function data() {
    return {
      requester: 'Teste',
      evaluation: 0,
      description: 'Lorem ipsum dolor sit amet',
    };
  },
  computed: {
    authorized: function authorized() {
      return !!this.$store.state.authorization;
    },
    user: function user() {
      return this.$store.state.userData;
    },
  },
  methods: {
    async loginClick() {
      try {
        const authObject = await this.$gAuth.signIn();
        const profile = authObject.getBasicProfile();
        const user = {
          name: profile.getName(),
          givenName: profile.getGivenName(),
          familyName: profile.getFamilyName(),
          picture: profile.getImageUrl(),
          email: profile.getEmail(),
          token: profile.getId(),
        };
        const jwt = await requester.post('http://localhost:3001/login', user);
        this.$store.commit('setToken', jwt.data.token);
        console.log(this.$store.state.authorization);
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .big-row {
    width: 100%;
    margin-top: 50px;
  }

  .rate-component .el-rate {
    height:70px;
  }

  .rate-component .el-rate__icon{
    line-height: 70px;
    font-size: 40px;
  }
</style>
