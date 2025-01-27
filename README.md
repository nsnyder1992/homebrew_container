# Homebrew Container

This project is for sharing your ideas and notes with the world. It is based on the NextJS framework, and deploys markdown files or MDX files to your web hosting platform. The easiest to use is vercels but you could potential get this setup on any hosting platform that allows publishing a backend server.

This project was originally made to host TTRPG homebrew notes, character files, and monster repository, but it can be used for regular notes or even a whole website of markdown files.

## Deploy to Vercel

For an example application of how to use this server go to the [LitteP6](https://github.com/nsnyder1992/little-p6) github project. Check out the [.github/workflows/publish.yml](https://github.com/nsnyder1992/little-p6/blob/main/.github/workflows/publish.yml) file. This will show you how to create a github action to auto deploy to vercel. Make sure you create an account on vercel and update the corresponding environment variables.

## Folder Structure

In order to publish your files, make sure they are in a publish folder and they all end in either `.md` or `.mdx`. The server will create a endpoint corresponding to the folder path you use. Example `publish/this/is/my/path/to/my/file.mdx` would be `/this/is/my/path/to/my/file` on the server.

## Links 

You can use the github style links `[Text](Link)` or you can use `[[Text|Link]]` where `Link` is the file path, from root, to the markdown file you want to link to or a website link.
