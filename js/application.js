let github_directories;
const category = document.querySelector('#category');

const fetch_datas =  async function(url) {
	try {
		return fetch(url);
	} catch(error) {
		console.log('Fetch Error :-S', err);	
	}
}

const loading_directories = async function() {
	const fetching = await fetch_datas('https://api.github.com/repos/justalk/Informations/contents/');
	const infos = await fetching.json();
	const directories = infos.filter(x => x.type=="dir" && x.name!="modules");
	return directories;
}

const loading_files_in_directory = async function(directory_name) {
	const fetching = await fetch_datas('https://api.github.com/repos/justalk/Informations/contents/'+directory_name);
	const infos = await fetching.json();
	return infos;
}

const loading_file = async function(directory_name,file_name) {
	const fetching = await fetch_datas('https://api.github.com/repos/justalk/Informations/contents/'+directory_name+"/"+file_name);
	const infos = await fetching.json();
	return infos;
	console.log(infos);
	//const directories = infos.filter(x => x.type=="dir" && x.name!="modules");
	//return directories;
}

//<i class="material-icons">chevron_right</i>
const loading_categories = async function() {
	github_directories = await loading_directories(); 
	github_directories.map(x => {
		let ul = category.querySelector('ul');
		let nodeli = document.createElement("li");
		let nodei = document.createElement("i");
		nodeli.setAttribute("data-category", x.name);
		nodei.setAttribute("class", "material-icons");
		nodei.appendChild(document.createTextNode("chevron_right"));
		nodeli.appendChild(document.createTextNode(x.name));
		nodeli.appendChild(nodei);
		ul.appendChild(nodeli); 
	})
}
loading_categories();

/**
const reading_github = async function() {
	const github_directories = await loading_directories();
	const github_files = await loading_files_in_directory(github_directories[0].name);
	const github_file = await loading_file(github_directories[0].name,github_files[0].name);
	const decode = window.atob(github_file.content);
	console.log(decode);
}
**/

//reading_github();



