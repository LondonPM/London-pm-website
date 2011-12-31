#!/usr/bin/env perl

use strict;
use warnings;

use Path::Class;
use Plack::Middleware::TemplateToolkit;
use Plack::Builder;
use Plack::Middleware::Static;
use Plack::Middleware::Rewrite;

my $base = dir('root')->stringify();

my $on_lpm_server = '/home/lpm/London-pm-website/root';
if(-r $on_lpm_server) {
    $base = $on_lpm_server;
}

my $calendar_ics_url
    = 'http://www.google.com/calendar/ical/tge27p54mq26g6r1op26bpj5n4%40group.calendar.google.com/public/basic.ics';
my $calendar_atom_url
    = 'http://www.google.com/calendar/feeds/tge27p54mq26g6r1op26bpj5n4%40group.calendar.google.com/public/basic';

# Create our TT app, specifying the root and file extensions
my $app = Plack::Middleware::TemplateToolkit->new(
    root => [ ($base) ],    # required
    404  => "page_not_found.html",
    500  => "internal_server_error.html",
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
    enable 'Rewrite', rules => sub {
        my $path = $_;
        if ( $path =~ m{^/london.pm.ics} ) {
            $_ = $calendar_ics_url;
            return 301;
        } elsif ( $path =~ m{^/london.pm.rss}
            || $path =~ m{^/london.pm.atom} )
        {
            $_ = $calendar_atom_url;
            return 301;
        }
    };
    $app;
}
