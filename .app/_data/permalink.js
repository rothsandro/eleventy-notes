module.exports =
  "{{ '/' if page.filePathStem == '/index' else ('/n/' + (page.filePathStem | slugifyPath) + '/') }}";
