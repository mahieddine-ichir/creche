var router = require('express').Router();

var data = [{
	name: 'Mouloud Ben Messaoud',
	naissance: {
		annee : '2010',
		mois : '01',
		jour: '01'
	},
	image: 'images/jenkins.jpg'
}, {
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
			adresse: '@enfant.adresse'
		}
	]
}, {
	name: 'Thiziri ICHIR',
	naissance: {
		annee : '2013',
		mois : '06',
		jour: '23'
	},
	image: 'images/jenkins.jpg'
}, {
	name: 'Ania Mederreg',
	naissance: {
		annee : '2009',
		mois : '02',
		jour: '29'
	},
	status: "absent",
	image: 'images/jenkins.jpg'
}, {
	name: 'Meissa Mederreg',
	naissance: {
		annee : '2012',
		mois : '11',
		jour: '11'
	},
	status: "absent",
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

module.exports = router;