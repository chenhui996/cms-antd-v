// src/theme/antdTheme.ts
import type { GlobalToken } from 'ant-design-vue/es/theme/interface';

export const themes = {
  light: {
    "token": {
      "rippleDuration":'1s',
      "rippleColor":"#000",
      "rippleOpacity":"1",
       //按钮 开始
      "colorText":"#000",
      "colorPrimaryBg": "rgba(57, 117, 217,0.2)",
      "colorPrimaryBgHover": "rgba(57, 117, 217,0.1)",
      //按钮 结束
      // "colorSuccess": "rgba(60, 145, 91,1)",
      // "colorSuccessBg": "rgba(60, 145, 91,0.08)",
      // "colorSuccessBgHover": "rgba(60, 145, 91,0.16)",
      // "colorSuccessBorder": "rgba(60, 145, 91,0.24)",
      // "colorWarning": "rgba(255, 138, 78,1)",
      // "colorWarningBg": "rgba(255, 138, 78,0.08)",
      // "colorWarningBgHover": "rgba(255, 138, 78,0.16)",
      // "colorWarningBorder": "rgba(255, 138, 78,0.24)",
      // "colorError": "rgba(226, 54, 66,1)",
      // "colorErrorBg": "rgba(226, 54, 66,0.08)",
      // "colorErrorBgHover": "rgba(226, 54, 66,0.16)",
      // "colorErrorBorder": "rgba(226, 54, 66,0.24)",
      // "colorInfo": "rgba(57, 117, 217,1)",
      // "colorTextBase": "rgb(0, 0, 0)",
      // "colorTextSecondary": "rgba(0, 0, 0, 0.85)",
      // "colorTextTertiary": "rgba(0, 0, 0, 0.6)",
      // "colorTextQuaternary": "rgba(0, 0, 0, 0.30)",
      // "colorBgLayout": "#ffffff",
      // "colorBorder": "rgba(0, 0, 0, 0.15)",
      // "colorBorderSecondary": "rgba(0, 0, 0, 0.15)",
      // "colorFill": "rgba(57, 117, 217,0.1)",
      // "colorFillSecondary": "rgba(57, 117, 217,0.1)",
      // "colorFillTertiary": "rgba(0, 0, 0, 0.02)",
      // "colorFillQuaternary": "rgba(57, 117, 217,0.1)",
      // "fontSize": 13,
      // "fontSizeSM": 13,
      // "fontSizeLG": 13,
      // "fontSizeXL": 13,
      // "fontSizeHeading1": 20,
      // "fontSizeHeading2": 16,
      // "fontSizeHeading3": 13,
      // "fontSizeHeading4": 13,
      // "fontSizeHeading5": 13,
      // "borderRadius": 2,
      // "wireframe": false,
      // "sizeStep": 4,
      // "sizeUnit": 4
    },
    "components": {
      "Button": {
        "rippleDuration":'1s',
        "rippleColor":"#000",
        "rippleOpacity":"1",
        // "algorithm": true,
        "colorPrimary": "#1373F7",
        "colorPrimaryActive": "#0654D1",
        "colorPrimaryHover": "#3D94FF",
        "boxShadow":'0 0 0 2px rgba(0, 185, 107, 0.2)',
        "boxShadowSecondary":'0 0 0 2px rgba(24, 144, 255, 0.2)',


        // "algorithm": true,
          "colorPrimarySecound": "#1373F7",
          "colorPrimarySecoundActive": "#0654D1",
          "colorPrimarySecoundHover": "#3D94FF",
        // "lineWidthFocus": 4,
        // "controlHeight": 22,
        // "contentFontSize": 13,
        // "contentFontSizeLG": 13,
        // "contentFontSizeSM": 13,
        // "marginXS": 4,
        // "paddingXS": 4,
        // "controlHeightSM": 22,
        // "controlHeightLG": 22,
        // "paddingInline": 4,
        // "paddingInlineLG": 4,
        // "paddingInlineSM": 4
      },
      "Divider": {
        "margin": 4
      },
      "Space": {
        "padding": 4,
        "paddingLG": 4,
        "paddingXS": 4
      },
      "Dropdown": {
        "colorError": "rgb(226,54,65)",
        "paddingBlock": 4,
        "padding": 4,
        "controlItemBgHover": "rgba(57,116,217,0.1)"
      },
      "Pagination": {
        "margin": 4,
        "controlHeight": 22,
        "itemSize": 22,
        "itemSizeSM": 22,
        "marginXS": 4,
        "controlHeightLG": 22,
        "controlHeightSM": 22
      },
      "Steps": {
        "customIconFontSize": 13,
        "customIconSize": 13,
        "iconSize": 22,
        "iconFontSize": 13,
        "titleLineHeight": 22,
        "controlHeight": 22,
        "padding": 4
      },
      "Cascader": {
        "controlInteractiveSize": 22,
        "controlItemBgHover": "rgba(57,116,217,0.1)",
        "optionSelectedColor": "rgb(0,0,0)",
        "optionPadding": "4px 8px",
        "paddingInline": 4,
        "paddingXS": 4,
        "paddingXXS": 4
      },
      "Layout": {
        "headerHeight": 30,
        "headerBg": "rgb(46,46,46)"
      },
      "Anchor": {
        "colorSplit": "rgba(0,0,0,0.15)",
        "linkPaddingInlineStart": 4
      },
      "Breadcrumb": {
        "iconFontSize": 13,
        "fontHeight": 22
      },
      "Checkbox": {
        "colorBgContainerDisabled": "rgba(0,0,0,0.04)",
        "colorBorder": "rgba(0,0,0,0.4)",
        "controlInteractiveSize": 14
      },
      "DatePicker": {
        "cellHoverBg": "rgba(57,116,217,0.1)",
        "controlHeight": 22,
        "controlHeightSM": 22,
        "controlHeightLG": 32,
        "multipleItemHeightSM": 22,
        "multipleItemHeightLG": 22,
        "multipleItemHeight": 22,
        "inputFontSizeSM": 13,
        "inputFontSizeLG": 13,
        "inputFontSize": 13,
        "paddingInline": 4,
        "paddingInlineLG": 4,
        "paddingInlineSM": 4,
        "timeCellHeight": 22,
        "fontHeight": 22,
        "activeBorderColor": "rgb(57,117,217)"
      },
      "Menu": {
        "margin": 4
      },
      "Form": {
        "labelFontSize": 13,
        "labelColor": "rgba(0,0,0,0.6)",
        "labelHeight": 22,
        "controlHeight": 22,
        "marginLG": 3,
        "verticalLabelPadding": "4 4 4px"
      },
      "Input": {
        "inputFontSize": 13,
        "paddingBlock": 4,
        "paddingInline": 4,
        "controlHeight": 22
      },
      "InputNumber": {
        "inputFontSize": 13,
        "paddingInline": 4,
        "paddingInlineLG": 4,
        "paddingInlineSM": 4,
        "inputFontSizeLG": 13,
        "inputFontSizeSM": 13,
        "controlHeightLG": 22,
        "controlHeightSM": 22
      },
      "Mentions": {
        "paddingInlineLG": 4,
        "paddingInline": 4,
        "paddingInlineSM": 4,
        "inputFontSize": 13,
        "inputFontSizeLG": 13,
        "inputFontSizeSM": 13,
        "controlHeight": 22
      },
      "Radio": {
        "controlHeight": 22,
        "controlHeightLG": 22,
        "controlHeightSM": 22,
        "buttonPaddingInline": 4,
        "dotSize": 6
      },
      "Select": {
        "optionSelectedColor": "rgb(0,0,0)",
        "multipleItemHeight": 22,
        "multipleItemHeightLG": 22,
        "multipleItemHeightSM": 22,
        "optionFontSize": 13,
        "optionHeight": 22,
        "optionPadding": "4px 4px",
        "controlHeight": 22,
        "controlHeightLG": 22,
        "controlHeightSM": 22,
        "paddingSM": 4,
        "paddingXS": 4,
        "paddingXXS": 4,
        "activeBorderColor": "rgb(57,117,217)",
        "optionActiveBg": "rgba(57,116,217,0.1)",
        "optionSelectedBg": "rgba(57,116,217,0.2)",
        "hoverBorderColor": "rgb(57,117,217)"
      },
      "Transfer": {
        "paddingSM": 4,
        "paddingXS": 4,
        "marginXS": 4,
        "marginXXS": 4,
        "controlItemBgHover": "rgba(57,116,217,0.1)"
      },
      "TreeSelect": {
        "nodeHoverBg": "rgba(57,116,217,0.1)",
        "nodeHoverColor": "rgba(0,0,0,0.85)",
        "nodeSelectedBg": "rgba(57,116,217,0.2)",
        "nodeSelectedColor": "rgb(0,0,0)",
        "indentSize": 22,
        "titleHeight": 22,
        "paddingXS": 4
      },
      "Calendar": {
        "controlItemBgHover": "rgba(57,116,217,0.1)"
      },
      "Collapse": {
        "padding": 4,
        "paddingLG": 4,
        "paddingSM": 4,
        "paddingXS": 4,
        "fontHeight": 22,
        "colorBorder": "rgba(0,0,0,0.15)",
        "contentPadding": "16px 32px"
      },
      "Descriptions": {
        "padding": 4,
        "paddingLG": 4,
        "paddingSM": 4,
        "paddingXS": 4
      },
      "Segmented": {
        "itemSelectedBg": "rgba(57,116,217,0.2)",
        "controlHeight": 22,
        "controlHeightLG": 22,
        "controlHeightSM": 22,
        "itemColor": "rgba(0,0,0,0.6)",
        "itemHoverColor": "rgb(0,0,0)",
        "itemSelectedColor": "rgb(0,0,0)"
      },
      "Statistic": {
        "contentFontSize": 22,
        "titleFontSize": 13
      },
      "Table": {
        "colorFillAlter": "rgba(255,255,255,1)",
        "footerColor": "rgb(0,0,0)",
        "headerColor": "rgba(0,0,0,0.6)",
        "rowSelectedHoverBg": "rgba(57,116,217,0.1)",
        "rowSelectedBg": "rgba(57,116,217,0.2)",
        "padding": 1,
        "headerBorderRadius": 2
      },
      "Tabs": {
        "controlHeight": 22,
        "colorBorder": "rgba(0, 0, 0, 0.15)",
        "controlHeightLG": 2
      },
      "Tag": {
        "defaultColor": "rgb(0,0,0)",
        "marginXS": 4
      },
      "Tree": {
        "titleHeight": 22
      }, 
    }
  }  as Partial<GlobalToken>,
  dark: {
    "token": {
      "colorPrimary": "rgb(57, 117, 217)",
      "colorSuccess": "rgba(80, 190, 121,1)",
      "colorWarning": "rgba(255 138, 78,1)",
      "colorError": "rgba(255, 79, 91,1)",
      "colorInfo": "rgb(57, 117, 217)",
      "colorFillSecondary": "rgba(255, 255, 255, 0.10)",
      "colorFill": "rgba(255, 255, 255, 0.16)",
      "colorFillTertiary": "rgba(255, 255, 255, 0.08)",
      "colorFillQuaternary": "rgba(255, 255, 255, 0.04)",
      "colorBgContainer": "rgba(38,38,43,1)",
      "colorBgElevated": "rgba(38,38,43,1)",
      "colorBgLayout": "rgba(38,38,43,1)",
      "colorBorder": "rgba(255, 255, 255, 0.15)",
      "colorBorderSecondary": "rgba(255, 255, 255, 0.15)",
      "colorPrimaryBg": "rgba(57, 117, 217, 0.2)",
      "fontSize": 13,
      "fontSizeSM": 13,
      "fontSizeLG": 13,
      "fontSizeXL": 13,
      "fontSizeHeading1": 20,
      "fontSizeHeading2": 16,
      "fontSizeHeading3": 13,
      "fontSizeHeading4": 13,
      "fontSizeHeading5": 13,
      "borderRadius": 2,
      "wireframe": false,
      "sizeStep": 4,
      "sizeUnit": 4
    },
    "components": {
      "Button": {
        "defaultColor": "rgb(255,255,255)",
        "contentFontSize": 13,
        "contentFontSizeLG": 13,
        "contentFontSizeSM": 13,
        "controlHeight": 22,
        "controlHeightLG": 22,
        "controlHeightSM": 22,
        "paddingInline": 4,
        "paddingInlineLG": 4,
        "paddingInlineSM": 4
      },
      "Typography": {
        "colorLink": "rgb(128,175,255)"
      },
      "Space": {
        "paddingLG": 4,
        "padding": 4,
        "paddingXS": 4
      },
      "Divider": {
        "margin": 4
      },
      "Layout": {
        "headerHeight": 30
      },
      "Anchor": {
        "colorPrimary": "rgb(128,175,255)",
        "colorText": "rgba(255,255,255,0.85)"
      },
      "Breadcrumb": {
        "iconFontSize": 13,
        "fontHeight": 22
      },
      "Dropdown": {
        "padding": 4,
        "controlItemBgHover": "rgba(255,255,255,0.1)",
        "colorPrimary": "rgb(128,175,255)",
        "paddingBlock": 4
      },
      "Pagination": {
        "itemSize": 22,
        "itemSizeSM": 22,
        "controlHeight": 22,
        "controlHeightLG": 22,
        "controlHeightSM": 22,
        "marginXS": 4
      },
      "Steps": {
        "customIconFontSize": 13,
        "customIconSize": 13,
        "iconFontSize": 13,
        "iconSize": 22,
        "controlHeight": 22,
        "controlHeightLG": 22,
        "padding": 4
      },
      "Checkbox": {
        "controlInteractiveSize": 14,
        "colorBgContainerDisabled": "rgba(255,255,255,0.2)",
        "colorBorder": "rgba(255,255,255,0.4)",
        "colorPrimary": "rgb(57,117,217)",
        "colorPrimaryHover": "rgb(128,175,255)"
      },
      "DatePicker": {
        "activeBorderColor": "rgb(57,117,217)",
        "paddingInlineLG": 4,
        "paddingInline": 4,
        "paddingInlineSM": 4,
        "textHeight": 22,
        "controlHeight": 22,
        "controlHeightLG": 22,
        "controlHeightSM": 22,
        "fontHeight": 22
      },
      "Form": {
        "labelColor": "rgba(255,255,255,0.6)",
        "labelFontSize": 13,
        "labelHeight": 22,
        "verticalLabelPadding": "4 4 4px",
        "controlHeight": 22,
        "controlHeightLG": 22,
        "controlHeightSM": 22,
        "marginLG": 3
      },
      "Input": {
        "inputFontSize": 13,
        "paddingBlock": 4,
        "paddingInline": 4,
        "controlHeight": 22,
        "controlHeightLG": 22,
        "controlHeightSM": 22
      },
      "InputNumber": {
        "inputFontSize": 13,
        "inputFontSizeLG": 13,
        "inputFontSizeSM": 13,
        "paddingInline": 4,
        "paddingInlineLG": 4,
        "paddingInlineSM": 4,
        "controlHeightLG": 22,
        "controlHeightSM": 22
      },
      "Mentions": {
        "paddingInlineSM": 4,
        "paddingInline": 4,
        "paddingInlineLG": 4,
        "inputFontSizeLG": 13,
        "inputFontSizeSM": 13,
        "inputFontSize": 13,
        "controlHeight": 22
      },
      "Radio": {
        "buttonPaddingInline": 4,
        "dotSize": 6,
        "controlHeightLG": 22,
        "controlHeight": 22,
        "controlHeightSM": 22
      },
      "Select": {
        "hoverBorderColor": "rgb(57,117,217)",
        "optionActiveBg": "rgba(255,255,255,0.1)",
        "optionSelectedColor": "rgb(255,255,255)",
        "optionSelectedBg": "rgba(57,116,217,0.2)",
        "multipleItemHeight": 22,
        "multipleItemHeightLG": 22,
        "multipleItemHeightSM": 22,
        "optionFontSize": 13,
        "optionHeight": 22,
        "optionPadding": "4px 4px",
        "controlHeight": 22,
        "controlHeightLG": 22,
        "controlHeightSM": 22,
        "paddingXS": 4,
        "paddingSM": 4,
        "paddingXXS": 4
      },
      "Slider": {
        "handleColor": "rgb(57,117,217)",
        "trackBg": "rgb(57,117,217)"
      },
      "Switch": {
        "colorPrimary": "rgb(57,117,217)"
      },
      "Transfer": {
        "controlItemBgHover": "rgba(255,255,255,0.1)",
        "marginXS": 4,
        "paddingSM": 4,
        "paddingXS": 4,
        "marginXXS": 4
      },
      "TreeSelect": {
        "indentSize": 22,
        "titleHeight": 22,
        "controlItemBgHover": "rgba(255,255,255,0.1)",
        "nodeHoverColor": "rgb(255,255,255)",
        "nodeSelectedBg": "rgba(57,116,217,0.2)",
        "nodeHoverBg": "rgba(255,255,255,0.1)",
        "nodeSelectedColor": "rgb(255,255,255)",
        "paddingXS": 4
      },
      "Badge": {
        "colorInfo": "rgb(57,117,217)"
      },
      "Collapse": {
        "contentPadding": "16px 32px",
        "fontHeight": 22,
        "paddingXS": 4,
        "paddingSM": 4,
        "paddingLG": 4,
        "padding": 4,
        "headerBg": "rgba(255,255,255,0.04)"
      },
      "Descriptions": {
        "colonMarginRight": 4,
        "padding": 4,
        "paddingLG": 4,
        "paddingSM": 4,
        "paddingXS": 4,
        "contentColor": "rgb(255,255,255)",
        "extraColor": "rgba(255,255,255,0.6)",
        "labelBg": "rgba(255,255,255,0.04)",
        "labelColor": "rgba(255,255,255,0.6)",
        "titleColor": "rgb(255,255,255)",
        "colorTextSecondary": "rgba(255,255,255,0.6)"
      },
      "Segmented": {
        "itemColor": "rgba(255,255,255,0.6)",
        "itemHoverColor": "rgb(255,255,255)",
        "itemSelectedBg": "rgb(57,117,217)",
        "controlHeight": 22,
        "controlHeightLG": 22,
        "controlHeightSM": 22,
        "itemSelectedColor": "rgb(255,255,255)",
        "itemHoverBg": "rgba(255,255,255,0.1)"
      },
      "Statistic": {
        "contentFontSize": 22,
        "titleFontSize": 13
      },
      "Table": {
        "headerColor": "rgba(255,255,255,0.6)",
        "headerBg": "rgba(255,255,255,0)",
        "padding": 1,
        "headerFilterHoverBg": "rgba(255,255,255,0.1)",
        "rowHoverBg": "rgba(255,255,255,0.1)",
        "rowSelectedBg": "rgba(255,255,255,0.2)",
        "headerBorderRadius": 2
      },
      "Tabs": {
        "controlHeight": 22,
        "controlHeightLG": 22
      },
      "Tag": {
        "defaultColor": "rgb(255,255,255)",
        "marginXS": 4
      },
      "Tree": {
        "titleHeight": 22
      }
    }
  } as Partial<GlobalToken>,
};

export type ThemeMode = keyof typeof themes;   