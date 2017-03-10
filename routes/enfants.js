var router = require('express').Router();

var data = [{
	id: 1,
	name: 'Mouloud Ben Messaoud',
	naissance: {
		annee : '2010',
		mois : '01',
		jour: '01'
	},
	image: 'images/jenkins.jpg'
}, {
	id: 2,
	name: 'Mederreg Adil',
	naissance: {
		annee : '2011',
		mois : '11',
		jour: '23'
	},
	image: 'images/jenkins.jpg',
	contacts: [
		{
			name: 'Mederreg Lotfi',
			numero: '+213 1234567890',
			adresse: 'Les sources du bonheur, République démacratique du Rais'
		}
	]
}, {
	id: 3,
	name: 'Thiziri ICHIR',
	naissance: {
		annee : '2013',
		mois : '06',
		jour: '23'
	},
	image: 'images/jenkins.jpg'
}, {
	id: 4,
	name: 'Ania Mederreg',
	naissance: {
		annee : '2009',
		mois : '02',
		jour: '29'
	},
	image: 'images/jenkins.jpg'
}, {
	id: 5,
	name: 'Meissa Mederreg',
	naissance: {
		annee : '2012',
		mois : '11',
		jour: '11'
	},
	image: 'images/jenkins.jpg'
}];

router.get('/', function(req, resp, next) {
	resp.json(data);
});

router.post('/', function(req, resp, next) { 
	console.log(req.body);
	data.push(req.body);
	resp.json(req.body);
});

router.put('/:id', function(req, resp, next) {
	console.log(req.body);
	for (var i=0; i<data.length; i++) {
		if (req.params.id == data[i].id) {
			data[i] = req.body;
			return data[i];
		}
	}
	return resp.status(404);
});

module.exports = router;