

Where does this code live?
--------------------------
https://github.com/perl-doc-cats/London-pm-website

How do I update the calendar?
-----------------------------
Get ranguard@gmail.com to give you access to the google iCal


What happened to the who page?
------------------------------
http://www.google.com/friendconnect/ is easier to maintain!


How do changes get put live on the servers?
-------------------------------------------
Login
sudo su -

HTML:

   cd /usr/local/www/root
   svn up

Code:

  svn co the code somewhere and install it.
  apachectl restart
