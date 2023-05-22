# What is Easy Blog Template?

It is a personal blog template anyone can use to make their own blog page.
The process is really simple:

1. Download this repository
2. Write articles in your local machine
3. Push it to Vercel (or any other serverless services)

## Benefit

**1. No Database Needed**

The article data you write will be saved in the public directory as a json file, so you don't need to prepare other database servers.

**2. Rich Text Form**

You can write in rich text form, so you don't need to learn markdown format.

**3. Image Support**

Adding images is as easy as selecting the image file in your PC.

## Technologies Used

1. Next.js
2. TypeScript
3. TailwindCSS

# Getting Started

## 1. Configure blog title, etc.

First, configure your blog.
Open 'blog.config.ts' file and edit the title, subtitle, and url of your blog.

```javascript
const BlogConfig = {
  title: "THE BLOG",
  subtitle: "Thoughts and travels",
  url: "https://theblog.com",
};

export default BlogConfig;
```

## 2. Start Writing

You can start writing by running the app in the development mode.
Just run the following command in the terminal.

```bash
$ npm run dev
```

Then go to "http://localhost:3000". You can start writing by hitting "+ New Post" button on the top page.

## 3. Deploy to Production

Everytime you write a new article, deploy the whole code base to the server and your blog is now public.
All the articles you wrote are saved in "/public/articles" directory, so those data will also be shipped along with the code.

# References

Next.js: https://nextjs.org/docs
Vercel: https://vercel.com
