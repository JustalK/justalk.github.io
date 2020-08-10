let github_directories;
const category = document.querySelector('#category');
const file = document.querySelector('#file');
const md = document.querySelector('#md');
const back_file_to_category = document.querySelector('#file .back');
const back_md_to_file = document.querySelector('#md .back');
const md_content = document.querySelector('#md .content');

const fetch_datas =  async function(url) {
	try {
		return fetch(url);
	} catch(error) {
		console.log('Fetch Error :-S', err);
	}
}

const loading_directories = async function() {
	let fetching,infos;
	if(localStorage.getItem("infos_directories") === null) {
		fetching = await fetch_datas('https://api.github.com/repos/justalk/Informations/contents/');
		infos = await fetching.json();
		localStorage.setItem("infos_directories", JSON.stringify(infos));
	} else {
		let infos_directories = localStorage.getItem("infos_directories")
		infos = JSON.parse(infos_directories);
	}
	const directories = infos.filter(x => x.type=="dir" && x.name!="modules");
	return directories;
}

const loading_files_in_directory = async function(directory_name) {
	let fetching,infos;
	if(localStorage.getItem(directory_name) === null) {
		fetching = await fetch_datas('https://api.github.com/repos/justalk/Informations/contents/'+directory_name);
		infos = await fetching.json();
		localStorage.setItem(directory_name, JSON.stringify(infos));
	} else  {
		let infos_directory = localStorage.getItem(directory_name)
		infos = JSON.parse(infos_directory);
	}
	return infos;
}

const loading_file = async function(directory_name,file_name) {
	let fetching,infos;
	if(localStorage.getItem(directory_name+"_"+file_name) === null) {
		fetching = await fetch_datas('https://api.github.com/repos/justalk/Informations/contents/'+directory_name+"/"+file_name);
		infos = await fetching.json();
		localStorage.setItem(directory_name+"_"+file_name, JSON.stringify(infos));
	} else {
		let infos_directory = localStorage.getItem(directory_name+"_"+file_name)
		infos = JSON.parse(infos_directory);
	}
	return infos;
}

const create_list = async function(array,list,action,dataset,github_category_selected) {
	array.map(x => {
		let nodeli = document.createElement("li");
		let nodei = document.createElement("i");
		let name = x.name;
		name = name.replace(/DEV\_|\.Md/gi,"");
		name = name.replace(/\_/gi," ");
		nodeli.setAttribute(dataset, x.name);
		if(github_category_selected) nodeli.setAttribute("data-category", github_category_selected);
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
	create_list(github_files,ul,file_selected,"data-file",github_category_selected);
	file.classList.remove("not-selected");
}

const loading_categories = async function() {
	github_directories = await loading_directories();
	let ul = category.querySelector('ul');
	create_list(github_directories,ul,category_selected,"data-category");
}
loading_categories();


const back_to_category = function() {
	file.classList.add("not-selected");
	category.classList.remove("selected");
}
back_file_to_category.addEventListener("click", back_to_category);

const file_selected = async function(e) {
    let node = e.currentTarget;
    let github_category_selected = node.dataset.category;
    let github_file_selected = node.dataset.file;
    file.classList.add("selected");
    const github_md = await loading_file(github_category_selected,github_file_selected);
	const decode = window.atob(github_md.content);
	console.log(decode);
	var converter = new showdown.Converter(),
    text = decode,
    html = converter.makeHtml(text);
	md_content.innerHTML = html;
	md.classList.remove("not-selected");
}

const back_to_file = function() {
	md.classList.add("not-selected");
	file.classList.remove("selected");
}
back_md_to_file.addEventListener("click", back_to_file);

//reading_github();
