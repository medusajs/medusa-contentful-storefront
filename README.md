<p align="center">
  <a href="https://www.medusa-commerce.com">
    <img alt="Medusa" src="https://user-images.githubusercontent.com/7554214/129161578-19b83dc8-fac5-4520-bd48-53cba676edd2.png" width="100" />
  </a>
</p>
<h1 align="center">
  Medusa Contentful Storefront
</h1>
<p align="center">
Medusa is an open-source headless commerce engine that enables developers to create amazing digital commerce experiences.
</p>
<p align="center">
  <a href="https://github.com/medusajs/medusa/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Medusa is released under the MIT license." />
  </a>
  <a href="https://github.com/medusajs/medusa/blob/master/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
  <a href="https://discord.gg/xpCwq3Kfn8">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    <img src="https://img.shields.io/twitter/follow/medusajs.svg?label=Follow%20@medusajs" alt="Follow @medusajs" />
  </a>
</p>

> **Prerequisites**: This starter works with [`medusa-starter-contentful`](https://github.com/medusajs/medusa-starter-contentful). Make sure to have this starter installed and running.

## Quick start

1. **Install the storefront**
   ```shell
   gatsby new medusa-contentful-storefront https://github.com/medusajs/medusa-contentful-storefront/edit/master/README.md
   ```
2. **Setup your environment variables**

   ```shell
   mv .env.template .env
   ```

   Go to your [Contentful space](https://app.contentful.com), then click **Settings** > **API Keys** > **Add API key**. Copy the value in the field "Content Delivery API - access token" and paste it into your `.env` together with your Contentful space id:

   ```
   CONTENTFUL_SPACE_ID=*****
   CONTENTFUL_ACCESS_TOKEN=**************
   ```

3. **Start developing.**

   Start up the local server.

   ```shell
   yarn start
   ```

4. **Open the code and start customizing!**

   Your site is now running at http://localhost:8000!

   Edit `src/pages/index.js` to see your site update in real-time!

5. **Learn more about Medusa**

   - [Website](https://www.medusa-commerce.com/)
   - [GitHub](https://github.com/medusajs)
   - [Documentation](https://docs.medusa-commerce.com/)

6. **Learn more about Contentful**

   - [Website](https://contentful.com/)
   - [Documentation](https://www.contentful.com/developers/docs/)
   - [Migrations](https://www.contentful.com/developers/docs/tutorials/cli/scripting-migrations/)

7. **Learn more about Gatsby**

   - [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

   - [Tutorials](https://www.gatsbyjs.com/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

   - [Guides](https://www.gatsbyjs.com/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

   - [API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

   - [Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

   - [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

## Thank you!

<p>
  <a href="https://www.medusa-commerce.com">
    Website
  </a> 
  |
  <a href="https://medusajs.notion.site/medusajs/Medusa-Home-3485f8605d834a07949b17d1a9f7eafd">
    Notion Home
  </a>
  |
  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    Twitter
  </a>
  |
  <a href="https://docs.medusa-commerce.com">
    Docs
  </a>
</p>
