<template>
  <div prose mx-auto text-left mx-200>
    <div class="justify-center border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div class="px-4 py-4 bg-white rounded-t-lg dark:bg-gray-800">
            <label for="comment" class="sr-only">Your comment</label>
            <textarea id="comment" rows="4"
                      class="w-full p-4 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800  dark:text-white dark:placeholder-gray-400"
                      placeholder="Write a comment..."></textarea>
        </div>
        <div class="flex items-center justify-end px-3 py-2 border-t dark:border-gray-600">
          <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg ">
              Post
          </button>
        </div>
    </div>
  </div>
</template>
