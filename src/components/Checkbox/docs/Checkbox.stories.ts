import { ref, computed, reactive, watch } from 'vue';
import Checkbox from '../Checkbox.vue'
import CheckboxGroup from '../CheckboxGroup.vue';
import { Row, Col } from 'ant-design-vue';
import Button from '../../Button/Button.vue';
import type { Meta } from '@storybook/vue3';
import './style.less';

const components = { Checkbox }

const meta: Meta<typeof Checkbox> = {
  title: '通用/Checkbox 多选框',
  component: Checkbox,
  decorators: [
    () => ({
      template: '<div class="storybook-demo"><story /></div>',
    })
  ],
};

export default meta;

const setupMatch = (code: string) => {
  const matches = code.matchAll(/const\s+\w+\s*=\s*ref\([^)]+\);/g);
  const extractedLines = Array.from(matches).map(match => match[0]);

  // console.log(extractedLines.join('\n'));

  return extractedLines.join('\n') || ''
}

const parameters = (instance: any) => {
  return {
    docs: {
      source: {
        code: `
<template>${instance().template}</template>

<script lang="ts" setup>
${instance().setup ? `${setupMatch(String(instance().setup))}` : ''}
</script>
`
      }
    }
  }
}

// ------------------------------------------------------------------------------------------------------------------------

export const Default = () => {
  return {
    components,
    setup() {
      const checked = ref<boolean>(false);
      return {
        checked
      }
    },
    template: `
  <Checkbox v-model:checked="checked">Checkbox</Checkbox>
`
  }
};

Default.storyName = "基本使用 checkbox";
Default.parameters = parameters(Default)

// ------------------------------------------------------------------------------------------------------------------------

export const ControlComponent = () => {
  return {
    components: {
      Checkbox,
      Button
    },
    setup() {
      const checked = ref(false);
      const disabled = ref(false);

      const toggleChecked = () => {
        checked.value = !checked.value;
      };

      const toggleDisable = () => {
        disabled.value = !disabled.value;
      };

      const label = computed(() => {
        return `${checked.value ? 'Checked' : 'Unchecked'}-${disabled.value ? 'Disabled' : 'Enabled'}`;
      });
      return {
        checked,
        disabled,
        toggleChecked,
        toggleDisable,
        label
      }
    },
    template: `
  <p :style="{ marginBottom: '20px' }">
    <Checkbox v-model:checked="checked" :disabled="disabled">
      {{ label }}
    </Checkbox>
  </p>
  <p>
    <Button type="primary" size="small" @click="toggleChecked">
      {{ !checked ? 'Check' : 'Uncheck' }}
    </Button>
    <Button :style="{ marginLeft: '10px' }" type="primary" size="small" @click="toggleDisable">
      {{ !disabled ? 'Disable' : 'Enable' }}
    </Button>
  </p>
`
  }
};

ControlComponent.storyName = "受控的 checkbox";
ControlComponent.parameters = parameters(ControlComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const DisabledComponent = () => {
  return {
    components,
    setup() {
      const state = reactive({
        checked1: false,
        checked2: true,
      });
      return {
        state
      }
    },
    template: `
  <Checkbox v-model:checked="state.checked1" disabled />
  <br />
  <Checkbox v-model:checked="state.checked2" disabled />
`
  }
};

DisabledComponent.storyName = "不可用 disabled";
DisabledComponent.parameters = parameters(DisabledComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const GroupComponent = () => {
  return {
    components: { CheckboxGroup },
    setup() {
      const plainOptions = ['Apple', 'Pear', 'Orange'];
      const options = [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange' },
      ];
      const optionsWithDisabled = [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange', disabled: false },
      ];
      const state = reactive({
        value1: [],
        value2: ['Apple'],
        value3: ['Pear'],
        value4: ['Apple'],
      });
      return {
        state,
        plainOptions,
        options,
        optionsWithDisabled
      }
    },
    template: `
  <CheckboxGroup v-model:value="state.value1" name="checkboxgroup" :options="plainOptions" />
    <br />
    <br />
    <CheckboxGroup v-model:value="state.value2" :options="plainOptions" />
    <br />
    <br />
    <CheckboxGroup v-model:value="state.value3" :options="options" />
    <br />
    <br />
    <CheckboxGroup v-model:value="state.value4" :options="optionsWithDisabled" disabled>
      <template #label="{ label }">
        <span style="color: red">{{ label }}</span>
      </template>
  </CheckboxGroup>
`
  }
};

GroupComponent.storyName = "Checkbox 组";
GroupComponent.parameters = parameters(GroupComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const SelectAllComponent = () => {
  return {
    components: { Checkbox, CheckboxGroup },
    setup() {
      const plainOptions = ['Apple', 'Pear', 'Orange'];
      const state = reactive({
        indeterminate: true,
        checkAll: false,
        checkedList: ['Apple', 'Orange'],
      });

      const onCheckAllChange = (e: any) => {
        Object.assign(state, {
          checkedList: e.target.checked ? plainOptions : [],
          indeterminate: false,
        });
      };

      watch(
        () => state.checkedList,
        val => {
          state.indeterminate = !!val.length && val.length < plainOptions.length;
          state.checkAll = val.length === plainOptions.length;
        },
      );

      return {
        state,
        plainOptions,
        onCheckAllChange
      }
    },
    template: `
  <div style="margin-bottom: 8px;">
    <Checkbox
      v-model:checked="state.checkAll"
      :indeterminate="state.indeterminate"
      @change="onCheckAllChange"
    >
      Check all
    </Checkbox>
  </div>
  <CheckboxGroup v-model:value="state.checkedList" :options="plainOptions" />
`
  }
};

SelectAllComponent.storyName = "全选 all";
SelectAllComponent.parameters = parameters(SelectAllComponent)

// ------------------------------------------------------------------------------------------------------------------------

export const GridLayoutComponent = () => {
  return {
    components: { Checkbox, CheckboxGroup, Row, Col },
    setup() {
      const value = ref([]);

      return {
        value
      }
    },
    template: `
  <CheckboxGroup v-model:value="value" style="width: 100%">
    <Row>
      <Col :span="8">
        <Checkbox value="A">A</Checkbox>
      </Col>
      <Col :span="8">
        <Checkbox value="B">B</Checkbox>
      </Col>
      <Col :span="8">
        <Checkbox value="C">C</Checkbox>
      </Col>
      <Col :span="8">
        <Checkbox value="D">D</Checkbox>
      </Col>
      <Col :span="8">
        <Checkbox value="E">E</Checkbox>
      </Col>
    </Row>
  </CheckboxGroup>
`
  }
};

GridLayoutComponent.storyName = "布局 grid layout";
GridLayoutComponent.parameters = parameters(GridLayoutComponent)