const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const app = require('../../server');

const expect = chai.expect();
const should = chai.should();
chai.use(chaiHttp);

describe('test locations controller', async () => {
  before((done) => {
    mongoose.connect(process.env.TEST_DBURL, { useNewUrlParser: true });
    done();
  });

  it('Should throw an error if name not supplied', (done) => {
    const location = {
      name: '',
    };

    chai.request(app)
      .post('/api/locations/')
      .send(location)
      .end((err, res) => {
        should.exist(res);
        res.should.have.status(400);
        done();
      });
  });

  it('Should throw an error if name length less than 2 characters', (done) => {
    const location = {
      name: 't',
      femaleCount: 100,
      maleCount: 200
    };

    chai.request(app)
      .post('/api/locations/')
      .send(location)
      .end((err, res) => {
        should.exist(res);
        res.should.have.status(400);
        done();
      });
  });

  it('Should create a new location', (done) => {
    const location = {
      name: 'Kiambu',
      femaleCount: 100,
      maleCount: 200,
      subLocation: [{
        name: 'Kiamaiko',
        femaleCount: 10,
        maleCount: 20,
      }]
    };

    chai.request(app)
      .post('/api/locations/')
      .send(location)
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(201);
        res.body.should.have.property('location');
        done();
      });
  });

  it('Should get all locations', (done) => {
    chai.request(app)
      .get('/api/locations/')
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        done();
      });
  });

  it('Should return error 404 if endpoint is not valid', (done) => {
    chai.request(app)
      .get('/api/locations/tes6778888')
      .end((err, res) => {
        console.log('response', res);
        should.exist(res);
        res.should.have.status(404);
        done();
      });
  });

  it('updates location successfully', (done) => {
    chai.request(app)
      .get(`/api/locations/`)
      .end((err, res) => {
        const locationId = res.body[0]._id;
        const location = {
          name: 'Naivasha',
          femaleCount: 40,
          maleCount: 20
        }
        chai.request(app)
          .put(`/api/locations/${locationId}`)
          .send(location)
          .end((err, res) => {
            should.exist(res.body);
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Successfully updated');
            done();
          });
      });
  });

  it('returns error if that location does not exist ', (done) => {
    const location = {
      name: 'Naivasha',
      femaleCount: 40,
      maleCount: 20
    }
    chai.request(app)
      .put(`/api/locations/testsUnavailable`)
      .send(location)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('delete a location successfully', (done) => {
    chai.request(app)
      .get(`/api/locations/`)
      .end((err, res) => {
        const locationId = res.body[0]._id;
        chai.request(app)
          .delete(`/api/locations/${locationId}`)
          .end((err, res) => {
            should.exist(res.body);
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Successfully deleted');
            done();
          });
      });
  });

  it('cant delete a location with an invalid id ', (done) => {
    chai.request(app)
      .delete('/api/locations/6363test')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('errors on delete of location that does not exist ', (done) => {
    chai.request(app)
      .delete(`/api/locations/5d611cf72fd0237fd9aabde9`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });
});
