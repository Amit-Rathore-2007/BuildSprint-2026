let addComplaintBtn = document.querySelector("main .main .box-cont .add-complaint")
let ComplaintForm = document.querySelector("main .main .box-cont #complaintForm")
let cancelComplaintForm = document.querySelector("main .main .box-cont #complaintForm #cancel-btn")

addComplaintBtn.addEventListener("click", e => {
    console.dir(ComplaintForm)
    if (ComplaintForm.classList.contains("dis-none"))
        ComplaintForm.classList.remove("dis-none")
})

cancelComplaintForm.addEventListener("click", e => {
    if (!ComplaintForm.classList.contains("dis-none"))
        ComplaintForm.classList.add("dis-none")
})
