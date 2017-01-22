const app = require('./server');
const request = require('supertest');
const expect = require('chai').expect;

const exampleGame = {
  deck: 'A legendary game',
  id: 2701,
  image: {
    icon_url: 'iconurl.jpg',
    medium_url: 'iconurl.jpg',
    screen_url: 'iconurl.jpg',
    small_url: 'iconurl.jpg',
    super_url: 'iconurl.jpg',
    thumb_url: 'iconurl.jpg',
    tiny_url: 'iconurl.jpg',
  },
  name: 'Zelda',
  platforms: ['nintendo 64', 'gamecube'],
  site_detail_url: "www.zelda.com",
  images: ['image1.jpg', 'image2.jpg']
}

describe('GAMES ROUTES', () => {

  it('should get all games', (done) => {
    request(app)
      .get('/api/games')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, resp) => {
        expect(resp.body).to.be.an('array');
        done();
      })
  });

  it('should create a game', (done) => {
    request(app)
      .post('/api/games')
      .send(exampleGame)
      .set('Accept', 'application/json')
      .end((err, resp) => {
        expect(resp.body.deck).to.eql(exampleGame.deck);
        expect(resp.body.id).to.eql(exampleGame.id);
        expect(resp.body.image).to.eql(exampleGame.image);
        expect(resp.body.name).to.eql(exampleGame.name);
        expect(resp.body.platforms).to.eql(exampleGame.platforms);
        expect(resp.body.site_detail_url).to.eql(exampleGame.site_detail_url);
        expect(resp.body.images).to.eql(exampleGame.images);
        done();
      });
  });

  it('should update a game', (done) => {
    request(app)
      .put('/api/games/' + exampleGame.id)
      .send({
        name: 'new name'
      })
      .end((err, resp) => {
        expect(resp.body.name).to.equal('new name');
        done();
      });
  });

  it('should delete a game', (done) => {
    request(app)
      .delete('/api/games/' + exampleGame.id)
      .end((err, resp) => {
        expect(resp.body.deck).to.eql(exampleGame.deck);
        expect(resp.body.id).to.eql(exampleGame.id);
        expect(resp.body.image).to.eql(exampleGame.image);
        expect(resp.body.name).to.be.a('string');
        expect(resp.body.platforms).to.eql(exampleGame.platforms);
        expect(resp.body.site_detail_url).to.eql(exampleGame.site_detail_url);
        expect(resp.body.images).to.eql(exampleGame.images);
        done();
      });
  });

});
