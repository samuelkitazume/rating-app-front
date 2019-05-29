<template>
  <el-container>
    <div class="big-row">
      <el-row type="flex" justify="center">
        <el-col :xs="18" :sm="18" :md="18" :lg="8">
          <el-card shadow="never" class="box-card">
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
                  <div class="rate-element">
                    <el-rate v-model="evaluation"></el-rate>
                  </div>
                </el-col>
                <el-col :span="24">
                  <div v-if="authorized">
                    <div class="btn-rate-user">
                      <div class="user-picture">
                        <div class="picture">
                          <img :src="user.picture" :alt="user.name">
                        </div>
                      </div>
                      <div class="user-info">
                        <div class="rate-label">
                          <span>Rating as</span>
                        </div>
                        <div class="username">{{ user.name }}</div>
                        <div class="usermail">{{ user.email }}</div>
                      </div>
                    </div>
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
    </div>
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
<style scoped>
  .big-row {
    width: 100%;
    margin-top: 50px;
  }

  .box-card {
    padding-bottom: 20px;
  }

  .rate-element {
    width: 300px;
    height: 100px;
    margin: 0 auto;
    padding: 20px 0;
    box-sizing: border-box;
  }

  .btn-rate-user {
    width: 300px;
    height: 70px;
    margin: 0 auto;
    border-radius: 35px;
    box-shadow: 0 5px 5px #ddd;
    border: 1px solid #EEE;
  }

  .user-picture {
    width: 50px;
    height: 50px;
    margin: 10px;
    float: left;
  }

  .picture {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 50%;
    box-sizing: border-box;
    border: 2px solid #BBB;
  }

  .picture img {
    width: 100%;
  }

  .user-info {
    width: 220px;
    height: 70px;
    float: left;
    text-align: left;
    margin-left: 10px;
  }

  .user-info .rate-label {
    font-size: 12px;
    color: #666;
    line-height: 14px;
    margin-top: 8px;
  }

  .user-info .username {
    line-height: 24px;
    font-size: 18px;
    font-weight: bold;
  }

  .user-info .usermail {
    line-height: 14px;
    font-size: 12px;
    color: #666;
    font-style: italic;
  }

</style>
