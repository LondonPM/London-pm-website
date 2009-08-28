

Where does this code live?
--------------------------
https://london-pm.googlecode.com/svn/trunk/LPM


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
