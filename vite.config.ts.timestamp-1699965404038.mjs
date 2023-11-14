// vite.config.ts
import path from "path";
import { defineConfig } from "file:///Users/yoey/Desktop/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+vite@3.2.4/node_modules/vite/dist/node/index.js";
import Vue from "file:///Users/yoey/Desktop/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+@vitejs+plugin-vue@3.2.0_vite@3.2.4+vue@3.2.45/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Pages from "file:///Users/yoey/Desktop/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-pages@0.27.1_vite@3.2.4/node_modules/vite-plugin-pages/dist/index.mjs";
import generateSitemap from "file:///Users/yoey/Desktop/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+vite-ssg-sitemap@0.3.2/node_modules/vite-ssg-sitemap/dist/index.js";
import Layouts from "file:///Users/yoey/Desktop/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-vue-layouts@0.7.0_ltio2jrs4h243s6indlqgywoku/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import Components from "file:///Users/yoey/Desktop/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+unplugin-vue-components@0.22.9_vue@3.2.45/node_modules/unplugin-vue-components/dist/vite.mjs";
import AutoImport from "file:///Users/yoey/Desktop/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+unplugin-auto-import@0.11.4_@vueuse+core@9.5.0/node_modules/unplugin-auto-import/dist/vite.js";
import Markdown from "file:///Users/yoey/Desktop/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-vue-markdown@0.21.1_vite@3.2.4/node_modules/vite-plugin-vue-markdown/dist/index.mjs";
import VueI18n from "file:///Users/yoey/Desktop/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+@intlify+vite-plugin-vue-i18n@6.0.3_vite@3.2.4+vue-i18n@9.2.2/node_modules/@intlify/vite-plugin-vue-i18n/lib/index.mjs";
import Inspect from "file:///Users/yoey/Desktop/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-inspect@0.6.1_vite@3.2.4/node_modules/vite-plugin-inspect/dist/index.mjs";
import Unocss from "file:///Users/yoey/Desktop/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+unocss@0.45.30_vite@3.2.4/node_modules/unocss/dist/vite.mjs";
import {
  ElementPlusResolver
} from "file:///Users/yoey/Desktop/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+unplugin-vue-components@0.22.9_vue@3.2.45/node_modules/unplugin-vue-components/dist/resolvers.mjs";

// node/resolveBlog.ts
import { resolve } from "path";
import fs from "file:///Users/yoey/Desktop/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+fs-extra@10.1.0/node_modules/fs-extra/lib/index.js";
import matter from "file:///Users/yoey/Desktop/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+gray-matter@4.0.3/node_modules/gray-matter/index.js";
import dayjs from "file:///Users/yoey/Desktop/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+dayjs@1.11.6/node_modules/dayjs/dayjs.min.js";
var __vite_injected_original_dirname = "/Users/yoey/Desktop/vitesseDoc/node";
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
import { createSyncFn } from "file:///Users/yoey/Desktop/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+synckit@0.8.4/node_modules/synckit/lib/index.js";
import JSON5 from "file:///Users/yoey/Desktop/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+json5@2.2.1/node_modules/json5/lib/index.js";
var __vite_injected_original_import_meta_url = "file:///Users/yoey/Desktop/vitesseDoc/node/markdown-plugin/shiki/index.ts";
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
import LinkAttributes from "file:///Users/yoey/Desktop/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+markdown-it-link-attributes@4.0.1/node_modules/markdown-it-link-attributes/index.js";
import TOC from "file:///Users/yoey/Desktop/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+markdown-it-table-of-contents@0.6.0/node_modules/markdown-it-table-of-contents/index.js";
import anchor from "file:///Users/yoey/Desktop/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+markdown-it-anchor@8.6.5/node_modules/markdown-it-anchor/dist/markdownItAnchor.js";
import sup from "file:///Users/yoey/Desktop/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+markdown-it-sup@1.0.0/node_modules/markdown-it-sup/index.js";
import mark from "file:///Users/yoey/Desktop/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+markdown-it-mark@3.0.1/node_modules/markdown-it-mark/index.js";
import uslug from "file:///Users/yoey/Desktop/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+uslug@1.0.4/node_modules/uslug/index.js";

