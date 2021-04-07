# Video in the AMApp

## AMApp-Video-Streaming

Video files are prepared with [Video on Demand on AWS](https://aws.amazon.com/solutions/implementations/video-on-demand-on-aws/)

[Overview](https://docs.aws.amazon.com/solutions/latest/video-on-demand-on-aws-foundations/overview.html)

This uses a [CloudFormation](https://console.aws.amazon.com/cloudformation) template to create a tech stack that basically consists of the following pieces:

- S3 Bucket (Source)
- S3 Bucket (Destination)
- Lambda functions listening to events on source

When a new video is uploaded to a folder there, it uses the setting in the file in that folder to encode and chunk the video file.

For video playback, using [Hls.js](https://www.npmjs.com/package/hls.js) ([Http Live Streaming](https://en.wikipedia.org/wiki/HTTP_Live_Streaming))

## ToDo

- setup some kind of cors so as to only serve the production site url. ([example](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/add-origin-custom-headers.html))
