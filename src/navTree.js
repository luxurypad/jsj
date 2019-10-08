const navTree = [
  {
    title: '行政办公',
    key: '1',
    disabled: false,
    children: [
      {
        title: '考勤管理',
        key: '1',
        disabled: false,
        children: [
          {
            title: '请假申请',
            key: '1',
            disabled: false,
          },
          {
            title: '考勤异常申请',
            key: '1',
            disabled: false,
          },
          {
            title: '外出申请',
            key: '1',
            disabled: false,
          },
        ]
      },
      {
        title: '报表管理',
        key: '1',
        disabled: false,
      },
      {
        title: '用餐管理',
        key: '1',
        disabled: false,
      },
      {
        title: '用车管理',
        key: '1',
        disabled: false,
      }
    ]
  },
  {
    title: '销售管理',
    key: '1',
    disabled: false,
    children: [
      {
        title: '客户管理',
        key: '1',
        disabled: false,
      },
      {
        title: '项目管理',
        key: '1',
        disabled: false,
      },
      {
        title: '项目报备',
        key: '1',
        disabled: false,
      }
    ]
  }
]
export default navTree