function article(nm,prix,uni){
    let art = document.createElement("div")
    art.classList.add("art")
    let nom = document.createElement("h4")
    nom.innerHTML = nm
    art.appendChild(nom)
    let afa = document.createElement("div")
    afa.classList.add("afa")
    let q = document.createElement("h4")
    q.id = "q"
    q.innerHTML = uni
    afa.appendChild(q)
    let pr = document.createElement("h4")
    pr.id = "pr"
    pr.innerHTML = `${(prix).toFixed(2)}`
    afa.appendChild(pr)
    art.appendChild(afa)
    return art
}


function createLine(n,ele,nom){
    let tr = document.createElement("tr")
    for(let i=0;i<n;i++){
        const td = document.createElement("td")
        td.innerHTML = i==0 ? nom : (i==1 ? `${ele} Ar` : ((i==2) ? 0 : ((i==3) ? `${Tva}%` : "0")))     
        td.contentEditable = i==2 ? true : false 
        td.className = i==2 ? "uni" : (i==4 ? "ht" : (i==5 ? "ttc" : ""))
        tr.appendChild(td)
    }
    return tr
}

function somme(tab) {
    let som = 0
    for(let i=0;i<tab.length;i++){
        som+=parseInt(tab[i].innerHTML)
    }
    return som
}

const noms = ["Céréales", "Jus Star 1,5L","Biscuit","Kabisa","Yaourt Socolait","Eau Vive 0,5L","Gold Blanche 50cl", "Châteauneuf-Du-Pape 75cl"]
const price = [15750,4999,1550,5500,1100,1400,5100,248400]
const container = document.querySelector(".container")
const tbody = document.querySelector("tbody")
const table = document.querySelector("table")
const fils = container.childElementCount
const arts = document.querySelectorAll(".art > input")
const totalHt = document.querySelector(".tht")
const totalTtc = document.querySelector(".tttc")
const totalTva = document.querySelector(".tva")
let Tva = 8.5
const btn = document.querySelector("#btn")


for(let i=0;i<price.length;i++){
    tbody.appendChild(createLine(6,price[i],noms[i]))
}
let te = true
const unis = document.querySelectorAll(".uni")
let ht = document.querySelectorAll(".ht")
const ttc = document.querySelectorAll(".ttc")
const ticket = document.querySelector(".ticket")
const up = document.querySelector(".up")
// up.parentNode.insertBefore(article("KAKANA",200,2), up.nextSibling)
for (let i = 0; i<arts.length; i++) {
    const art = arts[i];
    art.addEventListener("input", (e)=>{
        let val = e.target.value
        let t = val*price[i]
        let pr = t-parseInt((t*Tva)/100)
        ht[i].innerHTML = `${pr}`
        ttc[i].innerHTML = `${t}` 
        unis[i].innerHTML = `${val}`
        totalTtc.innerHTML = `${somme(ttc)} AR`
        totalHt.innerHTML = `${somme(ht)} AR`
        totalTva.innerHTML = `${somme(ttc) - somme(ht)} AR`
        
    })    
}

btn.onclick = ()=>{
    te = boutons(te)   
}

const nbArt = document.querySelector('.nb h2:nth-of-type(2)');
const ToP = document.querySelector('.nb2 h2:nth-of-type(2)');
const val2 = document.querySelector('.mode h2:nth-of-type(2)');
const u1 = document.querySelector('.u1 h4:nth-of-type(2)');
const u3 = document.querySelector('.u3 h4:nth-of-type(2)');
const u4 = document.querySelector('.u4 h4:nth-of-type(2)');


// ////////////////////////////////////// //


function verifier(){
    let som = 0
    let som2 = 0
    let som3 = 0
    let som4 = 0
    for (let i = 0; i < arts.length; i++) {
        const art = arts[i]
        let val = art.value
        let nom = noms[i]
        let t = val*price[i]
        let pr = t-parseInt((t*Tva)/100)
        if (val!=0) up.parentNode.insertBefore(article(nom,t,val), up.nextSibling)
        som+=parseInt(val)
        som2+=parseInt(t)
        som3+=parseInt(pr)
        som4+=parseInt((t*Tva)/100)
    }
    nbArt.innerHTML = som
    ToP.innerHTML = som2.toFixed(2)
    val2.innerHTML = som2.toFixed(2)    
    u1.innerHTML = som3.toFixed(2)
    u3.innerHTML = som4.toFixed(2)
    u4.innerHTML = som2.toFixed(2)
}

function boutons(test){
    if (test){
        document.querySelector("h1").style.display = "none"
        table.style.display = "none"
        container.style.display = "none"
        ticket.style.display = "flex"
        verifier()
        btn.innerHTML = "Refaire des achats"
    }else{
        document.location.reload()
    }
    return !test
}

