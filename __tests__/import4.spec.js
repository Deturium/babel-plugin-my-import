const babel = require("@babel/core")


const Input = `import { message } from 'antd'
import { AcpModal as Modal } from '@alipay/antd-cloud'`

const Output = `import { message } from 'antd';
import Modal from "@alipay/antd-cloud/anotherLib/AcpModal";`

test('import 4', () => {
  expect(
    babel.transformSync(Input, {
      plugins:[
        [require("../index"), { "library": "@alipay/antd-cloud", "libPath": "anotherLib" }]
      ]
    }).code
  ).toBe(Output)
})
