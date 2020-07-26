let github_directories;
const category = document.querySelector('#category');
const file = document.querySelector('#file');
const back_file_to_category = document.querySelector('#file .back');

const fetch_datas =  async function(url) {
	try {
		return fetch(url);
	} catch(error) {
		console.log('Fetch Error :-S', err);	
	}
}

const loading_directories = async function() {
	let fetching,infos,infos_directories;
	if (localStorage.infos_directories) infos_directories = localStorage.getItem("infos_directories");
	if(!infos_directories) {
		fetching = await fetch_datas('https://api.github.com/repos/justalk/Informations/contents/');
		infos = await fetching.json();
		localStorage.setItem("infos_directories", JSON.stringify(infos));
	} else {
		infos = JSON.parse(infos_directories);
	}
	const directories = infos.filter(x => x.type=="dir" && x.name!="modules");
	return directories;
}

const loading_files_in_directory = async function(directory_name) {
	let fetching,infos,infos_directory;
	if (localStorage[directory_name]) infos_directory = localStorage.getItem(directory_name);
	if(!infos_directory) {
		fetching = await fetch_datas('https://api.github.com/repos/justalk/Informations/contents/'+directory_name);
		infos = await fetching.json();
		localStorage.setItem(directory_name, JSON.stringify(infos));
	} else  {
		infos = JSON.parse(infos_directory);
	}
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

const create_list = async function(array,list,action) {
	array.map(x => {
		let nodeli = document.createElement("li");
		let nodei = document.createElement("i");
		let name = x.name;
		name = name.replace(/DEV\_|\.Md/gi,"");
		name = name.replace(/\_/gi," ");
		console.log(name);
		nodeli.setAttribute("data-category", name);
		nodei.setAttribute("class", "material-icons");
		nodei.appendChild(document.createTextNode("chevron_right"));
		nodeli.appendChild(document.createTextNode(name));
		nodeli.appendChild(nodei);
		nodeli.addEventListener("click", action);
		list.appendChild(nodeli); 
	})
}

const category_selected = async function(e) {
    let node = e.currentTarget;
    let github_category_selected = node.dataset.category;
    category.classList.add("selected");
    const github_files = await loading_files_in_directory(github_category_selected);
	let ul = file.querySelector('ul');
	ul.innerHTML = '';
	create_list(github_files,ul,category_selected);
	file.classList.remove("not-selected");
    
	console.log(github_files);
}

const loading_categories = async function() {
	github_directories = await loading_directories(); 
	let ul = category.querySelector('ul');
	create_list(github_directories,ul,category_selected);
}
loading_categories();


const back_to_category = function() {
	file.classList.add("not-selected");
	category.classList.remove("selected");
}
back_file_to_category.addEventListener("click", back_to_category);

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



