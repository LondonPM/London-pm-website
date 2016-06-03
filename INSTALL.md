How to set this up on a new server (assuming FreeBSD)
=====================================================

Install packages
----------------
    cd /usr/ports/www
    pkg_add -r vim
    pkg_add -r git
    pkg_add -r apache22
    pkg_add -r mod_perl2

CPAN Modules needed (install as root):
--------------------------------------
    cpan App::cpanminus
    cpanm Path::Class Plack::Handler::Apache2 Plack::Middleware::TemplateToolkit Plack::Middleware::Static Plack::Middleware::Rewrite

Make sure apache starts on reboot and loads everything:
-------------------------------------------------------
    vim /etc/rc.conf
    add:
        apache22_enable="YES"

    cd /usr/local/etc/apache22/
    vim httpd.conf
    add:
        LoadModule perl_module libexec/apache22/mod_perl.so
        Include /home/lpm/London-pm-website/apache2.conf


Create an lpm user
------------------
    adduser
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

Clone the repository
--------------------
    su - lpm
    cd
    git clone git://github.com/LondonPM/London-pm-website.git

    Add a crontab to auto update from github
    0,30 * * * * cd /home/lpm/London-pm-website; /usr/local/bin/git pull


Restart apache and all should be ok (cross fingers)
---------------------------------------------------
    apachectl restart
