Full Stack MERN app with NEXT.JS, MongoDB and OpenAI and TailWind CSS

This app is for my learning purpose.

Auth with NextAuth (Google, GitHub, Email in DB)

- I do a sync between session (Google, GitHub) and local DB with registered users

DB - MongoDB Atlas

- storing data and files

For deployment I use Vercel - https://www.vercel.com

Stack:
Next.JS 13
Next.Auth
TailWind.CSS
Mongoose
ReactQuery
Redux + ReduxToolkit
OpenAI API

You will need .ENV with this variables:
MONGO_URL=

GOOGLE_ID=
GOOGLE_SECRET=

GITHUB_ID=
GITHUB_SECRET=

JWT_SECRET=

#openssl rand -base64 32

#NEXT ENV for Client part of App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_USER_DEFAULT_PASS="DefaultPassword for creating new user in local user storage"
NEXT_PUBLIC_OPENAI_API_KEY=sk-xxxxxx
