<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info"
            >订单提交成功，请您及时付款，以便尽快为您发货~~</span
          >
        </h4>
        <div class="paymark">
          <span class="fl"
            >请您在提交订单<em class="orange time">4小时</em
            >之内完成支付，超时订单会自动取消。订单号：<em>{{
              orderId
            }}</em></span
          >
          <span class="fr"
            ><em class="lead">应付金额：</em
            ><em class="orange money">￥{{ payInfo.totalFee }}</em></span
          >
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>
            尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。
          </li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>
          支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）
        </h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg" /></li>
            <li><img src="./images/pay3.jpg" /></li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg" /></li>
              <li><img src="./images/pay11.jpg" /></li>
              <li><img src="./images/pay12.jpg" /></li>
              <li><img src="./images/pay13.jpg" /></li>
              <li><img src="./images/pay14.jpg" /></li>
              <li><img src="./images/pay15.jpg" /></li>
              <li><img src="./images/pay16.jpg" /></li>
              <li><img src="./images/pay17.jpg" /></li>
              <li><img src="./images/pay18.jpg" /></li>
              <li><img src="./images/pay19.jpg" /></li>
              <li><img src="./images/pay20.jpg" /></li>
              <li><img src="./images/pay21.jpg" /></li>
              <li><img src="./images/pay22.jpg" /></li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="submit">
          <!-- <router-link class="btn" to="/paysuccess">立即支付</router-link> -->
          <a class="btn" @click="nowPay">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { reqPayInfo} from '@/api'
import QRCode from 'qrcode'
export default {
  name: 'Pay',
  data() {
    return {
      orderId: this.$route.params.orderId, //订单编号
      payInfo: {}, //初始化支付信息对象
      timer: null, //初始化定时器id
      status: 0, //初始化支付状态
    }
  },
  mounted() {
    this.getPayInfo()
  },
  methods: {
    // 获取支付信息
    async getPayInfo() {
      try {
        const res = await this.$api.reqPayInfo(this.orderId)
        this.payInfo = res.data
      } catch (error) {
        alert('获取支付信息失败')
      }
    },
    // 立即支付
    async nowPay() {
      // 1.需要把codeUrl这个字符串转成咱们想要的图片地址
      const imgUrl = await QRCode.toDataURL(this.payInfo.codeUrl) //把某个字符串转成图片地址 参数:某个字符串  返回值:是一个promise promise成功的值就是转换出来的图片路径
      // 2.把转换出来的图片地址 显示在弹窗当中
      // console.log(imgUrl, 'imgUrl')
      // 参数 1.弹窗中间要显示的结构 2.弹窗标题 3.配置对象
      // this.$alert这个方法返回一个promise  如果点击得是确定返回得是成功promise  如果点击得是取消返回得是失败得promise
      this.$alert(`<img src="${imgUrl}" />`, '微信扫码支付', {
        dangerouslyUseHTMLString: true, //message就会被当作HTML片段处理
        showClose: false, //MessageBox是否显示右上角关闭按钮
        showCancelButton: true, //是否显示取消按钮
        cancelButtonText: '支付遇到问题', //取消按钮的文本内容
        confirmButtonText: '支付成功', //确定按钮的文本内容
        center: true, //是否居中布局
        beforeClose: (action, instance, done) => {
          //MessageBox 关闭前的回调 会暂停实例的关闭
          // action ==> 点击的是确定confirm 点的是取消cancel ,instance ==> MessageBox组件实例 , done 关闭弹窗的方法
          if (action === 'confirm') {
            //点的确定
            // 需要看一看用户究竟是不是支付成功了 免得上当受骗
            // if(this.status === 200){ //真的支付成功了
            // 咱们再开发阶段 留个后门 方便咱们往后面做 但是之后如果项目上线了 一定要记得把这里得判断打开
            // 清除定时器
            clearInterval(this.timer)
            this.timer = null
            // 关闭弹窗
            done()
            // 跳转到支付成功页面
            this.$router.push('/paysuccess')
            // }else{ //骗你呢 没支付成功
            //   alert('请支付此订单 小骗子!')
            // }
          } else {
            //点的取消
            // 清除定时器
            clearInterval(this.timer)
            this.timer = null
            // 弹窗得关
            done()
            // 给他做出一些提示
            alert('请联系尚硅谷漂亮得前台小姐姐')
          }
        },
      }).catch(() => {})
      // 需要想后端发送请求 获取支付状态 (发一次请求不够 需要一直问问后端用户支付成功没有)
      if (!this.timer) {
        //如果没有定时器再去开启定时器 一笔订单只能有一个定时器去查询支付状态
        this.timer = setInterval(async () => {
          const res = await this.$api.reqPayStatus(this.orderId)
          if (res.code === 200) {
            //200代表支付成功 205代表支付中
            // 清除定时器
            clearInterval(this.timer)
            this.timer = null
            // 关闭弹窗
            this.$msgbox.close()
            // 支付成功状态保存下来 为了之后点击支付成功咱们进行判断处理使用
            this.status = 200
            // 跳转到支付成功页面
            this.$router.push('/paysuccess')
          }
        }, 2000)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px '微软雅黑';
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>