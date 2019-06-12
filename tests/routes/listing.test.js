// Mongoose and mocking requests
const sinon = require('sinon');

const mongoose = require('mongoose')
require('sinon-mongoose')

// initialize the app and models
const app = require('../../index.js')

// sending requests
const agent = require('supertest').agent(app);
// validating results
const expect = require('chai').expect;

// get the model
const Listing = mongoose.model('Listing')

var Mock = sinon.mock(Listing)

beforeEach(() => {
	Mock.restore(); // Unwraps the spy
});

afterEach( () => {
	Mock.verify();
});

	const expected = {
		"location": {
            "street": "Farliga vägen",
            "number": 1,
            "city": "Alvesta",
            "municipality": "Alvesta kommun",
            "country": "Sweden",
            "lat": 1,
            "lon": 32
        },
        "_id": "5d00bd5ca235e4e1efbb110e",
        "type": "Husvagn",
        "price": 1,
        "monthlyfee": 10,
        "active": 1,
        "__v": 0
	}

describe('users.get', ()  => {

	it('Should return an array of all listings', (done) => {

		// Given (preconditions)
		Mock
		.expects('find')
		.chain('exec')
		.resolves([expected]);

		// When (someting happens)
		agent
		.get('/listings')
		.end((err,res) => {
		// Then (something should happen)
			expect(res.status).to.equal(200);
			expect(res.body).to.eql([expected]);
			done();
		});
	});

	it('Should get all listings by the same type', (done) => {

		Mock
		.expects('find')
		.withArgs({"type": "Husvagn"})
		.chain('exec')
		.resolves(expected);

		agent
		.get('/listings?type=Husvagn')
		.end((err, res) => {
			expect(res.status).to.equal(200);
			expect(res.body).to.eql(expected);
			done();
		})

	})

});
