import { d as defineComponent, c as createElementBlock, a as createStaticVNode, b as createBaseVNode, e as createVNode, w as withCtx, r as resolveComponent, u as useRouter, o as openBlock, f as withKeys, g as createTextVNode, h as ref, i as reactive, E as ElMessage, _ as _export_sfc } from "./index-DmAQcHss.js";
import { u as useUserStore } from "./userStore-D7ZbSYv0.js";
const _hoisted_1 = { class: "login-container" };
const _hoisted_2 = { class: "right-panel" };
const _hoisted_3 = { class: "login-card" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LoginPage",
  setup(__props) {
    const router = useRouter();
    const userStore = useUserStore();
    const formRef = ref();
    const loading = ref(false);
    const loginForm = reactive({
      username: "",
      password: ""
    });
    const rules = {
      username: [
        { required: true, message: "请输入用户名", trigger: "blur" }
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" }
      ]
    };
    const handleLogin = async () => {
      if (!formRef.value) return;
      await formRef.value.validate(async (valid) => {
        if (valid) {
          loading.value = true;
          try {
            await new Promise((resolve) => setTimeout(resolve, 1e3));
            userStore.setToken("mock-token-" + Date.now());
            userStore.setUserInfo({
              id: "1",
              username: loginForm.username,
              name: "管理员",
              role: "admin"
            });
            ElMessage.success("登录成功");
            router.push("/hours");
          } catch (error) {
            ElMessage.error("登录失败，请重试");
          } finally {
            loading.value = false;
          }
        }
      });
    };
    return (_ctx, _cache) => {
      const _component_el_input = resolveComponent("el-input");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_form = resolveComponent("el-form");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[7] || (_cache[7] = createStaticVNode('<div class="left-panel" data-v-ac7efdfa><div class="brand-icon" data-v-ac7efdfa><span class="brand-icon-text" data-v-ac7efdfa>⏱</span></div><h1 class="brand-title" data-v-ac7efdfa>工时统计系统</h1><p class="brand-subtitle" data-v-ac7efdfa>高效管理团队工时，提升项目效率</p></div>', 1)),
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            _cache[5] || (_cache[5] = createBaseVNode("h2", { class: "login-title" }, "欢迎登录", -1)),
            _cache[6] || (_cache[6] = createBaseVNode("p", { class: "login-subtitle" }, "请输入您的账号信息", -1)),
            createVNode(_component_el_form, {
              ref_key: "formRef",
              ref: formRef,
              model: loginForm,
              rules,
              class: "login-form"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_form_item, { prop: "username" }, {
                  default: withCtx(() => [
                    _cache[2] || (_cache[2] = createBaseVNode("label", { class: "form-label" }, "用户名", -1)),
                    createVNode(_component_el_input, {
                      modelValue: loginForm.username,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => loginForm.username = $event),
                      placeholder: "请输入用户名",
                      size: "large"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_form_item, { prop: "password" }, {
                  default: withCtx(() => [
                    _cache[3] || (_cache[3] = createBaseVNode("label", { class: "form-label" }, "密码", -1)),
                    createVNode(_component_el_input, {
                      modelValue: loginForm.password,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => loginForm.password = $event),
                      type: "password",
                      placeholder: "请输入密码",
                      size: "large",
                      "show-password": "",
                      onKeyup: withKeys(handleLogin, ["enter"])
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_button, {
                  type: "primary",
                  class: "login-button",
                  loading: loading.value,
                  onClick: handleLogin
                }, {
                  default: withCtx(() => [..._cache[4] || (_cache[4] = [
                    createTextVNode(" 登 录 ", -1)
                  ])]),
                  _: 1
                }, 8, ["loading"])
              ]),
              _: 1
            }, 8, ["model"])
          ])
        ])
      ]);
    };
  }
});
const LoginPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ac7efdfa"]]);
export {
  LoginPage as default
};
