module.exports = {
  // 字符串使用单引号
  singleQuote: true,
  // 每行末尾自动添加分号
  semi: false,
  // 行尾逗号,默认none,可选 none|es5|all
  trailingComma: "all",
  // 使用tab缩进，默认false
  useTabs: false,
  // tab缩进大小,默认为2
  tabWidth: 2,
  // 对象中打印空格 默认true ,     true: { foo: bar } ,     false: {foo: bar}
  bracketSpacing: true,
  // 箭头函数参数括号 默认avoid 可选 avoid| always  ,     avoid 能省略括号的时候就省略 例如x => x  ,    always 总是有括号
  arrowParens: "avoid",
  // 换行长度，默认80
  printWidth: 200, // 超过最大值换行
  proseWrap: "preserve", // preserve , never
  endOfLine: "auto", // 结尾是 \n \r \n\r auto
  eslintIntegration: false, //不让prettier使用eslint的代码格式进行校验
  tslintIntegration: false, //不让prettier使用tslint的代码格式进行校验
  stylelintIntegration: false, //不让prettier使用stylelint的代码格式进行校验
  jsxSingleQuote: false, // 在jsx中使用单引号代替双引号
  // jsxBracketSameLine 设置为true时,将多行JSX元素的 > 放在最后一行的末尾，而不是单独放在下一行
  /* 
        <button
           className="prettier-class"
           id="prettier-id"
           onClick={this.handleClick}>
           Click Here
        </button> 
         */
  // 设置为false时
  /*
        <button
            className="prettier-class"
            id="prettier-id"
            onClick={this.handleClick}
        >
            Click Here
        </button>
         */
  jsxBracketSameLine: true,
};
