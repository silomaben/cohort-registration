
if(window.location.pathname == '/register.html'){
    const registration_form = document.querySelector('.register')
    const txtfullname = document.querySelector('#full-name')
    const cohort_number = document.querySelector('#cohort_number')
    const txtemail = document.querySelector('#email')
    const txtpassword = document.querySelector('#password') 
    const txtpassword2 = document.querySelector('#password2') 
    const reg_notification= document.querySelector('#notifications-reg') 
    


    // let profileurl = ''
    const regError = document.querySelector('.regError')

    

    registration_form.addEventListener('submit', (e)=>{
        e.preventDefault();

        if(txtfullname.value == '' || cohort_number.value == '' || txtemail.value == '' || txtpassword.value == '' || txtpassword2.value == ''  ){
            reg_notification.textContent = "fill all fields"
            setTimeout(function() {
                reg_notification.textContent = ""
            }, 3000);
            return
        }

        // console.log(txtpassword.value, txtpassword2.value );


        
        
        if(txtpassword.value !== txtpassword2.value){
            reg_notification.textContent = 'Your Passwords do not match'
            setTimeout(function() {
                reg_notification.textContent = ""
            }, 3000);
            console.log('pwd don match')
            return
        }

        // console.log(profileurl);
        let user = txtfullname.value !== '' && cohort_number.value !== '' && txtemail.value !== '' && txtpassword.value !== '' 

        if(user){
            const promise = new Promise ((resolve , reject)=>{
                fetch('http://localhost:4500/users/register',{
                    headers:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    method: "POST",
                    body:JSON.stringify({
                        "full_name": txtfullname.value,
                        "cohort": cohort_number.value,
                        "email": txtemail.value,
                        "password": txtpassword.value
                    })
                }).then(res=>(res.json())).then(data=>{
                    console.log(data);

                    if(data[0]?.message ?? data?.message=="User registered successfully"){
                        reg_notification.textContent = data[0]?.message ?? data?.message
                    }else{
                        reg_notification.textContent = "User registered failed"
                    }

                    setTimeout(function() {
                        reg_notification.textContent = ""
                    }, 3000);

                   
                    resolve(data)
                }).catch(error =>{
                    console.log(error);
                    reject(error)
                })
            })
        }
    })
}