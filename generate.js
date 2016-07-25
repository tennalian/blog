module.exports = function(){
	var faker = require('faker');
	var _ = require('lodash');
	return{
		posts: _.times(100, function(n){
			return {
				id: n+1,
				title: faker.lorem.sentence(),
				image: faker.image.imageUrl(),
				body: faker.lorem.paragraphs()
			}
		}),
		comments: _.times(500,function(n){
			return{
				id: n+1,
				body: faker.lorem.paragraph(),
				postId: (Math.random() * (100 - 1) + 1).toFixed()
			}
		})
	}
}
