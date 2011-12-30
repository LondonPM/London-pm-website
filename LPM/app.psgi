#!/usr/bin/env perl

use strict;
use warnings;
use lib qw(lib);

use Path::Class;
use Plack::Middleware::TemplateToolkit;
use Plack::Builder;
use Plack::Middleware::ErrorDocument;
use Plack::Middleware::Static;

my $base   = dir( 'root' )->stringify();

# Create our TT app, specifying the root and file extensions
my $app = Plack::Middleware::TemplateToolkit->new(
    root => [ ( $base ) ],    # required
     404 => "page_not_found.html",
     500 => "internal_server_error.html",
)->to_app;

# Plack::Middleware::Deflater might be good to use here

# Binary files can be served directly
$app = Plack::Middleware::Static->wrap(
    $app,
    path => qr{^/static/},
    root => $base
);

return builder {
    # enable "Debug";
    $app;
}
