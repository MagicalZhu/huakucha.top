// vite.config.ts
import path from "path";
import { defineConfig } from "file:///workspace/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+vite@3.2.4_@types+node@18.11.9/node_modules/vite/dist/node/index.js";
import Vue from "file:///workspace/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+@vitejs+plugin-vue@3.2.0_vite@3.2.4_vue@3.2.45/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Pages from "file:///workspace/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-pages@0.27.1_vite@3.2.4/node_modules/vite-plugin-pages/dist/index.mjs";
import generateSitemap from "file:///workspace/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+vite-ssg-sitemap@0.3.2/node_modules/vite-ssg-sitemap/dist/index.js";
import Layouts from "file:///workspace/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-vue-layouts@0.7.0_vite@3.2.4_vue-router@4.1.6_vue@3.2.45/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import Components from "file:///workspace/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+unplugin-vue-components@0.22.9_rollup@2.79.1_vue@3.2.45/node_modules/unplugin-vue-components/dist/vite.mjs";
import AutoImport from "file:///workspace/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+unplugin-auto-import@0.11.4_@vueuse+core@9.5.0_rollup@2.79.1/node_modules/unplugin-auto-import/dist/vite.js";
import Markdown from "file:///workspace/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-vue-markdown@0.21.1_vite@3.2.4/node_modules/vite-plugin-vue-markdown/dist/index.mjs";
import VueI18n from "file:///workspace/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+@intlify+vite-plugin-vue-i18n@6.0.3_vite@3.2.4_vue-i18n@9.2.2/node_modules/@intlify/vite-plugin-vue-i18n/lib/index.mjs";
import Inspect from "file:///workspace/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-inspect@0.6.1_vite@3.2.4/node_modules/vite-plugin-inspect/dist/index.mjs";
import Unocss from "file:///workspace/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+unocss@0.45.30_rollup@2.79.1_vite@3.2.4/node_modules/unocss/dist/vite.mjs";
import {
  ElementPlusResolver
} from "file:///workspace/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+unplugin-vue-components@0.22.9_rollup@2.79.1_vue@3.2.45/node_modules/unplugin-vue-components/dist/resolvers.mjs";

// node/resolveBlog.ts
import { resolve } from "path";
import fs from "file:///workspace/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+fs-extra@10.1.0/node_modules/fs-extra/lib/index.js";
import matter from "file:///workspace/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+gray-matter@4.0.3/node_modules/gray-matter/index.js";
import dayjs from "file:///workspace/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+dayjs@1.11.6/node_modules/dayjs/dayjs.min.js";
var __vite_injected_original_dirname = "/workspace/vitesseDoc/node";
var resolveBlogFile = (route) => {
  if (!route.path.startsWith("/posts") || route.path === "/posts")
    return;
  const path2 = resolve(__vite_injected_original_dirname, "..", route.component.slice(1));
  const md = fs.readFileSync(path2, "utf-8");
  const { content, data } = matter(md);
  route.meta = Object.assign(route.meta || {}, {
    path: route.path,
    frontmatter: data,
    layout: "post",
    date: dayjs(data.date).format("YYYY-MM-DD"),
    readingTime: readingTime(content)
  });
  return route;
};
var resolveBlogList = (routes) => {
  const blogs = routes.filter((item) => {
    var _a;
    return ((_a = item.meta) == null ? void 0 : _a.layout) === "post";
  }).map((item) => ({
    path: item.path,
    title: item.meta.frontmatter.title,
    date: item.meta.date
  })).sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());
  return routes.map((item) => {
    const i = blogs.findIndex((blog) => blog.path === item.path);
    item.meta = {
      ...item.meta,
      prev: i < blogs.length ? blogs[i + 1] : null,
      next: i > 0 ? blogs[i - 1] : null
    };
    return item;
  });
};

