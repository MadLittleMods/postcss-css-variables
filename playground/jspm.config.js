SystemJS.config({
  paths: {
    "github:": "jspm_packages/github/",
    "npm:": "jspm_packages/npm/",
    "postcss-css-variables-playground/": "src/"
  },
  browserConfig: {
    "baseURL": "/",
    "bundles": {
      "build.js": [
        "postcss-css-variables-playground/js/main.js",
        "postcss-css-variables-playground/js/services/PlaygroundPersistentSettingsDAO.js",
        "npm:localforage@1.5.0/dist/localforage.js",
        "npm:localforage@1.5.0.json",
        "npm:jspm-nodelibs-process@0.2.1/process.js",
        "npm:jspm-nodelibs-process@0.2.1.json",
        "npm:immutable@3.8.1/dist/immutable.js",
        "npm:immutable@3.8.1.json",
        "postcss-css-variables-playground/js/actions/PlaygroundActions.js",
        "postcss-css-variables-playground/js/constants/PlaygroundConstants.js",
        "npm:keymirror@0.1.1/index.js",
        "npm:keymirror@0.1.1.json",
        "postcss-css-variables-playground/js/dispatcher/AppDispatcher.js",
        "npm:flux@2.1.1/index.js",
        "npm:flux@2.1.1.json",
        "npm:flux@2.1.1/lib/Dispatcher.js",
        "npm:fbjs@0.1.0-alpha.7/lib/invariant.js",
        "npm:fbjs@0.1.0-alpha.7.json",
        "npm:systemjs-plugin-babel@0.0.25/babel-helpers/defineProperty.js",
        "npm:systemjs-plugin-babel@0.0.25.json",
        "postcss-css-variables-playground/js/components/PlaygroundApp.js",
        "postcss-css-variables-playground/js/components/EditorTextarea.js",
        "github:wjbryant/taboverride@4.0.3/build/output/taboverride.min.js",
        "github:wjbryant/taboverride@4.0.3.json",
        "npm:react@0.13.3/react.js",
        "npm:react@0.13.3.json",
        "npm:react@0.13.3/lib/React.js",
        "npm:react@0.13.3/lib/ExecutionEnvironment.js",
        "npm:react@0.13.3/lib/onlyChild.js",
        "npm:react@0.13.3/lib/invariant.js",
        "npm:react@0.13.3/lib/ReactElement.js",
        "npm:react@0.13.3/lib/warning.js",
        "npm:react@0.13.3/lib/emptyFunction.js",
        "npm:react@0.13.3/lib/Object.assign.js",
        "npm:react@0.13.3/lib/ReactCurrentOwner.js",
        "npm:react@0.13.3/lib/ReactContext.js",
        "npm:react@0.13.3/lib/emptyObject.js",
        "npm:react@0.13.3/lib/findDOMNode.js",
        "npm:react@0.13.3/lib/isNode.js",
        "npm:react@0.13.3/lib/ReactMount.js",
        "npm:react@0.13.3/lib/shouldUpdateReactComponent.js",
        "npm:react@0.13.3/lib/setInnerHTML.js",
        "npm:react@0.13.3/lib/instantiateReactComponent.js",
        "npm:react@0.13.3/lib/ReactNativeComponent.js",
        "npm:react@0.13.3/lib/ReactEmptyComponent.js",
        "npm:react@0.13.3/lib/ReactInstanceMap.js",
        "npm:react@0.13.3/lib/ReactCompositeComponent.js",
        "npm:react@0.13.3/lib/ReactUpdates.js",
        "npm:react@0.13.3/lib/Transaction.js",
        "npm:react@0.13.3/lib/ReactReconciler.js",
        "npm:react@0.13.3/lib/ReactElementValidator.js",
        "npm:react@0.13.3/lib/getIteratorFn.js",
        "npm:react@0.13.3/lib/ReactPropTypeLocationNames.js",
        "npm:react@0.13.3/lib/ReactPropTypeLocations.js",
        "npm:react@0.13.3/lib/keyMirror.js",
        "npm:react@0.13.3/lib/ReactFragment.js",
        "npm:react@0.13.3/lib/ReactRef.js",
        "npm:react@0.13.3/lib/ReactOwner.js",
        "npm:react@0.13.3/lib/ReactPerf.js",
        "npm:react@0.13.3/lib/PooledClass.js",
        "npm:react@0.13.3/lib/CallbackQueue.js",
        "npm:react@0.13.3/lib/ReactLifeCycle.js",
        "npm:react@0.13.3/lib/ReactComponentEnvironment.js",
        "npm:react@0.13.3/lib/getReactRootElementInContainer.js",
        "npm:react@0.13.3/lib/containsNode.js",
        "npm:react@0.13.3/lib/isTextNode.js",
        "npm:react@0.13.3/lib/ReactUpdateQueue.js",
        "npm:react@0.13.3/lib/ReactMarkupChecksum.js",
        "npm:react@0.13.3/lib/adler32.js",
        "npm:react@0.13.3/lib/ReactInstanceHandles.js",
        "npm:react@0.13.3/lib/ReactRootIndex.js",
        "npm:react@0.13.3/lib/ReactBrowserEventEmitter.js",
        "npm:react@0.13.3/lib/isEventSupported.js",
        "npm:react@0.13.3/lib/ViewportMetrics.js",
        "npm:react@0.13.3/lib/ReactEventEmitterMixin.js",
        "npm:react@0.13.3/lib/EventPluginHub.js",
        "npm:react@0.13.3/lib/forEachAccumulated.js",
        "npm:react@0.13.3/lib/accumulateInto.js",
        "npm:react@0.13.3/lib/EventPluginUtils.js",
        "npm:react@0.13.3/lib/EventConstants.js",
        "npm:react@0.13.3/lib/EventPluginRegistry.js",
        "npm:react@0.13.3/lib/DOMProperty.js",
        "npm:react@0.13.3/lib/ReactServerRendering.js",
        "npm:react@0.13.3/lib/ReactServerRenderingTransaction.js",
        "npm:react@0.13.3/lib/ReactPutListenerQueue.js",
        "npm:react@0.13.3/lib/ReactPropTypes.js",
        "npm:react@0.13.3/lib/ReactDefaultInjection.js",
        "npm:react@0.13.3/lib/ReactDefaultPerf.js",
        "npm:react@0.13.3/lib/performanceNow.js",
        "npm:react@0.13.3/lib/performance.js",
        "npm:react@0.13.3/lib/ReactDefaultPerfAnalysis.js",
        "npm:react@0.13.3/lib/createFullPageComponent.js",
        "npm:react@0.13.3/lib/ReactClass.js",
        "npm:react@0.13.3/lib/keyOf.js",
        "npm:react@0.13.3/lib/ReactErrorUtils.js",
        "npm:react@0.13.3/lib/ReactComponent.js",
        "npm:react@0.13.3/lib/SVGDOMPropertyConfig.js",
        "npm:react@0.13.3/lib/SimpleEventPlugin.js",
        "npm:react@0.13.3/lib/getEventCharCode.js",
        "npm:react@0.13.3/lib/SyntheticWheelEvent.js",
        "npm:react@0.13.3/lib/SyntheticMouseEvent.js",
        "npm:react@0.13.3/lib/getEventModifierState.js",
        "npm:react@0.13.3/lib/SyntheticUIEvent.js",
        "npm:react@0.13.3/lib/getEventTarget.js",
        "npm:react@0.13.3/lib/SyntheticEvent.js",
        "npm:react@0.13.3/lib/SyntheticTouchEvent.js",
        "npm:react@0.13.3/lib/SyntheticDragEvent.js",
        "npm:react@0.13.3/lib/SyntheticKeyboardEvent.js",
        "npm:react@0.13.3/lib/getEventKey.js",
        "npm:react@0.13.3/lib/SyntheticFocusEvent.js",
        "npm:react@0.13.3/lib/SyntheticClipboardEvent.js",
        "npm:react@0.13.3/lib/EventPropagators.js",
        "npm:react@0.13.3/lib/ServerReactRootIndex.js",
        "npm:react@0.13.3/lib/SelectEventPlugin.js",
        "npm:react@0.13.3/lib/shallowEqual.js",
        "npm:react@0.13.3/lib/isTextInputElement.js",
        "npm:react@0.13.3/lib/getActiveElement.js",
        "npm:react@0.13.3/lib/ReactInputSelection.js",
        "npm:react@0.13.3/lib/focusNode.js",
        "npm:react@0.13.3/lib/ReactDOMSelection.js",
        "npm:react@0.13.3/lib/getTextContentAccessor.js",
        "npm:react@0.13.3/lib/getNodeForCharacterOffset.js",
        "npm:react@0.13.3/lib/ReactReconcileTransaction.js",
        "npm:react@0.13.3/lib/ReactInjection.js",
        "npm:react@0.13.3/lib/ReactDOMComponent.js",
        "npm:react@0.13.3/lib/escapeTextContentForBrowser.js",
        "npm:react@0.13.3/lib/ReactMultiChild.js",
        "npm:react@0.13.3/lib/ReactChildReconciler.js",
        "npm:react@0.13.3/lib/flattenChildren.js",
        "npm:react@0.13.3/lib/traverseAllChildren.js",
        "npm:react@0.13.3/lib/ReactMultiChildUpdateTypes.js",
        "npm:react@0.13.3/lib/ReactComponentBrowserEnvironment.js",
        "npm:react@0.13.3/lib/ReactDOMIDOperations.js",
        "npm:react@0.13.3/lib/DOMPropertyOperations.js",
        "npm:react@0.13.3/lib/quoteAttributeValueForBrowser.js",
        "npm:react@0.13.3/lib/DOMChildrenOperations.js",
        "npm:react@0.13.3/lib/setTextContent.js",
        "npm:react@0.13.3/lib/Danger.js",
        "npm:react@0.13.3/lib/getMarkupWrap.js",
        "npm:react@0.13.3/lib/createNodesFromMarkup.js",
        "npm:react@0.13.3/lib/createArrayFromMixed.js",
        "npm:react@0.13.3/lib/toArray.js",
        "npm:react@0.13.3/lib/CSSPropertyOperations.js",
        "npm:react@0.13.3/lib/memoizeStringOnly.js",
        "npm:react@0.13.3/lib/hyphenateStyleName.js",
        "npm:react@0.13.3/lib/hyphenate.js",
        "npm:react@0.13.3/lib/dangerousStyleValue.js",
        "npm:react@0.13.3/lib/CSSProperty.js",
        "npm:react@0.13.3/lib/camelizeStyleName.js",
        "npm:react@0.13.3/lib/camelize.js",
        "npm:react@0.13.3/lib/ReactEventListener.js",
        "npm:react@0.13.3/lib/getUnboundedScrollPosition.js",
        "npm:react@0.13.3/lib/EventListener.js",
        "npm:react@0.13.3/lib/ReactDOMTextComponent.js",
        "npm:react@0.13.3/lib/ReactDOMTextarea.js",
        "npm:react@0.13.3/lib/ReactBrowserComponentMixin.js",
        "npm:react@0.13.3/lib/LinkedValueUtils.js",
        "npm:react@0.13.3/lib/AutoFocusMixin.js",
        "npm:react@0.13.3/lib/ReactDOMSelect.js",
        "npm:react@0.13.3/lib/ReactDOMOption.js",
        "npm:react@0.13.3/lib/ReactDOMInput.js",
        "npm:react@0.13.3/lib/ReactDOMIframe.js",
        "npm:react@0.13.3/lib/LocalEventTrapMixin.js",
        "npm:react@0.13.3/lib/ReactDOMImg.js",
        "npm:react@0.13.3/lib/ReactDOMForm.js",
        "npm:react@0.13.3/lib/ReactDOMButton.js",
        "npm:react@0.13.3/lib/ReactDefaultBatchingStrategy.js",
        "npm:react@0.13.3/lib/MobileSafariClickEventPlugin.js",
        "npm:react@0.13.3/lib/HTMLDOMPropertyConfig.js",
        "npm:react@0.13.3/lib/EnterLeaveEventPlugin.js",
        "npm:react@0.13.3/lib/DefaultEventPluginOrder.js",
        "npm:react@0.13.3/lib/ClientReactRootIndex.js",
        "npm:react@0.13.3/lib/ChangeEventPlugin.js",
        "npm:react@0.13.3/lib/BeforeInputEventPlugin.js",
        "npm:react@0.13.3/lib/SyntheticInputEvent.js",
        "npm:react@0.13.3/lib/SyntheticCompositionEvent.js",
        "npm:react@0.13.3/lib/FallbackCompositionState.js",
        "npm:react@0.13.3/lib/ReactDOM.js",
        "npm:react@0.13.3/lib/mapObject.js",
        "npm:react@0.13.3/lib/ReactChildren.js",
        "npm:systemjs-plugin-babel@0.0.25/babel-helpers/inherits.js",
        "npm:systemjs-plugin-babel@0.0.25/babel-helpers/possibleConstructorReturn.js",
        "npm:systemjs-plugin-babel@0.0.25/babel-helpers/createClass.js",
        "npm:systemjs-plugin-babel@0.0.25/babel-helpers/classCallCheck.js",
        "postcss-css-variables-playground/js/components/PlaygroundHeader.js",
        "npm:object-assign@4.1.1/index.js",
        "npm:object-assign@4.1.1.json",
        "postcss-css-variables-playground/js/stores/PlaygroundStore.js",
        "npm:postcss-css-variables@0.8.0/index.js",
        "npm:postcss-css-variables@0.8.0.json",
        "npm:postcss-css-variables@0.8.0/lib/resolve-decl.js",
        "npm:postcss-css-variables@0.8.0/lib/clone-splice-parent-onto-node-when.js",
        "npm:postcss-css-variables@0.8.0/lib/shallow-clone-node.js",
        "npm:postcss-css-variables@0.8.0/lib/find-node-ancestor-with-selector.js",
        "npm:postcss-css-variables@0.8.0/lib/generate-scope-list.js",
        "npm:postcss-css-variables@0.8.0/lib/generate-descendant-pieces-from-selector.js",
        "npm:postcss-css-variables@0.8.0/lib/is-node-under-scope.js",
        "npm:postcss-css-variables@0.8.0/lib/is-under-scope.js",
        "npm:postcss-css-variables@0.8.0/lib/generate-direct-descendant-pieces-from-selector.js",
        "npm:postcss-css-variables@0.8.0/lib/is-piece-always-ancestor-selector.js",
        "npm:escape-string-regexp@1.0.5/index.js",
        "npm:escape-string-regexp@1.0.5.json",
        "npm:postcss-css-variables@0.8.0/lib/gather-variable-dependencies.js",
        "npm:postcss-css-variables@0.8.0/lib/resolve-value.js",
        "npm:extend@3.0.1/index.js",
        "npm:extend@3.0.1.json",
        "npm:postcss@6.0.8/lib/postcss.js",
        "npm:postcss@6.0.8.json",
        "npm:postcss@6.0.8/lib/root.js",
        "npm:postcss@6.0.8/lib/processor.js",
        "npm:postcss@6.0.8/lib/lazy-result.js",
        "npm:postcss@6.0.8/lib/parse.js",
        "npm:postcss@6.0.8/lib/input.js",
        "npm:jspm-nodelibs-path@0.2.3/path.js",
        "npm:jspm-nodelibs-path@0.2.3.json",
        "npm:postcss@6.0.8/lib/previous-map.js",
        "npm:jspm-nodelibs-buffer@0.2.3/global.js",
        "npm:jspm-nodelibs-buffer@0.2.3.json",
        "npm:buffer@5.0.7/index.js",
        "npm:buffer@5.0.7.json",
        "npm:ieee754@1.1.8/index.js",
        "npm:ieee754@1.1.8.json",
        "npm:base64-js@1.2.1/index.js",
        "npm:base64-js@1.2.1.json",
        "npm:source-map@0.5.6/source-map.js",
        "npm:source-map@0.5.6.json",
        "npm:source-map@0.5.6/lib/source-node.js",
        "npm:source-map@0.5.6/lib/util.js",
        "npm:source-map@0.5.6/lib/source-map-generator.js",
        "npm:source-map@0.5.6/lib/mapping-list.js",
        "npm:source-map@0.5.6/lib/array-set.js",
        "npm:source-map@0.5.6/lib/base64-vlq.js",
        "npm:source-map@0.5.6/lib/base64.js",
        "npm:source-map@0.5.6/lib/source-map-consumer.js",
        "npm:source-map@0.5.6/lib/quick-sort.js",
        "npm:source-map@0.5.6/lib/binary-search.js",
        "npm:postcss@6.0.8/lib/css-syntax-error.js",
        "npm:postcss@6.0.8/lib/terminal-highlight.js",
        "npm:postcss@6.0.8/lib/tokenize.js",
        "npm:chalk@2.1.0/index.js",
        "npm:chalk@2.1.0.json",
        "npm:chalk@2.1.0/templates.js",
        "npm:supports-color@4.2.1/browser.js",
        "npm:supports-color@4.2.1.json",
        "npm:ansi-styles@3.2.0/index.js",
        "npm:ansi-styles@3.2.0.json",
        "npm:color-convert@1.9.0/index.js",
        "npm:color-convert@1.9.0.json",
        "npm:color-convert@1.9.0/route.js",
        "npm:color-convert@1.9.0/conversions.js",
        "npm:color-name@1.1.3/index.js",
        "npm:color-name@1.1.3.json",
        "npm:postcss@6.0.8/lib/parser.js",
        "npm:postcss@6.0.8/lib/rule.js",
        "npm:postcss@6.0.8/lib/list.js",
        "npm:postcss@6.0.8/lib/container.js",
        "npm:postcss@6.0.8/lib/at-rule.js",
        "npm:postcss@6.0.8/lib/node.js",
        "npm:postcss@6.0.8/lib/warn-once.js",
        "npm:postcss@6.0.8/lib/stringify.js",
        "npm:postcss@6.0.8/lib/stringifier.js",
        "npm:postcss@6.0.8/lib/comment.js",
        "npm:postcss@6.0.8/lib/declaration.js",
        "npm:postcss@6.0.8/lib/result.js",
        "npm:postcss@6.0.8/lib/warning.js",
        "npm:postcss@6.0.8/lib/map-generator.js",
        "npm:postcss@6.0.8/lib/vendor.js",
        "npm:jspm-nodelibs-events@0.2.2/events.js",
        "npm:jspm-nodelibs-events@0.2.2.json",
        "postcss-css-variables-playground/js/stores/PlaygroundSettingsStore.js",
        "postcss-css-variables-playground/postcss/playground.css",
        "npm:lodash.throttle@4.1.1/index.js",
        "npm:lodash.throttle@4.1.1.json",
        "npm:classnames@2.2.5/index.js",
        "npm:classnames@2.2.5.json"
      ]
    }
  },
  devConfig: {
    "map": {
      "babel-runtime": "npm:babel-runtime@5.8.38",
      "core-js": "npm:core-js@2.5.0",
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.25",
      "babel-plugin-transform-react-jsx": "npm:babel-plugin-transform-react-jsx@6.24.1"
    },
    "packages": {
      "npm:babel-runtime@5.8.38": {
        "map": {}
      },
      "npm:babel-plugin-transform-react-jsx@6.24.1": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.25.0",
          "babel-helper-builder-react-jsx": "npm:babel-helper-builder-react-jsx@6.24.1",
          "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.18.0"
        }
      },
      "npm:babel-runtime@6.25.0": {
        "map": {
          "core-js": "npm:core-js@2.5.0",
          "regenerator-runtime": "npm:regenerator-runtime@0.10.5"
        }
      },
      "npm:babel-helper-builder-react-jsx@6.24.1": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.25.0",
          "esutils": "npm:esutils@2.0.2",
          "babel-types": "npm:babel-types@6.25.0"
        }
      },
      "npm:babel-types@6.25.0": {
        "map": {
          "esutils": "npm:esutils@2.0.2",
          "babel-runtime": "npm:babel-runtime@6.25.0",
          "to-fast-properties": "npm:to-fast-properties@1.0.3",
          "lodash": "npm:lodash@4.17.4"
        }
      }
    }
  },
  transpiler: "plugin-babel",
  babelOptions: {
    "optional": [
      "runtime"
    ],
    "blacklist": []
  },
  meta: {
    "*.css": {
      "loader": "css.js"
    }
  },
  packages: {
    "postcss-css-variables-playground": {
      "main": "main.js",
      "format": "esm",
      "meta": {
        "*.js": {
          "babelOptions": {
            "plugins": [
              "babel-plugin-transform-react-jsx"
            ]
          }
        }
      }
    }
  },
  map: {
    "babel": "npm:babel-core@5.8.38",
    "MeoMix/jspm-loader-css": "github:MeoMix/jspm-loader-css@master",
    "autoprefixer-core": "npm:autoprefixer-core@5.2.1",
    "babel-core": "npm:babel-core@5.8.38",
    "json": "github:systemjs/plugin-json@0.1.2"
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "assert": "npm:jspm-nodelibs-assert@0.2.1",
    "buffer": "npm:jspm-nodelibs-buffer@0.2.3",
    "child_process": "npm:jspm-nodelibs-child_process@0.2.1",
    "constants": "npm:jspm-nodelibs-constants@0.2.1",
    "crypto": "npm:jspm-nodelibs-crypto@0.2.1",
    "domain": "npm:jspm-nodelibs-domain@0.2.1",
    "fs": "npm:jspm-nodelibs-fs@0.2.1",
    "http": "npm:jspm-nodelibs-http@0.2.0",
    "https": "npm:jspm-nodelibs-https@0.2.2",
    "jspm-loader-css": "github:MeoMix/jspm-loader-css@master",
    "autoprefixer": "npm:autoprefixer@7.1.2",
    "bluebird": "npm:bluebird@3.5.0",
    "classnames": "npm:classnames@2.2.5",
    "events": "npm:jspm-nodelibs-events@0.2.2",
    "flux": "npm:flux@2.1.1",
    "immutable": "npm:immutable@3.8.1",
    "keymirror": "npm:keymirror@0.1.1",
    "localforage": "npm:localforage@1.5.0",
    "lodash.throttle": "npm:lodash.throttle@4.1.1",
    "module": "npm:jspm-nodelibs-module@0.2.1",
    "object-assign": "npm:object-assign@4.1.1",
    "os": "npm:jspm-nodelibs-os@0.2.2",
    "path": "npm:jspm-nodelibs-path@0.2.3",
    "postcss": "npm:postcss@6.0.8",
    "postcss-css-variables": "npm:postcss-css-variables@0.8.0",
    "postcss-inline-comment": "npm:postcss-inline-comment@3.0.0",
    "postcss-mixins": "npm:postcss-mixins@6.0.1",
    "postcss-nested": "npm:postcss-nested@2.1.0",
    "postcss-safe-parser": "npm:postcss-safe-parser@3.0.1",
    "process": "npm:jspm-nodelibs-process@0.2.1",
    "punycode": "npm:jspm-nodelibs-punycode@0.2.1",
    "react": "npm:react@0.13.3",
    "stream": "npm:jspm-nodelibs-stream@0.2.1",
    "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.1",
    "systemjs/plugin-json": "github:systemjs/plugin-json@0.3.0",
    "url": "npm:jspm-nodelibs-url@0.2.1",
    "util": "npm:jspm-nodelibs-util@0.2.2",
    "vm": "npm:jspm-nodelibs-vm@0.2.1",
    "wjbryant/taboverride": "github:wjbryant/taboverride@4.0.3",
    "zlib": "npm:jspm-nodelibs-zlib@0.2.3"
  },
  packages: {
    "github:MeoMix/jspm-loader-css@master": {
      "map": {
        "css-modules-loader-core": "npm:css-modules-loader-core@1.1.0",
        "cssnano": "npm:cssnano@3.10.0"
      }
    },
    "npm:acorn@1.2.2": {
      "map": {}
    },
    "npm:acorn@4.0.13": {
      "map": {}
    },
    "npm:amdefine@1.0.1": {
      "map": {}
    },
    "npm:ansi-styles@3.2.0": {
      "map": {
        "color-convert": "npm:color-convert@1.9.0"
      }
    },
    "npm:array-union@1.0.2": {
      "map": {
        "array-uniq": "npm:array-uniq@1.0.3"
      }
    },
    "npm:asap@2.0.6": {
      "map": {}
    },
    "npm:asn1.js@4.9.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:autoprefixer@7.1.2": {
      "map": {
        "browserslist": "npm:browserslist@2.3.0",
        "caniuse-lite": "npm:caniuse-lite@1.0.30000712",
        "normalize-range": "npm:normalize-range@0.1.2",
        "num2fraction": "npm:num2fraction@1.2.2",
        "postcss": "npm:postcss@6.0.8",
        "postcss-value-parser": "npm:postcss-value-parser@3.3.0"
      }
    },
    "npm:base62@1.2.0": {
      "map": {}
    },
    "npm:bluebird@3.5.0": {
      "map": {}
    },
    "npm:brace-expansion@1.1.8": {
      "map": {
        "balanced-match": "npm:balanced-match@1.0.0",
        "concat-map": "npm:concat-map@0.0.1"
      }
    },
    "npm:browserify-aes@1.0.6": {
      "map": {
        "buffer-xor": "npm:buffer-xor@1.0.3",
        "cipher-base": "npm:cipher-base@1.0.4",
        "create-hash": "npm:create-hash@1.1.3",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "inherits": "npm:inherits@2.0.3",
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:browserify-cipher@1.0.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "browserify-des": "npm:browserify-des@1.0.0",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0"
      }
    },
    "npm:browserify-des@1.0.0": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.4",
        "des.js": "npm:des.js@1.0.0",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "randombytes": "npm:randombytes@2.0.5"
      }
    },
    "npm:browserify-sign@4.0.4": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "create-hash": "npm:create-hash@1.1.3",
        "create-hmac": "npm:create-hmac@1.1.6",
        "elliptic": "npm:elliptic@6.4.0",
        "inherits": "npm:inherits@2.0.3",
        "parse-asn1": "npm:parse-asn1@5.1.0",
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:browserify-zlib@0.1.4": {
      "map": {
        "pako": "npm:pako@0.2.9",
        "readable-stream": "npm:readable-stream@2.3.3"
      }
    },
    "npm:browserslist@2.3.0": {
      "map": {
        "caniuse-lite": "npm:caniuse-lite@1.0.30000712",
        "electron-to-chromium": "npm:electron-to-chromium@1.3.17",
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:buffer-xor@1.0.3": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:buffer@5.0.7": {
      "map": {
        "base64-js": "npm:base64-js@1.2.1",
        "ieee754": "npm:ieee754@1.1.8"
      }
    },
    "npm:chalk@1.1.3": {
      "map": {
        "ansi-styles": "npm:ansi-styles@2.2.1",
        "escape-string-regexp": "npm:escape-string-regexp@1.0.5",
        "has-ansi": "npm:has-ansi@2.0.0",
        "strip-ansi": "npm:strip-ansi@3.0.1",
        "supports-color": "npm:supports-color@2.0.0"
      }
    },
    "npm:chalk@2.1.0": {
      "map": {
        "ansi-styles": "npm:ansi-styles@3.2.0",
        "escape-string-regexp": "npm:escape-string-regexp@1.0.5",
        "supports-color": "npm:supports-color@4.2.1"
      }
    },
    "npm:cipher-base@1.0.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:color-convert@1.9.0": {
      "map": {
        "color-name": "npm:color-name@1.1.3"
      }
    },
    "npm:color-name@1.1.3": {
      "map": {}
    },
    "npm:commander@2.11.0": {
      "map": {}
    },
    "npm:commoner@0.10.8": {
      "map": {
        "commander": "npm:commander@2.11.0",
        "detective": "npm:detective@4.5.0",
        "glob": "npm:glob@5.0.15",
        "graceful-fs": "npm:graceful-fs@4.1.11",
        "iconv-lite": "npm:iconv-lite@0.4.18",
        "mkdirp": "npm:mkdirp@0.5.1",
        "private": "npm:private@0.1.7",
        "q": "npm:q@1.5.0",
        "recast": "npm:recast@0.11.23",
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:core-js@1.2.7": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:core-util-is@1.0.2": {
      "map": {}
    },
    "npm:create-ecdh@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "elliptic": "npm:elliptic@6.4.0"
      }
    },
    "npm:create-hash@1.1.3": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.4",
        "inherits": "npm:inherits@2.0.3",
        "ripemd160": "npm:ripemd160@2.0.1",
        "sha.js": "npm:sha.js@2.4.8"
      }
    },
    "npm:create-hmac@1.1.6": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.4",
        "create-hash": "npm:create-hash@1.1.3",
        "inherits": "npm:inherits@2.0.3",
        "ripemd160": "npm:ripemd160@2.0.1",
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "sha.js": "npm:sha.js@2.4.8"
      }
    },
    "npm:crypto-browserify@3.11.1": {
      "map": {
        "browserify-cipher": "npm:browserify-cipher@1.0.0",
        "browserify-sign": "npm:browserify-sign@4.0.4",
        "create-ecdh": "npm:create-ecdh@4.0.0",
        "create-hash": "npm:create-hash@1.1.3",
        "create-hmac": "npm:create-hmac@1.1.6",
        "diffie-hellman": "npm:diffie-hellman@5.0.2",
        "inherits": "npm:inherits@2.0.3",
        "pbkdf2": "npm:pbkdf2@3.0.13",
        "public-encrypt": "npm:public-encrypt@4.0.0",
        "randombytes": "npm:randombytes@2.0.5"
      }
    },
    "npm:css-modules-loader-core@1.1.0": {
      "map": {
        "icss-replace-symbols": "npm:icss-replace-symbols@1.1.0",
        "postcss": "npm:postcss@6.0.1",
        "postcss-modules-extract-imports": "npm:postcss-modules-extract-imports@1.1.0",
        "postcss-modules-local-by-default": "npm:postcss-modules-local-by-default@1.2.0",
        "postcss-modules-scope": "npm:postcss-modules-scope@1.1.0",
        "postcss-modules-values": "npm:postcss-modules-values@1.3.0"
      }
    },
    "npm:css-selector-tokenizer@0.7.0": {
      "map": {
        "cssesc": "npm:cssesc@0.1.0",
        "fastparse": "npm:fastparse@1.1.1",
        "regexpu-core": "npm:regexpu-core@1.0.0"
      }
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:detective@4.5.0": {
      "map": {
        "acorn": "npm:acorn@4.0.13",
        "defined": "npm:defined@1.0.0"
      }
    },
    "npm:diffie-hellman@5.0.2": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "miller-rabin": "npm:miller-rabin@4.0.0",
        "randombytes": "npm:randombytes@2.0.5",
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:domain-browser@1.1.7": {
      "map": {}
    },
    "npm:elliptic@6.4.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "brorand": "npm:brorand@1.1.0",
        "hash.js": "npm:hash.js@1.1.3",
        "hmac-drbg": "npm:hmac-drbg@1.0.1",
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1",
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:encoding@0.1.12": {
      "map": {
        "iconv-lite": "npm:iconv-lite@0.4.18"
      }
    },
    "npm:envify@3.4.1": {
      "map": {
        "jstransform": "npm:jstransform@11.0.3",
        "through": "npm:through@2.3.8"
      }
    },
    "npm:es3ify@0.1.4": {
      "map": {
        "esprima-fb": "npm:esprima-fb@3001.1.0-dev-harmony-fb",
        "jstransform": "npm:jstransform@3.0.0",
        "through": "npm:through@2.3.8"
      }
    },
    "npm:esprima-fb@15001.1.0-dev-harmony-fb": {
      "map": {}
    },
    "npm:esprima-fb@15001.1001.0-dev-harmony-fb": {
      "map": {}
    },
    "npm:esprima-fb@3001.1.0-dev-harmony-fb": {
      "map": {}
    },
    "npm:esprima@3.1.3": {
      "map": {}
    },
    "npm:evp_bytestokey@1.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.3"
      }
    },
    "npm:falafel@1.2.0": {
      "map": {
        "acorn": "npm:acorn@1.2.2",
        "foreach": "npm:foreach@2.0.5",
        "isarray": "npm:isarray@0.0.1",
        "object-keys": "npm:object-keys@1.0.11"
      }
    },
    "npm:fastparse@1.1.1": {
      "map": {}
    },
    "npm:fbemitter@2.1.1": {
      "map": {
        "fbjs": "npm:fbjs@0.8.14"
      }
    },
    "npm:fbjs@0.1.0-alpha.7": {
      "map": {
        "core-js": "npm:core-js@1.2.7",
        "promise": "npm:promise@7.3.1",
        "whatwg-fetch": "npm:whatwg-fetch@0.9.0"
      }
    },
    "npm:fbjs@0.8.14": {
      "map": {
        "core-js": "npm:core-js@1.2.7",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1",
        "promise": "npm:promise@7.3.1",
        "setimmediate": "npm:setimmediate@1.0.5",
        "ua-parser-js": "npm:ua-parser-js@0.7.14"
      }
    },
    "npm:flatten@1.0.2": {
      "map": {}
    },
    "npm:flux@2.1.1": {
      "map": {
        "fbemitter": "npm:fbemitter@2.1.1",
        "fbjs": "npm:fbjs@0.1.0-alpha.7",
        "immutable": "npm:immutable@3.8.1"
      }
    },
    "npm:fs.realpath@1.0.0": {
      "map": {}
    },
    "npm:glob@5.0.15": {
      "map": {
        "inflight": "npm:inflight@1.0.6",
        "inherits": "npm:inherits@2.0.3",
        "minimatch": "npm:minimatch@3.0.4",
        "once": "npm:once@1.4.0",
        "path-is-absolute": "npm:path-is-absolute@1.0.1"
      }
    },
    "npm:glob@7.1.2": {
      "map": {
        "fs.realpath": "npm:fs.realpath@1.0.0",
        "inflight": "npm:inflight@1.0.6",
        "inherits": "npm:inherits@2.0.3",
        "minimatch": "npm:minimatch@3.0.4",
        "once": "npm:once@1.4.0",
        "path-is-absolute": "npm:path-is-absolute@1.0.1"
      }
    },
    "npm:globby@6.1.0": {
      "map": {
        "array-union": "npm:array-union@1.0.2",
        "glob": "npm:glob@7.1.2",
        "object-assign": "npm:object-assign@4.1.1",
        "pify": "npm:pify@2.3.0",
        "pinkie-promise": "npm:pinkie-promise@2.0.1"
      }
    },
    "npm:graceful-fs@4.1.11": {
      "map": {}
    },
    "npm:has-ansi@2.0.0": {
      "map": {
        "ansi-regex": "npm:ansi-regex@2.1.1"
      }
    },
    "npm:has-flag@1.0.0": {
      "map": {}
    },
    "npm:has-flag@2.0.0": {
      "map": {}
    },
    "npm:hash-base@2.0.2": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:hash.js@1.1.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:hmac-drbg@1.0.1": {
      "map": {
        "hash.js": "npm:hash.js@1.1.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1",
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:iconv-lite@0.4.18": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:immediate@3.0.6": {
      "map": {}
    },
    "npm:inflight@1.0.6": {
      "map": {
        "once": "npm:once@1.4.0",
        "wrappy": "npm:wrappy@1.0.2"
      }
    },
    "npm:inherits@2.0.3": {
      "map": {}
    },
    "npm:inline-process-browser@1.0.0": {
      "map": {
        "falafel": "npm:falafel@1.2.0",
        "through2": "npm:through2@0.6.5"
      }
    },
    "npm:isomorphic-fetch@2.2.1": {
      "map": {
        "node-fetch": "npm:node-fetch@1.7.2",
        "whatwg-fetch": "npm:whatwg-fetch@0.9.0"
      }
    },
    "npm:js-base64@2.1.9": {
      "map": {}
    },
    "npm:jstransform@11.0.3": {
      "map": {
        "base62": "npm:base62@1.2.0",
        "commoner": "npm:commoner@0.10.8",
        "esprima-fb": "npm:esprima-fb@15001.1.0-dev-harmony-fb",
        "object-assign": "npm:object-assign@2.1.1",
        "source-map": "npm:source-map@0.4.4",
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:jstransform@3.0.0": {
      "map": {
        "base62": "npm:base62@0.1.1",
        "esprima-fb": "npm:esprima-fb@3001.1.0-dev-harmony-fb",
        "source-map": "npm:source-map@0.1.31"
      }
    },
    "npm:lie@3.0.2": {
      "map": {
        "es3ify": "npm:es3ify@0.1.4",
        "immediate": "npm:immediate@3.0.6",
        "inline-process-browser": "npm:inline-process-browser@1.0.0",
        "unreachable-branch-transform": "npm:unreachable-branch-transform@0.3.0"
      }
    },
    "npm:localforage@1.5.0": {
      "map": {
        "lie": "npm:lie@3.0.2"
      }
    },
    "npm:lodash.throttle@4.1.1": {
      "map": {}
    },
    "npm:loose-envify@1.3.1": {
      "map": {
        "js-tokens": "npm:js-tokens@3.0.2"
      }
    },
    "npm:miller-rabin@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "brorand": "npm:brorand@1.1.0"
      }
    },
    "npm:minimatch@3.0.4": {
      "map": {
        "brace-expansion": "npm:brace-expansion@1.1.8"
      }
    },
    "npm:mkdirp@0.5.1": {
      "map": {
        "minimist": "npm:minimist@0.0.8"
      }
    },
    "npm:node-fetch@1.7.2": {
      "map": {
        "encoding": "npm:encoding@0.1.12",
        "is-stream": "npm:is-stream@1.1.0"
      }
    },
    "npm:once@1.4.0": {
      "map": {
        "wrappy": "npm:wrappy@1.0.2"
      }
    },
    "npm:pako@0.2.9": {
      "map": {}
    },
    "npm:parse-asn1@5.1.0": {
      "map": {
        "asn1.js": "npm:asn1.js@4.9.1",
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "create-hash": "npm:create-hash@1.1.3",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "pbkdf2": "npm:pbkdf2@3.0.13",
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:path-is-absolute@1.0.1": {
      "map": {}
    },
    "npm:pbkdf2@3.0.13": {
      "map": {
        "create-hash": "npm:create-hash@1.1.3",
        "create-hmac": "npm:create-hmac@1.1.6",
        "ripemd160": "npm:ripemd160@2.0.1",
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "sha.js": "npm:sha.js@2.4.8"
      }
    },
    "npm:pify@2.3.0": {
      "map": {}
    },
    "npm:pinkie-promise@2.0.1": {
      "map": {
        "pinkie": "npm:pinkie@2.0.4"
      }
    },
    "npm:postcss-css-variables@0.8.0": {
      "map": {
        "escape-string-regexp": "npm:escape-string-regexp@1.0.5",
        "extend": "npm:extend@3.0.1",
        "postcss": "npm:postcss@6.0.8"
      }
    },
    "npm:postcss-inline-comment@3.0.0": {
      "map": {
        "postcss": "npm:postcss@5.2.17"
      }
    },
    "npm:postcss-js@1.0.0": {
      "map": {
        "camelcase-css": "npm:camelcase-css@1.0.1",
        "postcss": "npm:postcss@6.0.8"
      }
    },
    "npm:postcss-mixins@6.0.1": {
      "map": {
        "globby": "npm:globby@6.1.0",
        "postcss": "npm:postcss@6.0.8",
        "postcss-js": "npm:postcss-js@1.0.0",
        "postcss-simple-vars": "npm:postcss-simple-vars@4.0.0",
        "sugarss": "npm:sugarss@1.0.0"
      }
    },
    "npm:postcss-modules-extract-imports@1.1.0": {
      "map": {
        "postcss": "npm:postcss@6.0.1"
      }
    },
    "npm:postcss-modules-local-by-default@1.2.0": {
      "map": {
        "css-selector-tokenizer": "npm:css-selector-tokenizer@0.7.0",
        "postcss": "npm:postcss@6.0.1"
      }
    },
    "npm:postcss-modules-scope@1.1.0": {
      "map": {
        "css-selector-tokenizer": "npm:css-selector-tokenizer@0.7.0",
        "postcss": "npm:postcss@6.0.1"
      }
    },
    "npm:postcss-modules-values@1.3.0": {
      "map": {
        "icss-replace-symbols": "npm:icss-replace-symbols@1.1.0",
        "postcss": "npm:postcss@6.0.1"
      }
    },
    "npm:postcss-nested@2.1.0": {
      "map": {
        "postcss": "npm:postcss@6.0.8",
        "postcss-selector-parser": "npm:postcss-selector-parser@2.2.3"
      }
    },
    "npm:postcss-safe-parser@3.0.1": {
      "map": {
        "postcss": "npm:postcss@6.0.8"
      }
    },
    "npm:postcss-selector-parser@2.2.3": {
      "map": {
        "flatten": "npm:flatten@1.0.2",
        "indexes-of": "npm:indexes-of@1.0.1",
        "uniq": "npm:uniq@1.0.1"
      }
    },
    "npm:postcss-simple-vars@4.0.0": {
      "map": {
        "postcss": "npm:postcss@6.0.8"
      }
    },
    "npm:postcss@5.2.17": {
      "map": {
        "chalk": "npm:chalk@1.1.3",
        "js-base64": "npm:js-base64@2.1.9",
        "source-map": "npm:source-map@0.5.6",
        "supports-color": "npm:supports-color@3.2.3"
      }
    },
    "npm:postcss@6.0.1": {
      "map": {
        "chalk": "npm:chalk@1.1.3",
        "source-map": "npm:source-map@0.5.6",
        "supports-color": "npm:supports-color@3.2.3"
      }
    },
    "npm:postcss@6.0.8": {
      "map": {
        "chalk": "npm:chalk@2.1.0",
        "source-map": "npm:source-map@0.5.6",
        "supports-color": "npm:supports-color@4.2.1"
      }
    },
    "npm:process-nextick-args@1.0.7": {
      "map": {}
    },
    "npm:promise@7.3.1": {
      "map": {
        "asap": "npm:asap@2.0.6"
      }
    },
    "npm:public-encrypt@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "create-hash": "npm:create-hash@1.1.3",
        "parse-asn1": "npm:parse-asn1@5.1.0",
        "randombytes": "npm:randombytes@2.0.5"
      }
    },
    "npm:punycode@1.3.2": {
      "map": {}
    },
    "npm:q@1.5.0": {
      "map": {}
    },
    "npm:randombytes@2.0.5": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:react@0.13.3": {
      "map": {
        "envify": "npm:envify@3.4.1"
      }
    },
    "npm:readable-stream@1.0.34": {
      "map": {
        "core-util-is": "npm:core-util-is@1.0.2",
        "inherits": "npm:inherits@2.0.3",
        "isarray": "npm:isarray@0.0.1",
        "stream-browserify": "npm:stream-browserify@1.0.0",
        "string_decoder": "npm:string_decoder@0.10.31"
      }
    },
    "npm:readable-stream@2.3.3": {
      "map": {
        "core-util-is": "npm:core-util-is@1.0.2",
        "inherits": "npm:inherits@2.0.3",
        "isarray": "npm:isarray@1.0.0",
        "process-nextick-args": "npm:process-nextick-args@1.0.7",
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "string_decoder": "npm:string_decoder@1.0.3",
        "util-deprecate": "npm:util-deprecate@1.0.2"
      }
    },
    "npm:recast@0.10.43": {
      "map": {
        "ast-types": "npm:ast-types@0.8.15",
        "esprima-fb": "npm:esprima-fb@15001.1001.0-dev-harmony-fb",
        "private": "npm:private@0.1.7",
        "source-map": "npm:source-map@0.5.6"
      }
    },
    "npm:recast@0.11.23": {
      "map": {
        "ast-types": "npm:ast-types@0.9.6",
        "esprima": "npm:esprima@3.1.3",
        "private": "npm:private@0.1.7",
        "source-map": "npm:source-map@0.5.6"
      }
    },
    "npm:regexpu-core@1.0.0": {
      "map": {
        "regenerate": "npm:regenerate@1.3.2",
        "regjsgen": "npm:regjsgen@0.2.0",
        "regjsparser": "npm:regjsparser@0.1.5",
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:regjsparser@0.1.5": {
      "map": {
        "jsesc": "npm:jsesc@0.5.0"
      }
    },
    "npm:ripemd160@2.0.1": {
      "map": {
        "hash-base": "npm:hash-base@2.0.2",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:safe-buffer@5.1.1": {
      "map": {}
    },
    "npm:setimmediate@1.0.5": {
      "map": {}
    },
    "npm:sha.js@2.4.8": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:source-map@0.1.31": {
      "map": {
        "amdefine": "npm:amdefine@1.0.1"
      }
    },
    "npm:source-map@0.4.4": {
      "map": {
        "amdefine": "npm:amdefine@1.0.1"
      }
    },
    "npm:source-map@0.5.6": {
      "map": {}
    },
    "npm:stream-browserify@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@1.0.34"
      }
    },
    "npm:string_decoder@0.10.31": {
      "map": {}
    },
    "npm:string_decoder@1.0.3": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:strip-ansi@3.0.1": {
      "map": {
        "ansi-regex": "npm:ansi-regex@2.1.1"
      }
    },
    "npm:sugarss@1.0.0": {
      "map": {
        "postcss": "npm:postcss@6.0.8"
      }
    },
    "npm:supports-color@2.0.0": {
      "map": {}
    },
    "npm:supports-color@3.2.3": {
      "map": {
        "has-flag": "npm:has-flag@1.0.0"
      }
    },
    "npm:supports-color@4.2.1": {
      "map": {
        "has-flag": "npm:has-flag@2.0.0"
      }
    },
    "npm:through2@0.6.5": {
      "map": {
        "readable-stream": "npm:readable-stream@1.0.34",
        "xtend": "npm:xtend@4.0.1"
      }
    },
    "npm:through@2.3.8": {
      "map": {}
    },
    "npm:ua-parser-js@0.7.14": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:unreachable-branch-transform@0.3.0": {
      "map": {
        "esmangle-evaluator": "npm:esmangle-evaluator@1.0.1",
        "recast": "npm:recast@0.10.43",
        "through2": "npm:through2@0.6.5"
      }
    },
    "npm:util-deprecate@1.0.2": {
      "map": {}
    },
    "npm:cssnano@3.10.0": {
      "map": {
        "autoprefixer": "npm:autoprefixer@6.7.7",
        "defined": "npm:defined@1.0.0",
        "object-assign": "npm:object-assign@4.1.1",
        "postcss": "npm:postcss@5.2.17",
        "postcss-value-parser": "npm:postcss-value-parser@3.3.0",
        "decamelize": "npm:decamelize@1.2.0",
        "postcss-discard-overridden": "npm:postcss-discard-overridden@0.1.1",
        "has": "npm:has@1.0.1",
        "postcss-discard-empty": "npm:postcss-discard-empty@2.1.0",
        "postcss-minify-gradients": "npm:postcss-minify-gradients@1.0.5",
        "postcss-unique-selectors": "npm:postcss-unique-selectors@2.0.2",
        "postcss-reduce-transforms": "npm:postcss-reduce-transforms@1.0.4",
        "postcss-merge-idents": "npm:postcss-merge-idents@2.1.7",
        "postcss-zindex": "npm:postcss-zindex@2.2.0",
        "postcss-discard-unused": "npm:postcss-discard-unused@2.2.3",
        "postcss-discard-comments": "npm:postcss-discard-comments@2.0.4",
        "postcss-svgo": "npm:postcss-svgo@2.1.6",
        "postcss-merge-rules": "npm:postcss-merge-rules@2.1.2",
        "postcss-merge-longhand": "npm:postcss-merge-longhand@2.0.2",
        "postcss-filter-plugins": "npm:postcss-filter-plugins@2.0.2",
        "postcss-reduce-initial": "npm:postcss-reduce-initial@1.0.1",
        "postcss-calc": "npm:postcss-calc@5.3.1",
        "postcss-colormin": "npm:postcss-colormin@2.2.2",
        "postcss-minify-font-values": "npm:postcss-minify-font-values@1.0.5",
        "postcss-minify-params": "npm:postcss-minify-params@1.2.2",
        "postcss-convert-values": "npm:postcss-convert-values@2.6.1",
        "postcss-discard-duplicates": "npm:postcss-discard-duplicates@2.1.0",
        "postcss-normalize-charset": "npm:postcss-normalize-charset@1.1.1",
        "postcss-reduce-idents": "npm:postcss-reduce-idents@2.4.0",
        "postcss-normalize-url": "npm:postcss-normalize-url@3.0.8",
        "postcss-minify-selectors": "npm:postcss-minify-selectors@2.1.1",
        "postcss-ordered-values": "npm:postcss-ordered-values@2.2.3"
      }
    },
    "npm:autoprefixer@6.7.7": {
      "map": {
        "browserslist": "npm:browserslist@1.7.7",
        "normalize-range": "npm:normalize-range@0.1.2",
        "num2fraction": "npm:num2fraction@1.2.2",
        "postcss": "npm:postcss@5.2.17",
        "postcss-value-parser": "npm:postcss-value-parser@3.3.0",
        "caniuse-db": "npm:caniuse-db@1.0.30000712"
      }
    },
    "npm:browserslist@1.7.7": {
      "map": {
        "electron-to-chromium": "npm:electron-to-chromium@1.3.17",
        "caniuse-db": "npm:caniuse-db@1.0.30000712"
      }
    },
    "npm:postcss-discard-overridden@0.1.1": {
      "map": {
        "postcss": "npm:postcss@5.2.17"
      }
    },
    "npm:postcss-discard-empty@2.1.0": {
      "map": {
        "postcss": "npm:postcss@5.2.17"
      }
    },
    "npm:postcss-unique-selectors@2.0.2": {
      "map": {
        "postcss": "npm:postcss@5.2.17",
        "alphanum-sort": "npm:alphanum-sort@1.0.2",
        "uniqs": "npm:uniqs@2.0.0"
      }
    },
    "npm:postcss-minify-gradients@1.0.5": {
      "map": {
        "postcss": "npm:postcss@5.2.17",
        "postcss-value-parser": "npm:postcss-value-parser@3.3.0"
      }
    },
    "npm:postcss-reduce-transforms@1.0.4": {
      "map": {
        "postcss": "npm:postcss@5.2.17",
        "postcss-value-parser": "npm:postcss-value-parser@3.3.0",
        "has": "npm:has@1.0.1"
      }
    },
    "npm:postcss-zindex@2.2.0": {
      "map": {
        "postcss": "npm:postcss@5.2.17",
        "has": "npm:has@1.0.1",
        "uniqs": "npm:uniqs@2.0.0"
      }
    },
    "npm:postcss-discard-unused@2.2.3": {
      "map": {
        "postcss": "npm:postcss@5.2.17",
        "uniqs": "npm:uniqs@2.0.0"
      }
    },
    "npm:postcss-merge-idents@2.1.7": {
      "map": {
        "postcss": "npm:postcss@5.2.17",
        "postcss-value-parser": "npm:postcss-value-parser@3.3.0",
        "has": "npm:has@1.0.1"
      }
    },
    "npm:postcss-discard-comments@2.0.4": {
      "map": {
        "postcss": "npm:postcss@5.2.17"
      }
    },
    "npm:postcss-svgo@2.1.6": {
      "map": {
        "postcss": "npm:postcss@5.2.17",
        "postcss-value-parser": "npm:postcss-value-parser@3.3.0",
        "is-svg": "npm:is-svg@2.1.0",
        "svgo": "npm:svgo@0.7.2"
      }
    },
    "npm:postcss-merge-rules@2.1.2": {
      "map": {
        "postcss": "npm:postcss@5.2.17",
        "postcss-selector-parser": "npm:postcss-selector-parser@2.2.3",
        "browserslist": "npm:browserslist@1.7.7",
        "vendors": "npm:vendors@1.0.1",
        "caniuse-api": "npm:caniuse-api@1.6.1"
      }
    },
    "npm:postcss-merge-longhand@2.0.2": {
      "map": {
        "postcss": "npm:postcss@5.2.17"
      }
    },
    "npm:postcss-filter-plugins@2.0.2": {
      "map": {
        "postcss": "npm:postcss@5.2.17",
        "uniqid": "npm:uniqid@4.1.1"
      }
    },
    "npm:postcss-reduce-initial@1.0.1": {
      "map": {
        "postcss": "npm:postcss@5.2.17"
      }
    },
    "npm:postcss-calc@5.3.1": {
      "map": {
        "postcss": "npm:postcss@5.2.17",
        "postcss-message-helpers": "npm:postcss-message-helpers@2.0.0",
        "reduce-css-calc": "npm:reduce-css-calc@1.3.0"
      }
    },
    "npm:postcss-colormin@2.2.2": {
      "map": {
        "postcss": "npm:postcss@5.2.17",
        "postcss-value-parser": "npm:postcss-value-parser@3.3.0",
        "colormin": "npm:colormin@1.1.2"
      }
    },
    "npm:jspm-nodelibs-domain@0.2.1": {
      "map": {
        "domain-browser": "npm:domain-browser@1.1.7"
      }
    },
    "npm:postcss-minify-font-values@1.0.5": {
      "map": {
        "object-assign": "npm:object-assign@4.1.1",
        "postcss": "npm:postcss@5.2.17",
        "postcss-value-parser": "npm:postcss-value-parser@3.3.0"
      }
    },
    "npm:postcss-minify-params@1.2.2": {
      "map": {
        "postcss": "npm:postcss@5.2.17",
        "postcss-value-parser": "npm:postcss-value-parser@3.3.0",
        "alphanum-sort": "npm:alphanum-sort@1.0.2",
        "uniqs": "npm:uniqs@2.0.0"
      }
    },
    "npm:postcss-convert-values@2.6.1": {
      "map": {
        "postcss": "npm:postcss@5.2.17",
        "postcss-value-parser": "npm:postcss-value-parser@3.3.0"
      }
    },
    "npm:postcss-discard-duplicates@2.1.0": {
      "map": {
        "postcss": "npm:postcss@5.2.17"
      }
    },
    "npm:has@1.0.1": {
      "map": {
        "function-bind": "npm:function-bind@1.1.0"
      }
    },
    "npm:jspm-nodelibs-stream@0.2.1": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "npm:caniuse-api@1.6.1": {
      "map": {
        "browserslist": "npm:browserslist@1.7.7",
        "caniuse-db": "npm:caniuse-db@1.0.30000712",
        "lodash.uniq": "npm:lodash.uniq@4.5.0",
        "lodash.memoize": "npm:lodash.memoize@4.1.2"
      }
    },
    "npm:reduce-css-calc@1.3.0": {
      "map": {
        "balanced-match": "npm:balanced-match@0.4.2",
        "reduce-function-call": "npm:reduce-function-call@1.0.2",
        "math-expression-evaluator": "npm:math-expression-evaluator@1.2.17"
      }
    },
    "npm:colormin@1.1.2": {
      "map": {
        "has": "npm:has@1.0.1",
        "color": "npm:color@0.11.4",
        "css-color-names": "npm:css-color-names@0.0.4"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@2.3.3"
      }
    },
    "npm:svgo@0.7.2": {
      "map": {
        "mkdirp": "npm:mkdirp@0.5.1",
        "whet.extend": "npm:whet.extend@0.9.9",
        "colors": "npm:colors@1.1.2",
        "coa": "npm:coa@1.0.4",
        "sax": "npm:sax@1.2.4",
        "csso": "npm:csso@2.3.2",
        "js-yaml": "npm:js-yaml@3.7.0"
      }
    },
    "npm:is-svg@2.1.0": {
      "map": {
        "html-comment-regex": "npm:html-comment-regex@1.1.1"
      }
    },
    "npm:uniqid@4.1.1": {
      "map": {
        "macaddress": "npm:macaddress@0.2.8"
      }
    },
    "npm:reduce-function-call@1.0.2": {
      "map": {
        "balanced-match": "npm:balanced-match@0.4.2"
      }
    },
    "npm:color@0.11.4": {
      "map": {
        "color-convert": "npm:color-convert@1.9.0",
        "color-string": "npm:color-string@0.3.0",
        "clone": "npm:clone@1.0.2"
      }
    },
    "npm:coa@1.0.4": {
      "map": {
        "q": "npm:q@1.5.0"
      }
    },
    "npm:jspm-nodelibs-os@0.2.2": {
      "map": {
        "os-browserify": "npm:os-browserify@0.3.0"
      }
    },
    "npm:js-yaml@3.7.0": {
      "map": {
        "esprima": "npm:esprima@2.7.3",
        "argparse": "npm:argparse@1.0.9"
      }
    },
    "npm:csso@2.3.2": {
      "map": {
        "source-map": "npm:source-map@0.5.6",
        "clap": "npm:clap@1.2.0"
      }
    },
    "npm:postcss-normalize-charset@1.1.1": {
      "map": {
        "postcss": "npm:postcss@5.2.17"
      }
    },
    "npm:postcss-normalize-url@3.0.8": {
      "map": {
        "postcss": "npm:postcss@5.2.17",
        "postcss-value-parser": "npm:postcss-value-parser@3.3.0",
        "is-absolute-url": "npm:is-absolute-url@2.1.0",
        "normalize-url": "npm:normalize-url@1.9.1"
      }
    },
    "npm:postcss-reduce-idents@2.4.0": {
      "map": {
        "postcss": "npm:postcss@5.2.17",
        "postcss-value-parser": "npm:postcss-value-parser@3.3.0"
      }
    },
    "npm:postcss-minify-selectors@2.1.1": {
      "map": {
        "postcss": "npm:postcss@5.2.17",
        "postcss-selector-parser": "npm:postcss-selector-parser@2.2.3",
        "alphanum-sort": "npm:alphanum-sort@1.0.2",
        "has": "npm:has@1.0.1"
      }
    },
    "npm:postcss-ordered-values@2.2.3": {
      "map": {
        "postcss": "npm:postcss@5.2.17",
        "postcss-value-parser": "npm:postcss-value-parser@3.3.0"
      }
    },
    "npm:color-string@0.3.0": {
      "map": {
        "color-name": "npm:color-name@1.1.3"
      }
    },
    "npm:clap@1.2.0": {
      "map": {
        "chalk": "npm:chalk@1.1.3"
      }
    },
    "npm:normalize-url@1.9.1": {
      "map": {
        "object-assign": "npm:object-assign@4.1.1",
        "prepend-http": "npm:prepend-http@1.0.4",
        "sort-keys": "npm:sort-keys@1.1.2",
        "query-string": "npm:query-string@4.3.4"
      }
    },
    "npm:argparse@1.0.9": {
      "map": {
        "sprintf-js": "npm:sprintf-js@1.0.3"
      }
    },
    "npm:query-string@4.3.4": {
      "map": {
        "object-assign": "npm:object-assign@4.1.1",
        "strict-uri-encode": "npm:strict-uri-encode@1.1.0"
      }
    },
    "npm:jspm-nodelibs-buffer@0.2.3": {
      "map": {
        "buffer": "npm:buffer@5.0.7"
      }
    },
    "npm:sort-keys@1.1.2": {
      "map": {
        "is-plain-obj": "npm:is-plain-obj@1.1.0"
      }
    },
    "npm:jspm-nodelibs-string_decoder@0.2.1": {
      "map": {
        "string_decoder": "npm:string_decoder@0.10.31"
      }
    },
    "npm:jspm-nodelibs-punycode@0.2.1": {
      "map": {
        "punycode": "npm:punycode@1.3.2"
      }
    },
    "npm:jspm-nodelibs-zlib@0.2.3": {
      "map": {
        "browserify-zlib": "npm:browserify-zlib@0.1.4"
      }
    },
    "npm:jspm-nodelibs-url@0.2.1": {
      "map": {
        "url": "npm:url@0.11.0"
      }
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    },
    "npm:jspm-nodelibs-http@0.2.0": {
      "map": {
        "http-browserify": "npm:stream-http@2.7.2"
      }
    },
    "npm:stream-http@2.7.2": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@2.3.3",
        "xtend": "npm:xtend@4.0.1",
        "builtin-status-codes": "npm:builtin-status-codes@3.0.0",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1"
      }
    },
    "npm:jspm-nodelibs-crypto@0.2.1": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.11.1"
      }
    }
  }
});
