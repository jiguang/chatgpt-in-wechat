# chatgpt-in-wechat
An example of ChatGPT in Wechat.

1. Prepare a wechat account that surports [web api](https://wx.qq.com).(or you can [change wechaty puppet to padchat](https://wechaty.js.org/docs/puppet-providers/wechat#known-issues).)
2. Get an API KEY from https://beta.openai.com/account/api-keys (how to regist? it's another question.)
3. Node version >= 16.

```
# npm i wechaty
# npm i openai
# node bot.js
```

If you see:

```
SyntaxError: Cannot use import statement outside a module
```

add ` "type": "module"` to `package.json` may fix it.

![screenshot](https://github.com/jiguang/chatgpt-in-wechat/blob/54fc85ca427f2148ec4fc6af06cd24e2c947c795/screenshot.jpeg)
