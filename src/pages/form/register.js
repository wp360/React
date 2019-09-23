import React from 'react'
import {Card,Form,Input,Radio,Select,Switch,Checkbox,Button,Icon,DatePicker,TimePicker,InputNumber,Upload,message} from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option
const TextArea = Input.TextArea

class FormRegister extends React.Component{
  state = {}

  // 图片上传处理函数
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
          userImg:imageUrl,
          loading: false,
      }));
    }
  }

  // 图片base64方法
  getBase64 = (img, callback)=>{
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  // 判断上传图片格式
  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  // 提交
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let userInfo = this.props.form.getFieldsValue()
        console.log(JSON.stringify(userInfo))
        message.success(`${userInfo.userName} 恭喜你，您的表单已经提交，当前密码为：${userInfo.userPwd}`)
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4
      },
      wrapperCol: {
        xs: 24,
        sm: 12
      }
    }

    const offsetLayout = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12,
          offset: 4
        }
      }
    }

    const rowObject = {
      minRows: 4,
      maxRows: 6
    }

    return(
      <div>
        <Card title="注册表单">
          <Form layout="horizontal">
            <FormItem label="用户名" {...formItemLayout}>
              {
                getFieldDecorator('userName',{
                    initialValue: '',
                    rules:[
                      {
                        required: true,
                        message: '用户名不能为空'
                      }
                    ]
                })(
                  <Input prefix={<Icon type="user"/>} placeholder="请输入用户名" />
                )
              }
            </FormItem>
            <FormItem label="密码" {...formItemLayout}>
              {
                getFieldDecorator('userPwd',{
                    initialValue: '',
                    rules:[
                      {
                        required: true,
                        message: '密码不能为空'
                      }
                    ]
                })(
                  <Input prefix={<Icon type="user"/>} placeholder="请输入密码" />
                )
              }
            </FormItem>
            <FormItem label="性别" {...formItemLayout}>
              {
                getFieldDecorator('sex', {
                    initialValue: '1'
                })(
                  <RadioGroup>
                    <Radio value="1">男</Radio>
                    <Radio value="2">女</Radio>
                  </RadioGroup>
                )
              }
            </FormItem>
            <FormItem label="年龄" {...formItemLayout}>
              {
                getFieldDecorator('age', {
                  initialValue: 18
                })(
                  <InputNumber />
                )
              }
            </FormItem>
            <FormItem label="当前状态" {...formItemLayout}>
                {
                  getFieldDecorator('state', {
                    initialValue: '2'
                  })(
                    <Select>
                      <Option value="1">咸鱼一条</Option>
                      <Option value="2">风华浪子</Option>
                      <Option value="3">北大才子一枚</Option>
                      <Option value="4">百度FE</Option>
                      <Option value="5">创业者</Option>
                     </Select>
                  )
                }
            </FormItem>
            <FormItem label="爱好" {...formItemLayout}>
                {
                    getFieldDecorator('interest', {
                        initialValue: ['2','5']
                    })(
                        <Select mode="multiple">
                            <Option value="1">游泳</Option>
                            <Option value="2">打篮球</Option>
                            <Option value="3">踢足球</Option>
                            <Option value="4">跑步</Option>
                            <Option value="5">爬山</Option>
                            <Option value="6">骑行</Option>
                            <Option value="7">桌球</Option>
                            <Option value="8">麦霸</Option>
                        </Select>
                    )
                }
            </FormItem>
            <FormItem label="是否已婚" {...formItemLayout}>
              {
                  getFieldDecorator('isMarried', {
                      valuePropName:'checked',
                      initialValue: true
                  })(
                      <Switch/>
                  )
              }
            </FormItem>
            <FormItem label="生日" {...formItemLayout}>
              {
                  getFieldDecorator('birthday',{
                    initialValue:moment('1988-08-08')
                  })(
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                  )
              }
            </FormItem>
            <FormItem label="联系地址" {...formItemLayout}>
              {
                getFieldDecorator('adress', {
                  initialValue: '上海市'
                })(
                  <TextArea autosize={rowObject} />
                )
              }
            </FormItem>
            <FormItem label="早起时间" {...formItemLayout}>
              {
                getFieldDecorator('time')(
                  <TimePicker />
                )
              }
            </FormItem>
            <FormItem label="头像" {...formItemLayout}>
              {
                getFieldDecorator('userImg')(
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                  >
                  {this.state.userImg ? <img src={this.state.userImg} alt="avatar" style={{ width: '100%' }} /> : <Icon type="plus"/>}
                  </Upload>
                )
              }
            </FormItem>
            <FormItem {...offsetLayout}>
              {
                getFieldDecorator('userImg')(
                  <Checkbox>我已阅读过<span>用户协议</span></Checkbox>
                )
              }
            </FormItem>
            <FormItem {...offsetLayout}>
              <Button type="primary" onClick={this.handleSubmit}>注册</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}
// 创建新表单 Form.create()
export default Form.create()(FormRegister);
