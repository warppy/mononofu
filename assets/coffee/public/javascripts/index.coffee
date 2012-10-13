
$ ->
  $ul = $("ul")
  $li = $("script.tweets")
  # $.getJSON "/api/tweets", (data) ->
  #   console.log data

socket = io.connect() # TIP: .connect with no args does auto-discovery
socket.on "tweets:now", (data)->
  console.log data 

