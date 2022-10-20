---
socials:
  - icon: i-carbon:email
    link: "mailto:18151271579@163.com"
  - icon: i-eva:github-outline
    link: https://github.com/MagicalZhu
  - icon: i-carbon:book
    link: https://www.huakucha.top
  - icon: i-tabler:letter-j
    link: https://okjk.co/V3s0CF
---


<main class="flex-1 mx-4 md:mx-12 lg:mx-24 mt-8 sm:mt-16">
  <section class="p-4 flex flex-col items-center">
    <div class="w-48 h-48 rounded-full mb-6 bg-red-100">
      <img src="/img/log.png" class="w-full p-2 h-full object-contain"/>
    </div>
    <h1 class="text-2xl font-bold text-center mb-4">
      Hey 👋 I'm YuLiang Zhu
    </h1>
    <div class="text-5xl md:text-6xl font-bold text-center max-w-3xl mb-4 relative">
      <div class="absolute top-10 opacity-20 transform left-1/2 -translate-x-1/2 text-red-300 z-0 w-full">
        <svg class="max-w-xs md:max-w-lg mx-auto w-full" viewBox="0 0 625 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 46c1.035 2.276 1.035 2.276 1.036 2.275h.002l.011-.006.048-.021.198-.089c.176-.08.443-.197.796-.353.707-.31 1.763-.767 3.145-1.35a406.34 406.34 0 0112.06-4.841c10.438-4.011 25.451-9.363 43.72-14.716C99.57 16.19 149.07 5.5 201 5.5v-5C148.43.5 98.43 11.312 61.61 22.1c-18.42 5.398-33.563 10.796-44.108 14.848a411.168 411.168 0 00-12.209 4.9 243.513 243.513 0 00-4.039 1.746 96.86 96.86 0 00-.268.121l-.015.007-.004.002c-.002 0-.002 0 1.033 2.276zM201 5.5c51.827 0 96.622 13.509 138.315 26.573 41.555 13.021 80.28 25.705 119.331 23.423l-.292-4.992c-37.949 2.218-75.724-10.098-117.544-23.202C299.128 14.24 253.673.5 201 .5v5zm257.646 49.996c38.873-2.272 80.4-14.874 112.112-26.845a615.88 615.88 0 0038.831-16.199 484.157 484.157 0 0011.08-5.243 292.1 292.1 0 003.713-1.852l.197-.1.05-.027.014-.006.004-.002c.001 0 .001-.001-1.147-2.222L622.351.78h-.002l-.011.006a611.127 611.127 0 01-53.346 23.187c-31.538 11.905-72.511 24.303-110.638 26.531l.292 4.992z" fill="currentColor"></path></svg>
      </div>
      <div class="relative">Java and JavaScript Developer</div>
    </div>
    <Links :links="frontmatter.socials" class="mt-4"/>
  </section>
</main>


<route lang="yaml">
meta:
  layout: about
</route>
