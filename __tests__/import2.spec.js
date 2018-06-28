const babel = require("@babel/core")


const Input = `import {AcpContent, AcpForm} from '@alipay/antd-cloud';`

const Output = `import AcpContent from "@alipay/antd-cloud/lib/AcpContent";
import AcpForm from "@alipay/antd-cloud/lib/AcpForm";`

test('import 2', () => {
  expect(
    babel.transformSync(Input, {
      plugins:[
        [require("../index"), { "library": "@alipay/antd-cloud", "libPath": "lib" }]
      ]
    }).code
  ).toBe(Output)
})
