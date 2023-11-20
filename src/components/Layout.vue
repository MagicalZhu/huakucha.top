<template>
  <main class="flex flex-col min-h-full text-c px-4 pb-3">
    <div class="flex-1 mb-6">
      <Navbar>
        <slot name="navbar" />
      </Navbar>
      <slot />
    </div>
    <Footer />
  </main>
</template>
