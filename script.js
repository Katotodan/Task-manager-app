const form = document.querySelector('form')
const outPutArea = document.querySelector('.container--main')
const inputValue = document.querySelector('#task-title')
let deleteBtns = document.querySelectorAll('.delete')
let editBtns = document.querySelectorAll('.edit')

// Submit a new item
form.addEventListener('submit' , (e) =>{
    e.preventDefault();
    const newTime = new Date()
    const newElement = document.createElement('div')
    newElement.classList.add('main--child')
    newElement.innerHTML = `
        <p>
        <input type="checkbox" class ='checkBox ${newTime.getTime()}' > 
        </p>
        <p>
            <span> ${inputValue.value}</span>
        </p>
        <p>
            <button class="edit ${newTime.getTime()}">📝</button>
            <button class="delete ${newTime.getTime()}">❌</button>
        </p>
    `
    outPutArea.appendChild(newElement)
    inputValue.value = ''
    deleteBtns = document.querySelectorAll('.delete')
    editBtns = document.querySelectorAll('.edit')
    allCheckBox = document.querySelectorAll('.checkBox')
    addToLocalStorage(newTime.getTime(),newElement.innerHTML.toString() )
    deleteBtnLisner()
    editBtnLisner()
})

const addToLocalStorage = (time, element) =>{
    localStorage.setItem(`task${time}`, `${element}`)
}
const retrivingFromLocalStorage = () =>{
    for(let i=0; i<localStorage.length; i++){
        let value = localStorage.key(i)
        if(/^task/.test(value)){
            const newElement = document.createElement('div')
            newElement.classList.add('main--child')
            newElement.innerHTML = localStorage.getItem(value)
            outPutArea.appendChild(newElement)
            deleteBtns = document.querySelectorAll('.delete')
            editBtns = document.querySelectorAll('.edit')
            if(newElement.children[1].children[0].classList.contains('crossTask')){
                newElement.children[0].children[0].checked = true
            }
            
        }
    }
}
retrivingFromLocalStorage() 
//delete btn script
function deleteBtnLisner() {
    deleteBtns.forEach(element => {
        element.addEventListener('click', () =>{
            let className = element.className
            className = className.slice(7)
            localStorage.removeItem(`task${className}`)
            element.parentNode.parentNode.remove()
            deleteBtns = document.querySelectorAll('.delete')
            editBtns = document.querySelectorAll('.edit')
        })
    })
}
deleteBtnLisner()

// Edit btn script
const taskContainer = document.querySelector('.container')
const editForm = document.querySelector('.editForm')
const elementId = document.querySelector('.element--id')
const textInput = document.querySelector('#text-input')
const complited = document.querySelector('#complited')
const cancelBtn = document.querySelector('.cancel')
const donelBtn = document.querySelector('.done')
const redCross = document.querySelector('.red-cross')
let allCheckBox = document.querySelectorAll('.checkBox')

function editFormHider (){
    editForm.style.display = 'none'
    taskContainer.style.display = 'block' 
}
cancelBtn.addEventListener('click', () =>{
    editFormHider () 
})
redCross.addEventListener('click', () =>{
    editFormHider ()   
})
function editBtnLisner (){
    editBtns.forEach((element, index )=>{
        element.addEventListener('click', () =>{
            editForm.style.display = 'block'
            taskContainer.style.display = 'none'
            let oldTex = document.querySelectorAll('.main--child')[index].children[1].children[0]
            let className = element.className
            className = className.slice(5)
            elementId.innerHTML = `Element Id: ${className}`
            textInput.value = oldTex.innerHTML
            oldTex.classList.contains('crossTask') ? complited.checked = true : complited.checked = false 
            donelBtn.addEventListener('click', (e) =>{
                editFormHider ()
                e.preventDefault()
                oldTex.innerHTML = textInput.value
                if(complited.checked){
                    oldTex.classList.add('crossTask')
                    allCheckBox[index].checked = true
                    console.log(allCheckBox);
                }else{
                    oldTex.classList.remove('crossTask')
                    allCheckBox[index].checked = false
                    console.log(allCheckBox);
                }
                addToLocalStorage(className,document.querySelectorAll('.main--child')[index].innerHTML.toString() )
            })
    
        })
    })
}
editBtnLisner()
// check or uncheck task 
allCheckBox.forEach((element, index) =>{
    element.addEventListener('click', () =>{
        if(element.checked){
            document.querySelectorAll('.main--child')[index].children[1].children[0].classList.add('crossTask')
            let className = element.className
            className = className.slice(9)
            addToLocalStorage(className,document.querySelectorAll('.main--child')[index].innerHTML.toString() )
        }else{
            document.querySelectorAll('.main--child')[index].children[1].children[0].classList.remove('crossTask')
            let className = element.className
            className = className.slice(9)
            addToLocalStorage(className,document.querySelectorAll('.main--child')[index].innerHTML.toString() )            
        } 
    })
})



