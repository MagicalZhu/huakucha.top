<template>
    <main class="flex flex-col min-h-full text-c" p="x-4 t-24 b-6">
      <div class="flex-1 mb-6">
        <Navbar>
          <slot name="navbar"/>
        </Navbar>
        <RouterView />
      </div>
      <!-- TODO prev、next page -->
      <div className='py-2'>
        <ul className='flex pl-0 rounded list-none flex-wrap justify-center'>
          <li>
              <a
                href='#'
                className="bg-white border-gray-300 text-gray-500 
                            hover:bg-blue-200 relative inline-flex items-center px-4 py-2 
                            text-sm font-medium">
                1
              </a>
              <a
                href='#'
                className="bg-white border-gray-300 text-gray-500 
                            hover:bg-blue-200 relative inline-flex items-center px-4 py-2 
                            text-sm font-medium">
                1
              </a>
              <a
                href='#'
                className="bg-white border-gray-300 text-gray-500 
                            hover:bg-blue-200 relative inline-flex items-center px-4 py-2 
                            text-sm font-medium">
                1
              </a>
          </li>
        </ul>
      </div>
      <Footer />
    </main>
  </template>
  
  <script setup lang='ts'>
  </script>
  