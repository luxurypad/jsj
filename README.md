## 1.修正全局弹窗组件位置
* 全局弹窗组件应该被Router包含，否则弹窗组件内无法使用useHistory
* 注意Switch的位置
  ```html
  <GlobalModal>
    <Switch>
    </Switch>
  </GlobalModal>
  ```
## 2.完善feedbackresult组件，逻辑成功后的跳转
## 3.更新api请求地址/api/uri