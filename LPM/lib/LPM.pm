package LPM;

use strict;
use warnings;

use Catalyst::Runtime '5.70';

# Set flags and add plugins for the application
#
#         -Debug: activates the debug mode for very useful log messages
#   ConfigLoader: will load the configuration from a Config::General file in the
#                 application's home directory
# Static::Simple: will serve static files from the application's root
#                 directory

use parent qw/Catalyst/;

our $VERSION = '0.01';

# Configure the application.
#
# Note that settings in lpm.conf (or other external
# configuration file that you set up manually) take precedence
# over this when using ConfigLoader. Thus configuration
# details given here can function as a default configuration,
# with a external configuration file acting as an override for
# local deployment.

my @plugins_to_load = (qw/-Debug Static::Simple/);

my %config = ( name => 'LPM', );

# Start the application
__PACKAGE__->config(%config);
__PACKAGE__->setup(@plugins_to_load);

=head1 NAME

LPM - Catalyst based application

=head1 SYNOPSIS

    script/lpm_server.pl

=head1 DESCRIPTION

[enter your description here]

=head1 SEE ALSO

L<LPM::Controller::Root>, L<Catalyst>

=head1 AUTHOR

leo,,,

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
