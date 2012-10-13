util = require('util')
sys  = require 'sys'
fs   = require 'fs'
exec = require('child_process').exec

# CoffeeScript
COMMAND = 'coffee'
OPTIONS = '-cb'
SRCDIR = './assets/coffee'    # *.coffeeファイルがあるディレクトリへのパス
OUTDIR = '.'            # *.jsファイルの保存先

# Compass
#COMPASS_DIR = "./assets"
COMPASS_COMMAND = 'compass'
COMPASS_OPTIONS = 'compile'

task 'all', 'compile target files', ->
  for target in targetList
    try
      coffee = makePath [SRCDIR, target.path, target.file], ".coffee"
      cs = fs.statSync coffee
    catch error
      sys.puts "file not found: #{error.path}"
      continue
    try
      js = fs.statSync (makePath [OUTDIR, target.path, target.file], ".js")
      continue if cs.mtime < js.mtime  # 更新されていなければ次のターゲットへ
    catch error
      null 
    try
      dir = fs.statSync "#{OUTDIR}/#{target.path}"
    catch error
      fs.mkdirSync "#{OUTDIR}/#{target.path}", "755"
    command = "#{COMMAND} #{OPTIONS} -o #{OUTDIR}/#{target.path} #{coffee}" 
    sys.puts command
    exec command , (error, stdout, stderr) -> 
      util.log(error) if error
      util.log(stdout) if stdout
      util.log(stderr) if stderr

      if error
        util.log('失敗しました')
      else
        util.log('成功しました')

  sys.puts "No change." unless command
  exec "growlnotify -t \"\" -m \"aa\""
  compass()

task 'clean', 'delete target files', ->
  for target in targetList
    exec "rm #{OUTDIR}/#{target}.js"

#---- func ---

makePath = (dirs, suffix)->
  path = ""
  for d in dirs
    path = "#{path}#{d}"
    path = "#{path}/" if d
  path = path.replace /\/$/, ""
  path = path.replace /\/{2,}$/, "/"
  path = "#{path}#{suffix}"

targetList = []
targetFiles = (path = "") ->
  for f in fs.readdirSync "#{SRCDIR}/#{path}"
    if f.match /^(\w+)\.coffee$/
      targetList.push 
        path : path
        file : RegExp.$1 
      continue
    unless f.match /.*\..*/
      f = path + "/" + f unless path == ""
      targetFiles f
targetFiles()

#---- compass ----
compass = ->
  command = "#{COMPASS_COMMAND} #{COMPASS_OPTIONS}"
  sys.puts command
  exec command
