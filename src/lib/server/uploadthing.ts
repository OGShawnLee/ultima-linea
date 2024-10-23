import { UPLOADTHING_TOKEN } from "$env/static/private";
import { UTApi } from "uploadthing/server";

export const uploadthing = new UTApi({
  token: UPLOADTHING_TOKEN,
});

const randomNames = [
	"meryl",
	"silver",
	"solid",
	"organic",
	"big",
	"psycho",
	"revolver",
	"sniper",
	"vulcan",
	"liquid",
	"gray",
	"decoy",
	"hal",
	"naomi",
	"frank",
	"hal",
	"mei",
	"xcaret"
];
export const randomLastNames = [
	"silverburgh",
	"cake",
	"snake",
	"goldfish",
	"boss",
	"mantis",
	"ocelot",
	"wolf",
	"raven",
	"snake",
	"fox",
	"octopus",
	"emmerich",
	"hunter",
	"jaeger",
	"emmerich",
	"ling",
	"demonic"
];

function generateRandomFileName(type: string): string {
	const date = new Date();
	const timestamp = date.getTime();
	const randomNumberName = Math.floor(Math.random() * 100);
	const randomNumberLastName = Math.floor(Math.random() * 100);
	const name = randomNames[randomNumberName % randomNames.length];
	const lastName = randomLastNames[randomNumberLastName % randomLastNames.length];
	return name + "-" + lastName + "-" + timestamp + "." + type.split("/")[1];
}

function prepareFile(file: File) {
	return new File([file], generateRandomFileName(file.type), {
		type: file.type
	});
}

export function uploadFile(file: File) {
	return uploadthing.uploadFiles(prepareFile(file));
}