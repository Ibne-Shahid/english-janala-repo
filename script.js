const manageSpinner = (status) =>{
    if(status==true){
        document.getElementById("loading-icon").classList.remove("hidden")
        document.getElementById("word-container").classList.add("hidden")
    } else {
        document.getElementById("word-container").classList.remove("hidden")
        document.getElementById("loading-icon").classList.add("hidden")
    }
}

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLesson(json.data))
}

const removeActiveClass = () => {

    const removeActiveClass = document.querySelectorAll(".remove-btn")
    removeActiveClass.forEach((btn) => btn.classList.remove("active"))

}

const displayWords = (id) => {
    manageSpinner(true)
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
        .then(res => res.json())
        .then(data => wordLessons(data.data))
    removeActiveClass()
    const clickBtn = document.getElementById(`click-btn-${id}`)
    clickBtn.classList.add("active")
}

const loadWordDetail = async (id) => {

    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url)
    const details = await res.json()

    displayDetails(details.data);

}

const displayDetails = (words) => {

    const synonyms = words.synonyms;

    const detailBox = document.getElementById("detail-box")
    detailBox.innerHTML = `
    <div class="space-y-5">
        <div>
            <h2 class="text-2xl font-bold">
                ${words.word} (<i class="fa-solid fa-microphone-lines"></i> :${words.pronunciation
                })
            </h2>
        </div> 
        <div class="space-y-2">
            <h2 class="font-bold">Meaning</h2>
            <p class="font-bold">${words.meaning}</p>  
        </div>
        <div class="">
            <h2 class="font-bold">Example</h2>
            <p class="text-gray-500">${words.sentence}</p>
        </div>
        <div class="">
            <h2 class="font-bold">Synonym</h2>
            <div>${synonyms.map((synnonym)=>(
                `<span class="btn">${synnonym}</span>`
            )).join(" ")}</div>
        </div>
    </div>        
    `


    document.getElementById("my_modal_5").showModal()

}

const wordLessons = (words) => {

    const wordContainer = document.getElementById("word-container")
    wordContainer.innerHTML = ""

    if (words.length === 0) {
        wordContainer.innerHTML = `
            <div
        class="text-center  col-span-full rounded-xl py-10 space-y-6 font-bangla"
      >
        <img class="mx-auto" src="./assets/alert-error.png"/>
        <p class="text-xl font-medium text-gray-400">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
      </div>
        `
        manageSpinner(false)
        return
    }

    words.forEach((word) => {

        const card = document.createElement("div")

        card.innerHTML = `
            <div
        class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4"
      >
      <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
      <p class="font-semibold">Meaning /Pronounciation</p>
      <div class="text-2xl font-medium font-bangla">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}/${word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া  যায়নি"}</div>
       <div class="flex justify-between items-center">
       <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
       </div>
      </div>
        `
        wordContainer.appendChild(card)
    })

    manageSpinner(false)


}

const displayLesson = (lessons) => {

    const levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML = ""

    for (let lesson of lessons) {

        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button id="click-btn-${lesson.level_no}" onclick="displayWords(${lesson.level_no})" class="btn btn-outline btn-primary remove-btn"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
        `
        levelContainer.appendChild(btnDiv)
    }

}

loadLessons();