# Spot & Reviews

A limited feature version of sniff spot.

## Installation

Install the NodeJS 16 & Yarn

```bash
  curl -s https://deb.nodesource.com/setup_16.x | sudo bash
  sudo apt install nodejs -y
  npm install --global yarn
```

Install Ruby 2.7.0

```bash
  rvm install 2.7.0
```

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install the bundle

```bash
  bundle install
```

Create Database, run the migrations & seed the data

```bash
  rails db:create
  rails db:migrate
  rails db:seed
```

Install dependencies

```bash
  npm install
```

Start the Rails server

```bash
  rails s
```

Start the Reacts server

```bash
  yarn --cwd todo-app start
```

## Schema

Here's the DB's Layout of this project.

```bash
  Spot:   title,   description, price, images, reviews
  Review: spot_id, description
```

You can get the Schema's blueprint from the db/schema.rb as well.

## Running Tests

To run tests, run the following command

```bash
  bundle exec rspec
```
