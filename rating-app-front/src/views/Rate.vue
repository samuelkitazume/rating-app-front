<template>
  <el-container>
    <div class="big-row">
      <el-row type="flex" justify="center">
        <el-col :xs="18" :sm="18" :md="12" :lg="8">
          <el-card shadow="never" class="box-card">
            <div slot="header" class="clearfix">
              <div class="sender-component">
                <div class="sender-picture-box">
                  <div class="sender-picture">
                    <img :src="sender.picture" alt="">
                  </div>
                </div>
                <div class="sender-info">
                  <div class="sender-name">
                    <span>{{ sender.name }}</span>
                  </div>
                  <div class="asking-label">
                    <span>is asking for opinion</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="rate-component">
              <el-row>
                <el-col :span="15">
                  <div>
                    <span class="label">Service description</span>
                  </div>
                  <div>
                    <span class="service-description">{{ description }}</span>
                  </div>
                </el-col>
                <el-col :span="9">
                  <div class="rate-element">
                    <el-rate v-model="evaluation" :texts="rateLabels"></el-rate>
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
export default {
  name: 'Rate',
  data: function data() {
    return {
      sender: {},
      evaluation: 0,
      description: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet ',
      rateLabels: ['Bad', 'Im disapointed', 'Could be better', 'It was nice.', 'Awesome!'],
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
  mounted: async function mounted() {
    try {
      const serviceRequest = await this.$axios.get(`/services/${this.$route.params.hash}`);
      const { service, sender } = serviceRequest.data;
      this.sender = sender;
      this.description = service.description;
    } catch (e) {
      throw new Error(e);
    }
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
        const jwt = await this.$axios.post('/login', user);
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
    background-color: #FDFDFD;
  }

  .rate-component {
    text-align: left;
  }

  .rate-component .label {
    font-size: 14px;
    color: #666;
  }

  .rate-element {
    padding: 10px 0;
    box-sizing: border-box;
    text-align: center;
  }

  .btn-rate-user {
    width: 300px;
    height: 70px;
    margin: 30px auto 0;
    border-radius: 35px;
    box-shadow: 0 2px 3px #bbb;
    background-color: #FFF;
    transition: box-shadow .2s ease-out;
  }

  .btn-rate-user:hover {
    box-shadow: 0 5px 5px #ddd;
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
    margin-left: 0px;
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

  .sender-component {
    width: 300px;
    height: 70px;
    margin: 0 auto;
    display: inline-block;
  }

  .sender-picture-box {
    width: 70px;
    height: 70px;
    float: left;
  }

  .sender-picture {
    border-radius: 50%;
    overflow: hidden;
  }

  .sender-picture, .sender-picture img {
    width: 100%;
    height: 100%;
  }

  .sender-info {
    text-align: left;
    float: left;
    padding-left: 15px;
  }

  .sender-name {
    margin-top: 10px;
    font-weight: bold;
    font-size: 24px;
  }

  .asking-label {
    font-size: 18px;
    font-style: italic;
    color: #999;
  }

</style>
