package LPM::Controller::Root;

use strict;
use warnings;
use parent 'Catalyst::Controller';

#
# Sets the actions in this controller to be registered with no prefix
# so they function identically to actions created in MyApp.pm
#
__PACKAGE__->config->{namespace} = '';

=head1 NAME

LPM::Controller::Root - Root Controller for LPM

=head1 DESCRIPTION

This servers the London.pm website

=head1 METHODS

=cut

my $calendar_ics_url = 'http://www.google.com/calendar/ical/tge27p54mq26g6r1op26bpj5n4%40group.calendar.google.com/public/basic.ics';
my $calendar_atom_url = 'http://www.google.com/calendar/feeds/tge27p54mq26g6r1op26bpj5n4%40group.calendar.google.com/public/basic';

sub auto : Private {
    my ( $self, $c ) = @_;

    $c->res->content_type('text/html; charset=utf-8');
    
    return 1;
}

sub default :Path {
    return 1;
}

sub london_ics :Path('london.pm.ics') {
    my ( $self, $c ) = @_;
    $c->res->redirect($calendar_ics_url);
    $c->detach();
}

sub london_rss :Path('london.pm.rss') {
    my ( $self, $c ) = @_;

    # Bah, use atom!
    $c->res->redirect($calendar_atom_url);
    $c->detach();
}

sub london_atom :Path('london.pm.atom') {
    my ( $self, $c ) = @_;
    $c->res->redirect($calendar_atom_url);
    $c->detach();
}

=head2 end

Attempt to render a view, if needed.

=cut 


sub end : Private {

    my ( $self, $c ) = @_;

    return if $c->res->status =~ /^30/;
    return if $c->res->body();

    $c->stash->{template} = 'www/page_not_found.html'
      if $c->res->status == 404;

    # If there is already a body then we don't need to process the templates
    if ( $c->res->body ) {
        return 1;
    }

    if ( !$c->stash->{template} ) {

        # No template defined, use path
        my $path        = $c->req->path;
        my $legal_chars = quotemeta('.-_/');
        if ( $path =~ /\.\./ || $path =~ /[^\w$legal_chars]/ ) {
            warn "Dodgy path: $path - rewriting" if $c->debug;
            $path =~ s/\.\.//g;
            $path =~ s/[^\w$legal_chars]//g;    # security?
            $c->res->redirect( '/' . $path );
            $c->detach();
        }
        $path .= 'index.html'
          if $path !~ /html$/ && $path !~ /xml$/ && $path !~ /txt$/;
        $c->stash->{template} = "$path";
    }

    $c->forward('View::TT');
}
=head1 AUTHOR

leo@cuckoo.org

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
