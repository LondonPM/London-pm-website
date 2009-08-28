package LPM;

use strict;
use warnings;

use Catalyst::Runtime '5.70';

use parent qw/Catalyst/;
use Path::Class;
use Sys::Hostname;
our $VERSION = '0.01';

my @plugins_to_load = (qw/Static::Simple/);
my $root;

my $hostname = hostname();

if ( $hostname =~ /london\.pm\.org/ ) {

    # We're live!
    $root = '/usr/local/www/root';
} else {

    # must be dev;
    $root = dir( Catalyst::Utils::home('LPM') )->subdir('root');
    push( @plugins_to_load, '-Debug' );
}

my %config = (
    name => 'LPM',
    root => $root,
);

# Start the application
__PACKAGE__->config(%config);
__PACKAGE__->setup(@plugins_to_load);

sub finalize_error {
    my $c = shift;

    # in debug mode return the original "page"
    if ( $c->debug ) {
        $c->NEXT::finalize_error;
        return;
    }

    my $msg = join "\n", @{ $c->error };

    if ( $msg =~ /template .* not found/ ) {

        # File not found
        $c->response->status(404);
        $c->stash->{template} = 'page_not_found.html';
    } else {

        # log the errors to STDERR
        warn "ERROR DETECTED:\n";
        warn "  " . $c->req->uri->as_string . "\n";
        warn map {"  $_\n"} @{ $c->error };

        # change the response
        $c->response->status(500);
        $c->stash->{template} = 'internal_server_error.html';

    }
    $c->error(0);
    $c->view('TT')->process($c);
    if ( @{ $c->error } ) {
        warn "Error in error page! :" . join " ", @{ $c->error };
        $c->NEXT::finalize_error;
    }
}

=head1 NAME

LPM - Catalyst based application

=head1 SYNOPSIS

    script/lpm_server.pl

=head1 DESCRIPTION

[enter your description here]

=head1 SEE ALSO

L<LPM::Controller::Root>, L<Catalyst>

=head1 AUTHOR

Leo Lapworth

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
