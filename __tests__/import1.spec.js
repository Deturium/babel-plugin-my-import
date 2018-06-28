const babel = require("@babel/core")


const Input = `import { AcpModal } from '@alipay/antd-cloud';`

const Output = `import AcpModal from "@alipay/antd-cloud/AcpModal";`

test('import 1', () => {
  expect(
    babel.transformSync(Input, {
      plugins:[
        [require("../index"), { "library": "@alipay/antd-cloud" }]
      ]
    }).code
  ).toBe(Output)
})
