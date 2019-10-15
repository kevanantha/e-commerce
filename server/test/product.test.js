const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app')
const User = require('../models/User')
const Product = require('../models/Product')

chai.use(chaiHttp)
const expect = chai.expect

let token

before('get JWT Token', function(done) {
  const body = {
    email: 'john@doe.com',
    password: 'secretofjohndoe'
  }
  chai
    .request(app)
    .post('/users/register')
    .send(body)
    .end(function(err, res) {
      token = res.body.token
      done()
    })
})

after('delete all', function() {
  return Product.deleteMany({})
})

describe('Products', function() {
  describe('/proudcts', function() {
    describe('Should return list of products', function() {
      it('Should return list of proudcts', function(done) {
        chai
          .request(app)
          .get('/products')
          .end(function(err, res) {
            expect(res.status).to.equal(200)
            expect(res.body).to.be.an('array')
            done()
          })
      })
    })
  })

  describe('/products/create', function() {
    describe('Should throw error 401 not authenticated', function() {
      describe('[ CREATE ] Should return not authenticated if no access_token', function() {
        it('Should return not authenticated if no access_token', function(done) {
          const body = {
            name: 'table1',
            price: '123',
            stock: 10,
            categories: ['a', 's', 'd', 'f'],
            image: 'ini image',
            description: '123123lotem'
          }
          chai
            .request(app)
            .post('/products/create')
            .send(body)
            .end(function(err, res) {
              expect(res.status).to.equal(401)
              expect(res.body)
                .to.be.a('string')
                .that.have.string('Not Authenticated! You must login')
              done()
            })
        })
      })
    })
  })

  describe('Creating Product', function() {
    describe('Correct Data Params', function() {
      describe('[ CREATE ] Should return created product object', function() {
        it('[ CREATE ] Should return created product object', function(done) {
          const product = {
            name: 'product1',
            price: '15000',
            stock: 10,
            categories: ['a', 's', 'd', 'f'],
            image: 'ini image url',
            description: 'lorem ipsum'
          }
          const headers = { access_token: token }
          chai
            .request(app)
            .post('/products/create')
            .set(headers)
            .send(product)
            .end(function(err, res) {
              expect(res.status).to.equal(201)
              expect(res.body).to.haveOwnProperty('_id')
              expect(res.body)
                .to.haveOwnProperty('name')
                .that.to.be.a('string')
              expect(res.body)
                .to.haveOwnProperty('price')
                .that.to.be.a('string')
              expect(res.body)
                .to.haveOwnProperty('stock')
                .that.to.be.a('number')
              expect(res.body)
                .to.haveOwnProperty('categories')
                .that.to.be.a('array')
              expect(res.body)
                .to.haveOwnProperty('image')
                .that.to.be.a('string')
              expect(res.body)
                .to.haveOwnProperty('description')
                .that.to.be.a('string')
              done()
            })
        })
      })
    })

    describe('Invalid Data Params', function() {
      describe('[ Product ] should throw error minimal stock is 0', function() {
        it('Minial stock is 0', function(done) {
          const product = {
            name: 'product1',
            price: '15000',
            stock: -1,
            categories: ['a', 's', 'd', 'f'],
            image: 'ini image url',
            description: 'lorem ipsum'
          }
          const headers = { access_token: token }
          chai
            .request(app)
            .post('/products/create')
            .set(headers)
            .send(product)
            .end(function(err, res) {
              expect(res.status).to.equal(400)
              expect(res.body)
                .to.be.an('array')
                .to.include('Minimal stock is 0')
              expect(res.body).to.have.lengthOf(1)
              done()
            })
        })
      })
      describe('[ Product ] should throw error all field is required', function() {
        it('All field required', function(done) {
          const product = {
            name: '',
            price: '',
            stock: '',
            categories: [],
            image: '',
            description: ''
          }
          const headers = { access_token: token }
          chai
            .request(app)
            .post('/products/create')
            .set(headers)
            .send(product)
            .end(function(err, res) {
              expect(res.status).to.equal(400)
              expect(res.body)
                .to.be.an('array')
                .that.to.have.lengthOf(5)
              done()
            })
        })
      })
      describe('[ Product ] should throw error field name is required', function() {
        it('Name is required', function(done) {
          const product = {
            name: '',
            price: '1000',
            stock: 100,
            image: 'image',
            description: 'desc'
          }
          const headers = { access_token: token }
          chai
            .request(app)
            .post('/products/create')
            .set(headers)
            .send(product)
            .end(function(err, res) {
              expect(res.status).to.equal(400)
              expect(res.body)
                .to.be.an('array')
                .that.to.have.lengthOf(1)
              done()
            })
        })
      })
      describe('[ Product ] should throw error field price is required', function() {
        it('price is required', function(done) {
          const product = {
            name: 'name',
            price: '',
            stock: 100,
            image: 'image',
            description: 'desc'
          }
          const headers = { access_token: token }
          chai
            .request(app)
            .post('/products/create')
            .set(headers)
            .send(product)
            .end(function(err, res) {
              expect(res.status).to.equal(400)
              expect(res.body)
                .to.be.an('array')
                .that.to.have.lengthOf(1)
              done()
            })
        })
      })
      describe('[ Product ] should throw error field stock is required', function() {
        it('stock is required', function(done) {
          const product = {
            name: 'name',
            price: '123',
            stock: '',
            image: 'image',
            description: 'desc'
          }
          const headers = { access_token: token }
          chai
            .request(app)
            .post('/products/create')
            .set(headers)
            .send(product)
            .end(function(err, res) {
              expect(res.status).to.equal(400)
              expect(res.body)
                .to.be.an('array')
                .that.to.have.lengthOf(1)
              done()
            })
        })
      })
      describe('[ Product ] should throw error field image is required', function() {
        it('image is required', function(done) {
          const product = {
            name: 'name',
            price: '123',
            stock: 123,
            image: '',
            description: 'desc'
          }
          const headers = { access_token: token }
          chai
            .request(app)
            .post('/products/create')
            .set(headers)
            .send(product)
            .end(function(err, res) {
              expect(res.status).to.equal(400)
              expect(res.body)
                .to.be.an('array')
                .that.to.have.lengthOf(1)
              done()
            })
        })
      })
      describe('[ Product ] should throw error field description is required', function() {
        it('description is required', function(done) {
          const product = {
            name: 'name',
            price: '123',
            stock: 123,
            image: 'url image',
            description: ''
          }
          const headers = { access_token: token }
          chai
            .request(app)
            .post('/products/create')
            .set(headers)
            .send(product)
            .end(function(err, res) {
              expect(res.status).to.equal(400)
              expect(res.body)
                .to.be.an('array')
                .that.to.have.lengthOf(1)
              done()
            })
        })
      })
    })
  })
})