// node/readingTime.ts
var getNumCN = (text) => {
  return (text.match(/[\u4E00-\u9FA5]/g) || []).length;
};
var getNumEN = (text) => {
  return (text.replace(/[\u4E00-\u9FA5]/g, "").match(
    /[a-zA-Z0-9_\u0392-\u03C9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3040-\u309F\uAC00-\uD7AF\u0400-\u04FF]+|[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+|\w+/g
  ) || []).length;
};
var excludeCodeBlock = (text) => {
  return text.replace(/```[\s\S]*?```/g, "");
};
var excludeTexBlock = (text) => {
  return text.replace(/\$\$[\s\S]*?\$\$/g, "");
};
var readingTime = (text, options) => {
  options = options || {};
  options.wordsPerMinuteCN = options.wordsPerMinuteCN || 300;
  options.wordsPerMinuteEN = options.wordsPerMinuteEN || 200;
  if (options.excludeCodeBlock)
    text = excludeCodeBlock(text);
  if (options.excludeTexBlock)
    text = excludeTexBlock(text);
  const cntCN = getNumCN(text || "");
  const cntEN = getNumEN(text || "");
  let minutes = cntCN / options.wordsPerMinuteCN + cntEN / options.wordsPerMinuteEN;
  minutes = minutes < 1 ? 1 : Math.ceil(Number(minutes.toFixed(2)));
  return {
    minutes,
    words: cntCN + cntEN
  };
};

// node/markdown-plugin/shiki/index.ts
import { createRequire } from "module";
import { createSyncFn } from "file:///workspace/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+synckit@0.8.4/node_modules/synckit/lib/index.js";
import JSON5 from "file:///workspace/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+json5@2.2.1/node_modules/json5/lib/index.js";
var __vite_injected_original_import_meta_url = "file:///workspace/vitesseDoc/node/markdown-plugin/shiki/index.ts";
function getThemeName(theme) {
  if (typeof theme === "string")
    return theme;
  return theme.name;
}
function resolveOptions(options) {
  let themes = [];
  let darkModeThemes = {
    light: "vitesse-light",
    dark: "vitesse-dark"
  };
  if (!options.theme) {
    themes = themes.concat(["vitesse-light"], "vitesse-dark");
  } else if (typeof options.theme === "string") {
    themes.push(options.theme);
  } else {
    if ("dark" in options.theme || "light" in options.theme) {
      darkModeThemes = options.theme;
      themes.push(options.theme.dark);
      themes.push(options.theme.light);
    } else {
      themes.push(options.theme);
    }
  }
  return {
    ...options,
    themes,
    darkModeThemes: {
      dark: getThemeName(darkModeThemes.dark),
      light: getThemeName(darkModeThemes.light)
    }
  };
}
var MarkdownItShiki = (markdownit, options = {}) => {
  const _highlighter = options.highlighter;
  const {
    langs,
    themes,
    darkModeThemes,
    highlighLineClass
  } = resolveOptions(options);
  let syncRun;
  if (!_highlighter) {
    const require2 = createRequire(__vite_injected_original_import_meta_url);
    syncRun = createSyncFn(require2.resolve("./worker.js"));
    syncRun("getHighlighter", { langs, themes });
  }
  const highlightCode = (code, lang, theme, extOpt) => {
    if (_highlighter)
      return _highlighter.codeToHtml(code, { lang: lang || "text", theme });
    return syncRun("codeToHtml", {
      code,
      theme,
      lang: lang || "text"
    }, extOpt);
  };
  const transLines = (lines) => {
    const lineData = [];
    lines.split(",").map((v) => v.split("-").map((v2) => parseInt(v2, 10))).forEach(([start, end]) => {
      if (start && end) {
        lineData.push(
          ...Array.from({ length: end - start + 1 }, (_, i) => start + i)
        );
      } else {
        lineData.push(start);
      }
    });
    return lineData;
  };
  markdownit.options.highlight = (code, lang, attr) => {
    let extOptions = {};
    if (highlighLineClass) {
      extOptions.highlighLineClass = highlighLineClass;
    }
    if (attr) {
      const ext = JSON5.parse(attr);
      if (ext.title) {
        extOptions.title = ext.title;
      }
      if (ext.lines) {
        extOptions.highlines = transLines(ext.lines.toString());
      }
    }
    if (darkModeThemes) {
      const dark = highlightCode(code, lang, darkModeThemes.dark, extOptions).replace('<pre class="shiki"', '<pre class="shiki shiki-dark"');
      const light = highlightCode(code, lang || "text", darkModeThemes.light, extOptions).replace('<pre class="shiki"', '<pre class="shiki shiki-light"');
      return `<div class="shiki-container">${dark}${light}</div>`;
    } else {
      return highlightCode(code, lang || "text");
    }
  };
};
var shiki_default = MarkdownItShiki;

// node/installMarkdownPlugins.ts
import LinkAttributes from "file:///workspace/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+markdown-it-link-attributes@4.0.1/node_modules/markdown-it-link-attributes/index.js";
import TOC from "file:///workspace/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+markdown-it-table-of-contents@0.6.0/node_modules/markdown-it-table-of-contents/index.js";
import anchor from "file:///workspace/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+markdown-it-anchor@8.6.5/node_modules/markdown-it-anchor/dist/markdownItAnchor.js";
import sup from "file:///workspace/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+markdown-it-sup@1.0.0/node_modules/markdown-it-sup/index.js";
import mark from "file:///workspace/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+markdown-it-mark@3.0.1/node_modules/markdown-it-mark/index.js";
import uslug from "file:///workspace/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+uslug@1.0.4/node_modules/uslug/index.js";

// node/markdown-plugin/container.ts
import container from "file:///workspace/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+markdown-it-container@3.0.0/node_modules/markdown-it-container/index.js";
var containerPlugin = (md) => {
  md.use(...createContainer("tip", "Tip", md)).use(...createContainer("info", "Info", md)).use(...createContainer("warning", "Warning", md)).use(...createContainer("danger", "Danger", md)).use(...createContainer("details", "Details", md)).use(container, "v-pre", {
    render: (tokens, idx) => tokens[idx].nesting === 1 ? `<div v-pre>
` : `</div>
`
  }).use(container, "raw", {
    render: (tokens, idx) => tokens[idx].nesting === 1 ? `<div class="vp-raw">
` : `</div>
`
  });
};
function createContainer(klass, defaultTitle, md) {
  return [
    container,
    klass,
    {
      render(tokens, idx) {
        const token = tokens[idx];
        const info = token.info.trim().slice(klass.length).trim();
        const iconMap = {
          "tip": '<svg class="custom-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="currentColor" d="M11 24h10v2H11zm2 4h6v2h-6zm3-26A10 10 0 0 0 6 12a9.19 9.19 0 0 0 3.46 7.62c1 .93 1.54 1.46 1.54 2.38h2c0-1.84-1.11-2.87-2.19-3.86A7.2 7.2 0 0 1 8 12a8 8 0 0 1 16 0a7.2 7.2 0 0 1-2.82 6.14c-1.07 1-2.18 2-2.18 3.86h2c0-.92.53-1.45 1.54-2.39A9.18 9.18 0 0 0 26 12A10 10 0 0 0 16 2z"/></svg>',
          "info": '<svg class="custom-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="currentColor" d="M17 22v-8h-4v2h2v6h-3v2h8v-2h-3zM16 8a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 16 8z"/><path fill="currentColor" d="M16 30a14 14 0 1 1 14-14a14 14 0 0 1-14 14Zm0-26a12 12 0 1 0 12 12A12 12 0 0 0 16 4Z"/></svg>',
          "warning": '<svg class="custom-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2Zm0 26a12 12 0 1 1 12-12a12 12 0 0 1-12 12Z"/><path fill="currentColor" d="M15 8h2v11h-2zm1 14a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 16 22z"/></svg>',
          "danger": '<svg class="custom-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="currentColor" d="M24.832 16.969c-.272-.647-.582-1.38-.883-2.285c-.79-2.369 1.734-4.953 1.758-4.977l-1.414-1.414c-.14.14-3.423 3.478-2.242 7.023c.326.978.652 1.75.938 2.43A9.381 9.381 0 0 1 24 22a6.24 6.24 0 0 1-4.19 5.293a8.52 8.52 0 0 0-2.103-8l-1.044-1.044l-.582 1.357c-1.836 4.284-4.021 6.154-5.306 6.934A5.844 5.844 0 0 1 8 22a9.624 9.624 0 0 1 .929-3.629A11.333 11.333 0 0 0 10 14v-1.778c.874.36 2 1.303 2 3.778v2.603l1.743-1.934c3.112-3.454 2.463-7.567 1.206-10.308A4.486 4.486 0 0 1 18 11h2c0-5.537-4.579-7-7-7h-2l1.2 1.599c.137.185 2.862 3.927 1.353 7.688A4.943 4.943 0 0 0 9 10H8v4a9.624 9.624 0 0 1-.929 3.629A11.333 11.333 0 0 0 6 22c0 3.848 3.823 8 10 8s10-4.152 10-8a11.377 11.377 0 0 0-1.168-5.031ZM12.835 27.526a16.499 16.499 0 0 0 4.367-5.598a6.105 6.105 0 0 1 .257 5.971A11.321 11.321 0 0 1 16 28a10.328 10.328 0 0 1-3.165-.474Z"/></svg>'
        };
        const iconClass = iconMap[klass] || "";
        if (token.nesting === 1) {
          const title = md.renderInline(info || defaultTitle);
          if (klass === "details") {
            return `<details class="${klass} custom-block"><summary>${title}</summary>
`;
          }
          return `<div class="${klass} custom-block"><div class="custom-icon">${iconClass}<span class="custom-block-title">${title}</span></div>
`;
        } else {
          return klass === "details" ? `</details>
` : `</div>
`;
        }
      }
    }
  ];
}

// node/installMarkdownPlugins.ts
import checkbox from "file:///workspace/vitesseDoc/node_modules/.pnpm/markdown-it-checkbox@1.1.0/node_modules/markdown-it-checkbox/index.js";
var uslugify = (s) => uslug(s);
var installMarkdownPlugins = async (md) => {
  md.use(shiki_default, {
    theme: {
      light: "vitesse-light",
      dark: "material-darker"
    }
  });
  md.use(checkbox);
  md.use(sup);
  md.use(containerPlugin);
  md.use(mark);
  md.use(anchor, {
    slugify: uslugify,
    level: 1,
    permalink: anchor.permalink.linkInsideHeader({
      symbol: `
        <span class="visually-hidden" aria-hidden="true">
          <svg class="octicon octicon-header" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>
        </span>
      `,
      placement: "before",
      space: false
    })
  });
  md.use(LinkAttributes, {
    matcher: (link) => /^https?:\/\//.test(link),
    attrs: {
      target: "_blank",
      rel: "noopener"
    }
  });
  md.use(TOC, {
    slugify: uslugify,
    includeLevel: [1, 2, 3, 4, 5, 6],
    containerClass: "table-of-contents",
    containerHeaderHtml: '<div class="tocHeader">ON THIS PAGE</div>'
  });
};

// vite.config.ts
var __vite_injected_original_dirname2 = "/workspace/vitesseDoc";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__vite_injected_original_dirname2, "src")}/`
    }
  },
  define: {
    "import.meta.env.__BUILD_TIME__": JSON.stringify(new Date().toISOString())
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true
    }),
    Pages({
      dirs: [
        { dir: "pages", baseRoute: "" }
      ],
      extensions: ["vue", "md", "js", "ts"],
      extendRoute: (route) => resolveBlogFile(route),
      onRoutesGenerated: (routes) => resolveBlogList(routes)
    }),
    Layouts(),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "vue-i18n",
        "vue/macros",
        "@vueuse/head",
        "@vueuse/core"
      ],
      dts: "src/auto-imports.d.ts",
      dirs: [
        "src/composables",
        "src/store"
      ],
      vueTemplate: true
    }),
    Components({
      extensions: ["vue", "md"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: "src/components.d.ts",
      resolvers: [
        ElementPlusResolver()
      ]
    }),
    Unocss(),
    Markdown({
      headEnabled: true,
      markdownItOptions: {
        quotes: `""''`
      },
      wrapperClasses: "prose   mx-auto text-left slide-enter-content",
      markdownItSetup: (md) => installMarkdownPlugins(md)
    }),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__vite_injected_original_dirname2, "locales/**")]
    }),
    Inspect()
  ],
  ssgOptions: {
    script: "async",
    formatting: "minify",
    onFinished() {
      generateSitemap();
    }
  },
  ssr: {
    noExternal: ["workbox-window", /vue-i18n/]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibm9kZS9yZXNvbHZlQmxvZy50cyIsICJub2RlL3JlYWRpbmdUaW1lLnRzIiwgIm5vZGUvbWFya2Rvd24tcGx1Z2luL3NoaWtpL2luZGV4LnRzIiwgIm5vZGUvaW5zdGFsbE1hcmtkb3duUGx1Z2lucy50cyIsICJub2RlL21hcmtkb3duLXBsdWdpbi9jb250YWluZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvd29ya3NwYWNlL3ZpdGVzc2VEb2NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi93b3Jrc3BhY2Uvdml0ZXNzZURvYy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vd29ya3NwYWNlL3ZpdGVzc2VEb2Mvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCBWdWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IFBhZ2VzIGZyb20gJ3ZpdGUtcGx1Z2luLXBhZ2VzJ1xuaW1wb3J0IGdlbmVyYXRlU2l0ZW1hcCBmcm9tICd2aXRlLXNzZy1zaXRlbWFwJ1xuaW1wb3J0IExheW91dHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWxheW91dHMnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBNYXJrZG93biBmcm9tICd2aXRlLXBsdWdpbi12dWUtbWFya2Rvd24nXG5pbXBvcnQgVnVlSTE4biBmcm9tICdAaW50bGlmeS92aXRlLXBsdWdpbi12dWUtaTE4bidcbmltcG9ydCBJbnNwZWN0IGZyb20gJ3ZpdGUtcGx1Z2luLWluc3BlY3QnXG5pbXBvcnQgVW5vY3NzIGZyb20gJ3Vub2Nzcy92aXRlJ1xuXG4vLyBpbXBvcnQgZWxlbWVudHVpLXBsdXNcbmltcG9ydCB7XG4gIEVsZW1lbnRQbHVzUmVzb2x2ZXJcbn0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuXG5pbXBvcnQge1xuICByZXNvbHZlQmxvZ0ZpbGUsXG4gIHJlc29sdmVCbG9nTGlzdCxcbiAgaW5zdGFsbE1hcmtkb3duUGx1Z2luc1xufSBmcm9tIFwiLi9ub2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ34vJzogYCR7cGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpfS9gLFxuICAgIH0sXG4gIH0sXG4gIGRlZmluZToge1xuICAgICdpbXBvcnQubWV0YS5lbnYuX19CVUlMRF9USU1FX18nOiBKU09OLnN0cmluZ2lmeShuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkpLFxuICB9LFxuXG4gIHBsdWdpbnM6IFtcbiAgICBWdWUoe1xuICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLm1kJC9dLFxuICAgICAgcmVhY3Rpdml0eVRyYW5zZm9ybTogdHJ1ZVxuICAgIH0pLFxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFx1NTdGQVx1NEU4RVx1NjU4N1x1NEVGNlx1NzY4NFx1OERFRlx1NzUzMVxuICAgICAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2hhbm5vZXJ1L3ZpdGUtcGx1Z2luLXBhZ2VzXG4gICAgICovXG4gICAgUGFnZXMoe1xuICAgICAgZGlyczogW1xuICAgICAgICB7IGRpcjogJ3BhZ2VzJywgYmFzZVJvdXRlOiAnJyB9LFxuICAgICAgXSxcbiAgICAgIGV4dGVuc2lvbnM6IFtcInZ1ZVwiLCBcIm1kXCIsIFwianNcIiwgXCJ0c1wiXSxcbiAgICAgIC8vIEEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHJvdXRlIGFuZCBvcHRpb25hbGx5IHJldHVybnMgYSBtb2RpZmllZCByb3V0ZVxuICAgICAgLy8gVGhpcyBpcyB1c2VmdWwgZm9yIGF1Z21lbnRpbmcgeW91ciByb3V0ZXMgd2l0aCBleHRyYSBkYXRhIChlLmcuIHJvdXRlIG1ldGFkYXRhKS5cbiAgICAgIGV4dGVuZFJvdXRlOiAocm91dGUpID0+IHJlc29sdmVCbG9nRmlsZShyb3V0ZSksXG4gICAgICAvLyBBIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBnZW5lcmF0ZWQgcm91dGVzIGFuZCBvcHRpb25hbGx5IHJldHVybnMgYSBtb2RpZmllZCBnZW5lcmF0ZWQgcm91dGVzLlxuICAgICAgb25Sb3V0ZXNHZW5lcmF0ZWQ6IChyb3V0ZXMpID0+IHJlc29sdmVCbG9nTGlzdChyb3V0ZXMpXG4gICAgfSksXG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gXHU1RTAzXHU1QzQwXHU3Q0ZCXHU3RURGXG4gICAgICogQHNlZSAgaHR0cHM6Ly9naXRodWIuY29tL0pvaG5DYW1waW9uSnIvdml0ZS1wbHVnaW4tdnVlLWxheW91dHNcbiAgICAgKi9cbiAgICBMYXlvdXRzKCksXG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gQVBJIFx1ODFFQVx1NTJBOFx1NTJBMFx1OEY3RCAtIFx1NzZGNFx1NjNBNVx1NEY3Rlx1NzUyOCBDb21wb3NpdGlvbiBBUEkgXHU2NUUwXHU5NzAwXHU1RjE1XHU1MTY1XG4gICAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5wbHVnaW4tYXV0by1pbXBvcnRcbiAgICAgKi9cbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIGltcG9ydHM6IFtcbiAgICAgICAgJ3Z1ZScsXG4gICAgICAgICd2dWUtcm91dGVyJyxcbiAgICAgICAgJ3Z1ZS1pMThuJyxcbiAgICAgICAgJ3Z1ZS9tYWNyb3MnLFxuICAgICAgICAnQHZ1ZXVzZS9oZWFkJyxcbiAgICAgICAgJ0B2dWV1c2UvY29yZScsXG4gICAgICBdLFxuICAgICAgZHRzOiAnc3JjL2F1dG8taW1wb3J0cy5kLnRzJyxcbiAgICAgIGRpcnM6IFtcbiAgICAgICAgJ3NyYy9jb21wb3NhYmxlcycsXG4gICAgICAgICdzcmMvc3RvcmUnLFxuICAgICAgXSxcbiAgICAgIHZ1ZVRlbXBsYXRlOiB0cnVlLFxuICAgIH0pLFxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFx1N0VDNFx1NEVGNlx1ODFFQVx1NTJBOFx1NTMxNlx1NTJBMFx1OEY3RFxuICAgICAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzXG4gICAgICovXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICBleHRlbnNpb25zOiBbJ3Z1ZScsICdtZCddLFxuICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS8sIC9cXC5tZCQvXSxcbiAgICAgIGR0czogJ3NyYy9jb21wb25lbnRzLmQudHMnLFxuICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgIEVsZW1lbnRQbHVzUmVzb2x2ZXIoKVxuICAgICAgXSxcbiAgICB9KSxcblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBcdTlBRDhcdTYwMjdcdTgwRkRcdTRFMTRcdTY3ODFcdTUxNzdcdTcwNzVcdTZEM0JcdTYwMjdcdTc2ODRcdTUzNzNcdTY1RjZcdTUzOUZcdTVCNTBcdTUzMTYgQ1NTIFx1NUYxNVx1NjRDRSwgc2VlIHVub2Nzcy5jb25maWcudHMgZm9yIGNvbmZpZ1xuICAgICAqIEBzZWUgIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bm9jc3NcbiAgICAgKi9cbiAgICBVbm9jc3MoKSxcblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3ZpdGUtcGx1Z2luLXZ1ZS1tYXJrZG93blxuICAgICAqIEBzZWUgaHR0cHM6Ly9tYXJrZG93bi1pdC5naXRodWIuaW8vbWFya2Rvd24taXQvXG4gICAgICovXG4gICAgTWFya2Rvd24oe1xuICAgICAgLy8gd3JhcHBlckNvbXBvbmVudDogJ3Bvc3QnLFxuICAgICAgaGVhZEVuYWJsZWQ6IHRydWUsXG4gICAgICBtYXJrZG93bkl0T3B0aW9uczoge1xuICAgICAgICBxdW90ZXM6ICdcIlwiXFwnXFwnJyxcbiAgICAgIH0sXG4gICAgICB3cmFwcGVyQ2xhc3NlczogJ3Byb3NlICAgbXgtYXV0byB0ZXh0LWxlZnQgc2xpZGUtZW50ZXItY29udGVudCcsXG4gICAgICBtYXJrZG93bkl0U2V0dXA6IChtZCkgPT4gaW5zdGFsbE1hcmtkb3duUGx1Z2lucyhtZClcbiAgICB9KSxcblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2ludGxpZnkvYnVuZGxlLXRvb2xzL3RyZWUvbWFpbi9wYWNrYWdlcy92aXRlLXBsdWdpbi12dWUtaTE4blxuICAgICAqL1xuICAgIFZ1ZUkxOG4oe1xuICAgICAgcnVudGltZU9ubHk6IHRydWUsXG4gICAgICBjb21wb3NpdGlvbk9ubHk6IHRydWUsXG4gICAgICBpbmNsdWRlOiBbcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2xvY2FsZXMvKionKV0sXG4gICAgfSksXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uICBWaXNpdCBodHRwOi8vaG9zdDpwb3J0L19faW5zcGVjdC8gdG8gc2VlIHRoZSBpbnNwZWN0b3JcbiAgICAgKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS92aXRlLXBsdWdpbi1pbnNwZWN0XG4gICAgICovXG4gICAgSW5zcGVjdCgpLFxuICBdLFxuXG5cbiAgLyoqXG4gICAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3ZpdGUtc3NnXG4gICAqL1xuICBzc2dPcHRpb25zOiB7XG4gICAgc2NyaXB0OiAnYXN5bmMnLFxuICAgIGZvcm1hdHRpbmc6ICdtaW5pZnknLFxuICAgIG9uRmluaXNoZWQoKSB7IGdlbmVyYXRlU2l0ZW1hcCgpIH0sXG4gIH0sXG5cbiAgc3NyOiB7XG4gICAgLy8gVE9ETzogd29ya2Fyb3VuZCB1bnRpbCB0aGV5IHN1cHBvcnQgbmF0aXZlIEVTTVxuICAgIG5vRXh0ZXJuYWw6IFsnd29ya2JveC13aW5kb3cnLCAvdnVlLWkxOG4vXSxcbiAgfSxcbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi93b3Jrc3BhY2Uvdml0ZXNzZURvYy9ub2RlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvd29ya3NwYWNlL3ZpdGVzc2VEb2Mvbm9kZS9yZXNvbHZlQmxvZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vd29ya3NwYWNlL3ZpdGVzc2VEb2Mvbm9kZS9yZXNvbHZlQmxvZy50c1wiO2ltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJ1xuaW1wb3J0IG1hdHRlciBmcm9tICdncmF5LW1hdHRlcidcbmltcG9ydCBkYXlqcyBmcm9tICdkYXlqcydcbmltcG9ydCB7IHJlYWRpbmdUaW1lIH0gZnJvbSAnLidcblxuLyoqXG4gKiBcdTg5RTNcdTY3OTBcdTUzNUFcdTVCQTJcdTY1ODdcdTRFRjYsXHU1QzA2XHU1MzVBXHU1QkEyXHU3Njg0XHU1RTAzXHU1QzQwXHU3Q0ZCXHU3RURGXHU4QkJFXHU3RjZFXHU0RTNBIHBvc3QsIFx1NUU3Nlx1NEUxNFx1NUMwNlx1NTM1QVx1NUJBMlx1NTE0M1x1NjU3MFx1NjM2RVx1NTE5OVx1NTE2NSByb3V0ZS5tZXRhIFx1NEUyRFxuICovXG5leHBvcnQgY29uc3QgcmVzb2x2ZUJsb2dGaWxlID0gKHJvdXRlOiBhbnkpID0+IHtcbiAgaWYgKCFyb3V0ZS5wYXRoLnN0YXJ0c1dpdGgoJy9wb3N0cycpIHx8IHJvdXRlLnBhdGggPT09ICcvcG9zdHMnKVxuICAgIHJldHVyblxuXG4gIGNvbnN0IHBhdGggPSByZXNvbHZlKF9fZGlybmFtZSwgJy4uJywgcm91dGUuY29tcG9uZW50LnNsaWNlKDEpKVxuICBjb25zdCBtZCA9IGZzLnJlYWRGaWxlU3luYyhwYXRoLCAndXRmLTgnKVxuICBjb25zdCB7IGNvbnRlbnQsIGRhdGEgfSA9IG1hdHRlcihtZClcblxuICByb3V0ZS5tZXRhID0gT2JqZWN0LmFzc2lnbihyb3V0ZS5tZXRhIHx8IHt9LCB7XG4gICAgcGF0aDpyb3V0ZS5wYXRoLFxuICAgIGZyb250bWF0dGVyOiBkYXRhLFxuICAgIGxheW91dDogJ3Bvc3QnLFxuICAgIGRhdGU6IGRheWpzKGRhdGEuZGF0ZSkuZm9ybWF0KCdZWVlZLU1NLUREJyksXG4gICAgcmVhZGluZ1RpbWU6IHJlYWRpbmdUaW1lKGNvbnRlbnQpXG4gIH0pXG4gIHJldHVybiByb3V0ZVxufVxuXG4vKipcbiAqIFx1Njc4NFx1NUVGQVx1NTM1QVx1NUJBMlx1NzY4NFx1OTRGRVx1ODg2OChcdTYzMDlcdTY1ODdcdTRFRjZcdTc2ODQgZGF0ZSBcdTYzOTJcdTVFOEYpXG4gKi9cbmV4cG9ydCBjb25zdCByZXNvbHZlQmxvZ0xpc3QgPSAocm91dGVzOiBhbnlbXSkgPT4ge1xuICBjb25zdCBibG9ncyA9IHJvdXRlc1xuICAgIC5maWx0ZXIoKGl0ZW06IGFueSkgPT4gaXRlbS5tZXRhPy5sYXlvdXQgPT09ICdwb3N0JylcbiAgICAubWFwKChpdGVtOiBhbnkpID0+ICh7XG4gICAgICBwYXRoOiBpdGVtLnBhdGgsXG4gICAgICB0aXRsZTogaXRlbS5tZXRhLmZyb250bWF0dGVyLnRpdGxlLFxuICAgICAgZGF0ZTogaXRlbS5tZXRhLmRhdGUsXG4gICAgfSkpXG4gICAgLnNvcnQoKGE6IGFueSwgYjogYW55KSA9PiBkYXlqcyhiLmRhdGUpLnVuaXgoKSAtIGRheWpzKGEuZGF0ZSkudW5peCgpKVxuXG4gIHJldHVybiByb3V0ZXMubWFwKChpdGVtKSA9PiB7XG4gICAgY29uc3QgaSA9IGJsb2dzLmZpbmRJbmRleChibG9nID0+IGJsb2cucGF0aCA9PT0gaXRlbS5wYXRoKVxuXG4gICAgaXRlbS5tZXRhID0ge1xuICAgICAgLi4uaXRlbS5tZXRhLFxuICAgICAgcHJldjogaSA8IGJsb2dzLmxlbmd0aCA/IGJsb2dzW2kgKyAxXSA6IG51bGwsXG4gICAgICBuZXh0OiBpID4gMCA/IGJsb2dzW2kgLSAxXSA6IG51bGwsXG4gICAgfVxuICAgIHJldHVybiBpdGVtXG4gIH0pXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi93b3Jrc3BhY2Uvdml0ZXNzZURvYy9ub2RlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvd29ya3NwYWNlL3ZpdGVzc2VEb2Mvbm9kZS9yZWFkaW5nVGltZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vd29ya3NwYWNlL3ZpdGVzc2VEb2Mvbm9kZS9yZWFkaW5nVGltZS50c1wiO2V4cG9ydCBpbnRlcmZhY2UgUmVhZGluZ1RpbWVPcHRpb25zIHtcbiAgLyoqXG4gICAqIE51bWJlciBvZiBDaGluZXNlIHdvcmRzIHBlciBtaW51dGUgYSB1c2VyIGNhbiByZWFkXG4gICAqXG4gICAqIEBkZWZhdWx0IDMwMFxuICAgKi9cbiAgd29yZHNQZXJNaW51dGVDTj86IG51bWJlclxuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgRW5nbGlzaCB3b3JkcyBwZXIgbWludXRlIGEgdXNlciBjYW4gcmVhZFxuICAgKlxuICAgKiBAZGVmYXVsdCAyMDBcbiAgICovXG4gIHdvcmRzUGVyTWludXRlRU4/OiBudW1iZXJcblxuICAvKipcbiAgICogRXhjbHVkZXMgYWxsIGNvbnRlbnQgaW5zaWRlIGNvZGUgYmxvY2tzIG9yIG5vdFxuICAgKlxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgZXhjbHVkZUNvZGVCbG9jaz86IGJvb2xlYW5cblxuICAvKipcbiAgICogRXhjbHVkZXMgYWxsIGNvbnRlbnQgaW5zaWRlIHRleCBibG9ja3Mgb3Igbm90XG4gICAqXG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBleGNsdWRlVGV4QmxvY2s/OiBib29sZWFuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVhZGluZ1RpbWUge1xuICAvKipcbiAgICogRXhwZWN0IHJlYWRpbmcgdGltZSAobnVtYmVyIG9mIG1pbnV0ZXMpXG4gICAqL1xuICBtaW51dGVzOiBudW1iZXJcbiAgLyoqXG4gICAqIE51bWJlciBvZiB3b3JkcyBvZiB0aGUgcGFnZVxuICAgKi9cbiAgd29yZHM6IG51bWJlclxufVxuXG5jb25zdCBnZXROdW1DTiA9ICh0ZXh0OiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICByZXR1cm4gKHRleHQubWF0Y2goL1tcXHU0RTAwLVxcdTlGQTVdL2cpIHx8IFtdKS5sZW5ndGhcbn1cblxuY29uc3QgZ2V0TnVtRU4gPSAodGV4dDogc3RyaW5nKTogbnVtYmVyID0+IHtcbiAgcmV0dXJuIChcbiAgICB0ZXh0XG4gICAgICAucmVwbGFjZSgvW1xcdTRFMDAtXFx1OUZBNV0vZywgJycpXG4gICAgICAubWF0Y2goXG4gICAgICAgIC9bYS16QS1aMC05X1xcdTAzOTItXFx1MDNDOVxcdTA0MDAtXFx1MDRGRl0rfFtcXHU0RTAwLVxcdTlGRkZcXHUzNDAwLVxcdTREQkZcXHVGOTAwLVxcdUZBRkZcXHUzMDQwLVxcdTMwOUZcXHVBQzAwLVxcdUQ3QUZcXHUwNDAwLVxcdTA0RkZdK3xbXFx1MDBFNFxcdTAwQzRcXHUwMEU1XFx1MDBDNVxcdTAwRjZcXHUwMEQ2XSt8XFx3Ky9nLFxuICAgICAgKSB8fCBbXVxuICApLmxlbmd0aFxufVxuXG5jb25zdCBleGNsdWRlQ29kZUJsb2NrID0gKHRleHQ6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIHJldHVybiB0ZXh0LnJlcGxhY2UoL2BgYFtcXHNcXFNdKj9gYGAvZywgJycpXG59XG5cbmNvbnN0IGV4Y2x1ZGVUZXhCbG9jayA9ICh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gdGV4dC5yZXBsYWNlKC9cXCRcXCRbXFxzXFxTXSo/XFwkXFwkL2csICcnKVxufVxuXG5leHBvcnQgY29uc3QgcmVhZGluZ1RpbWUgPSAoXG4gIHRleHQ6IHN0cmluZyxcbiAgb3B0aW9ucz86IFJlYWRpbmdUaW1lT3B0aW9ucyxcbik6IFJlYWRpbmdUaW1lID0+IHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cblxuICAvLyB1c2UgZGVmYXVsdCB2YWx1ZXMgaWYgbmVjZXNzYXJ5XG4gIG9wdGlvbnMud29yZHNQZXJNaW51dGVDTiA9IG9wdGlvbnMud29yZHNQZXJNaW51dGVDTiB8fCAzMDBcbiAgb3B0aW9ucy53b3Jkc1Blck1pbnV0ZUVOID0gb3B0aW9ucy53b3Jkc1Blck1pbnV0ZUVOIHx8IDIwMFxuXG4gIC8vIGV4Y2x1ZGUgYWxsIGNvbnRlbnQgaW5zaWRlIGNvZGUgYmxvY2tzXG4gIGlmIChvcHRpb25zLmV4Y2x1ZGVDb2RlQmxvY2spXG4gICAgdGV4dCA9IGV4Y2x1ZGVDb2RlQmxvY2sodGV4dClcbiAgLy8gZXhjbHVkZSBhbGwgY29udGVudCBpbnNpZGUgdGV4IGJsb2Nrc1xuICBpZiAob3B0aW9ucy5leGNsdWRlVGV4QmxvY2spXG4gICAgdGV4dCA9IGV4Y2x1ZGVUZXhCbG9jayh0ZXh0KVxuXG4gIC8vIG51bWJlciBvZiBjaGluZXNlIHdvcmRzIGFuZCBlbmdsaXNoIHdvcmRzXG4gIGNvbnN0IGNudENOID0gZ2V0TnVtQ04odGV4dCB8fCAnJylcbiAgY29uc3QgY250RU4gPSBnZXROdW1FTih0ZXh0IHx8ICcnKVxuXG4gIC8vIGNvbXB1dGUgcmVhZGluZyB0aW1lXG4gIGxldCBtaW51dGVzXG4gICAgPSBjbnRDTiAvIG9wdGlvbnMud29yZHNQZXJNaW51dGVDTiArIGNudEVOIC8gb3B0aW9ucy53b3Jkc1Blck1pbnV0ZUVOXG4gIG1pbnV0ZXMgPSBtaW51dGVzIDwgMSA/IDEgOiBNYXRoLmNlaWwoTnVtYmVyKG1pbnV0ZXMudG9GaXhlZCgyKSkpXG5cbiAgcmV0dXJuIHtcbiAgICBtaW51dGVzLFxuICAgIHdvcmRzOiBjbnRDTiArIGNudEVOLFxuICB9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi93b3Jrc3BhY2Uvdml0ZXNzZURvYy9ub2RlL21hcmtkb3duLXBsdWdpbi9zaGlraVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3dvcmtzcGFjZS92aXRlc3NlRG9jL25vZGUvbWFya2Rvd24tcGx1Z2luL3NoaWtpL2luZGV4LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy93b3Jrc3BhY2Uvdml0ZXNzZURvYy9ub2RlL21hcmtkb3duLXBsdWdpbi9zaGlraS9pbmRleC50c1wiOy8qKlxuICogaW5zcGlyZWQgYnkge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS9tYXJrZG93bi1pdC1zaGlraX1cbiAqIHN1cHBvcnQgaGlnaGxpZ2h0IGxpbmVzXG4gKi9cbiBpbXBvcnQgeyBjcmVhdGVSZXF1aXJlIH0gZnJvbSAnbW9kdWxlJ1xuIGltcG9ydCB7IGNyZWF0ZVN5bmNGbiB9IGZyb20gJ3N5bmNraXQnXG4gaW1wb3J0IHR5cGUgeyBIaWdobGlnaHRlciwgSUxhbmd1YWdlUmVnaXN0cmF0aW9uLCBJU2hpa2lUaGVtZSwgSVRoZW1lUmVnaXN0cmF0aW9uIH0gZnJvbSAnc2hpa2knXG4gaW1wb3J0IHR5cGUgTWFya2Rvd25JdCBmcm9tICdtYXJrZG93bi1pdCdcbiBpbXBvcnQgSlNPTjUgZnJvbSAnanNvbjUnXG4gXG4gaW50ZXJmYWNlIGV4dE9wdGlvbnMge1xuICAgdGl0bGU/OiBTdHJpbmcsXG4gICBoaWdobGlnaExpbmVDbGFzcz86IHN0cmluZyxcbiAgIGhpZ2hsaW5lcz86IG51bWJlcltdXG4gfVxuIFxuIGV4cG9ydCBpbnRlcmZhY2UgRGFya01vZGVUaGVtZXMge1xuICAgZGFyazogSVRoZW1lUmVnaXN0cmF0aW9uXG4gICBsaWdodDogSVRoZW1lUmVnaXN0cmF0aW9uXG4gfVxuIFxuIGV4cG9ydCBpbnRlcmZhY2UgT3B0aW9ucyB7XG4gICB0aGVtZT86IERhcmtNb2RlVGhlbWVzXG4gICBsYW5ncz86IElMYW5ndWFnZVJlZ2lzdHJhdGlvbltdXG4gICB0aW1lb3V0PzogbnVtYmVyXG4gICBoaWdobGlnaHRlcj86IEhpZ2hsaWdodGVyLFxuICAgaGlnaGxpZ2hMaW5lQ2xhc3M/OiBzdHJpbmdcbiB9XG4gXG4gZnVuY3Rpb24gZ2V0VGhlbWVOYW1lKHRoZW1lOiBJVGhlbWVSZWdpc3RyYXRpb24pIHtcbiAgIGlmICh0eXBlb2YgdGhlbWUgPT09ICdzdHJpbmcnKVxuICAgICByZXR1cm4gdGhlbWVcbiAgIHJldHVybiAodGhlbWUgYXMgSVNoaWtpVGhlbWUpLm5hbWVcbiB9XG4gXG4gZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVPcHRpb25zKG9wdGlvbnM6IE9wdGlvbnMpIHtcbiAgIGxldCB0aGVtZXM6IElUaGVtZVJlZ2lzdHJhdGlvbltdID0gW11cbiAgIGxldCBkYXJrTW9kZVRoZW1lczogRGFya01vZGVUaGVtZXMgPSB7XG4gICAgIGxpZ2h0OiAndml0ZXNzZS1saWdodCcsXG4gICAgIGRhcms6ICd2aXRlc3NlLWRhcmsnXG4gICB9XG4gXG4gICBpZiAoIW9wdGlvbnMudGhlbWUpIHtcbiAgICAgdGhlbWVzID0gdGhlbWVzLmNvbmNhdChbJ3ZpdGVzc2UtbGlnaHQnXSwgJ3ZpdGVzc2UtZGFyaycpXG4gICB9XG4gICBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy50aGVtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgdGhlbWVzLnB1c2gob3B0aW9ucy50aGVtZSlcbiAgIH1cbiAgIGVsc2Uge1xuICAgICBpZiAoJ2RhcmsnIGluIG9wdGlvbnMudGhlbWUgfHwgJ2xpZ2h0JyBpbiBvcHRpb25zLnRoZW1lKSB7XG4gICAgICAgZGFya01vZGVUaGVtZXMgPSBvcHRpb25zLnRoZW1lXG4gICAgICAgdGhlbWVzLnB1c2gob3B0aW9ucy50aGVtZS5kYXJrKVxuICAgICAgIHRoZW1lcy5wdXNoKG9wdGlvbnMudGhlbWUubGlnaHQpXG4gICAgIH1cbiAgICAgZWxzZSB7XG4gICAgICAgdGhlbWVzLnB1c2gob3B0aW9ucy50aGVtZSlcbiAgICAgfVxuICAgfVxuIFxuICAgcmV0dXJuIHtcbiAgICAgLi4ub3B0aW9ucyxcbiAgICAgdGhlbWVzLFxuICAgICBkYXJrTW9kZVRoZW1lcyA6e1xuICAgICAgIGRhcms6IGdldFRoZW1lTmFtZShkYXJrTW9kZVRoZW1lcy5kYXJrKSxcbiAgICAgICBsaWdodDogZ2V0VGhlbWVOYW1lKGRhcmtNb2RlVGhlbWVzLmxpZ2h0KSxcbiAgICAgfVxuICAgfVxuIH1cbiBcbiBjb25zdCBNYXJrZG93bkl0U2hpa2k6IE1hcmtkb3duSXQuUGx1Z2luV2l0aE9wdGlvbnM8T3B0aW9ucz4gPSAobWFya2Rvd25pdCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gICBjb25zdCBfaGlnaGxpZ2h0ZXIgPSBvcHRpb25zLmhpZ2hsaWdodGVyXG4gXG4gICBjb25zdCB7XG4gICAgIGxhbmdzLFxuICAgICB0aGVtZXMsXG4gICAgIGRhcmtNb2RlVGhlbWVzLFxuICAgICBoaWdobGlnaExpbmVDbGFzc1xuICAgfSA9IHJlc29sdmVPcHRpb25zKG9wdGlvbnMpXG4gXG4gICBsZXQgc3luY1J1bjogYW55XG4gXG4gICBpZiAoIV9oaWdobGlnaHRlcikge1xuICAgICBjb25zdCByZXF1aXJlID0gY3JlYXRlUmVxdWlyZShpbXBvcnQubWV0YS51cmwpXG4gICAgIHN5bmNSdW4gPSBjcmVhdGVTeW5jRm4ocmVxdWlyZS5yZXNvbHZlKCcuL3dvcmtlci5qcycpKVxuICAgICBzeW5jUnVuKCdnZXRIaWdobGlnaHRlcicsIHsgbGFuZ3MsIHRoZW1lcyB9KVxuICAgfVxuIFxuICAgY29uc3QgaGlnaGxpZ2h0Q29kZSA9IChjb2RlOiBzdHJpbmcsIGxhbmc6IHN0cmluZywgdGhlbWU/OiBzdHJpbmcsIGV4dE9wdD86ZXh0T3B0aW9ucyk6IHN0cmluZyA9PiB7XG4gICAgIGlmIChfaGlnaGxpZ2h0ZXIpXG4gICAgICAgcmV0dXJuIF9oaWdobGlnaHRlci5jb2RlVG9IdG1sKGNvZGUsIHsgbGFuZzogbGFuZyB8fCAndGV4dCcsIHRoZW1lIH0pXG4gXG4gICAgIHJldHVybiBzeW5jUnVuKCdjb2RlVG9IdG1sJywge1xuICAgICAgIGNvZGUsXG4gICAgICAgdGhlbWUsXG4gICAgICAgbGFuZzogbGFuZyB8fCAndGV4dCcsXG4gICAgIH0sIGV4dE9wdClcbiAgIH1cbiAgIGNvbnN0IHRyYW5zTGluZXMgPSAobGluZXM6IHN0cmluZykgPT4ge1xuICAgICBjb25zdCBsaW5lRGF0YTogbnVtYmVyW10gPSBbXVxuICAgICBsaW5lc1xuICAgICAgIC5zcGxpdCgnLCcpXG4gICAgICAgLm1hcCgodikgPT4gdi5zcGxpdCgnLScpLm1hcCgodikgPT4gcGFyc2VJbnQodiwgMTApKSlcbiAgICAgICAuZm9yRWFjaCgoW3N0YXJ0LCBlbmRdKSA9PiB7XG4gICAgICAgICBpZiAoc3RhcnQgJiYgZW5kKSB7XG4gICAgICAgICAgIGxpbmVEYXRhLnB1c2goXG4gICAgICAgICAgICAgLi4uQXJyYXkuZnJvbSh7IGxlbmd0aDogZW5kIC0gc3RhcnQgKyAxIH0sIChfLCBpKSA9PiBzdGFydCArIGkpXG4gICAgICAgICAgIClcbiAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgIGxpbmVEYXRhLnB1c2goc3RhcnQpXG4gICAgICAgICB9XG4gICAgICAgfSlcbiAgICAgcmV0dXJuIGxpbmVEYXRhXG4gICB9XG4gXG4gXG4gICBtYXJrZG93bml0Lm9wdGlvbnMuaGlnaGxpZ2h0ID0gKGNvZGUsIGxhbmcsYXR0cikgPT4ge1xuICAgICBsZXQgZXh0T3B0aW9uczpleHRPcHRpb25zID0ge31cbiAgICAgaWYgKGhpZ2hsaWdoTGluZUNsYXNzKSB7IGV4dE9wdGlvbnMuaGlnaGxpZ2hMaW5lQ2xhc3MgPSAgaGlnaGxpZ2hMaW5lQ2xhc3MgfVxuICAgICBpZihhdHRyKSB7XG4gICAgICAgY29uc3QgZXh0ID0gSlNPTjUucGFyc2UoYXR0cilcbiAgICAgICBpZiAoZXh0LnRpdGxlKSB7IGV4dE9wdGlvbnMudGl0bGUgPSAgZXh0LnRpdGxlIH1cbiAgICAgICBpZiAoZXh0LmxpbmVzKSB7XG4gICAgICAgICBleHRPcHRpb25zLmhpZ2hsaW5lcyA9IHRyYW5zTGluZXMoZXh0LmxpbmVzLnRvU3RyaW5nKCkpXG4gICAgICAgfVxuICAgICB9XG4gICAgIGlmIChkYXJrTW9kZVRoZW1lcykge1xuICAgICAgIGNvbnN0IGRhcmsgPSAgaGlnaGxpZ2h0Q29kZShjb2RlLCBsYW5nLCBkYXJrTW9kZVRoZW1lcy5kYXJrLCBleHRPcHRpb25zKVxuICAgICAgICAgLnJlcGxhY2UoJzxwcmUgY2xhc3M9XCJzaGlraVwiJywgJzxwcmUgY2xhc3M9XCJzaGlraSBzaGlraS1kYXJrXCInKVxuICAgICAgIGNvbnN0IGxpZ2h0ID0gaGlnaGxpZ2h0Q29kZShjb2RlLCBsYW5nIHx8ICd0ZXh0JywgZGFya01vZGVUaGVtZXMubGlnaHQsIGV4dE9wdGlvbnMpXG4gICAgICAgICAucmVwbGFjZSgnPHByZSBjbGFzcz1cInNoaWtpXCInLCAnPHByZSBjbGFzcz1cInNoaWtpIHNoaWtpLWxpZ2h0XCInKVxuICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cInNoaWtpLWNvbnRhaW5lclwiPiR7ZGFya30ke2xpZ2h0fTwvZGl2PmBcbiAgICAgfVxuICAgICBlbHNlIHtcbiAgICAgICByZXR1cm4gaGlnaGxpZ2h0Q29kZShjb2RlLCBsYW5nIHx8ICd0ZXh0JylcbiAgICAgfVxuICAgfVxuIH1cbiBcbiBleHBvcnQgZGVmYXVsdCBNYXJrZG93bkl0U2hpa2lcbiAiLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi93b3Jrc3BhY2Uvdml0ZXNzZURvYy9ub2RlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvd29ya3NwYWNlL3ZpdGVzc2VEb2Mvbm9kZS9pbnN0YWxsTWFya2Rvd25QbHVnaW5zLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy93b3Jrc3BhY2Uvdml0ZXNzZURvYy9ub2RlL2luc3RhbGxNYXJrZG93blBsdWdpbnMudHNcIjtpbXBvcnQgU2hpa2kgZnJvbSAnLi9tYXJrZG93bi1wbHVnaW4vc2hpa2knXG5pbXBvcnQgTGlua0F0dHJpYnV0ZXMgZnJvbSAnbWFya2Rvd24taXQtbGluay1hdHRyaWJ1dGVzJ1xuLy8gQHRzLWV4cGVjdC1lcnJvciBtaXNzaW5nIHR5cGVzXG5pbXBvcnQgVE9DIGZyb20gJ21hcmtkb3duLWl0LXRhYmxlLW9mLWNvbnRlbnRzJ1xuaW1wb3J0IGFuY2hvciBmcm9tICdtYXJrZG93bi1pdC1hbmNob3InXG5pbXBvcnQgdHlwZSBNYXJrZG93bkl0IGZyb20gJ21hcmtkb3duLWl0J1xuaW1wb3J0IHN1cCBmcm9tICdtYXJrZG93bi1pdC1zdXAnXG5pbXBvcnQgbWFyayBmcm9tICdtYXJrZG93bi1pdC1tYXJrJ1xuaW1wb3J0IHVzbHVnIGZyb20gJ3VzbHVnJ1xuaW1wb3J0IHsgY29udGFpbmVyUGx1Z2luIH0gZnJvbSAnLi9tYXJrZG93bi1wbHVnaW4vY29udGFpbmVyJ1xuaW1wb3J0IGNoZWNrYm94IGZyb20gJ21hcmtkb3duLWl0LWNoZWNrYm94J1xuLy8gaW1wb3J0IHsgcHJlV3JhcHBlclBsdWdpbiB9IGZyb20gJy4vbWFya2Rvd24tcGx1Z2luL3ByZVdyYXBwZXInXG5jb25zdCB1c2x1Z2lmeSA9IChzOiBzdHJpbmcpID0+IHVzbHVnKHMpXG5cblxuZXhwb3J0IGNvbnN0IGluc3RhbGxNYXJrZG93blBsdWdpbnMgPSBhc3luYyAobWQ6IE1hcmtkb3duSXQpID0+IHtcbiAgLyoqXG4gICAqIFx1NEVFM1x1NzgwMVx1OUFEOFx1NEVBRVxuICAgKiBzdXBwb3J0cyBoaWdobGlnaHQgbGluZXMgYW5kIGxpbmUgbnVtYmVyXG4gICAqIEBzZWUgaHR0cHM6Ly9wcmlzbWpzLmNvbS9cbiAgKi9cbiAgbWQudXNlKFNoaWtpLCB7XG4gICAgdGhlbWU6IHtcbiAgICAgIGxpZ2h0OiAndml0ZXNzZS1saWdodCcsXG4gICAgICBkYXJrOiAnbWF0ZXJpYWwtZGFya2VyJyxcbiAgICB9XG4gIH0pXG5cbiAgLyoqXG4gICAqIFx1NTkwRFx1OTAwOVx1Njg0NlxuICAgKi9cbiAgbWQudXNlKGNoZWNrYm94KVxuXG4gIC8vIFx1NEUwQVx1NjgwN1xuICBtZC51c2Uoc3VwKVxuXG4gIC8qKlxuICAgKiBAc2VlIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vbWFya2Rvd24taXQvbWFya2Rvd24taXQtY29udGFpbmVyfVxuICAgKiBcdTgxRUFcdTVCOUFcdTRFNDlcdTRFRTNcdTc4MDFcdTU3NTdcbiAgICovXG4gIG1kLnVzZShjb250YWluZXJQbHVnaW4pXG5cbiAgLyoqXG4gICAqIG1hcmtcdTY4MDdcdThCQjBcbiAgICovXG4gIG1kLnVzZShtYXJrKVxuXG4gIG1kLnVzZShhbmNob3IsIHtcbiAgICBzbHVnaWZ5OiB1c2x1Z2lmeSxcbiAgICBsZXZlbDogMSxcbiAgICBwZXJtYWxpbms6IGFuY2hvci5wZXJtYWxpbmsubGlua0luc2lkZUhlYWRlcih7XG4gICAgICBzeW1ib2w6IGBcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICA8c3ZnIGNsYXNzPVwib2N0aWNvbiBvY3RpY29uLWhlYWRlclwiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiB2ZXJzaW9uPVwiMS4xXCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNNy43NzUgMy4yNzVhLjc1Ljc1IDAgMDAxLjA2IDEuMDZsMS4yNS0xLjI1YTIgMiAwIDExMi44MyAyLjgzbC0yLjUgMi41YTIgMiAwIDAxLTIuODMgMCAuNzUuNzUgMCAwMC0xLjA2IDEuMDYgMy41IDMuNSAwIDAwNC45NSAwbDIuNS0yLjVhMy41IDMuNSAwIDAwLTQuOTUtNC45NWwtMS4yNSAxLjI1em0tNC42OSA5LjY0YTIgMiAwIDAxMC0yLjgzbDIuNS0yLjVhMiAyIDAgMDEyLjgzIDAgLjc1Ljc1IDAgMDAxLjA2LTEuMDYgMy41IDMuNSAwIDAwLTQuOTUgMGwtMi41IDIuNWEzLjUgMy41IDAgMDA0Ljk1IDQuOTVsMS4yNS0xLjI1YS43NS43NSAwIDAwLTEuMDYtMS4wNmwtMS4yNSAxLjI1YTIgMiAwIDAxLTIuODMgMHpcIj48L3BhdGg+PC9zdmc+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIGAsXG4gICAgICBwbGFjZW1lbnQ6ICdiZWZvcmUnLFxuICAgICAgc3BhY2U6IGZhbHNlXG4gICAgfSlcbiAgfSlcblxuICBtZC51c2UoTGlua0F0dHJpYnV0ZXMsIHtcbiAgICBtYXRjaGVyOiAobGluazogc3RyaW5nKSA9PiAvXmh0dHBzPzpcXC9cXC8vLnRlc3QobGluayksXG4gICAgYXR0cnM6IHtcbiAgICAgIHRhcmdldDogJ19ibGFuaycsXG4gICAgICByZWw6ICdub29wZW5lcicsXG4gICAgfSxcbiAgfSlcblxuICBtZC51c2UoVE9DLCB7XG4gICAgc2x1Z2lmeTogdXNsdWdpZnksXG4gICAgaW5jbHVkZUxldmVsOiBbMSwgMiwgMywgNCwgNSwgNl0sXG4gICAgY29udGFpbmVyQ2xhc3M6ICd0YWJsZS1vZi1jb250ZW50cycsXG4gICAgY29udGFpbmVySGVhZGVySHRtbDogJzxkaXYgY2xhc3M9XCJ0b2NIZWFkZXJcIj5PTiBUSElTIFBBR0U8L2Rpdj4nXG4gIH0pXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi93b3Jrc3BhY2Uvdml0ZXNzZURvYy9ub2RlL21hcmtkb3duLXBsdWdpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3dvcmtzcGFjZS92aXRlc3NlRG9jL25vZGUvbWFya2Rvd24tcGx1Z2luL2NvbnRhaW5lci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vd29ya3NwYWNlL3ZpdGVzc2VEb2Mvbm9kZS9tYXJrZG93bi1wbHVnaW4vY29udGFpbmVyLnRzXCI7aW1wb3J0IE1hcmtkb3duSXQgZnJvbSAnbWFya2Rvd24taXQnXG5pbXBvcnQgeyBSZW5kZXJSdWxlIH0gZnJvbSAnbWFya2Rvd24taXQvbGliL3JlbmRlcmVyJ1xuaW1wb3J0IFRva2VuIGZyb20gJ21hcmtkb3duLWl0L2xpYi90b2tlbidcbmltcG9ydCBjb250YWluZXIgZnJvbSAnbWFya2Rvd24taXQtY29udGFpbmVyJ1xuXG5leHBvcnQgY29uc3QgY29udGFpbmVyUGx1Z2luID0gKG1kOiBNYXJrZG93bkl0KSA9PiB7XG4gIG1kLnVzZSguLi5jcmVhdGVDb250YWluZXIoJ3RpcCcsICdUaXAnLCBtZCkpXG4gICAgLnVzZSguLi5jcmVhdGVDb250YWluZXIoJ2luZm8nLCAnSW5mbycsIG1kKSlcbiAgICAudXNlKC4uLmNyZWF0ZUNvbnRhaW5lcignd2FybmluZycsICdXYXJuaW5nJywgbWQpKVxuICAgIC51c2UoLi4uY3JlYXRlQ29udGFpbmVyKCdkYW5nZXInLCAnRGFuZ2VyJywgbWQpKVxuICAgIC51c2UoLi4uY3JlYXRlQ29udGFpbmVyKCdkZXRhaWxzJywgJ0RldGFpbHMnLCBtZCkpXG4gICAgLnVzZShjb250YWluZXIsICd2LXByZScsIHtcbiAgICAgIHJlbmRlcjogKHRva2VuczogVG9rZW5bXSwgaWR4OiBudW1iZXIpID0+XG4gICAgICAgIHRva2Vuc1tpZHhdLm5lc3RpbmcgPT09IDEgPyBgPGRpdiB2LXByZT5cXG5gIDogYDwvZGl2PlxcbmBcbiAgICB9KVxuICAgIC51c2UoY29udGFpbmVyLCAncmF3Jywge1xuICAgICAgcmVuZGVyOiAodG9rZW5zOiBUb2tlbltdLCBpZHg6IG51bWJlcikgPT5cbiAgICAgICAgdG9rZW5zW2lkeF0ubmVzdGluZyA9PT0gMSA/IGA8ZGl2IGNsYXNzPVwidnAtcmF3XCI+XFxuYCA6IGA8L2Rpdj5cXG5gXG4gICAgfSlcbn1cblxudHlwZSBDb250YWluZXJBcmdzID0gW3R5cGVvZiBjb250YWluZXIsIHN0cmluZywgeyByZW5kZXI6IFJlbmRlclJ1bGUgfV1cblxuZnVuY3Rpb24gY3JlYXRlQ29udGFpbmVyKFxuICBrbGFzczogc3RyaW5nLFxuICBkZWZhdWx0VGl0bGU6IHN0cmluZyxcbiAgbWQ6IE1hcmtkb3duSXRcbik6IENvbnRhaW5lckFyZ3Mge1xuICByZXR1cm4gW1xuICAgIGNvbnRhaW5lcixcbiAgICBrbGFzcyxcbiAgICB7XG4gICAgICByZW5kZXIodG9rZW5zLCBpZHgpIHtcbiAgICAgICAgY29uc3QgdG9rZW4gPSB0b2tlbnNbaWR4XVxuICAgICAgICBjb25zdCBpbmZvID0gdG9rZW4uaW5mby50cmltKCkuc2xpY2Uoa2xhc3MubGVuZ3RoKS50cmltKClcbiAgICAgICAgY29uc3QgaWNvbk1hcDp7W2tleTogc3RyaW5nXTpTdHJpbmd9ID0ge1xuICAgICAgICAgICd0aXAnOiAnPHN2ZyBjbGFzcz1cImN1c3RvbS1pY29uXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMzIgMzJcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xMSAyNGgxMHYySDExem0yIDRoNnYyaC02em0zLTI2QTEwIDEwIDAgMCAwIDYgMTJhOS4xOSA5LjE5IDAgMCAwIDMuNDYgNy42MmMxIC45MyAxLjU0IDEuNDYgMS41NCAyLjM4aDJjMC0xLjg0LTEuMTEtMi44Ny0yLjE5LTMuODZBNy4yIDcuMiAwIDAgMSA4IDEyYTggOCAwIDAgMSAxNiAwYTcuMiA3LjIgMCAwIDEtMi44MiA2LjE0Yy0xLjA3IDEtMi4xOCAyLTIuMTggMy44NmgyYzAtLjkyLjUzLTEuNDUgMS41NC0yLjM5QTkuMTggOS4xOCAwIDAgMCAyNiAxMkExMCAxMCAwIDAgMCAxNiAyelwiLz48L3N2Zz4nLFxuICAgICAgICAgICdpbmZvJzogJzxzdmcgY2xhc3M9XCJjdXN0b20taWNvblwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDMyIDMyXCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTcgMjJ2LThoLTR2MmgydjZoLTN2Mmg4di0yaC0zek0xNiA4YTEuNSAxLjUgMCAxIDAgMS41IDEuNUExLjUgMS41IDAgMCAwIDE2IDh6XCIvPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTE2IDMwYTE0IDE0IDAgMSAxIDE0LTE0YTE0IDE0IDAgMCAxLTE0IDE0Wm0wLTI2YTEyIDEyIDAgMSAwIDEyIDEyQTEyIDEyIDAgMCAwIDE2IDRaXCIvPjwvc3ZnPicsXG4gICAgICAgICAgJ3dhcm5pbmcnOiAnPHN2ZyBjbGFzcz1cImN1c3RvbS1pY29uXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMzIgMzJcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xNiAyYTE0IDE0IDAgMSAwIDE0IDE0QTE0IDE0IDAgMCAwIDE2IDJabTAgMjZhMTIgMTIgMCAxIDEgMTItMTJhMTIgMTIgMCAwIDEtMTIgMTJaXCIvPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTE1IDhoMnYxMWgtMnptMSAxNGExLjUgMS41IDAgMSAwIDEuNSAxLjVBMS41IDEuNSAwIDAgMCAxNiAyMnpcIi8+PC9zdmc+JyxcbiAgICAgICAgICAnZGFuZ2VyJzogJzxzdmcgY2xhc3M9XCJjdXN0b20taWNvblwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDMyIDMyXCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMjQuODMyIDE2Ljk2OWMtLjI3Mi0uNjQ3LS41ODItMS4zOC0uODgzLTIuMjg1Yy0uNzktMi4zNjkgMS43MzQtNC45NTMgMS43NTgtNC45NzdsLTEuNDE0LTEuNDE0Yy0uMTQuMTQtMy40MjMgMy40NzgtMi4yNDIgNy4wMjNjLjMyNi45NzguNjUyIDEuNzUuOTM4IDIuNDNBOS4zODEgOS4zODEgMCAwIDEgMjQgMjJhNi4yNCA2LjI0IDAgMCAxLTQuMTkgNS4yOTNhOC41MiA4LjUyIDAgMCAwLTIuMTAzLThsLTEuMDQ0LTEuMDQ0bC0uNTgyIDEuMzU3Yy0xLjgzNiA0LjI4NC00LjAyMSA2LjE1NC01LjMwNiA2LjkzNEE1Ljg0NCA1Ljg0NCAwIDAgMSA4IDIyYTkuNjI0IDkuNjI0IDAgMCAxIC45MjktMy42MjlBMTEuMzMzIDExLjMzMyAwIDAgMCAxMCAxNHYtMS43NzhjLjg3NC4zNiAyIDEuMzAzIDIgMy43Nzh2Mi42MDNsMS43NDMtMS45MzRjMy4xMTItMy40NTQgMi40NjMtNy41NjcgMS4yMDYtMTAuMzA4QTQuNDg2IDQuNDg2IDAgMCAxIDE4IDExaDJjMC01LjUzNy00LjU3OS03LTctN2gtMmwxLjIgMS41OTljLjEzNy4xODUgMi44NjIgMy45MjcgMS4zNTMgNy42ODhBNC45NDMgNC45NDMgMCAwIDAgOSAxMEg4djRhOS42MjQgOS42MjQgMCAwIDEtLjkyOSAzLjYyOUExMS4zMzMgMTEuMzMzIDAgMCAwIDYgMjJjMCAzLjg0OCAzLjgyMyA4IDEwIDhzMTAtNC4xNTIgMTAtOGExMS4zNzcgMTEuMzc3IDAgMCAwLTEuMTY4LTUuMDMxWk0xMi44MzUgMjcuNTI2YTE2LjQ5OSAxNi40OTkgMCAwIDAgNC4zNjctNS41OThhNi4xMDUgNi4xMDUgMCAwIDEgLjI1NyA1Ljk3MUExMS4zMjEgMTEuMzIxIDAgMCAxIDE2IDI4YTEwLjMyOCAxMC4zMjggMCAwIDEtMy4xNjUtLjQ3NFpcIi8+PC9zdmc+JyxcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpY29uQ2xhc3MgPSBpY29uTWFwW2tsYXNzXSB8fCAnJ1xuICAgICAgICBpZiAodG9rZW4ubmVzdGluZyA9PT0gMSkge1xuICAgICAgICAgIGNvbnN0IHRpdGxlID0gbWQucmVuZGVySW5saW5lKGluZm8gfHwgZGVmYXVsdFRpdGxlKVxuICAgICAgICAgIGlmIChrbGFzcyA9PT0gJ2RldGFpbHMnKSB7XG4gICAgICAgICAgICByZXR1cm4gYDxkZXRhaWxzIGNsYXNzPVwiJHtrbGFzc30gY3VzdG9tLWJsb2NrXCI+PHN1bW1hcnk+JHt0aXRsZX08L3N1bW1hcnk+XFxuYFxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCIke2tsYXNzfSBjdXN0b20tYmxvY2tcIj48ZGl2IGNsYXNzPVwiY3VzdG9tLWljb25cIj4ke2ljb25DbGFzc308c3BhbiBjbGFzcz1cImN1c3RvbS1ibG9jay10aXRsZVwiPiR7dGl0bGV9PC9zcGFuPjwvZGl2PlxcbmBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4ga2xhc3MgPT09ICdkZXRhaWxzJyA/IGA8L2RldGFpbHM+XFxuYCA6IGA8L2Rpdj5cXG5gXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIF1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVAsT0FBTyxVQUFVO0FBQ2xRLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxxQkFBcUI7QUFDNUIsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sY0FBYztBQUNyQixPQUFPLGFBQWE7QUFDcEIsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sWUFBWTtBQUduQjtBQUFBLEVBQ0U7QUFBQSxPQUNLOzs7QUNoQnlQLFNB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QUFDO0FBQUEsSUFNRCxRQUFRO0FBQUEsSUFNUixXQUFXO0FBQUEsTUFDVCxTQUFTO0FBQUEsUUFDUDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLE1BQ0EsS0FBSztBQUFBLE1BQ0wsTUFBTTtBQUFBLFFBQ0o7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLE1BQ0EsYUFBYTtBQUFBLElBQ2YsQ0FBQztBQUFBLElBTUQsV0FBVztBQUFBLE1BQ1QsWUFBWSxDQUFDLE9BQU8sSUFBSTtBQUFBLE1BQ3hCLFNBQVMsQ0FBQyxVQUFVLGNBQWMsT0FBTztBQUFBLE1BQ3pDLEtBQUs7QUFBQSxNQUNMLFdBQVc7QUFBQSxRQUNULG9CQUFvQjtBQUFBLE1BQ3RCO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFNRCxPQUFPO0FBQUEsSUFPUCxTQUFTO0FBQUEsTUFFUCxhQUFhO0FBQUEsTUFDYixtQkFBbUI7QUFBQSxRQUNqQixRQUFRO0FBQUEsTUFDVjtBQUFBLE1BQ0EsZ0JBQWdCO0FBQUEsTUFDaEIsaUJBQWlCLENBQUMsT0FBTyx1QkFBdUIsRUFBRTtBQUFBLElBQ3BELENBQUM7QUFBQSxJQU1ELFFBQVE7QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLGlCQUFpQjtBQUFBLE1BQ2pCLFNBQVMsQ0FBQyxLQUFLLFFBQVFBLG1DQUFXLFlBQVksQ0FBQztBQUFBLElBQ2pELENBQUM7QUFBQSxJQUtELFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFNQSxZQUFZO0FBQUEsSUFDVixRQUFRO0FBQUEsSUFDUixZQUFZO0FBQUEsSUFDWixhQUFhO0FBQUUsc0JBQWdCO0FBQUEsSUFBRTtBQUFBLEVBQ25DO0FBQUEsRUFFQSxLQUFLO0FBQUEsSUFFSCxZQUFZLENBQUMsa0JBQWtCLFVBQVU7QUFBQSxFQUMzQztBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInBhdGgiLCAicmVxdWlyZSIsICJ2IiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIl0KfQo=
