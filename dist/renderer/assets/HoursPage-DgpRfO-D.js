import { d as defineComponent, j as onMounted, c as createElementBlock, b as createBaseVNode, F as Fragment, k as renderList, t as toDisplayString, l as unref, e as createVNode, w as withCtx, i as reactive, h as ref, r as resolveComponent, o as openBlock, s as search_default, g as createTextVNode, m as refresh_default, n as download_default, E as ElMessage, p as normalizeClass, q as createBlock, v as resolveDynamicComponent, x as clock_default, y as trend_charts_default, z as setting_default, _ as _export_sfc } from "./index-DmAQcHss.js";
import { u as useUserStore } from "./userStore-D7ZbSYv0.js";
const _hoisted_1 = { class: "hours-container" };
const _hoisted_2 = { class: "sidebar" };
const _hoisted_3 = { class: "nav-container" };
const _hoisted_4 = ["onClick"];
const _hoisted_5 = { class: "nav-text" };
const _hoisted_6 = { class: "main-content" };
const _hoisted_7 = { class: "top-bar" };
const _hoisted_8 = { class: "user-info" };
const _hoisted_9 = { class: "user-avatar" };
const _hoisted_10 = { class: "user-name" };
const _hoisted_11 = { class: "content-area" };
const _hoisted_12 = { class: "query-card" };
const _hoisted_13 = { class: "query-row" };
const _hoisted_14 = { class: "query-field" };
const _hoisted_15 = { class: "query-field" };
const _hoisted_16 = { class: "query-field date-field" };
const _hoisted_17 = { class: "table-card" };
const _hoisted_18 = { class: "table-header" };
const _hoisted_19 = { class: "pagination-container" };
const _hoisted_20 = { class: "page-info" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "HoursPage",
  setup(__props) {
    const userStore = useUserStore();
    const activeNav = ref("hours");
    const navItems = [
      { key: "hours", label: "工时查询", icon: clock_default },
      { key: "report", label: "统计报表", icon: trend_charts_default },
      { key: "settings", label: "系统设置", icon: setting_default }
    ];
    const queryForm = reactive({
      project: "",
      person: "",
      dateRange: []
    });
    const currentPage = ref(1);
    const pageSize = ref(10);
    const total = ref(128);
    const tableData = ref([]);
    const generateMockData = () => {
      const names = ["张三", "李四", "王五", "赵六"];
      const departments = ["研发部", "产品部", "测试部", "设计部"];
      const projects = ["项目A", "项目B", "项目C"];
      const descriptions = [
        "完成模块开发",
        "需求分析与设计",
        "功能测试与验证",
        "UI界面优化"
      ];
      return Array.from({ length: 10 }, (_, i) => ({
        id: String(i + 1),
        name: names[i % names.length],
        department: departments[i % departments.length],
        project: projects[i % projects.length],
        date: `2024-01-${String(10 + i).padStart(2, "0")}`,
        hours: 6 + i % 3,
        description: descriptions[i % descriptions.length]
      }));
    };
    const handleSearch = () => {
      currentPage.value = 1;
      tableData.value = generateMockData();
      ElMessage.success("查询成功");
    };
    const handleReset = () => {
      queryForm.project = "";
      queryForm.person = "";
      queryForm.dateRange = [];
      handleSearch();
    };
    const handleExport = () => {
      ElMessage.success("导出成功");
    };
    const handleView = (row) => {
      ElMessage.info(`查看: ${row.name} - ${row.date}`);
    };
    const handleEdit = (row) => {
      ElMessage.info(`编辑: ${row.name} - ${row.date}`);
    };
    const handlePageChange = (page) => {
      currentPage.value = page;
      tableData.value = generateMockData();
    };
    onMounted(() => {
      tableData.value = generateMockData();
    });
    return (_ctx, _cache) => {
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_option = resolveComponent("el-option");
      const _component_el_select = resolveComponent("el-select");
      const _component_el_date_picker = resolveComponent("el-date-picker");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_table_column = resolveComponent("el-table-column");
      const _component_el_table = resolveComponent("el-table");
      const _component_el_pagination = resolveComponent("el-pagination");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("aside", _hoisted_2, [
          _cache[5] || (_cache[5] = createBaseVNode("div", { class: "sidebar-header" }, [
            createBaseVNode("div", { class: "sidebar-logo" }, [
              createBaseVNode("span", { class: "sidebar-logo-text" }, "⏱")
            ]),
            createBaseVNode("span", { class: "sidebar-title" }, "工时统计")
          ], -1)),
          createBaseVNode("nav", _hoisted_3, [
            (openBlock(), createElementBlock(Fragment, null, renderList(navItems, (item) => {
              return createBaseVNode("div", {
                key: item.key,
                class: normalizeClass(["nav-item", { active: activeNav.value === item.key }]),
                onClick: ($event) => activeNav.value = item.key
              }, [
                createVNode(_component_el_icon, { size: 20 }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(item.icon)))
                  ]),
                  _: 2
                }, 1024),
                createBaseVNode("span", _hoisted_5, toDisplayString(item.label), 1)
              ], 10, _hoisted_4);
            }), 64))
          ])
        ]),
        createBaseVNode("main", _hoisted_6, [
          createBaseVNode("header", _hoisted_7, [
            _cache[6] || (_cache[6] = createBaseVNode("h1", { class: "page-title" }, "工时查询", -1)),
            createBaseVNode("div", _hoisted_8, [
              createBaseVNode("div", _hoisted_9, [
                createBaseVNode("span", null, toDisplayString(unref(userStore).userInfo?.name?.charAt(0) || "管"), 1)
              ]),
              createBaseVNode("span", _hoisted_10, toDisplayString(unref(userStore).userInfo?.name || "管理员"), 1)
            ])
          ]),
          createBaseVNode("div", _hoisted_11, [
            createBaseVNode("div", _hoisted_12, [
              _cache[12] || (_cache[12] = createBaseVNode("h3", { class: "query-title" }, "查询条件", -1)),
              createBaseVNode("div", _hoisted_13, [
                createBaseVNode("div", _hoisted_14, [
                  _cache[7] || (_cache[7] = createBaseVNode("label", { class: "field-label" }, "项目", -1)),
                  createVNode(_component_el_select, {
                    modelValue: queryForm.project,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => queryForm.project = $event),
                    placeholder: "请选择项目",
                    clearable: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_option, {
                        label: "全部项目",
                        value: ""
                      }),
                      createVNode(_component_el_option, {
                        label: "项目A",
                        value: "projectA"
                      }),
                      createVNode(_component_el_option, {
                        label: "项目B",
                        value: "projectB"
                      }),
                      createVNode(_component_el_option, {
                        label: "项目C",
                        value: "projectC"
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                createBaseVNode("div", _hoisted_15, [
                  _cache[8] || (_cache[8] = createBaseVNode("label", { class: "field-label" }, "人员", -1)),
                  createVNode(_component_el_select, {
                    modelValue: queryForm.person,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => queryForm.person = $event),
                    placeholder: "请选择人员",
                    clearable: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_option, {
                        label: "全部人员",
                        value: ""
                      }),
                      createVNode(_component_el_option, {
                        label: "张三",
                        value: "zhangsan"
                      }),
                      createVNode(_component_el_option, {
                        label: "李四",
                        value: "lisi"
                      }),
                      createVNode(_component_el_option, {
                        label: "王五",
                        value: "wangwu"
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                createBaseVNode("div", _hoisted_16, [
                  _cache[9] || (_cache[9] = createBaseVNode("label", { class: "field-label" }, "日期范围", -1)),
                  createVNode(_component_el_date_picker, {
                    modelValue: queryForm.dateRange,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => queryForm.dateRange = $event),
                    type: "daterange",
                    "range-separator": "至",
                    "start-placeholder": "开始日期",
                    "end-placeholder": "结束日期",
                    format: "YYYY-MM-DD",
                    "value-format": "YYYY-MM-DD"
                  }, null, 8, ["modelValue"])
                ]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: handleSearch
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(search_default))
                      ]),
                      _: 1
                    }),
                    _cache[10] || (_cache[10] = createTextVNode(" 查询 ", -1))
                  ]),
                  _: 1
                }),
                createVNode(_component_el_button, { onClick: handleReset }, {
                  default: withCtx(() => [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(refresh_default))
                      ]),
                      _: 1
                    }),
                    _cache[11] || (_cache[11] = createTextVNode(" 重置 ", -1))
                  ]),
                  _: 1
                })
              ])
            ]),
            createBaseVNode("div", _hoisted_17, [
              createBaseVNode("div", _hoisted_18, [
                _cache[14] || (_cache[14] = createBaseVNode("h3", { class: "table-title" }, "人员工时列表", -1)),
                createVNode(_component_el_button, {
                  type: "success",
                  onClick: handleExport
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(download_default))
                      ]),
                      _: 1
                    }),
                    _cache[13] || (_cache[13] = createTextVNode(" 导出 ", -1))
                  ]),
                  _: 1
                })
              ]),
              createVNode(_component_el_table, {
                data: tableData.value,
                style: { "width": "100%" },
                stripe: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_table_column, {
                    prop: "name",
                    label: "姓名",
                    width: "120"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "department",
                    label: "部门",
                    width: "150"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "project",
                    label: "项目",
                    width: "180"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "date",
                    label: "日期",
                    width: "120"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "hours",
                    label: "工时(h)",
                    width: "100"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "description",
                    label: "工作内容",
                    "min-width": "200"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "操作",
                    width: "120",
                    fixed: "right"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode(_component_el_button, {
                        type: "primary",
                        link: "",
                        onClick: ($event) => handleView(row)
                      }, {
                        default: withCtx(() => [..._cache[15] || (_cache[15] = [
                          createTextVNode("查看", -1)
                        ])]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_el_button, {
                        type: "primary",
                        link: "",
                        onClick: ($event) => handleEdit(row)
                      }, {
                        default: withCtx(() => [..._cache[16] || (_cache[16] = [
                          createTextVNode("编辑", -1)
                        ])]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["data"]),
              createBaseVNode("div", _hoisted_19, [
                createBaseVNode("span", _hoisted_20, "共 " + toDisplayString(total.value) + " 条记录，每页 " + toDisplayString(pageSize.value) + " 条", 1),
                createVNode(_component_el_pagination, {
                  "current-page": currentPage.value,
                  "onUpdate:currentPage": _cache[3] || (_cache[3] = ($event) => currentPage.value = $event),
                  "page-size": pageSize.value,
                  "onUpdate:pageSize": _cache[4] || (_cache[4] = ($event) => pageSize.value = $event),
                  "page-sizes": [10, 20, 50, 100],
                  total: total.value,
                  layout: "prev, pager, next",
                  onCurrentChange: handlePageChange
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ])
          ])
        ])
      ]);
    };
  }
});
const HoursPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-96d11a3e"]]);
export {
  HoursPage as default
};
