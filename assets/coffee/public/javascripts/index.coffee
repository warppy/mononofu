
$ ->
  $ul = $("ul")
  $li = $("script.tweets")

  # $.getJSON "/api/tweets", (data) ->
  #   console.log data

socket = io.connect() # TIP: .connect with no args does auto-discovery
socket.on "tweets:now", (data)=>
  console.log data 
  data.tweets.created_at = @getJst(data.tweets.created_at)
  html = _.template $('script.tweets').html(), data:data.tweets

  $("ul").prepend html

getJst =(utc)->
  d = new Date utc
  d.toLocaleString()

