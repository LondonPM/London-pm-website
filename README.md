About The London.pm Website
===========================

Where does this code live?
--------------------------
https://github.com/LondonPM/London-pm-website

Where is the site viewable?
--------------------------
Currently [https://londonperl.org/](https://londonperl.org/)


How do I develop locally?
--------------------------

- Install [Carton](https://metacpan.org/dist/Carton/view/script/carton) globally or using plenv or what ever tools you use

- Clone this repo

- Install dependencies
```sh
carton install
```

- Process root -> docs/
```sh
carton exec ttree -f ttreerc
```

- Run local server (you will need to click from the directory listing to the index.html pages, but good enough for developing)
```sh
carton exec -- plackup -MPlack::App::Directory -e 'Plack::App::Directory->new(root => "docs")->to_app' -p 8080
```

How does live deploy work?
--------------------------

See the .github/workflows/buildsite.yml
