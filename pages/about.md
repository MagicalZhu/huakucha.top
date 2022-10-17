<div flex items-end justify-between>
  <div>
    <h1>
      YuLiang Zhu
      <span text-sm opacity-50>朱玉良</span>
    </h1>
    <span opacity-50>Hi there</span>
    <Links :links="frontmatter.socials" class="mt-4"/>
  </div>
  <div
    class="p-1 mb-1 border border-c rounded-md hidden md:block"
    shadow="[inset_0_0_10px_#000000] slate-200 dark:slate-800"
  >
    <flip-image class="!w-24" src="img/avatar.jpg" alt="avatar" />
  </div>
</div>