// node/markdown-plugin/container.ts
import container from "file:///Users/yoey/Desktop/vitesseDoc/node_modules/.pnpm/registry.npmmirror.com+markdown-it-container@3.0.0/node_modules/markdown-it-container/index.js";
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
import checkbox from "file:///Users/yoey/Desktop/vitesseDoc/node_modules/.pnpm/markdown-it-checkbox@1.1.0/node_modules/markdown-it-checkbox/index.js";
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
var __vite_injected_original_dirname2 = "/Users/yoey/Desktop/vitesseDoc";
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
        { dir: "pages", baseRoute: "" },
        { dir: "share", baseRoute: "share" }
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
        quotes: `""''`,
        html: true,
        linkify: true,
        typographer: true
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibm9kZS9yZXNvbHZlQmxvZy50cyIsICJub2RlL3JlYWRpbmdUaW1lLnRzIiwgIm5vZGUvbWFya2Rvd24tcGx1Z2luL3NoaWtpL2luZGV4LnRzIiwgIm5vZGUvaW5zdGFsbE1hcmtkb3duUGx1Z2lucy50cyIsICJub2RlL21hcmtkb3duLXBsdWdpbi9jb250YWluZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMveW9leS9EZXNrdG9wL3ZpdGVzc2VEb2NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy95b2V5L0Rlc2t0b3Avdml0ZXNzZURvYy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMveW9leS9EZXNrdG9wL3ZpdGVzc2VEb2Mvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCBWdWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IFBhZ2VzIGZyb20gJ3ZpdGUtcGx1Z2luLXBhZ2VzJ1xuaW1wb3J0IGdlbmVyYXRlU2l0ZW1hcCBmcm9tICd2aXRlLXNzZy1zaXRlbWFwJ1xuaW1wb3J0IExheW91dHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWxheW91dHMnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBNYXJrZG93biBmcm9tICd2aXRlLXBsdWdpbi12dWUtbWFya2Rvd24nXG5pbXBvcnQgVnVlSTE4biBmcm9tICdAaW50bGlmeS92aXRlLXBsdWdpbi12dWUtaTE4bidcbmltcG9ydCBJbnNwZWN0IGZyb20gJ3ZpdGUtcGx1Z2luLWluc3BlY3QnXG5pbXBvcnQgVW5vY3NzIGZyb20gJ3Vub2Nzcy92aXRlJ1xuXG4vLyBpbXBvcnQgZWxlbWVudHVpLXBsdXNcbmltcG9ydCB7XG4gIEVsZW1lbnRQbHVzUmVzb2x2ZXJcbn0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuXG5pbXBvcnQge1xuICByZXNvbHZlQmxvZ0ZpbGUsXG4gIHJlc29sdmVCbG9nTGlzdCxcbiAgaW5zdGFsbE1hcmtkb3duUGx1Z2luc1xufSBmcm9tIFwiLi9ub2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ34vJzogYCR7cGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpfS9gLFxuICAgIH0sXG4gIH0sXG4gIGRlZmluZToge1xuICAgICdpbXBvcnQubWV0YS5lbnYuX19CVUlMRF9USU1FX18nOiBKU09OLnN0cmluZ2lmeShuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkpLFxuICB9LFxuXG4gIHBsdWdpbnM6IFtcbiAgICBWdWUoe1xuICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLm1kJC9dLFxuICAgICAgcmVhY3Rpdml0eVRyYW5zZm9ybTogdHJ1ZVxuICAgIH0pLFxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFx1NTdGQVx1NEU4RVx1NjU4N1x1NEVGNlx1NzY4NFx1OERFRlx1NzUzMVxuICAgICAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2hhbm5vZXJ1L3ZpdGUtcGx1Z2luLXBhZ2VzXG4gICAgICovXG4gICAgUGFnZXMoe1xuICAgICAgZGlyczogW1xuICAgICAgICAvLyBibG9nIGxpc3RcbiAgICAgICAgeyBkaXI6ICdwYWdlcycsIGJhc2VSb3V0ZTogJycgfSxcbiAgICAgICAgeyBkaXI6ICdzaGFyZScsIGJhc2VSb3V0ZTogJ3NoYXJlJyB9LFxuICAgICAgXSxcbiAgICAgIGV4dGVuc2lvbnM6IFtcInZ1ZVwiLCBcIm1kXCIsIFwianNcIiwgXCJ0c1wiXSxcbiAgICAgIC8vIEEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHJvdXRlIGFuZCBvcHRpb25hbGx5IHJldHVybnMgYSBtb2RpZmllZCByb3V0ZVxuICAgICAgLy8gVGhpcyBpcyB1c2VmdWwgZm9yIGF1Z21lbnRpbmcgeW91ciByb3V0ZXMgd2l0aCBleHRyYSBkYXRhIChlLmcuIHJvdXRlIG1ldGFkYXRhKS5cbiAgICAgIGV4dGVuZFJvdXRlOiAocm91dGUpID0+IHJlc29sdmVCbG9nRmlsZShyb3V0ZSksXG4gICAgICAvLyBBIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBnZW5lcmF0ZWQgcm91dGVzIGFuZCBvcHRpb25hbGx5IHJldHVybnMgYSBtb2RpZmllZCBnZW5lcmF0ZWQgcm91dGVzLlxuICAgICAgb25Sb3V0ZXNHZW5lcmF0ZWQ6IChyb3V0ZXMpID0+IHJlc29sdmVCbG9nTGlzdChyb3V0ZXMpXG4gICAgfSksXG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gXHU1RTAzXHU1QzQwXHU3Q0ZCXHU3RURGXG4gICAgICogQHNlZSAgaHR0cHM6Ly9naXRodWIuY29tL0pvaG5DYW1waW9uSnIvdml0ZS1wbHVnaW4tdnVlLWxheW91dHNcbiAgICAgKi9cbiAgICBMYXlvdXRzKCksXG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gQVBJIFx1ODFFQVx1NTJBOFx1NTJBMFx1OEY3RCAtIFx1NzZGNFx1NjNBNVx1NEY3Rlx1NzUyOCBDb21wb3NpdGlvbiBBUEkgXHU2NUUwXHU5NzAwXHU1RjE1XHU1MTY1XG4gICAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5wbHVnaW4tYXV0by1pbXBvcnRcbiAgICAgKi9cbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIGltcG9ydHM6IFtcbiAgICAgICAgJ3Z1ZScsXG4gICAgICAgICd2dWUtcm91dGVyJyxcbiAgICAgICAgJ3Z1ZS1pMThuJyxcbiAgICAgICAgJ3Z1ZS9tYWNyb3MnLFxuICAgICAgICAnQHZ1ZXVzZS9oZWFkJyxcbiAgICAgICAgJ0B2dWV1c2UvY29yZScsXG4gICAgICBdLFxuICAgICAgZHRzOiAnc3JjL2F1dG8taW1wb3J0cy5kLnRzJyxcbiAgICAgIGRpcnM6IFtcbiAgICAgICAgJ3NyYy9jb21wb3NhYmxlcycsXG4gICAgICAgICdzcmMvc3RvcmUnLFxuICAgICAgXSxcbiAgICAgIHZ1ZVRlbXBsYXRlOiB0cnVlLFxuICAgIH0pLFxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFx1N0VDNFx1NEVGNlx1ODFFQVx1NTJBOFx1NTMxNlx1NTJBMFx1OEY3RFxuICAgICAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzXG4gICAgICovXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICBleHRlbnNpb25zOiBbJ3Z1ZScsICdtZCddLFxuICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS8sIC9cXC5tZCQvXSxcbiAgICAgIGR0czogJ3NyYy9jb21wb25lbnRzLmQudHMnLFxuICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgIEVsZW1lbnRQbHVzUmVzb2x2ZXIoKVxuICAgICAgXSxcbiAgICB9KSxcblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBcdTlBRDhcdTYwMjdcdTgwRkRcdTRFMTRcdTY3ODFcdTUxNzdcdTcwNzVcdTZEM0JcdTYwMjdcdTc2ODRcdTUzNzNcdTY1RjZcdTUzOUZcdTVCNTBcdTUzMTYgQ1NTIFx1NUYxNVx1NjRDRSwgc2VlIHVub2Nzcy5jb25maWcudHMgZm9yIGNvbmZpZ1xuICAgICAqIEBzZWUgIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bm9jc3NcbiAgICAgKi9cbiAgICBVbm9jc3MoKSxcblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3ZpdGUtcGx1Z2luLXZ1ZS1tYXJrZG93blxuICAgICAqIEBzZWUgaHR0cHM6Ly9tYXJrZG93bi1pdC5naXRodWIuaW8vbWFya2Rvd24taXQvXG4gICAgICovXG4gICAgTWFya2Rvd24oe1xuICAgICAgLy8gd3JhcHBlckNvbXBvbmVudDogJ3Bvc3QnLFxuICAgICAgaGVhZEVuYWJsZWQ6IHRydWUsXG4gICAgICBtYXJrZG93bkl0T3B0aW9uczoge1xuICAgICAgICBxdW90ZXM6ICdcIlwiXFwnXFwnJyxcbiAgICAgICAgaHRtbDogdHJ1ZSxcbiAgICAgICAgbGlua2lmeTogdHJ1ZSxcbiAgICAgICAgdHlwb2dyYXBoZXI6IHRydWUsXG4gICAgICB9LFxuICAgICAgd3JhcHBlckNsYXNzZXM6ICdwcm9zZSAgIG14LWF1dG8gdGV4dC1sZWZ0IHNsaWRlLWVudGVyLWNvbnRlbnQnLFxuICAgICAgbWFya2Rvd25JdFNldHVwOiAobWQpID0+IGluc3RhbGxNYXJrZG93blBsdWdpbnMobWQpXG4gICAgfSksXG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9pbnRsaWZ5L2J1bmRsZS10b29scy90cmVlL21haW4vcGFja2FnZXMvdml0ZS1wbHVnaW4tdnVlLWkxOG5cbiAgICAgKi9cbiAgICBWdWVJMThuKHtcbiAgICAgIHJ1bnRpbWVPbmx5OiB0cnVlLFxuICAgICAgY29tcG9zaXRpb25Pbmx5OiB0cnVlLFxuICAgICAgaW5jbHVkZTogW3BhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdsb2NhbGVzLyoqJyldLFxuICAgIH0pLFxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiAgVmlzaXQgaHR0cDovL2hvc3Q6cG9ydC9fX2luc3BlY3QvIHRvIHNlZSB0aGUgaW5zcGVjdG9yXG4gICAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdml0ZS1wbHVnaW4taW5zcGVjdFxuICAgICAqL1xuICAgIEluc3BlY3QoKSxcbiAgXSxcblxuXG4gIC8qKlxuICAgKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS92aXRlLXNzZ1xuICAgKi9cbiAgc3NnT3B0aW9uczoge1xuICAgIHNjcmlwdDogJ2FzeW5jJyxcbiAgICBmb3JtYXR0aW5nOiAnbWluaWZ5JyxcbiAgICBvbkZpbmlzaGVkKCkgeyBnZW5lcmF0ZVNpdGVtYXAoKSB9LFxuICB9LFxuXG4gIHNzcjoge1xuICAgIC8vIFRPRE86IHdvcmthcm91bmQgdW50aWwgdGhleSBzdXBwb3J0IG5hdGl2ZSBFU01cbiAgICBub0V4dGVybmFsOiBbJ3dvcmtib3gtd2luZG93JywgL3Z1ZS1pMThuL10sXG4gIH0sXG59KVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMveW9leS9EZXNrdG9wL3ZpdGVzc2VEb2Mvbm9kZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3lvZXkvRGVza3RvcC92aXRlc3NlRG9jL25vZGUvcmVzb2x2ZUJsb2cudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3lvZXkvRGVza3RvcC92aXRlc3NlRG9jL25vZGUvcmVzb2x2ZUJsb2cudHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSdcbmltcG9ydCBtYXR0ZXIgZnJvbSAnZ3JheS1tYXR0ZXInXG5pbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnXG5pbXBvcnQgeyByZWFkaW5nVGltZSB9IGZyb20gJy4nXG5cbi8qKlxuICogXHU4OUUzXHU2NzkwXHU1MzVBXHU1QkEyXHU2NTg3XHU0RUY2LFx1NUMwNlx1NTM1QVx1NUJBMlx1NzY4NFx1NUUwM1x1NUM0MFx1N0NGQlx1N0VERlx1OEJCRVx1N0Y2RVx1NEUzQSBwb3N0LCBcdTVFNzZcdTRFMTRcdTVDMDZcdTUzNUFcdTVCQTJcdTUxNDNcdTY1NzBcdTYzNkVcdTUxOTlcdTUxNjUgcm91dGUubWV0YSBcdTRFMkRcbiAqL1xuZXhwb3J0IGNvbnN0IHJlc29sdmVCbG9nRmlsZSA9IChyb3V0ZTogYW55KSA9PiB7XG4gIGlmICghcm91dGUucGF0aC5zdGFydHNXaXRoKCcvcG9zdHMnKSB8fCByb3V0ZS5wYXRoID09PSAnL3Bvc3RzJylcbiAgICByZXR1cm5cblxuICBjb25zdCBwYXRoID0gcmVzb2x2ZShfX2Rpcm5hbWUsICcuLicsIHJvdXRlLmNvbXBvbmVudC5zbGljZSgxKSlcbiAgY29uc3QgbWQgPSBmcy5yZWFkRmlsZVN5bmMocGF0aCwgJ3V0Zi04JylcbiAgY29uc3QgeyBjb250ZW50LCBkYXRhIH0gPSBtYXR0ZXIobWQpXG5cbiAgcm91dGUubWV0YSA9IE9iamVjdC5hc3NpZ24ocm91dGUubWV0YSB8fCB7fSwge1xuICAgIHBhdGg6cm91dGUucGF0aCxcbiAgICBmcm9udG1hdHRlcjogZGF0YSxcbiAgICBsYXlvdXQ6ICdwb3N0JyxcbiAgICBkYXRlOiBkYXlqcyhkYXRhLmRhdGUpLmZvcm1hdCgnWVlZWS1NTS1ERCcpLFxuICAgIHJlYWRpbmdUaW1lOiByZWFkaW5nVGltZShjb250ZW50KVxuICB9KVxuICByZXR1cm4gcm91dGVcbn1cblxuLyoqXG4gKiBcdTY3ODRcdTVFRkFcdTUzNUFcdTVCQTJcdTc2ODRcdTk0RkVcdTg4NjgoXHU2MzA5XHU2NTg3XHU0RUY2XHU3Njg0IGRhdGUgXHU2MzkyXHU1RThGKVxuICovXG5leHBvcnQgY29uc3QgcmVzb2x2ZUJsb2dMaXN0ID0gKHJvdXRlczogYW55W10pID0+IHtcbiAgY29uc3QgYmxvZ3MgPSByb3V0ZXNcbiAgICAuZmlsdGVyKChpdGVtOiBhbnkpID0+IGl0ZW0ubWV0YT8ubGF5b3V0ID09PSAncG9zdCcpXG4gICAgLm1hcCgoaXRlbTogYW55KSA9PiAoe1xuICAgICAgcGF0aDogaXRlbS5wYXRoLFxuICAgICAgdGl0bGU6IGl0ZW0ubWV0YS5mcm9udG1hdHRlci50aXRsZSxcbiAgICAgIGRhdGU6IGl0ZW0ubWV0YS5kYXRlLFxuICAgIH0pKVxuICAgIC5zb3J0KChhOiBhbnksIGI6IGFueSkgPT4gZGF5anMoYi5kYXRlKS51bml4KCkgLSBkYXlqcyhhLmRhdGUpLnVuaXgoKSlcblxuICByZXR1cm4gcm91dGVzLm1hcCgoaXRlbSkgPT4ge1xuICAgIGNvbnN0IGkgPSBibG9ncy5maW5kSW5kZXgoYmxvZyA9PiBibG9nLnBhdGggPT09IGl0ZW0ucGF0aClcblxuICAgIGl0ZW0ubWV0YSA9IHtcbiAgICAgIC4uLml0ZW0ubWV0YSxcbiAgICAgIHByZXY6IGkgPCBibG9ncy5sZW5ndGggPyBibG9nc1tpICsgMV0gOiBudWxsLFxuICAgICAgbmV4dDogaSA+IDAgPyBibG9nc1tpIC0gMV0gOiBudWxsLFxuICAgIH1cbiAgICByZXR1cm4gaXRlbVxuICB9KVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMveW9leS9EZXNrdG9wL3ZpdGVzc2VEb2Mvbm9kZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3lvZXkvRGVza3RvcC92aXRlc3NlRG9jL25vZGUvcmVhZGluZ1RpbWUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3lvZXkvRGVza3RvcC92aXRlc3NlRG9jL25vZGUvcmVhZGluZ1RpbWUudHNcIjtleHBvcnQgaW50ZXJmYWNlIFJlYWRpbmdUaW1lT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgQ2hpbmVzZSB3b3JkcyBwZXIgbWludXRlIGEgdXNlciBjYW4gcmVhZFxuICAgKlxuICAgKiBAZGVmYXVsdCAzMDBcbiAgICovXG4gIHdvcmRzUGVyTWludXRlQ04/OiBudW1iZXJcblxuICAvKipcbiAgICogTnVtYmVyIG9mIEVuZ2xpc2ggd29yZHMgcGVyIG1pbnV0ZSBhIHVzZXIgY2FuIHJlYWRcbiAgICpcbiAgICogQGRlZmF1bHQgMjAwXG4gICAqL1xuICB3b3Jkc1Blck1pbnV0ZUVOPzogbnVtYmVyXG5cbiAgLyoqXG4gICAqIEV4Y2x1ZGVzIGFsbCBjb250ZW50IGluc2lkZSBjb2RlIGJsb2NrcyBvciBub3RcbiAgICpcbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGV4Y2x1ZGVDb2RlQmxvY2s/OiBib29sZWFuXG5cbiAgLyoqXG4gICAqIEV4Y2x1ZGVzIGFsbCBjb250ZW50IGluc2lkZSB0ZXggYmxvY2tzIG9yIG5vdFxuICAgKlxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgZXhjbHVkZVRleEJsb2NrPzogYm9vbGVhblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlYWRpbmdUaW1lIHtcbiAgLyoqXG4gICAqIEV4cGVjdCByZWFkaW5nIHRpbWUgKG51bWJlciBvZiBtaW51dGVzKVxuICAgKi9cbiAgbWludXRlczogbnVtYmVyXG4gIC8qKlxuICAgKiBOdW1iZXIgb2Ygd29yZHMgb2YgdGhlIHBhZ2VcbiAgICovXG4gIHdvcmRzOiBudW1iZXJcbn1cblxuY29uc3QgZ2V0TnVtQ04gPSAodGV4dDogc3RyaW5nKTogbnVtYmVyID0+IHtcbiAgcmV0dXJuICh0ZXh0Lm1hdGNoKC9bXFx1NEUwMC1cXHU5RkE1XS9nKSB8fCBbXSkubGVuZ3RoXG59XG5cbmNvbnN0IGdldE51bUVOID0gKHRleHQ6IHN0cmluZyk6IG51bWJlciA9PiB7XG4gIHJldHVybiAoXG4gICAgdGV4dFxuICAgICAgLnJlcGxhY2UoL1tcXHU0RTAwLVxcdTlGQTVdL2csICcnKVxuICAgICAgLm1hdGNoKFxuICAgICAgICAvW2EtekEtWjAtOV9cXHUwMzkyLVxcdTAzQzlcXHUwNDAwLVxcdTA0RkZdK3xbXFx1NEUwMC1cXHU5RkZGXFx1MzQwMC1cXHU0REJGXFx1RjkwMC1cXHVGQUZGXFx1MzA0MC1cXHUzMDlGXFx1QUMwMC1cXHVEN0FGXFx1MDQwMC1cXHUwNEZGXSt8W1xcdTAwRTRcXHUwMEM0XFx1MDBFNVxcdTAwQzVcXHUwMEY2XFx1MDBENl0rfFxcdysvZyxcbiAgICAgICkgfHwgW11cbiAgKS5sZW5ndGhcbn1cblxuY29uc3QgZXhjbHVkZUNvZGVCbG9jayA9ICh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gdGV4dC5yZXBsYWNlKC9gYGBbXFxzXFxTXSo/YGBgL2csICcnKVxufVxuXG5jb25zdCBleGNsdWRlVGV4QmxvY2sgPSAodGV4dDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIHRleHQucmVwbGFjZSgvXFwkXFwkW1xcc1xcU10qP1xcJFxcJC9nLCAnJylcbn1cblxuZXhwb3J0IGNvbnN0IHJlYWRpbmdUaW1lID0gKFxuICB0ZXh0OiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBSZWFkaW5nVGltZU9wdGlvbnMsXG4pOiBSZWFkaW5nVGltZSA9PiB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cbiAgLy8gdXNlIGRlZmF1bHQgdmFsdWVzIGlmIG5lY2Vzc2FyeVxuICBvcHRpb25zLndvcmRzUGVyTWludXRlQ04gPSBvcHRpb25zLndvcmRzUGVyTWludXRlQ04gfHwgMzAwXG4gIG9wdGlvbnMud29yZHNQZXJNaW51dGVFTiA9IG9wdGlvbnMud29yZHNQZXJNaW51dGVFTiB8fCAyMDBcblxuICAvLyBleGNsdWRlIGFsbCBjb250ZW50IGluc2lkZSBjb2RlIGJsb2Nrc1xuICBpZiAob3B0aW9ucy5leGNsdWRlQ29kZUJsb2NrKVxuICAgIHRleHQgPSBleGNsdWRlQ29kZUJsb2NrKHRleHQpXG4gIC8vIGV4Y2x1ZGUgYWxsIGNvbnRlbnQgaW5zaWRlIHRleCBibG9ja3NcbiAgaWYgKG9wdGlvbnMuZXhjbHVkZVRleEJsb2NrKVxuICAgIHRleHQgPSBleGNsdWRlVGV4QmxvY2sodGV4dClcblxuICAvLyBudW1iZXIgb2YgY2hpbmVzZSB3b3JkcyBhbmQgZW5nbGlzaCB3b3Jkc1xuICBjb25zdCBjbnRDTiA9IGdldE51bUNOKHRleHQgfHwgJycpXG4gIGNvbnN0IGNudEVOID0gZ2V0TnVtRU4odGV4dCB8fCAnJylcblxuICAvLyBjb21wdXRlIHJlYWRpbmcgdGltZVxuICBsZXQgbWludXRlc1xuICAgID0gY250Q04gLyBvcHRpb25zLndvcmRzUGVyTWludXRlQ04gKyBjbnRFTiAvIG9wdGlvbnMud29yZHNQZXJNaW51dGVFTlxuICBtaW51dGVzID0gbWludXRlcyA8IDEgPyAxIDogTWF0aC5jZWlsKE51bWJlcihtaW51dGVzLnRvRml4ZWQoMikpKVxuXG4gIHJldHVybiB7XG4gICAgbWludXRlcyxcbiAgICB3b3JkczogY250Q04gKyBjbnRFTixcbiAgfVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMveW9leS9EZXNrdG9wL3ZpdGVzc2VEb2Mvbm9kZS9tYXJrZG93bi1wbHVnaW4vc2hpa2lcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy95b2V5L0Rlc2t0b3Avdml0ZXNzZURvYy9ub2RlL21hcmtkb3duLXBsdWdpbi9zaGlraS9pbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMveW9leS9EZXNrdG9wL3ZpdGVzc2VEb2Mvbm9kZS9tYXJrZG93bi1wbHVnaW4vc2hpa2kvaW5kZXgudHNcIjsvKipcbiAqIGluc3BpcmVkIGJ5IHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvbWFya2Rvd24taXQtc2hpa2l9XG4gKiBzdXBwb3J0IGhpZ2hsaWdodCBsaW5lc1xuICovXG4gaW1wb3J0IHsgY3JlYXRlUmVxdWlyZSB9IGZyb20gJ21vZHVsZSdcbiBpbXBvcnQgeyBjcmVhdGVTeW5jRm4gfSBmcm9tICdzeW5ja2l0J1xuIGltcG9ydCB0eXBlIHsgSGlnaGxpZ2h0ZXIsIElMYW5ndWFnZVJlZ2lzdHJhdGlvbiwgSVNoaWtpVGhlbWUsIElUaGVtZVJlZ2lzdHJhdGlvbiB9IGZyb20gJ3NoaWtpJ1xuIGltcG9ydCB0eXBlIE1hcmtkb3duSXQgZnJvbSAnbWFya2Rvd24taXQnXG4gaW1wb3J0IEpTT041IGZyb20gJ2pzb241J1xuIFxuIGludGVyZmFjZSBleHRPcHRpb25zIHtcbiAgIHRpdGxlPzogU3RyaW5nLFxuICAgaGlnaGxpZ2hMaW5lQ2xhc3M/OiBzdHJpbmcsXG4gICBoaWdobGluZXM/OiBudW1iZXJbXVxuIH1cbiBcbiBleHBvcnQgaW50ZXJmYWNlIERhcmtNb2RlVGhlbWVzIHtcbiAgIGRhcms6IElUaGVtZVJlZ2lzdHJhdGlvblxuICAgbGlnaHQ6IElUaGVtZVJlZ2lzdHJhdGlvblxuIH1cbiBcbiBleHBvcnQgaW50ZXJmYWNlIE9wdGlvbnMge1xuICAgdGhlbWU/OiBEYXJrTW9kZVRoZW1lc1xuICAgbGFuZ3M/OiBJTGFuZ3VhZ2VSZWdpc3RyYXRpb25bXVxuICAgdGltZW91dD86IG51bWJlclxuICAgaGlnaGxpZ2h0ZXI/OiBIaWdobGlnaHRlcixcbiAgIGhpZ2hsaWdoTGluZUNsYXNzPzogc3RyaW5nXG4gfVxuIFxuIGZ1bmN0aW9uIGdldFRoZW1lTmFtZSh0aGVtZTogSVRoZW1lUmVnaXN0cmF0aW9uKSB7XG4gICBpZiAodHlwZW9mIHRoZW1lID09PSAnc3RyaW5nJylcbiAgICAgcmV0dXJuIHRoZW1lXG4gICByZXR1cm4gKHRoZW1lIGFzIElTaGlraVRoZW1lKS5uYW1lXG4gfVxuIFxuIGV4cG9ydCBmdW5jdGlvbiByZXNvbHZlT3B0aW9ucyhvcHRpb25zOiBPcHRpb25zKSB7XG4gICBsZXQgdGhlbWVzOiBJVGhlbWVSZWdpc3RyYXRpb25bXSA9IFtdXG4gICBsZXQgZGFya01vZGVUaGVtZXM6IERhcmtNb2RlVGhlbWVzID0ge1xuICAgICBsaWdodDogJ3ZpdGVzc2UtbGlnaHQnLFxuICAgICBkYXJrOiAndml0ZXNzZS1kYXJrJ1xuICAgfVxuIFxuICAgaWYgKCFvcHRpb25zLnRoZW1lKSB7XG4gICAgIHRoZW1lcyA9IHRoZW1lcy5jb25jYXQoWyd2aXRlc3NlLWxpZ2h0J10sICd2aXRlc3NlLWRhcmsnKVxuICAgfVxuICAgZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMudGhlbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgIHRoZW1lcy5wdXNoKG9wdGlvbnMudGhlbWUpXG4gICB9XG4gICBlbHNlIHtcbiAgICAgaWYgKCdkYXJrJyBpbiBvcHRpb25zLnRoZW1lIHx8ICdsaWdodCcgaW4gb3B0aW9ucy50aGVtZSkge1xuICAgICAgIGRhcmtNb2RlVGhlbWVzID0gb3B0aW9ucy50aGVtZVxuICAgICAgIHRoZW1lcy5wdXNoKG9wdGlvbnMudGhlbWUuZGFyaylcbiAgICAgICB0aGVtZXMucHVzaChvcHRpb25zLnRoZW1lLmxpZ2h0KVxuICAgICB9XG4gICAgIGVsc2Uge1xuICAgICAgIHRoZW1lcy5wdXNoKG9wdGlvbnMudGhlbWUpXG4gICAgIH1cbiAgIH1cbiBcbiAgIHJldHVybiB7XG4gICAgIC4uLm9wdGlvbnMsXG4gICAgIHRoZW1lcyxcbiAgICAgZGFya01vZGVUaGVtZXMgOntcbiAgICAgICBkYXJrOiBnZXRUaGVtZU5hbWUoZGFya01vZGVUaGVtZXMuZGFyayksXG4gICAgICAgbGlnaHQ6IGdldFRoZW1lTmFtZShkYXJrTW9kZVRoZW1lcy5saWdodCksXG4gICAgIH1cbiAgIH1cbiB9XG4gXG4gY29uc3QgTWFya2Rvd25JdFNoaWtpOiBNYXJrZG93bkl0LlBsdWdpbldpdGhPcHRpb25zPE9wdGlvbnM+ID0gKG1hcmtkb3duaXQsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgY29uc3QgX2hpZ2hsaWdodGVyID0gb3B0aW9ucy5oaWdobGlnaHRlclxuIFxuICAgY29uc3Qge1xuICAgICBsYW5ncyxcbiAgICAgdGhlbWVzLFxuICAgICBkYXJrTW9kZVRoZW1lcyxcbiAgICAgaGlnaGxpZ2hMaW5lQ2xhc3NcbiAgIH0gPSByZXNvbHZlT3B0aW9ucyhvcHRpb25zKVxuIFxuICAgbGV0IHN5bmNSdW46IGFueVxuIFxuICAgaWYgKCFfaGlnaGxpZ2h0ZXIpIHtcbiAgICAgY29uc3QgcmVxdWlyZSA9IGNyZWF0ZVJlcXVpcmUoaW1wb3J0Lm1ldGEudXJsKVxuICAgICBzeW5jUnVuID0gY3JlYXRlU3luY0ZuKHJlcXVpcmUucmVzb2x2ZSgnLi93b3JrZXIuanMnKSlcbiAgICAgc3luY1J1bignZ2V0SGlnaGxpZ2h0ZXInLCB7IGxhbmdzLCB0aGVtZXMgfSlcbiAgIH1cbiBcbiAgIGNvbnN0IGhpZ2hsaWdodENvZGUgPSAoY29kZTogc3RyaW5nLCBsYW5nOiBzdHJpbmcsIHRoZW1lPzogc3RyaW5nLCBleHRPcHQ/OmV4dE9wdGlvbnMpOiBzdHJpbmcgPT4ge1xuICAgICBpZiAoX2hpZ2hsaWdodGVyKVxuICAgICAgIHJldHVybiBfaGlnaGxpZ2h0ZXIuY29kZVRvSHRtbChjb2RlLCB7IGxhbmc6IGxhbmcgfHwgJ3RleHQnLCB0aGVtZSB9KVxuIFxuICAgICByZXR1cm4gc3luY1J1bignY29kZVRvSHRtbCcsIHtcbiAgICAgICBjb2RlLFxuICAgICAgIHRoZW1lLFxuICAgICAgIGxhbmc6IGxhbmcgfHwgJ3RleHQnLFxuICAgICB9LCBleHRPcHQpXG4gICB9XG4gICBjb25zdCB0cmFuc0xpbmVzID0gKGxpbmVzOiBzdHJpbmcpID0+IHtcbiAgICAgY29uc3QgbGluZURhdGE6IG51bWJlcltdID0gW11cbiAgICAgbGluZXNcbiAgICAgICAuc3BsaXQoJywnKVxuICAgICAgIC5tYXAoKHYpID0+IHYuc3BsaXQoJy0nKS5tYXAoKHYpID0+IHBhcnNlSW50KHYsIDEwKSkpXG4gICAgICAgLmZvckVhY2goKFtzdGFydCwgZW5kXSkgPT4ge1xuICAgICAgICAgaWYgKHN0YXJ0ICYmIGVuZCkge1xuICAgICAgICAgICBsaW5lRGF0YS5wdXNoKFxuICAgICAgICAgICAgIC4uLkFycmF5LmZyb20oeyBsZW5ndGg6IGVuZCAtIHN0YXJ0ICsgMSB9LCAoXywgaSkgPT4gc3RhcnQgKyBpKVxuICAgICAgICAgICApXG4gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICBsaW5lRGF0YS5wdXNoKHN0YXJ0KVxuICAgICAgICAgfVxuICAgICAgIH0pXG4gICAgIHJldHVybiBsaW5lRGF0YVxuICAgfVxuIFxuIFxuICAgbWFya2Rvd25pdC5vcHRpb25zLmhpZ2hsaWdodCA9IChjb2RlLCBsYW5nLGF0dHIpID0+IHtcbiAgICAgbGV0IGV4dE9wdGlvbnM6ZXh0T3B0aW9ucyA9IHt9XG4gICAgIGlmIChoaWdobGlnaExpbmVDbGFzcykgeyBleHRPcHRpb25zLmhpZ2hsaWdoTGluZUNsYXNzID0gIGhpZ2hsaWdoTGluZUNsYXNzIH1cbiAgICAgaWYoYXR0cikge1xuICAgICAgIGNvbnN0IGV4dCA9IEpTT041LnBhcnNlKGF0dHIpXG4gICAgICAgaWYgKGV4dC50aXRsZSkgeyBleHRPcHRpb25zLnRpdGxlID0gIGV4dC50aXRsZSB9XG4gICAgICAgaWYgKGV4dC5saW5lcykge1xuICAgICAgICAgZXh0T3B0aW9ucy5oaWdobGluZXMgPSB0cmFuc0xpbmVzKGV4dC5saW5lcy50b1N0cmluZygpKVxuICAgICAgIH1cbiAgICAgfVxuICAgICBpZiAoZGFya01vZGVUaGVtZXMpIHtcbiAgICAgICBjb25zdCBkYXJrID0gIGhpZ2hsaWdodENvZGUoY29kZSwgbGFuZywgZGFya01vZGVUaGVtZXMuZGFyaywgZXh0T3B0aW9ucylcbiAgICAgICAgIC5yZXBsYWNlKCc8cHJlIGNsYXNzPVwic2hpa2lcIicsICc8cHJlIGNsYXNzPVwic2hpa2kgc2hpa2ktZGFya1wiJylcbiAgICAgICBjb25zdCBsaWdodCA9IGhpZ2hsaWdodENvZGUoY29kZSwgbGFuZyB8fCAndGV4dCcsIGRhcmtNb2RlVGhlbWVzLmxpZ2h0LCBleHRPcHRpb25zKVxuICAgICAgICAgLnJlcGxhY2UoJzxwcmUgY2xhc3M9XCJzaGlraVwiJywgJzxwcmUgY2xhc3M9XCJzaGlraSBzaGlraS1saWdodFwiJylcbiAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJzaGlraS1jb250YWluZXJcIj4ke2Rhcmt9JHtsaWdodH08L2Rpdj5gXG4gICAgIH1cbiAgICAgZWxzZSB7XG4gICAgICAgcmV0dXJuIGhpZ2hsaWdodENvZGUoY29kZSwgbGFuZyB8fCAndGV4dCcpXG4gICAgIH1cbiAgIH1cbiB9XG4gXG4gZXhwb3J0IGRlZmF1bHQgTWFya2Rvd25JdFNoaWtpXG4gIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMveW9leS9EZXNrdG9wL3ZpdGVzc2VEb2Mvbm9kZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3lvZXkvRGVza3RvcC92aXRlc3NlRG9jL25vZGUvaW5zdGFsbE1hcmtkb3duUGx1Z2lucy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMveW9leS9EZXNrdG9wL3ZpdGVzc2VEb2Mvbm9kZS9pbnN0YWxsTWFya2Rvd25QbHVnaW5zLnRzXCI7aW1wb3J0IFNoaWtpIGZyb20gJy4vbWFya2Rvd24tcGx1Z2luL3NoaWtpJ1xuaW1wb3J0IExpbmtBdHRyaWJ1dGVzIGZyb20gJ21hcmtkb3duLWl0LWxpbmstYXR0cmlidXRlcydcbi8vIEB0cy1leHBlY3QtZXJyb3IgbWlzc2luZyB0eXBlc1xuaW1wb3J0IFRPQyBmcm9tICdtYXJrZG93bi1pdC10YWJsZS1vZi1jb250ZW50cydcbmltcG9ydCBhbmNob3IgZnJvbSAnbWFya2Rvd24taXQtYW5jaG9yJ1xuaW1wb3J0IHR5cGUgTWFya2Rvd25JdCBmcm9tICdtYXJrZG93bi1pdCdcbmltcG9ydCBzdXAgZnJvbSAnbWFya2Rvd24taXQtc3VwJ1xuaW1wb3J0IG1hcmsgZnJvbSAnbWFya2Rvd24taXQtbWFyaydcbmltcG9ydCB1c2x1ZyBmcm9tICd1c2x1ZydcbmltcG9ydCB7IGNvbnRhaW5lclBsdWdpbiB9IGZyb20gJy4vbWFya2Rvd24tcGx1Z2luL2NvbnRhaW5lcidcbmltcG9ydCBjaGVja2JveCBmcm9tICdtYXJrZG93bi1pdC1jaGVja2JveCdcbi8vIGltcG9ydCB7IHByZVdyYXBwZXJQbHVnaW4gfSBmcm9tICcuL21hcmtkb3duLXBsdWdpbi9wcmVXcmFwcGVyJ1xuY29uc3QgdXNsdWdpZnkgPSAoczogc3RyaW5nKSA9PiB1c2x1ZyhzKVxuXG5cbmV4cG9ydCBjb25zdCBpbnN0YWxsTWFya2Rvd25QbHVnaW5zID0gYXN5bmMgKG1kOiBNYXJrZG93bkl0KSA9PiB7XG4gIC8qKlxuICAgKiBcdTRFRTNcdTc4MDFcdTlBRDhcdTRFQUVcbiAgICogc3VwcG9ydHMgaGlnaGxpZ2h0IGxpbmVzIGFuZCBsaW5lIG51bWJlclxuICAgKiBAc2VlIGh0dHBzOi8vcHJpc21qcy5jb20vXG4gICovXG4gIG1kLnVzZShTaGlraSwge1xuICAgIHRoZW1lOiB7XG4gICAgICBsaWdodDogJ3ZpdGVzc2UtbGlnaHQnLFxuICAgICAgZGFyazogJ21hdGVyaWFsLWRhcmtlcicsXG4gICAgfVxuICB9KVxuXG4gIC8qKlxuICAgKiBcdTU5MERcdTkwMDlcdTY4NDZcbiAgICovXG4gIG1kLnVzZShjaGVja2JveClcblxuICAvLyBcdTRFMEFcdTY4MDdcbiAgbWQudXNlKHN1cClcblxuICAvKipcbiAgICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL21hcmtkb3duLWl0L21hcmtkb3duLWl0LWNvbnRhaW5lcn1cbiAgICogXHU4MUVBXHU1QjlBXHU0RTQ5XHU0RUUzXHU3ODAxXHU1NzU3XG4gICAqL1xuICBtZC51c2UoY29udGFpbmVyUGx1Z2luKVxuXG4gIC8qKlxuICAgKiBtYXJrXHU2ODA3XHU4QkIwXG4gICAqL1xuICBtZC51c2UobWFyaylcblxuICBtZC51c2UoYW5jaG9yLCB7XG4gICAgc2x1Z2lmeTogdXNsdWdpZnksXG4gICAgbGV2ZWw6IDEsXG4gICAgcGVybWFsaW5rOiBhbmNob3IucGVybWFsaW5rLmxpbmtJbnNpZGVIZWFkZXIoe1xuICAgICAgc3ltYm9sOiBgXG4gICAgICAgIDxzcGFuIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgPHN2ZyBjbGFzcz1cIm9jdGljb24gb2N0aWNvbi1oZWFkZXJcIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCIgdmVyc2lvbj1cIjEuMVwiIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTcuNzc1IDMuMjc1YS43NS43NSAwIDAwMS4wNiAxLjA2bDEuMjUtMS4yNWEyIDIgMCAxMTIuODMgMi44M2wtMi41IDIuNWEyIDIgMCAwMS0yLjgzIDAgLjc1Ljc1IDAgMDAtMS4wNiAxLjA2IDMuNSAzLjUgMCAwMDQuOTUgMGwyLjUtMi41YTMuNSAzLjUgMCAwMC00Ljk1LTQuOTVsLTEuMjUgMS4yNXptLTQuNjkgOS42NGEyIDIgMCAwMTAtMi44M2wyLjUtMi41YTIgMiAwIDAxMi44MyAwIC43NS43NSAwIDAwMS4wNi0xLjA2IDMuNSAzLjUgMCAwMC00Ljk1IDBsLTIuNSAyLjVhMy41IDMuNSAwIDAwNC45NSA0Ljk1bDEuMjUtMS4yNWEuNzUuNzUgMCAwMC0xLjA2LTEuMDZsLTEuMjUgMS4yNWEyIDIgMCAwMS0yLjgzIDB6XCI+PC9wYXRoPjwvc3ZnPlxuICAgICAgICA8L3NwYW4+XG4gICAgICBgLFxuICAgICAgcGxhY2VtZW50OiAnYmVmb3JlJyxcbiAgICAgIHNwYWNlOiBmYWxzZVxuICAgIH0pXG4gIH0pXG5cbiAgbWQudXNlKExpbmtBdHRyaWJ1dGVzLCB7XG4gICAgbWF0Y2hlcjogKGxpbms6IHN0cmluZykgPT4gL15odHRwcz86XFwvXFwvLy50ZXN0KGxpbmspLFxuICAgIGF0dHJzOiB7XG4gICAgICB0YXJnZXQ6ICdfYmxhbmsnLFxuICAgICAgcmVsOiAnbm9vcGVuZXInLFxuICAgIH0sXG4gIH0pXG5cbiAgbWQudXNlKFRPQywge1xuICAgIHNsdWdpZnk6IHVzbHVnaWZ5LFxuICAgIGluY2x1ZGVMZXZlbDogWzEsIDIsIDMsIDQsIDUsIDZdLFxuICAgIGNvbnRhaW5lckNsYXNzOiAndGFibGUtb2YtY29udGVudHMnLFxuICAgIGNvbnRhaW5lckhlYWRlckh0bWw6ICc8ZGl2IGNsYXNzPVwidG9jSGVhZGVyXCI+T04gVEhJUyBQQUdFPC9kaXY+J1xuICB9KVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMveW9leS9EZXNrdG9wL3ZpdGVzc2VEb2Mvbm9kZS9tYXJrZG93bi1wbHVnaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy95b2V5L0Rlc2t0b3Avdml0ZXNzZURvYy9ub2RlL21hcmtkb3duLXBsdWdpbi9jb250YWluZXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3lvZXkvRGVza3RvcC92aXRlc3NlRG9jL25vZGUvbWFya2Rvd24tcGx1Z2luL2NvbnRhaW5lci50c1wiO2ltcG9ydCBNYXJrZG93bkl0IGZyb20gJ21hcmtkb3duLWl0J1xuaW1wb3J0IHsgUmVuZGVyUnVsZSB9IGZyb20gJ21hcmtkb3duLWl0L2xpYi9yZW5kZXJlcidcbmltcG9ydCBUb2tlbiBmcm9tICdtYXJrZG93bi1pdC9saWIvdG9rZW4nXG5pbXBvcnQgY29udGFpbmVyIGZyb20gJ21hcmtkb3duLWl0LWNvbnRhaW5lcidcblxuZXhwb3J0IGNvbnN0IGNvbnRhaW5lclBsdWdpbiA9IChtZDogTWFya2Rvd25JdCkgPT4ge1xuICBtZC51c2UoLi4uY3JlYXRlQ29udGFpbmVyKCd0aXAnLCAnVGlwJywgbWQpKVxuICAgIC51c2UoLi4uY3JlYXRlQ29udGFpbmVyKCdpbmZvJywgJ0luZm8nLCBtZCkpXG4gICAgLnVzZSguLi5jcmVhdGVDb250YWluZXIoJ3dhcm5pbmcnLCAnV2FybmluZycsIG1kKSlcbiAgICAudXNlKC4uLmNyZWF0ZUNvbnRhaW5lcignZGFuZ2VyJywgJ0RhbmdlcicsIG1kKSlcbiAgICAudXNlKC4uLmNyZWF0ZUNvbnRhaW5lcignZGV0YWlscycsICdEZXRhaWxzJywgbWQpKVxuICAgIC51c2UoY29udGFpbmVyLCAndi1wcmUnLCB7XG4gICAgICByZW5kZXI6ICh0b2tlbnM6IFRva2VuW10sIGlkeDogbnVtYmVyKSA9PlxuICAgICAgICB0b2tlbnNbaWR4XS5uZXN0aW5nID09PSAxID8gYDxkaXYgdi1wcmU+XFxuYCA6IGA8L2Rpdj5cXG5gXG4gICAgfSlcbiAgICAudXNlKGNvbnRhaW5lciwgJ3JhdycsIHtcbiAgICAgIHJlbmRlcjogKHRva2VuczogVG9rZW5bXSwgaWR4OiBudW1iZXIpID0+XG4gICAgICAgIHRva2Vuc1tpZHhdLm5lc3RpbmcgPT09IDEgPyBgPGRpdiBjbGFzcz1cInZwLXJhd1wiPlxcbmAgOiBgPC9kaXY+XFxuYFxuICAgIH0pXG59XG5cbnR5cGUgQ29udGFpbmVyQXJncyA9IFt0eXBlb2YgY29udGFpbmVyLCBzdHJpbmcsIHsgcmVuZGVyOiBSZW5kZXJSdWxlIH1dXG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lcihcbiAga2xhc3M6IHN0cmluZyxcbiAgZGVmYXVsdFRpdGxlOiBzdHJpbmcsXG4gIG1kOiBNYXJrZG93bkl0XG4pOiBDb250YWluZXJBcmdzIHtcbiAgcmV0dXJuIFtcbiAgICBjb250YWluZXIsXG4gICAga2xhc3MsXG4gICAge1xuICAgICAgcmVuZGVyKHRva2VucywgaWR4KSB7XG4gICAgICAgIGNvbnN0IHRva2VuID0gdG9rZW5zW2lkeF1cbiAgICAgICAgY29uc3QgaW5mbyA9IHRva2VuLmluZm8udHJpbSgpLnNsaWNlKGtsYXNzLmxlbmd0aCkudHJpbSgpXG4gICAgICAgIGNvbnN0IGljb25NYXA6e1trZXk6IHN0cmluZ106U3RyaW5nfSA9IHtcbiAgICAgICAgICAndGlwJzogJzxzdmcgY2xhc3M9XCJjdXN0b20taWNvblwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDMyIDMyXCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTEgMjRoMTB2MkgxMXptMiA0aDZ2MmgtNnptMy0yNkExMCAxMCAwIDAgMCA2IDEyYTkuMTkgOS4xOSAwIDAgMCAzLjQ2IDcuNjJjMSAuOTMgMS41NCAxLjQ2IDEuNTQgMi4zOGgyYzAtMS44NC0xLjExLTIuODctMi4xOS0zLjg2QTcuMiA3LjIgMCAwIDEgOCAxMmE4IDggMCAwIDEgMTYgMGE3LjIgNy4yIDAgMCAxLTIuODIgNi4xNGMtMS4wNyAxLTIuMTggMi0yLjE4IDMuODZoMmMwLS45Mi41My0xLjQ1IDEuNTQtMi4zOUE5LjE4IDkuMTggMCAwIDAgMjYgMTJBMTAgMTAgMCAwIDAgMTYgMnpcIi8+PC9zdmc+JyxcbiAgICAgICAgICAnaW5mbyc6ICc8c3ZnIGNsYXNzPVwiY3VzdG9tLWljb25cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAzMiAzMlwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTE3IDIydi04aC00djJoMnY2aC0zdjJoOHYtMmgtM3pNMTYgOGExLjUgMS41IDAgMSAwIDEuNSAxLjVBMS41IDEuNSAwIDAgMCAxNiA4elwiLz48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xNiAzMGExNCAxNCAwIDEgMSAxNC0xNGExNCAxNCAwIDAgMS0xNCAxNFptMC0yNmExMiAxMiAwIDEgMCAxMiAxMkExMiAxMiAwIDAgMCAxNiA0WlwiLz48L3N2Zz4nLFxuICAgICAgICAgICd3YXJuaW5nJzogJzxzdmcgY2xhc3M9XCJjdXN0b20taWNvblwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDMyIDMyXCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTYgMmExNCAxNCAwIDEgMCAxNCAxNEExNCAxNCAwIDAgMCAxNiAyWm0wIDI2YTEyIDEyIDAgMSAxIDEyLTEyYTEyIDEyIDAgMCAxLTEyIDEyWlwiLz48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xNSA4aDJ2MTFoLTJ6bTEgMTRhMS41IDEuNSAwIDEgMCAxLjUgMS41QTEuNSAxLjUgMCAwIDAgMTYgMjJ6XCIvPjwvc3ZnPicsXG4gICAgICAgICAgJ2Rhbmdlcic6ICc8c3ZnIGNsYXNzPVwiY3VzdG9tLWljb25cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAzMiAzMlwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTI0LjgzMiAxNi45NjljLS4yNzItLjY0Ny0uNTgyLTEuMzgtLjg4My0yLjI4NWMtLjc5LTIuMzY5IDEuNzM0LTQuOTUzIDEuNzU4LTQuOTc3bC0xLjQxNC0xLjQxNGMtLjE0LjE0LTMuNDIzIDMuNDc4LTIuMjQyIDcuMDIzYy4zMjYuOTc4LjY1MiAxLjc1LjkzOCAyLjQzQTkuMzgxIDkuMzgxIDAgMCAxIDI0IDIyYTYuMjQgNi4yNCAwIDAgMS00LjE5IDUuMjkzYTguNTIgOC41MiAwIDAgMC0yLjEwMy04bC0xLjA0NC0xLjA0NGwtLjU4MiAxLjM1N2MtMS44MzYgNC4yODQtNC4wMjEgNi4xNTQtNS4zMDYgNi45MzRBNS44NDQgNS44NDQgMCAwIDEgOCAyMmE5LjYyNCA5LjYyNCAwIDAgMSAuOTI5LTMuNjI5QTExLjMzMyAxMS4zMzMgMCAwIDAgMTAgMTR2LTEuNzc4Yy44NzQuMzYgMiAxLjMwMyAyIDMuNzc4djIuNjAzbDEuNzQzLTEuOTM0YzMuMTEyLTMuNDU0IDIuNDYzLTcuNTY3IDEuMjA2LTEwLjMwOEE0LjQ4NiA0LjQ4NiAwIDAgMSAxOCAxMWgyYzAtNS41MzctNC41NzktNy03LTdoLTJsMS4yIDEuNTk5Yy4xMzcuMTg1IDIuODYyIDMuOTI3IDEuMzUzIDcuNjg4QTQuOTQzIDQuOTQzIDAgMCAwIDkgMTBIOHY0YTkuNjI0IDkuNjI0IDAgMCAxLS45MjkgMy42MjlBMTEuMzMzIDExLjMzMyAwIDAgMCA2IDIyYzAgMy44NDggMy44MjMgOCAxMCA4czEwLTQuMTUyIDEwLThhMTEuMzc3IDExLjM3NyAwIDAgMC0xLjE2OC01LjAzMVpNMTIuODM1IDI3LjUyNmExNi40OTkgMTYuNDk5IDAgMCAwIDQuMzY3LTUuNTk4YTYuMTA1IDYuMTA1IDAgMCAxIC4yNTcgNS45NzFBMTEuMzIxIDExLjMyMSAwIDAgMSAxNiAyOGExMC4zMjggMTAuMzI4IDAgMCAxLTMuMTY1LS40NzRaXCIvPjwvc3ZnPicsXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaWNvbkNsYXNzID0gaWNvbk1hcFtrbGFzc10gfHwgJydcbiAgICAgICAgaWYgKHRva2VuLm5lc3RpbmcgPT09IDEpIHtcbiAgICAgICAgICBjb25zdCB0aXRsZSA9IG1kLnJlbmRlcklubGluZShpbmZvIHx8IGRlZmF1bHRUaXRsZSlcbiAgICAgICAgICBpZiAoa2xhc3MgPT09ICdkZXRhaWxzJykge1xuICAgICAgICAgICAgcmV0dXJuIGA8ZGV0YWlscyBjbGFzcz1cIiR7a2xhc3N9IGN1c3RvbS1ibG9ja1wiPjxzdW1tYXJ5PiR7dGl0bGV9PC9zdW1tYXJ5PlxcbmBcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiJHtrbGFzc30gY3VzdG9tLWJsb2NrXCI+PGRpdiBjbGFzcz1cImN1c3RvbS1pY29uXCI+JHtpY29uQ2xhc3N9PHNwYW4gY2xhc3M9XCJjdXN0b20tYmxvY2stdGl0bGVcIj4ke3RpdGxlfTwvc3Bhbj48L2Rpdj5cXG5gXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGtsYXNzID09PSAnZGV0YWlscycgPyBgPC9kZXRhaWxzPlxcbmAgOiBg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QzNFO0FBQUEsRUFFQSxTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsTUFDRixTQUFTLENBQUMsVUFBVSxPQUFPO0FBQUEsTUFDM0IscUJBQXFCO0FBQUEsSUFDdkIsQ0FBQztBQUFBLElBTUQsTUFBTTtBQUFBLE1BQ0osTUFBTTtBQUFBLFFBRUosRUFBRSxLQUFLLFNBQVMsV0FBVyxHQUFHO0FBQUEsUUFDOUIsRUFBRSxLQUFLLFNBQVMsV0FBVyxRQUFRO0FBQUEsTUFDckM7QUFBQSxNQUNBLFlBQVksQ0FBQyxPQUFPLE1BQU0sTUFBTSxJQUFJO0FBQUEsTUFHcEMsYUFBYSxDQUFDLFVBQVUsZ0JBQWdCLEtBQUs7QUFBQSxNQUU3QyxtQkFBbUIsQ0FBQyxXQUFXLGdCQUFnQixNQUFNO0FBQUEsSUFDdkQsQ0FBQztBQUFBLElBTUQsUUFBUTtBQUFBLElBTVIsV0FBVztBQUFBLE1BQ1QsU0FBUztBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLEtBQUs7QUFBQSxNQUNMLE1BQU07QUFBQSxRQUNKO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGFBQWE7QUFBQSxJQUNmLENBQUM7QUFBQSxJQU1ELFdBQVc7QUFBQSxNQUNULFlBQVksQ0FBQyxPQUFPLElBQUk7QUFBQSxNQUN4QixTQUFTLENBQUMsVUFBVSxjQUFjLE9BQU87QUFBQSxNQUN6QyxLQUFLO0FBQUEsTUFDTCxXQUFXO0FBQUEsUUFDVCxvQkFBb0I7QUFBQSxNQUN0QjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBTUQsT0FBTztBQUFBLElBT1AsU0FBUztBQUFBLE1BRVAsYUFBYTtBQUFBLE1BQ2IsbUJBQW1CO0FBQUEsUUFDakIsUUFBUTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLFFBQ1QsYUFBYTtBQUFBLE1BQ2Y7QUFBQSxNQUNBLGdCQUFnQjtBQUFBLE1BQ2hCLGlCQUFpQixDQUFDLE9BQU8sdUJBQXVCLEVBQUU7QUFBQSxJQUNwRCxDQUFDO0FBQUEsSUFNRCxRQUFRO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixpQkFBaUI7QUFBQSxNQUNqQixTQUFTLENBQUMsS0FBSyxRQUFRQSxtQ0FBVyxZQUFZLENBQUM7QUFBQSxJQUNqRCxDQUFDO0FBQUEsSUFLRCxRQUFRO0FBQUEsRUFDVjtBQUFBLEVBTUEsWUFBWTtBQUFBLElBQ1YsUUFBUTtBQUFBLElBQ1IsWUFBWTtBQUFBLElBQ1osYUFBYTtBQUFFLHNCQUFnQjtBQUFBLElBQUU7QUFBQSxFQUNuQztBQUFBLEVBRUEsS0FBSztBQUFBLElBRUgsWUFBWSxDQUFDLGtCQUFrQixVQUFVO0FBQUEsRUFDM0M7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIiwgInJlcXVpcmUiLCAidiIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSJdCn0K
