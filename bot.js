import { WechatyBuilder } from 'wechaty'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    // get a key from https://beta.openai.com/account/api-keys
    apiKey: 'YOUR API KEY',
});
const openai = new OpenAIApi(configuration);

async function main () {
    const bot = WechatyBuilder.build({
        // your robot name, change it to whatever you like
        name: 'chatgpt_wechat'
    })
    bot
        .on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`))
        .on('login',            user => console.log(`User ${user} logged in`))
        .on('message', async (message) => {
            console.log(`Message: ${message}`)
            if (message.type() === bot.Message.Type.Text) {
                const response = await openai.createCompletion({
                    model: "text-ada-001",
                    // model: "text-davinci-003",
                    prompt: message.text(),
                    temperature: 0.7,
                    max_tokens: 2048,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                });
                if(response.status === 200){
                    let data = response.data
                    if(data['choices'] && data['choices'].length){
                        message.say(data['choices'][0]['text'].replace(/(^\s|\s$)*/ig, ''))
                    }else{
                        message.say("i can't understand what you said.")
                    }
                }else{
                    message.say("i am busy now, try later.")
                }
            }
        })
    await bot.start()
}
main().catch(console.error)
