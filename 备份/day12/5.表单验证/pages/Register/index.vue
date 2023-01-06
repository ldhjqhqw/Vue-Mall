<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去
          <router-link to="/login">登录</router-link>
        </span>
      </h3>

      <!-- 手机号 -->
      <div class="content">
        <label>手机号:</label>
        <input
          type="text"
          placeholder="请输入你的手机号"
          v-model="phone"
          v-validate="'required|phone_rule'"
          name="手机"
        />
        <span class="error-msg">{{ errors.first('手机') }}</span>
      </div>

      <!-- 验证码 -->
      <div class="content">
        <label>验证码:</label>
        <input
          type="text"
          placeholder="请输入验证码"
          v-model="code"
          v-validate="'required|code_rule'"
          name="验证码"
        />
        <button class="getcode" @click="getCode">获取验证码</button>
        <span class="error-msg">{{ errors.first('验证码') }}</span>
      </div>

      <!-- 密码 -->
      <div class="content">
        <label>登录密码:</label>
        <input
          type="text"
          placeholder="请输入你的登录密码"
          v-model="password"
          v-validate="{ required: true, pwd_rule: true }"
          name="密码"
        />
        <span class="error-msg">{{ errors.first('密码') }}</span>
      </div>

      <!-- 确认密码 -->
      <div class="content">
        <label>确认密码:</label>
        <input
          type="text"
          placeholder="请输入确认密码"
          v-model="repassword"
          v-validate="{ required: true, ispwd: password }"
          name="重复密码"
        />
        <span class="error-msg">{{ errors.first('重复密码') }}</span>
      </div>

      <!-- 协议 -->
      <div class="controls">
        <input
          type="checkbox"
          v-model="isAgree"
          v-validate="{ isagree: true }"
          name="协议"
        />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first('协议') }}</span>
      </div>

      <div class="btn">
        <button @click="registerUser">完成注册</button>
      </div>
    </div>

    <!-- v-validate后面跟的值代表要使用的验证规则  required email这两个规则是内置规则 多个规则|为分割-->
    <!-- input和span如何关联的 name属性和first函数传递的参数一致 -->

    <!-- 中文语言包使用 -->

    <!-- 要去使用手机号的验证规则 但是内置没有 所以自定义了验证规则 -->
    <!-- <input v-validate="'required|phone'" name="手机号" type="text">
    <span>{{ errors.first('手机号') }}</span> -->

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      phone: '',
      code: '',
      password: '',
      repassword: '',
      isAgree: false,
    }
  },
  methods: {
    // 获取验证码
    async getCode() {
      // 暂时咱们先简单判断一下 回头讲表单验证再详细的去讲这里的判断
      if (!this.phone) return
      try {
        await this.$store.dispatch('getCode', this.phone)
        // 获取验证码成功之后 要显示在输入框中
        this.code = this.$store.state.user.code
      } catch (error) {
        alert('获取验证码失败')
      }
    },
    // 注册用户
    async registerUser() {
      let { phone, password, code, repassword, isAgree } = this
      // 判断一下 如果搜索的内容都合法 才有必要去发送请求 但凡有一个不符合要求 就不发
      // this.$validator.validateAll()调用的结果 是一个成功的promise
      // 如果都符合 成功promise的值是true  但凡有一项不符合条件  成功promise的值是false
      const flag = await this.$validator.validateAll()
      if (flag) {//都符合
        try {
          await this.$store.dispatch('getRegisterUser', {
            phone,
            password,
            code,
          })
          // 注册成功 给他跳转到登录页面
          this.$router.push('/login')
        } catch (error) {
          alert('注册用户失败了')
        }
      }else{ //有至少一项不符合
        alert('请确保输入每一项内容都符合条件')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }

    .getcode {
      height: 38px;
      margin-left: 10px;
      padding: 5px;
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>