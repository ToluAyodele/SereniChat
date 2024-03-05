## Set up ENV file

```js
DATABASE_URL
NEXTAUTH_SECRET

GITHUB_ID
GITHUB_SECRET
GOOGLE_ID
GOOGLE_CLIENT_SECRET

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

NEXT_PUBLIC_PUSHER_APP_KEY
PUSHER_APP_ID
PUSHER_APP_SECRET
```

## Install Dependencies
### Frontend
```shell
cd src/frontend
npm install
```
### Backend
```shell
pip install requirements.txt
```

## Resolving Prisma Client Error (May run into this issue)
```shell
cd src/frontend
npx prisma generate
```
- a node_modules duplicate will be created with a .prisma/client path
- copy the client directory from the new node_modules and replace the old client directory in the old node_modules
- delete the new node_modules folder

## Setup MongoDB using Prisma (if you create your own mongodb collections)
```shell
npx prisma db push
```
## Start the app
```shell
npm run dev
```
