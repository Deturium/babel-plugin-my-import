const babel = require("@babel/core")


const Input = `import { c1 } from '@alipay/antd';
import { c2 } from '@alipay/antd_not';`

const Output = `import c1 from "@alipay/antd/c1";
import { c2 } from '@alipay/antd_not';`

test('import 5', () => {
  expect(
    babel.transformSync(Input, {
      plugins:[
        [require("../index"), { "library": /antd$/ }]
      ]
    }).code
  ).toBe(Output)
})