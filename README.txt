ABOUT The London.pm Website
===========================

Where does this code live?
--------------------------
https://github.com/perl-doc-cats/London-pm-website

How do I update the calendar?
-----------------------------
Get ranguard@gmail.com to give you access to the google iCal

How do changes get put live on the servers?
-------------------------------------------
Login as 'lpm' user
cd London-pm-website
git pull

(maybe we could just put in a cronjob for this?)

What happened to the who page?
------------------------------
Too much trouble to maintain

How to setup a server (especially apache2)
-------------------------------------------

CPAN Modules needed:
--------------------
> cpan App::cpanminus
> cpanm Path::Class Plack::Handler::Apache2 Plack::Middleware::TemplateToolkit Plack::Middleware::Static Plack::Middleware::Rewrite

> adduser
Username   : lpm
Password   : <disabled>
Full Name  : London.pm User
Uid        : 1009
Class      : 
Groups     : lpm 
Home       : /home/lpm
Home Mode  : 
Shell      : /usr/local/bin/bash
Locked     : no
OK? (yes/no): yes

> su - lpm
> cd
> git clone git://github.com/perl-doc-cats/London-pm-website.git

--------------------
cd /usr/ports/www
pkg_add -r vim
pkg_add -r git
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

> apachectl restart

*/5 * * * * cd /home/lpm/London-pm-website; git pull


