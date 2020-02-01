// 声明全局的 window ，不然使用 window.XX 时会报错
// declare var window: Window;
// declare var document: Document;
// declare var THREE: any;

// interface THREE extends Window {}

// 声明 element-ui 全局变量，不然在vue中使用相关组件ts会报错
// declare module "element-ui/lib/transitions/collapse-transition";
declare module "element-ui";
