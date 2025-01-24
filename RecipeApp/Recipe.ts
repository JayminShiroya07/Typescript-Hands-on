type recipe = {
    id:number,
    name: String, 
    type: String, 
    description: String
}

let Recipes : Array<recipe> = [];

function Add(){
    let id = parseInt((<HTMLInputElement>document.getElementById("recipeId")).value);
    let name = (<HTMLInputElement>document.getElementById("recipeName")).value;
    let type = (<HTMLInputElement>document.getElementById("recipeType")).value;
    let description = (<HTMLInputElement>document.getElementById("description")).value;
    let Recipe = addRecipe(id, name, type, description);
    Recipes.push(Recipe);
    appendRecipe();
    resetForm();
    alert("Recipe Added Successfully");
}

function onItemSelect(id:number){
    const recipe = viewRecipeById(id);
    (<HTMLInputElement>document.getElementById("recipeId")).value = recipe.id.toString();
    (<HTMLInputElement>document.getElementById("recipeName")).value = recipe.name.toString();
    (<HTMLInputElement>document.getElementById("recipeType")).value = recipe.type.toString();
    (<HTMLInputElement>document.getElementById("description")).value = recipe.description.toString();
    let btn = document.getElementById("add") as HTMLButtonElement;
    btn.value = "Update";
    btn.setAttribute("onclick", "updateRecipe()");
    
}


function addRecipe(id:number, name: String, type: String, description:String) : recipe {
    let Recipe : recipe = {id:id, name:name, type:type, description:description};
    return Recipe;
};

function viewRecipeById(id:number) : recipe {
    return Recipes.filter((recipe) => recipe.id == id)[0];
}

function onItemDelete(id:number) : void {
    Recipes = Recipes.filter((recipe) => recipe.id != id);
    alert("Recipe Deleted Successfully");
    appendRecipe();
    resetForm();
}   

function updateRecipe() {
    let id = parseInt((<HTMLInputElement>document.getElementById("recipeId")).value);
    let name = (<HTMLInputElement>document.getElementById("recipeName")).value;
    let type = (<HTMLInputElement>document.getElementById("recipeType")).value;
    let description = (<HTMLInputElement>document.getElementById("description")).value;
    Recipes = Recipes.map((recipe) => {
        if(recipe.id == id){
            recipe.name = name;
            recipe.type = type;
            recipe.description = description;
        }
        return recipe;
    });
    appendRecipe();
    resetForm();
    let btn = document.getElementById("add") as HTMLButtonElement;
    btn.value = "Add Recipe";
    btn.setAttribute("onclick", "Add()");
}

function appendRecipe(){
    let table = document.getElementById("recipeTable") as HTMLTableElement;
    table.innerHTML = "";
    for(let recp of Recipes){
       let recpString = "<tr><td>"+recp.id+"</td><td>"+recp.name
       +"</td><td>"+recp.type
       +"</td><td>"+recp.description
       +"</td><td><button onclick='onItemSelect("+recp.id+")'>Edit</button></td>"+
       "<td><button onclick='onItemDelete("+recp.id+")'>Delete</button></td>"+"</tr>";
         table.innerHTML += recpString;
    }
}

function resetForm(){
    (<HTMLInputElement>document.getElementById("recipeId")).value = "";
    (<HTMLInputElement>document.getElementById("recipeName")).value = "";
    (<HTMLInputElement>document.getElementById("recipeType")).value = "Veg";
    (<HTMLInputElement>document.getElementById("description")).value = "";
    let btn = document.getElementById("add") as HTMLButtonElement;
    btn.innerHTML = "Add";
    btn.setAttribute("onclick", "Add()");
}