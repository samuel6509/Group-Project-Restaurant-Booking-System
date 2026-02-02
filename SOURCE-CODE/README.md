PREREQUISITES:
. php artisan storage:link, so you can see the images
. may need to increase the size of incoming images in PHP.ini

IF ADMIN DASHBOARD DOES NOT WORK RUN THESE:
.composer remove spatie/laravel-permission
. composer require spatie/laravel-permission
. Composer install

ADMIN LOGINS:
USERNAME:                      PASSWORD:
supersuper@example.com         passwordadmin
superadmin@example.com         passwordadmin

ENV file in laravel project directory is invisible, make it visible in you folder & change this in database connection... 
DB_CONNECTION=mysql
DB_HOST=dragon.kent.ac.uk
DB_PORT=3306
DB_DATABASE=comp6000_13
DB_USERNAME=comp6000_13
DB_PASSWORD=ettoly_

ENV file, if you want to be able to send emails add this to your env file:
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME="reservations.ladolcevita@gmail.com"
MAIL_PASSWORD="qpyn wthf xplc pkyb"
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="reservations.ladolcevita@gmail.com"
MAIL_FROM_NAME="Restaurant Booking"
EMAIL_USER="reservations.ladolcevita@gmail.com"
EMAIL_PASS="qpyn wthf xplc pkyb"

If that doesn't let you send emails automatically try this in the terminal cause maybe the env file isn't getting called correctly
$env:MAIL_HOST = "smtp.mailtrap.io"
$env:MAIL_PORT = "587"
$env:MAIL_USERNAME = "reservations.ladolcevita@gmail.com"
$env:MAIL_PASSWORD = "qpyn wthf xplc pkyb"
$env:MAIL_FROM_ADDRESS = "reservations.ladolcevita@gmail.com"

Initial Proposal google doc https://docs.google.com/document/d/1wVoav6IDG0Ie88y_6_nDshJOiyteuVgmEtqSnSySVwA/edit?usp=sharing
UI Design mockup https://docs.google.com/document/d/1ZTI2FxJC9N2U9vO_9l8Njw1AU9vIMt_tkkxz6kIKrUo/edit?usp=drive_link
Restaurant Overview https://docs.google.com/document/d/1URPrJsjvCPUf9FXEYoZw-MaWG5Qm7Z6x/edit?usp=sharing&ouid=113061858403613053678&rtpof=true&sd=true
Project Meeting Logs https://docs.google.com/document/d/1fjXDKILX30EnOsCAcUt9uTg3qtd6yfQudArJkpyV8Yw/edit?usp=sharing
Informal Test Table https://docs.google.com/document/d/1XxbFu9an2Sm7Aa8Z4fRdaT-aEsuryxCk/edit?usp=sharing&ouid=113061858403613053678&rtpof=true&sd=true

Trello workspace https://trello.com/b/13KtVNyw/group-project-sprint-1

TODO:
. Install MYSQL on raptor
. Install laravel on rapotor 
. Complete word document / proposal
. Begin first sprint 

References:
Cors Error https://corsproxy.io/%E2%80%99

Databases Copmuting Systems Documentation https://www.cs.kent.ac.uk/systems/faq/databases.html
. WildWood Restaurant https://wildwoodrestaurants.co.uk/menus/

. Low level menu https://www.frankieandbennys.com/menu

. High level menu https://www.mcdonalds.com/gb/en-gb/menu.html

How to make frontend:
. The templates for our web pages are made in blade format
. The  static information displayed on a page can be made in one react file
. At the top of this react file import one of the template you intend to use
. Other components (such as search bar as an example) can be made in their own react files
. This method of frontend development ensures reusability as well as productivity 

FOOD IMAGE REFERENCES:
. chicken & chips: https://www.freepik.com/free-photo/sauce-near-chicken-french-fries_1846042.htm#fromView=search&page=1&position=27&uuid=41552de5-99eb-4000-bef9-d04a2f98dc3f&new_detail=true&query=chicken+and+chips+
. onion rings: https://www.vecteezy.com/png/27735603-a-plate-of-onion-rings-on-a-transparent-background
. strawberry cheesecake: https://www.freepik.com/free-photo/strawberry-cheesecake-isolated-white-background_94433832.htm#fromView=keyword&page=1&position=0&uuid=db4b62cf-9085-4ae9-871c-3ddec5e405c2&new_detail=true&query=Strawberry+Cheesecake+Png
. lemon cheesecake: https://www.freepik.com/free-psd/slice-delightful-lemon-cheesecake-garnished-with-fresh-mint-lemon-slices-sits-rustic-white-plate-creamy-texture-vibrant-yellow-hues-make-it-tempting-dessert_406619069.htm#fromView=keyword&page=1&position=6&uuid=9342f120-3956-4853-b64d-d3b191af4fce&new_detail=true&query=Cheesecake+Png
. vanilla cheesecake: https://www.freepik.com/free-psd/creamy-slice-classic-new-york-cheesecake_405497313.htm#fromView=keyword&page=1&position=0&uuid=8e8bd0ef-d8f3-4078-80ee-072857045f9d&new_detail=true&query=Cheesecake+Png
. ice cream sundae: https://rosepng.com/ice-cream-png-12/
. strawberry single scoop: https://rosepng.com/ice-cream-cup-png-2/
. vanilla single scoop: https://rosepng.com/ice-cream-cup-png-3/
. quad scoop: https://rosepng.com/ice-cream-png-4/
. choco quad scoop: https://rosepng.com/amul-ice-cream-png-4/
. vanilla quad scoop: https://rosepng.com/amul-ice-cream-png/
. original 3 scooper: https://rosepng.com/ice-cream-png/
. Hotdog: https://rosepng.com/hot-dog-png-4/
. Chicken nuggets: https://rosepng.com/frozen-chicken-nuggets-png/
. Fries: https://rosepng.com/french-fries-png-3/
. childrens pepperoni pizza: https://rosepng.com/pizza-clipart/