const babel = require("@babel/core")


const Output = `import all, { message } from "@alipay/antd-cloud";
import * as AntdC from "@alipay/antd-cloud";`

test('import 3', () => {
  expect(
    babel.transformFileSync('./__mock__/input.jsx', {
      plugins:[
        [require("../index"), { "library": "@alipay/antd-cloud", "libPath": "lib" }]
      ]
    }).code
  ).toBe(Output)
})
