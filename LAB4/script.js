fetch('product.json')
.then(function(response){
    return response.json();
})
.then(function(json){
    let products = json;
    initialize(products);
})
.catch(function(err){
    console.log('Cannot Fetch : '+ err.message);
});


function initialize(products){

    const category = document.querySelector('#category');
    const searchTerm = document.querySelector('#searchTerm');
    const filterBtn = document.querySelector('#filterbtn');
    const content = document.querySelector('.content');
    let lastCategory = category.value;
    let lastSearch = '';
    let categoryGroup;
    let finalGroup;
    let counter = 0, start, end;

    finalGroup = products;

    load1();

    window.onscroll=() =>{
        console.log("in scorll fgl : "+finalGroup.length);
        if(window.innerHeight + window.scrollY >= document.body.offsetHeight){
            load2();
        }
    };

    function load1(){
        while(content.firstChild){
            content.removeChild(content.firstChild);
        }
        if(finalGroup.length === 0){
            const noting = document.createElement('p');
            noting.textContent = "No results!";
            noting.setAttribute('class', 'noresult');
            content.appendChild(noting);
        }
        else{
            start = 0;
            counter = 0;
            if(finalGroup.length>start+4) end = start+4;
            else end=finalGroup.length;

            counter = end;
            
            for(let i =start; i< end; i++){
                showProduct(finalGroup[i]);
            }
        }
    }
    
    function load2(){

            start = counter;
            if(finalGroup.length>start+4) end = start+4;
            else end=finalGroup.length;
            console.log("start and end : " + start+"  "+end);
            counter = end;
            for(let i =start; i< end; i++){
                showProduct(finalGroup[i]);
            }
    }

    filterBtn.onclick = function selectCategory(e){

        e.preventDefault();
        categoryGroup = [];
        finalGroup = [];
        

        if(category.value === lastCategory && searchTerm.value.trim() === lastSearch) {
            return;
        } else{
            lastCategory = category.value;
            lastSearch = searchTerm.value.trim();

            if(category.value === "All"){
                categoryGroup = products;
            } else{
                for(let i=0; i<products.length; i++){
                    if(products[i].type === category.value){
                        categoryGroup.push(products[i]);
                    }
                }
            }
            selectProducts();
        }
    };

    function selectProducts(){
        if(searchTerm.value.trim() === ''){
            finalGroup = categoryGroup;
        }else{
            let lowercaseTerm = searchTerm.value.trim().toLowerCase();
            for(let i=0;i<categoryGroup.length;i++){
                let lowercaseName = categoryGroup[i].name.toLowerCase();
                if(lowercaseName.indexOf(lowercaseTerm) !== -1){
                    finalGroup.push(categoryGroup[i]);
                }
            }
        }

        load1();

        window.onscroll=() =>{
            if(window.innerHeight + window.scrollY >= document.body.offsetHeight){
                load2();
            }
        };
    }

    
    function showProduct(product){
        const div = document.createElement('div');
        div.setAttribute('class', 'product');
        div.classList.add(product.type.replace(/(\s*)/g, ""));

        const button  = document.createElement('button');
        button.setAttribute('class', 'description');
        button.innerHTML = "Click to see more";
        
        const image = document.createElement('img');
        image.src = "images/" + product.name + ".jpg";
        image.alt = product.name;

        button.onclick = () =>{
            const pname = document.createElement('p');
            pname.setAttribute('class', 'product_name');
            pname.textContent = product.name;
            
            const writer = document.createElement('p');
            writer.setAttribute('class', 'writer');
            writer.innerHTML = "by "+product.writer;

            const pprice = document.createElement('p');
            pprice.setAttribute('class', 'product_price');
            pprice.innerHTML = product.price+" won";

            const ptype = document.createElement('p');
            ptype.setAttribute('class', 'product_type');
            ptype.innerHTML = product.type;


            div.appendChild(pname);
            div.appendChild(writer);
            div.appendChild(pprice);
            div.appendChild(ptype);
        };
        
        div.appendChild(button);
        div.appendChild(image);
        content.appendChild(div);
        div.appendChild(image);
    }
}