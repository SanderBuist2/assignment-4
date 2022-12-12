//variables
const filterbox = document.getElementById("filters");
const filmGrid = document.getElementById("film_posters");
const switchCheckRadio = document.getElementById("checkorradio");
const filters = ["New movies", "Avenger", "X-Men", "Princess", "Batman"];
const searchFilter = document.getElementById("search_filter");
let applyedFilters = [];
let radio = false;

//functions
// create radio buttons
const addFilterArgument = function(filter){
    const inputItem = document.createElement("input");
    inputItem.setAttribute("type", "radio");
    inputItem.setAttribute("name", "filterchoice");
    inputItem.setAttribute("value", filter);
    return inputItem;
};

// refill the grid with the new selection
const resetGrid = function(array){
    filmGrid.innerHTML = "";
    array.forEach(film =>{
        addPosters(film);
    });
}

//apply filter
const filterBy = function(array, filter){
    if(filter === "New movies") 
        return array.filter(film => parseInt(film.year.substring(-0,4)) >= 2014);
    else return array.filter(film => film.title.includes(filter));
}

const applyFilter = function(filter, radio){
    if(radio){
        resetGrid(filterBy(movies, filter));
    }
    else {
        if (!applyedFilters.includes(filter)){
            applyedFilters.push(filter);
        }
        else{
            let newArray = applyedFilters.filter(filterItem => filterItem !== filter);
            applyedFilters = newArray;
        }
        if(applyedFilters.length != 0) {
            let newArray = movies.slice();
            applyedFilters.forEach(el => newArray = filterBy(newArray, el));
            resetGrid(newArray);
        }
        else resetGrid(movies);
    }
}

// adding the poster with link attached
const addPosters = function(element){
    aItem = document.createElement("a");
    aItem.setAttribute("href", "https://www.imdb.com/title/" + element.imdbID);
    imgItem = document.createElement("img");
    imgItem.setAttribute("src", element.poster);
    aItem.appendChild(imgItem);
    filmGrid.appendChild(aItem);
}

// creating content
// switch to or from radiobuttons/checkbox
switchCheckRadio.addEventListener("click",function(){
    let type;
    if(radio) {
        type = "radio";
        switchCheckRadio.innerHTML = "Pick one"
    }
    else {
        type = "checkbox"
        switchCheckRadio.innerHTML = "Pick multiple"
    }
    Array.from(filterbox.getElementsByTagName("label")).forEach(element => {
        element.getElementsByTagName("input")[0].setAttribute("type", type);
    });
    radio = !radio;
    applyedFilters = [];
    Array.from(filterbox.getElementsByTagName("input")).forEach(el => el.checked = false);
    resetGrid(movies);
});

// adding user defined search result
searchFilter.addEventListener("keypress", function(button){
    if(button.key === "Enter")
        resetGrid(filterBy(movies, searchFilter.value));
});

// add filteroptions to page
filters.forEach(element => {
    const labelItem = document.createElement("label");
    labelItem.appendChild(addFilterArgument(element));
    labelItem.innerHTML += element;
    labelItem.getElementsByTagName("input")[0].addEventListener("click", function(){
        const isradio = labelItem.getElementsByTagName("input")[0].type === "radio"
        applyFilter(element, isradio);});
    filterbox.appendChild(labelItem);
});

// adding posters to the grid
movies.forEach(film =>{
    addPosters(film);
});



