// 引入语言包文件
import zh_CN from 'vee-validate/dist/locale/zh_CN';
import Vue from 'vue';
import VeeValidate , { Validator } from 'vee-validate';
import {phoneReg,codeReg,pwdReg} from './reg.js'
Vue.use(VeeValidate);
// 使用语言包
Validator.localize('zh_CN', zh_CN);

// 自定义验证规则
// 参数1 验证规则名字  参数2 配置对象
// Validator.extend('phone', {
//   // 只要用户输入的内容不合法  生成错误提示的
//   // 参数:name属性的值
//   // 返回值:错误提示
//   getMessage: field => {
//     return '输入的手机号不合法!'
//   },
//   // 只要用户在这个规则的input中输入内容就会自动执行这个函数  验证用户输入的内容是否合法
//   // 参数:用户输入的内容
//   // 返回值:如果为true 合法 如果是false 不合法
//   validate: value => {
//     return  phoneReg.test(value)
//   }
// });


//手机号的验证规则
Validator.extend('phone_rule', {
	//验证规则
	validate: value => phoneReg.test(value),
	//验证失败的回调
  getMessage: filed => '手机号格式不合法！', 
});

//验证必要性的规则
Validator.extend('required', {
	//验证规则
	validate:(value)=>{ //value你输入的值
		return value
	},
	//验证失败的回调
  getMessage: (field) => { 
		return field + '必须输入！'
	}, 
});

//验证码的验证规则
Validator.extend('code_rule', {
	//验证规则
	validate: value => codeReg.test(value),
	//验证失败的回调
  getMessage: filed => '验证码必须为6位数字！', 
});

//密码的验证规则
Validator.extend('pwd_rule', {
	//验证规则
	validate: value => pwdReg.test(value),
	//验证失败的回调
  getMessage: filed => '密码为6到21位英文、数字、下划线', 
});

//重复密码的验证规则
Validator.extend('ispwd', {
	//验证规则
	validate: (value,args) => value === args[0],
	//验证失败的回调
  getMessage: filed => '重复密码必须和登录密码一致', 
});

//协议规则
Validator.extend('isagree', {
	//验证规则
	validate: value => value,
	//验证失败的回调
  getMessage: filed => '协议必须同意！', 
})