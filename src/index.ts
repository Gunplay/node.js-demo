// const express = require('express');
import express, { Request, Response } from 'express';
const app = express();

const port = process.env.PORT || 5000;

//IMPORTANT

const jsonBodyMiddleWare = express.json();
app.use(jsonBodyMiddleWare);

const db = {
	courses: [
		{ id: 1, title: 'front-end' },
		{ id: 2, title: 'back-end' },
		{ id: 3, title: 'automation-qa' },
		{ id: 4, title: 'devops' },
		{ id: 5, title: 'front-hello' },
	],
};

app.get('/', (req: Request, res: Response) => {
	res.send('Hello IT-Node-Heroku');
});

app.get('/videos', (req: Request, res: Response) => {
	let foundCourses = db.courses;
	if (req.query.title) {
		foundCourses = foundCourses.filter(
			c => c.title.indexOf(req.query.title as string) > -1
		);
	}

	//console.log(req.query.title as string)

	res.json(foundCourses);
});

app.post('/videos', (req: Request, res: Response) => {
	if (req.body.title.length < 3 || !req.body.title) {
		console.log('Title must be more then 3 symbols!');
		res.send('Title must be more then 3 symbols!');
		res.sendStatus(400);
		return;
	}

	const newCreatedCourses = {
		id: +new Date(),
		title: req.body.title,
	};
	db.courses.push(newCreatedCourses);
	res.status(201).json(newCreatedCourses);
	console.log(newCreatedCourses);
});

app.put('/videos/:videoId', (req: Request, res: Response) => {
	const foundCourse = db.courses.find(course => course.id == +req.params.id);
	if (!foundCourse) {
		res.sendStatus(404);
		return;
	}
	foundCourse.title = req.body.title;
	res.sendStatus(204);
	// .json(foundCourse);
	// console.log(foundCourse);
});
app.get('/video/:videoId', (req: Request, res: Response) => {
	const foundCourse = db.courses.find(course => course.id === +req.params.id);
	if (!foundCourse) {
		res.sendStatus(404);
		return;
	}
	res.json(foundCourse);
});

app.delete('/videos/:videoID', (req: Request, res: Response) => {
	db.courses = db.courses.filter(course => course.id !== +req.params.id);
	// if (!foundCourse) {
	// 	res.sendStatus(404);
	// 	return;
	// }
	res.sendStatus(204);
	// .json(foundCourse);
	// console.log(foundCourse);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

//yarn init --yes

//yearn add express

//node .\index.js

//yarn add nodemon --dev

// yarn add typescript ts-node @types/node @types/express --dev

// I should to do file JSON-config for TS - yarn tsc --init
// "rootDir": "./src" - only for one file compile
// start compile - yarn tsc

// WATCH MODE
// yarn tsc -w
//  yarn nodemon .\dist\index.js
// "scripts": {
// 	"dev": "nodemon src/index.js",
// 	"inspect": "nodemon --inspect src/index.js"
// },
