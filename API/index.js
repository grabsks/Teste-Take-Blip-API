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

	selectedRepositories['itemType'] = "application/vnd.lime.document-select+json";

	for (let i = 0; i < 5; i++) {
		const element = response.items[i];

		filler[i] = {
			header: {
				type: "application/vnd.lime.media-link+json",
				value: {
						title: element.full_name,
						text: element.description,
						type: "image/jpeg",
						uri: element.owner.avatar_url
				}
			}
		};
	}

	selectedRepositories['items'] = filler;

	res.json(selectedRepositories);

});

app.listen(process.env.PORT || 5000);