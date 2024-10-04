console.log('this is ');
function gettime(time){
    const day = parseInt(time/86400)
    const hours = time % 86400
    const hour = parseInt(hours / 3600)
    const minutes = hours % 3600
    const minute = parseInt(minutes/60)
    return `${day} day ${hour} hour ${minute} min ago `
}

const removeactive = () =>{
    const buttons = document.getElementsByClassName("cate-btn")
    for(let btn of buttons){
        btn.classList.remove("active")
    }
}
// fatch load and show catagories on html 

// create load catagories 
const loadcatagories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // if you get response 
    .then((res) => res.json())
    .then((data)=> displaycata(data.categories))
    // if you get error 
    .catch((error) => console.log(error))
}

const loadcatagoryvideo = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    // if you get response 
    .then((res) => res.json())
    .then((data)=> {
        // remove active btn func 
        removeactive()
        // create active btn 
        const activebtn = document.getElementById(`btn-${id}`)
        activebtn.classList.add("active")
        displayvideos(data.category)
    })
    // if you get error 
    .catch((error) => console.log(error))
}



// create display catagories 
const displaycata = (cate) =>{
    // get btn nav for append 
    const catecontainer = document.getElementById("category")
    // every single item get with loop 
    cate.forEach((item) => {
        console.log(item);
        // create a btn for cate 
        const butoncontainer = document.createElement("div");
        butoncontainer.innerHTML=`
        <button id="btn-${item.category_id}" onclick="loadcatagoryvideo(${item.category_id})" class="btn cate-btn">
            ${item.category}
        </button>
        `
        // add button to categorycontainer 
        catecontainer.append(butoncontainer)
    });
}

// this is load videos 
const loadvideos = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    // if you get response 
    .then((res) => res.json())
    .then((data)=> displayvideos(data.videos))
    // if you get error 
    .catch((error) => console.log(error))
}

const displayvideos = (videos) => {
    const videoscontainer = document.getElementById("videos")
    videoscontainer.innerHTML="";

    if (videos.length == 0){
        videoscontainer.classList.remove("grid")
        videoscontainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
            <img src="img/icon.png">
            <h2 class="font-bold text-3xl">no contains here </h2>
        </div>
        `;
        return;
    }else{
        videoscontainer.classList.add("grid")
    }

    videos.forEach((video) => {
        console.log(video);
        // create a card for display video 
        const card = document.createElement("div");
        card.classList = "card card-compact ";
        card.innerHTML = `
        
            <figure class="h-[200px] relative" >
                <img class="h-full w-full object-cover"
                src=${video.thumbnail}
                alt="Shoes" />
                ${
                    video.others.posted_date?.length==0 ? "" :`<span class="absolute right-2 bottom-2 bg-black text-white p-1">${gettime(video.others.posted_date)}</span>`
                }
                
            </figure>
            <div class="px-0 py-2 flex gap-3">
                <div>
                    <img class="h-10 w-10 rounded-full object-cover" src=${video.authors[0].profile_picture}>
                    
                </div>
                <div>
                    <h2 class="font-bold text-lg">${video.title}</h2>
                    <div class="flex gap-2 ">
                        <P>${video.authors[0].profile_name}</P>
                        ${video.authors[0].verified == true ? '<img class="h-5 " src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" >' : ""}
                    </div>
                    <P>${video.others.views} views</P>
                </div>
            </div>
        
        `;
        videoscontainer.append(card)
    })
}

loadcatagories()
loadvideos()