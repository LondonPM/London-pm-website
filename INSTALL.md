# Installing a development and testing environment

The London Perl Mongers web site is a simple static site that is generated
using the [Template Toolkit](https://tt2.org/).

If you want to make improvements to the site (which would be very welcome)
then follow these steps:

1. Fork the code repo from https://github.com/LondonPM/London-pm-website
1. Clone your fork of the repo
1. Install the Template Toolkit using your favourite CPAN module installation technique
1. Make whatever changes you want
1. Build the site locally using `ttree -f ttreerc`
1. Run a local web server (I like [`http_this`](https://metacpan.org/pod/App::HTTPThis)) to test your changes
1. When you're happy, commit your changes and push them to your fork
1. Create a [pull request](https://github.com/LondonPM/London-pm-website/pulls) to merge your changes to the main repo
1. Wait for feedback

## Build details

Running the command `ttree -f ttreerc` takes all of the files from the `root`
directory, processes them using the Template Toolkit and writes the output to
files in the `docs` directory.

[`ttree`](https://metacpan.org/dist/Template-Toolkit/view/bin/ttree) is a
command-line program that is distributed with the Template Toolkit. It takes
a list of files (usually all of the contents of a directory), processes them
all in a standard manner and writes the resulting files to an output
directory. We have our own `ttreerc` file which controls how the processing
works. Our `ttreerc` contains the following:

    # Look for input files in the root directory
    src = root
    # Write output files to the docs directory
    dest = docs

    # Files matching this regex are copied, not processed
    copy   = \.(gif|png|jpg|pdf|css|js)$

    # Recurse through all directories under the source directory
    recurse

    # Be verbose about the processing that is taking place
    verbose

By default, `ttree` looks for a configuration file called `.ttreerc` in
the user's home directory. Because our configuration file won't be in your
home directory, we use the `-f` option to override the default location of
the file.

    ttree -f ttreerc

## Testing details

Please test your changes before submitting them. The best way to do this is
with a local HTTP server. For example, `http_this` can be used to serve the
files in a directory over HTTP. Typically, having built the site using
`ttree`, you have the generated files in the docs directory and can run the
server with:

    http_this docs

This will run a server on port 7007 by default, so you can access the site on
http://localhost:7007/.

While it's possible to test web sites by opening files directory in a browser
(using `file://` URLs), we don't recommend this as absolute URLs (like those
that are often used for images and CSS files) probably won't work correctly.

## Deployment details

Once your changes have been accepted by a maintainer, the site will be
deployed to the live environment. This happens automatically when your
pull request is merged to the master branch.

The deployment is automated using GitHub Action (you can see the
[workflow definition file](https://github.com/LondonPM/London-pm-website/blob/master/.github/workflows/buildsite.yml))
and the site is deployed to GitHub Pages.

Note that the generated web site is never stored in the GitHub repo (the
docs directory is explicitly listed in `.gitignore`. Instead, the site
is generated on a GitHub Actions runner and deployed to the GitHub Pages
server from there.

## Other questions

If you have any other questions, feel free to raise
[an issue in the repo](https://github.com/LondonPM/London-pm-website/issues)
and one of us will get back to you.

