# Angular Universal (SSR) caching with AWS Lambda

It's not obvious but Lambda creates containers for function running. And these containers exist only limited time. That's the reason why SSR suffers a fiasco with default Lambda behavior.

Famous author of the articles about AWS features - Yan Cui pays attention to the problem of cold start. In his article [I’m afraid you’re thinking about AWS Lambda cold starts all wrong](https://hackernoon.com/im-afraid-you-re-thinking-about-aws-lambda-cold-starts-all-wrong-7d907f278a4f) you will find metrics and examples describing a situation where we can't improve execution without some "hacking". For instance, Yan suggest to create cron job to ping the API that should heat up cold requests. But it works only for routes with active use. Also, Yan warn us to "stay as far away from VPC's" because it can add about 10 seconds to our cold start.

And the best place for gathering information in most cases is official documentation!

You can find [this reference](https://docs.aws.amazon.com/amplify/latest/userguide/ssr-supported-features.html) that provides us information about infrastructure that used by Amplify for deploying SSR application (NextJS). S3 - for static assets, CloudFront - to serve the app, Lambda@Edge functions - to customize the content that CloudFront delivers.

## Lambda@Edge

"Run serverless applications on the edge in Amazon CloudFront by leveraging Lambda@Edge. This is especially useful for deporting the intensive task of server rendering SPAs to AWS Lambda, which will let you scale to 100 reqs/s painlessly all the while leveraging CloudFront's edge cache." [Reference](https://www.npmjs.com/package/aws-serverless-express-edge)

"You can use Lambda@Edge to improve search engine optimization (SEO) for your website. For example, you can trigger a Lambda function to deliver a pre-rendered HTML page stored in Amazon S3 when the user-agent is a search engine bot such as Googlebot or Bingbot." [Reference](https://aws.amazon.com/lambda/edge/)

"Lambda@Edge functions are regular, “trimmed down” Lambda functions which can read and modify the request and response data. This makes it possible to e.g. intercept incoming requests and return a response immediately without passing the data through to the backend services." [Reference](https://www.serverless.com/blog/lambda-at-edge-support-added)

And we have a great manual for SSR [here](https://www.serverless.com/blog/serverless-nextjs/) - unfortunately, it's not about Angular SSR but on the same page with the topic.

## Assets and pre-rendered pages

The best place for storing static content is S3 bucket, so you need to place "assets" folder there. It is also true for pre-rendered pages.

## References

- [AWS Lambda](https://aws.amazon.com/lambda/edge/)
- [Dynamically Route Viewer Requests to Any Origin Using Lambda@Edge](https://aws.amazon.com/blogs/networking-and-content-delivery/dynamically-route-viewer-requests-to-any-origin-using-lambdaedge/)
- [Cache control with Lambda@Edge](https://medium.com/uniplacesgeeks/cache-control-with-lambda-edge-95645b3aa4f0)
- [Deploy an Angular SSR (Server-Side Rendering) app on AWS for SEO optimization](https://www.linkedin.com/pulse/deploy-angular-ssr-server-side-rendering-app-aws-seo-davide-fruci-jfitf/)
- [NPM package "aws-serverless-express-edge"](https://www.npmjs.com/package/aws-serverless-express-edge)
