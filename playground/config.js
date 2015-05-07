System.config({
  "baseURL": "/random/postcss-test1/node_modules/postcss-css-variables/playground/",
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime"
    ]
  },
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  },
  "bundles": {
    "build": [
      "npm:process@0.10.1/browser",
      "npm:react@0.13.2/lib/PooledClass",
      "npm:react@0.13.2/lib/Object.assign",
      "npm:react@0.13.2/lib/emptyObject",
      "npm:react@0.13.2/lib/emptyFunction",
      "npm:react@0.13.2/lib/ReactCurrentOwner",
      "npm:react@0.13.2/lib/ReactRootIndex",
      "npm:react@0.13.2/lib/getIteratorFn",
      "npm:react@0.13.2/lib/ReactLifeCycle",
      "npm:react@0.13.2/lib/ReactInstanceMap",
      "npm:react@0.13.2/lib/CallbackQueue",
      "npm:react@0.13.2/lib/ReactPerf",
      "npm:react@0.13.2/lib/ReactOwner",
      "npm:react@0.13.2/lib/ReactPropTypeLocations",
      "npm:react@0.13.2/lib/ReactPropTypeLocationNames",
      "npm:react@0.13.2/lib/ReactNativeComponent",
      "npm:react@0.13.2/lib/Transaction",
      "npm:react@0.13.2/lib/ReactErrorUtils",
      "npm:react@0.13.2/lib/keyOf",
      "npm:react@0.13.2/lib/mapObject",
      "npm:react@0.13.2/lib/DOMProperty",
      "npm:react@0.13.2/lib/escapeTextContentForBrowser",
      "npm:react@0.13.2/lib/CSSProperty",
      "npm:react@0.13.2/lib/ExecutionEnvironment",
      "npm:react@0.13.2/lib/camelize",
      "npm:react@0.13.2/lib/dangerousStyleValue",
      "npm:react@0.13.2/lib/hyphenate",
      "npm:react@0.13.2/lib/memoizeStringOnly",
      "npm:react@0.13.2/lib/toArray",
      "npm:react@0.13.2/lib/getMarkupWrap",
      "npm:react@0.13.2/lib/ReactMultiChildUpdateTypes",
      "npm:react@0.13.2/lib/setInnerHTML",
      "npm:react@0.13.2/lib/EventPluginRegistry",
      "npm:react@0.13.2/lib/accumulateInto",
      "npm:react@0.13.2/lib/forEachAccumulated",
      "npm:react@0.13.2/lib/ReactEventEmitterMixin",
      "npm:react@0.13.2/lib/ViewportMetrics",
      "npm:react@0.13.2/lib/isEventSupported",
      "npm:react@0.13.2/lib/ReactEmptyComponent",
      "npm:react@0.13.2/lib/adler32",
      "npm:react@0.13.2/lib/isNode",
      "npm:react@0.13.2/lib/getReactRootElementInContainer",
      "npm:react@0.13.2/lib/ReactComponentEnvironment",
      "npm:react@0.13.2/lib/shouldUpdateReactComponent",
      "npm:react@0.13.2/lib/flattenChildren",
      "npm:react@0.13.2/lib/EventPropagators",
      "npm:react@0.13.2/lib/getTextContentAccessor",
      "npm:react@0.13.2/lib/getEventTarget",
      "npm:react@0.13.2/lib/SyntheticInputEvent",
      "npm:react@0.13.2/lib/isTextInputElement",
      "npm:react@0.13.2/lib/ClientReactRootIndex",
      "npm:react@0.13.2/lib/DefaultEventPluginOrder",
      "npm:react@0.13.2/lib/SyntheticUIEvent",
      "npm:react@0.13.2/lib/getEventModifierState",
      "npm:react@0.13.2/lib/HTMLDOMPropertyConfig",
      "npm:react@0.13.2/lib/MobileSafariClickEventPlugin",
      "npm:react@0.13.2/lib/findDOMNode",
      "npm:react@0.13.2/lib/ReactDefaultBatchingStrategy",
      "npm:react@0.13.2/lib/focusNode",
      "npm:react@0.13.2/lib/LocalEventTrapMixin",
      "npm:react@0.13.2/lib/ReactDOMImg",
      "npm:react@0.13.2/lib/ReactDOMIframe",
      "npm:react@0.13.2/lib/ReactPropTypes",
      "npm:react@0.13.2/lib/ReactDOMOption",
      "npm:react@0.13.2/lib/ReactDOMSelect",
      "npm:react@0.13.2/lib/ReactDOMTextarea",
      "npm:react@0.13.2/lib/EventListener",
      "npm:react@0.13.2/lib/getUnboundedScrollPosition",
      "npm:react@0.13.2/lib/ReactInjection",
      "npm:react@0.13.2/lib/getNodeForCharacterOffset",
      "npm:react@0.13.2/lib/getActiveElement",
      "npm:react@0.13.2/lib/ReactPutListenerQueue",
      "npm:react@0.13.2/lib/shallowEqual",
      "npm:react@0.13.2/lib/ServerReactRootIndex",
      "npm:react@0.13.2/lib/SyntheticClipboardEvent",
      "npm:react@0.13.2/lib/SyntheticFocusEvent",
      "npm:react@0.13.2/lib/getEventCharCode",
      "npm:react@0.13.2/lib/getEventKey",
      "npm:react@0.13.2/lib/SyntheticDragEvent",
      "npm:react@0.13.2/lib/SyntheticTouchEvent",
      "npm:react@0.13.2/lib/SyntheticWheelEvent",
      "npm:react@0.13.2/lib/SVGDOMPropertyConfig",
      "npm:react@0.13.2/lib/createFullPageComponent",
      "npm:react@0.13.2/lib/ReactDefaultPerfAnalysis",
      "npm:react@0.13.2/lib/performance",
      "npm:react@0.13.2/lib/ReactServerRenderingTransaction",
      "npm:react@0.13.2/lib/onlyChild",
      "npm:core-js@0.9.6/library/modules/$.fw",
      "npm:core-js@0.9.6/library/modules/$.def",
      "npm:core-js@0.9.6/library/fn/object/define-property",
      "npm:babel-runtime@5.2.6/helpers/class-call-check",
      "npm:object-assign@2.0.0/index",
      "npm:classnames@1.2.2/index",
      "build/css/playground.css!github:systemjs/plugin-css@0.1.10",
      "npm:flux@2.0.3/lib/invariant",
      "npm:keymirror@0.1.1/index",
      "npm:immutable@3.7.2/dist/immutable",
      "npm:events@1.0.2/events",
      "npm:asap@1.0.0/asap",
      "npm:localforage@1.2.2/src/drivers/indexeddb",
      "npm:localforage@1.2.2/src/utils/serializer",
      "npm:localforage@1.2.2/src/drivers/websql",
      "npm:bluebird@2.9.25/js/browser/bluebird",
      "build/js/lib/deferred-promise",
      "npm:postcss@4.1.9/lib/warn-once",
      "npm:base64-js@0.0.8/lib/b64",
      "npm:ieee754@1.1.5/index",
      "npm:is-array@1.0.1/index",
      "npm:path-browserify@0.0.0/index",
      "npm:source-map@0.4.2/lib/source-map/base64",
      "npm:source-map@0.4.2/lib/source-map/util",
      "npm:source-map@0.4.2/lib/source-map/array-set",
      "npm:source-map@0.4.2/lib/source-map/mapping-list",
      "npm:source-map@0.4.2/lib/source-map/binary-search",
      "npm:source-map@0.4.2/lib/source-map/source-node",
      "npm:postcss@4.1.9/lib/warning",
      "npm:postcss@4.1.9/lib/tokenize",
      "npm:postcss@4.1.9/lib/comment",
      "npm:postcss@4.1.9/lib/list",
      "npm:postcss@4.1.9/lib/root",
      "github:jspm/nodelibs-fs@0.1.2/index",
      "npm:es6-promise@2.1.1/dist/es6-promise",
      "npm:postcss@4.1.9/package.json!github:systemjs/plugin-json@0.1.0",
      "npm:postcss@4.1.9/lib/vendor",
      "npm:extend@2.0.1/index",
      "build/js/actions/PlaygroundActions",
      "build/js/components/PlaygroundHeader",
      "github:wjbryant/taboverride@4.0.2/build/output/taboverride.min",
      "npm:process@0.10.1",
      "npm:react@0.13.2/lib/warning",
      "npm:react@0.13.2/lib/ReactInstanceHandles",
      "npm:react@0.13.2/lib/ReactRef",
      "npm:react@0.13.2/lib/ReactElementValidator",
      "npm:react@0.13.2/lib/ReactClass",
      "npm:react@0.13.2/lib/ReactDOM",
      "npm:react@0.13.2/lib/quoteAttributeValueForBrowser",
      "npm:react@0.13.2/lib/camelizeStyleName",
      "npm:react@0.13.2/lib/hyphenateStyleName",
      "npm:react@0.13.2/lib/createArrayFromMixed",
      "npm:react@0.13.2/lib/setTextContent",
      "npm:react@0.13.2/lib/EventPluginHub",
      "npm:react@0.13.2/lib/ReactMarkupChecksum",
      "npm:react@0.13.2/lib/isTextNode",
      "npm:react@0.13.2/lib/ReactCompositeComponent",
      "npm:react@0.13.2/lib/ReactChildReconciler",
      "npm:react@0.13.2/lib/FallbackCompositionState",
      "npm:react@0.13.2/lib/SyntheticEvent",
      "npm:react@0.13.2/lib/ChangeEventPlugin",
      "npm:react@0.13.2/lib/SyntheticMouseEvent",
      "npm:react@0.13.2/lib/ReactBrowserComponentMixin",
      "npm:react@0.13.2/lib/AutoFocusMixin",
      "npm:react@0.13.2/lib/ReactDOMForm",
      "npm:react@0.13.2/lib/LinkedValueUtils",
      "npm:react@0.13.2/lib/ReactEventListener",
      "npm:react@0.13.2/lib/ReactDOMSelection",
      "npm:react@0.13.2/lib/SelectEventPlugin",
      "npm:react@0.13.2/lib/SyntheticKeyboardEvent",
      "npm:react@0.13.2/lib/performanceNow",
      "npm:react@0.13.2/lib/ReactServerRendering",
      "npm:core-js@0.9.6/library/modules/$",
      "npm:core-js@0.9.6/library/modules/es6.object.statics-accept-primitives",
      "npm:babel-runtime@5.2.6/core-js/object/define-property",
      "npm:object-assign@2.0.0",
      "npm:classnames@1.2.2",
      "npm:flux@2.0.3/lib/Dispatcher",
      "npm:keymirror@0.1.1",
      "npm:immutable@3.7.2",
      "npm:events@1.0.2",
      "npm:asap@1.0.0",
      "npm:localforage@1.2.2/src/drivers/localstorage",
      "npm:bluebird@2.9.25",
      "npm:postcss@4.1.9/lib/css-syntax-error",
      "npm:base64-js@0.0.8",
      "npm:ieee754@1.1.5",
      "npm:is-array@1.0.1",
      "npm:path-browserify@0.0.0",
      "npm:source-map@0.4.2/lib/source-map/base64-vlq",
      "npm:source-map@0.4.2/lib/source-map/source-map-consumer",
      "npm:postcss@4.1.9/lib/result",
      "npm:postcss@4.1.9/lib/rule",
      "github:jspm/nodelibs-fs@0.1.2",
      "npm:es6-promise@2.1.1",
      "npm:extend@2.0.1",
      "github:wjbryant/taboverride@4.0.2",
      "github:jspm/nodelibs-process@0.1.1/index",
      "npm:react@0.13.2/lib/ReactContext",
      "npm:react@0.13.2/lib/traverseAllChildren",
      "npm:react@0.13.2/lib/ReactReconciler",
      "npm:react@0.13.2/lib/DOMPropertyOperations",
      "npm:react@0.13.2/lib/CSSPropertyOperations",
      "npm:react@0.13.2/lib/createNodesFromMarkup",
      "npm:react@0.13.2/lib/ReactBrowserEventEmitter",
      "npm:react@0.13.2/lib/containsNode",
      "npm:react@0.13.2/lib/instantiateReactComponent",
      "npm:react@0.13.2/lib/ReactMultiChild",
      "npm:react@0.13.2/lib/SyntheticCompositionEvent",
      "npm:react@0.13.2/lib/EnterLeaveEventPlugin",
      "npm:react@0.13.2/lib/ReactDOMButton",
      "npm:react@0.13.2/lib/ReactDOMInput",
      "npm:react@0.13.2/lib/ReactInputSelection",
      "npm:react@0.13.2/lib/SimpleEventPlugin",
      "npm:react@0.13.2/lib/ReactDefaultPerf",
      "npm:core-js@0.9.6/library/fn/object/create",
      "npm:core-js@0.9.6/library/fn/object/get-own-property-descriptor",
      "npm:babel-runtime@5.2.6/helpers/create-class",
      "npm:flux@2.0.3/index",
      "build/js/constants/PlaygroundConstants",
      "npm:promise@5.0.0/core",
      "npm:postcss@4.1.9/lib/node",
      "npm:buffer@3.2.2/index",
      "github:jspm/nodelibs-path@0.1.0/index",
      "npm:postcss@4.1.9/lib/container",
      "npm:postcss@4.1.9/lib/previous-map",
      "npm:postcss-css-variables@0.3.1/index",
      "build/js/components/EditorTextarea",
      "github:jspm/nodelibs-process@0.1.1",
      "npm:react@0.13.2/lib/ReactElement",
      "npm:react@0.13.2/lib/ReactUpdates",
      "npm:react@0.13.2/lib/Danger",
      "npm:react@0.13.2/lib/ReactMount",
      "npm:react@0.13.2/lib/ReactDOMComponent",
      "npm:react@0.13.2/lib/BeforeInputEventPlugin",
      "npm:react@0.13.2/lib/ReactReconcileTransaction",
      "npm:babel-runtime@5.2.6/core-js/object/create",
      "npm:babel-runtime@5.2.6/core-js/object/get-own-property-descriptor",
      "npm:flux@2.0.3",
      "npm:promise@5.0.0/index",
      "npm:postcss@4.1.9/lib/declaration",
      "npm:buffer@3.2.2",
      "github:jspm/nodelibs-path@0.1.0",
      "npm:postcss@4.1.9/lib/at-rule",
      "npm:postcss@4.1.9/lib/input",
      "npm:postcss-css-variables@0.3.1",
      "npm:react@0.13.2/lib/invariant",
      "npm:react@0.13.2/lib/ReactFragment",
      "npm:react@0.13.2/lib/ReactUpdateQueue",
      "npm:react@0.13.2/lib/DOMChildrenOperations",
      "npm:react@0.13.2/lib/ReactDefaultInjection",
      "npm:babel-runtime@5.2.6/helpers/inherits",
      "npm:babel-runtime@5.2.6/helpers/get",
      "build/js/dispatcher/AppDispatcher",
      "npm:promise@5.0.0",
      "github:jspm/nodelibs-buffer@0.1.0/index",
      "npm:amdefine@0.1.0/amdefine",
      "npm:postcss@4.1.9/lib/parser",
      "npm:react@0.13.2/lib/keyMirror",
      "npm:react@0.13.2/lib/ReactChildren",
      "npm:react@0.13.2/lib/ReactComponent",
      "npm:react@0.13.2/lib/ReactDOMIDOperations",
      "npm:localforage@1.2.2/src/localforage",
      "github:jspm/nodelibs-buffer@0.1.0",
      "npm:amdefine@0.1.0",
      "npm:postcss@4.1.9/lib/parse",
      "npm:react@0.13.2/lib/EventConstants",
      "npm:react@0.13.2/lib/ReactComponentBrowserEnvironment",
      "npm:localforage@1.2.2",
      "npm:js-base64@2.1.8/base64",
      "npm:source-map@0.4.2/lib/source-map/source-map-generator",
      "npm:react@0.13.2/lib/EventPluginUtils",
      "npm:react@0.13.2/lib/ReactDOMTextComponent",
      "build/js/stores/PlaygroundSettingsStore",
      "npm:js-base64@2.1.8",
      "npm:source-map@0.4.2/lib/source-map",
      "npm:react@0.13.2/lib/React",
      "npm:source-map@0.4.2",
      "npm:react@0.13.2/react",
      "npm:postcss@4.1.9/lib/map-generator",
      "npm:react@0.13.2",
      "npm:postcss@4.1.9/lib/lazy-result",
      "npm:postcss@4.1.9/lib/processor",
      "npm:postcss@4.1.9/lib/postcss",
      "npm:postcss@4.1.9",
      "build/js/stores/PlaygroundStore",
      "build/js/components/PlaygroundApp",
      "build/js/main"
    ]
  }
});

