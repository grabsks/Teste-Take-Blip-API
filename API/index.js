import express from "express";
import fetch from "node-fetch";

const app = express();

app.get('/repositories', async (req, res) => {

	const url ='https://api.github.com/search/repositories';
	const filters = 'org:takenet+language:c%23+is:public+fork:true';
	const sort = 'updated';
	const order = 'asc';
	const accept = 'application/vnd.github.v3+json';

	let filler = {};
	let selectedRepositories = {};

	let response = await fetch(`${url}?q=${filters}&sort=${sort}&order=${order}&accept=${accept}`);
	response = await response.json();

	selectedRepositories['avatar'] = response.items[0].owner.avatar_url;

	for (let i = 0; i < 5; i++) {
		const element = response.items[i];

		filler[i] = {
			id:element.id,
			full_name:element.full_name,
			description:element.description,
		};
	}

	selectedRepositories['items'] = filler;

	res.json(selectedRepositories);

});

app.listen(process.env.PORT || 5000);