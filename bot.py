from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import Updater, CommandHandler, CallbackContext

TOKEN = '7601799371:AAG5zeWEf7ClwCy23v7BoNXJyXhQpn4Bwdw'

def start(update: Update, context: CallbackContext):
    keyboard = [
        [InlineKeyboardButton("Открыть миниапп", web_app={'url': 'https://hodit-miniapp.vercel.app'})]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    update.message.reply_text("Привет! Нажми кнопку ниже, чтобы открыть миниапп:", reply_markup=reply_markup)

def main():
    updater = Updater(TOKEN)
    dp = updater.dispatcher
    dp.add_handler(CommandHandler("start", start))
    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()
