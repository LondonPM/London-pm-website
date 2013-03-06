ABOUT The London.pm Website
===========================

Where does this code live?
--------------------------
https://github.com/perl-doc-cats/London-pm-website

How do I update the calendar?
-----------------------------
Get ranguard@gmail.com to give you access to the google iCal

What happened to the who page?
------------------------------
Too much hastle to maintain

How do changes get put live on the servers?
-------------------------------------------
Login as 'lpm' user
cd London-pm-website
git pull

How to setup apache2
--------------------
cd /usr/ports/www
pkg_add -r apache22
pkg_add -r mod_perl2

vim /etc/rc.conf 
add:
    apache22_enable="YES"

cd /usr/local/etc/apache22/
vim httpd.conf
add:
    LoadModule perl_module libexec/apache22/mod_perl.so
    Include /home/lpm/London-pm-website/apache2.conf

CPAN Modules needed:
--------------------
Path::Class;
Plack::Middleware::TemplateToolkit;
Plack::Middleware::Static;
Plack::Middleware::Rewrite;


