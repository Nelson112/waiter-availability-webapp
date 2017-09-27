# waiter-availability-webapp

# About the application.

<blockquote>
<P>The application the allows users to choose the days which they are able to work in this case waiters will be our users.</p>
<P>It will then show the administration in a table form how who will work on a particular day of the week</p>
<P>and highlight the days that have, enough, too little or too many waiters all with a different color.</p>

## How to run to run my applications on your machine.

* You can get the application repository  by cloning it at [here](https://github.com/Nelson112/waiter-availability-webapp)

## You will need to install:
* [NodeJS](https://nodejs.org/en/)<p> is an open source server framework</p>
* [Mongo](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-mongodb-on-ubuntu-16-04)<p> is a document database with the scalability and flexibility that you want with the querying and indexing that you need</p>

### There are also dependencies you need to install
* [Body-Parser](https://www.npmjs.com/package/body-parser)
* [express](https://www.npmjs.com/package/express)
* [express-handlebars](https://www.npmjs.com/package/express-handlebars)
* [mongoose](https://www.npmjs.com/package/mongoose)

### For testing I used [Mocha](https://mochajs.org/).

<P> The app listens to port 3002 so the way you would get the app started is to make sure node is running in the terminal, and <em>localhost:3002</em> </p>
<p> would take you straight to the landing page </p>

<p> In order to log in as a waiter you would be required to go to <em>localhost:3002/waiter/<waiters_name></em> , this will allow that waiter to choose the days the can work at and submit. </P>
<p> On the landing page there's a button that allows you to go to the admin page <em>localhost:3002/admin</em>   where you can view all the waiters and the days the are working and to see which </p>
<P> have enough waiters, still needs waiters or that has too much waiters.</p>
<P> there's a reset button that will erase all the waiters from the table </p>


</blockquote>
