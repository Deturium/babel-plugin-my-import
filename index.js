const pathLib = require('path')

module.exports = function ({ types: t }) {
  return {
    visitor: {
      ImportDeclaration: {
        enter(path, state) {
          // options passed by .babelrc or babel-loader
          const { opts } = state

          // path.node.source is the library/module name, like 'antd-cloud'.
          // path.node.specifiers is an array of ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier.
          const source = path.node.source
          const specifiers = path.node.specifiers

          if (Object.prototype.toString.call(opts.library) === '[object RegExp]') {
            // if opts.library is a RegExp
            if (!opts.library.test(source.value)) {
              return
            }
          } else {
            if (opts.library !== source.value) {
              return
            }
          }

          // give hint if it is ImportNamespaceSpecifier or importDefaultSpecifier
          // example: import * as _ from 'lodash'
          //          import _ from 'lodash'
          if (!t.isImportSpecifier(specifiers[0])) {
            console.warn(`You may import the entire module of '${source.value}' at\n    file: ${state.file.opts.filename}  line: ${specifiers[0].loc.start.line}`)
            return
          }

          // transform all ImportSpecifier to importDefaultSpecifier
          // example: import { has } from 'lodash' --> import has from 'lodash/has'
          const newImportDecls = specifiers.map((specifier) => {
            return t.ImportDeclaration(
                [t.importDefaultSpecifier(specifier.local)],
                t.StringLiteral(pathLib.join(source.value, opts.libPath || '', specifier.imported.name))
              )
          })

          // attention the new path will be traversed again
          path.replaceWithMultiple(newImportDecls)
        }
      }
    }
  }
}