System.config({
  "map": {
    "babel": "npm:babel-core@5.2.6",
    "babel-runtime": "npm:babel-runtime@5.2.6",
    "bluebird": "npm:bluebird@2.9.25",
    "classnames": "npm:classnames@1.2.2",
    "core-js": "npm:core-js@0.9.6",
    "css": "github:systemjs/plugin-css@0.1.10",
    "events": "npm:events@1.0.2",
    "flux": "npm:flux@2.0.3",
    "immutable": "npm:immutable@3.7.2",
    "keymirror": "npm:keymirror@0.1.1",
    "localforage": "npm:localforage@1.2.2",
    "object-assign": "npm:object-assign@2.0.0",
    "postcss": "npm:postcss@4.1.9",
    "postcss-css-variables": "npm:postcss-css-variables@0.3.1",
    "react": "npm:react@0.13.2",
    "wjbryant/taboverride": "github:wjbryant/taboverride@4.0.2",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.2.2"
    },
    "github:jspm/nodelibs-events@0.1.0": {
      "events-browserify": "npm:events-browserify@0.0.1"
    },
    "github:jspm/nodelibs-http@1.7.1": {
      "Base64": "npm:Base64@0.2.1",
      "events": "github:jspm/nodelibs-events@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "github:jspm/nodelibs-https@0.1.0": {
      "https-browserify": "npm:https-browserify@0.0.0"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:systemjs/plugin-css@0.1.10": {
      "clean-css": "npm:clean-css@3.1.9",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "npm:amdefine@0.1.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "module": "github:jspm/nodelibs-module@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:asap@1.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:bluebird@2.9.25": {
      "events": "github:jspm/nodelibs-events@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:buffer@3.2.2": {
      "base64-js": "npm:base64-js@0.0.8",
      "ieee754": "npm:ieee754@1.1.5",
      "is-array": "npm:is-array@1.0.1"
    },
    "npm:classnames@1.2.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:clean-css@3.1.9": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "commander": "npm:commander@2.6.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "https": "github:jspm/nodelibs-https@0.1.0",
      "os": "github:jspm/nodelibs-os@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "source-map": "npm:source-map@0.1.43",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:commander@2.6.0": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.9.6": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-util-is@1.0.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:envify@3.4.0": {
      "jstransform": "npm:jstransform@10.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "through": "npm:through@2.3.7"
    },
    "npm:es6-promise@2.1.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:esprima-fb@13001.1001.0-dev-harmony-fb": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:events-browserify@0.0.1": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:https-browserify@0.0.0": {
      "http": "github:jspm/nodelibs-http@1.7.1"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:js-base64@2.1.8": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:jstransform@10.1.0": {
      "base62": "npm:base62@0.1.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "esprima-fb": "npm:esprima-fb@13001.1001.0-dev-harmony-fb",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "source-map": "npm:source-map@0.1.31"
    },
    "npm:localforage@1.2.2": {
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "promise": "npm:promise@5.0.0"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:postcss-css-variables@0.3.1": {
      "extend": "npm:extend@2.0.1",
      "postcss": "npm:postcss@4.1.9",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:postcss@4.1.9": {
      "es6-promise": "npm:es6-promise@2.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "js-base64": "npm:js-base64@2.1.8",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "source-map": "npm:source-map@0.4.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:promise@5.0.0": {
      "asap": "npm:asap@1.0.0"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:react@0.13.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "envify": "npm:envify@3.4.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:readable-stream@1.1.13": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.1",
      "events": "github:jspm/nodelibs-events@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:source-map@0.1.31": {
      "amdefine": "npm:amdefine@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:source-map@0.1.43": {
      "amdefine": "npm:amdefine@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:source-map@0.4.2": {
      "amdefine": "npm:amdefine@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.13"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:through@2.3.7": {
      "process": "github:jspm/nodelibs-process@0.1.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

